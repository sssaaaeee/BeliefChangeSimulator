<script setup>
import { computed, ref, watch, onMounted } from 'vue';
import { useBeliefNetworkView } from '../useBeliefNetworkView';
import mixerIcon from '../../../assets/mixer.svg';

console.log('BeliefGraph loaded')
const {
  currentStep,
  totalSteps,
  stateCounts,
  loading,
  error,
  currentParams,
  justLoaded,
  getCurrentFrame,
  frames
} = useBeliefNetworkView();

const showParams = ref(false);
const showBanner = ref(false);

// 画像プリロード用のキャッシュ
const imageCache = new Map();

// 画像をプリロードしてデコードする関数（高速化のためデコードまで実行）
const preloadImage = async (url) => {
  if (!url || imageCache.has(url)) return;
  const img = new Image();
  img.src = url;
  try {
    await img.decode(); // デコードまで完了させる
    imageCache.set(url, img);
  } catch (err) {
    console.warn('Failed to preload image:', url);
  }
};

// 全フレームをバックグラウンドでプリロード
const preloadAllFrames = async () => {
  if (!currentParams.value) return;

  const { country: countryValue, scenario: scenarioValue, interventionEnabled: interventionEnabledValue, interventionStage: stageValue, degree: degreeValue } = currentParams.value;

  let interventionStageNum = 1;
  if (stageValue === 'Unrecognized') {
    interventionStageNum = 1;
  } else if (stageValue === 'Recognized') {
    interventionStageNum = 2;
  } else if (stageValue === 'Belief') {
    interventionStageNum = 3;
  }

  const r2BaseUrl = import.meta.env.VITE_R2_BASE_URL || '';

  // まず最初の20フレームを優先的にロード
  const priorityPromises = [];
  for (let i = 0; i < Math.min(20, frames.value.length); i++) {
    const imagePath = `images/${countryValue}_scenario${scenarioValue}_${interventionEnabledValue ? `beta${interventionStageNum}_exposure_deg${degreeValue}` : "base"}/${frames.value[i].image_path}`;
    const url = r2BaseUrl ? `${r2BaseUrl}/${imagePath}` : `/${imagePath}`;
    priorityPromises.push(preloadImage(url));
  }
  await Promise.all(priorityPromises);

  // 残りを並列でバックグラウンドロード（制限付き）
  const batchSize = 10;
  for (let i = 20; i < frames.value.length; i += batchSize) {
    const batch = [];
    for (let j = i; j < Math.min(i + batchSize, frames.value.length); j++) {
      const imagePath = `images/${countryValue}_scenario${scenarioValue}_${interventionEnabledValue ? `beta${interventionStageNum}_exposure_deg${degreeValue}` : "base"}/${frames.value[j].image_path}`;
      const url = r2BaseUrl ? `${r2BaseUrl}/${imagePath}` : `/${imagePath}`;
      batch.push(preloadImage(url));
    }
    await Promise.all(batch);
  }
};

// justLoadedが変化したらバナーを表示して3秒後に非表示
watch(justLoaded, (newValue) => {
  if (newValue) {
    showBanner.value = true;
    setTimeout(() => {
      showBanner.value = false;
      justLoaded.value = false;
    }, 3000);
    // 初期ロード時に全フレームをプリロード開始
    preloadAllFrames();
  }
});

// currentStepが変わると自動的に再計算される
const currentFrameUrl = computed(() => {
  console.log('Computing frame for step:', currentStep.value);
  return getCurrentFrame();
});

const stepDisplay = computed(() => {
  console.log('Computing step display:', currentStep.value, '/', totalSteps.value);
  return `Step ${currentStep.value} / ${totalSteps.value - 1}`;
});

const toggleParams = () => {
  showParams.value = !showParams.value;
};
</script>

<template>
  <div class="belief-graph">
    <div v-if="loading" class="loading-state">
      <p>Loading simulation...</p>
    </div>

    <div v-else-if="error" class="error-state">
      <p>Error: {{ error }}</p>
    </div>

    <div v-else-if="currentFrameUrl" class="graph-container">
      <img
        :src="currentFrameUrl"
        alt="Belief Network Graph"
        class="network-image"
        decoding="sync"
        loading="eager"
      />

      <!-- ロード完了バナー -->
      <transition name="banner">
        <div v-if="showBanner" class="load-banner">
          <p>✓ Simulation loaded successfully</p>
        </div>
      </transition>

      <div class="step-indicator">
        {{ stepDisplay }}
      </div>
      <!-- 色ごとのノード数も表示 -->
      <div class="state-counts">
        <p>Unrecognized: {{ stateCounts.Unrecognized }}</p>
        <p>Recognized: {{ stateCounts.Recognized }}</p>
        <p>Belief: {{ stateCounts.Belief }}</p>
        <p>Action: {{ stateCounts.Action }}</p>
      </div>

      <!-- パラメータ表示ボタン -->
      <button class="param-button" @click="toggleParams" title="Show Parameters">
        <img :src="mixerIcon" alt="Parameters" />
      </button>

      <!-- パラメータ表示パネル -->
      <div v-if="showParams && currentParams" class="params-panel">
        <h3>Current Parameters</h3>
        <div class="param-item">
          <span class="param-label">Country:</span>
          <span class="param-value">{{ currentParams.country }}</span>
        </div>
        <div class="param-item">
          <span class="param-label">Conspiracy:</span>
          <span class="param-value">{{ currentParams.scenario }}</span>
        </div>
        <div class="param-item">
          <span class="param-label">Intervention:</span>
          <span class="param-value">{{ currentParams.interventionEnabled ? 'Enabled' : 'Disabled' }}</span>
        </div>
        <div v-if="currentParams.interventionEnabled" class="param-item">
          <span class="param-label">Stage:</span>
          <span class="param-value">{{ currentParams.interventionStage }}</span>
        </div>
        <div v-if="currentParams.interventionEnabled" class="param-item">
          <span class="param-label">Degree:</span>
          <span class="param-value">{{ currentParams.degree }}</span>
        </div>
      </div>
    </div>

    <div v-else class="empty-state">
      <p>No data available</p>
    </div>
  </div>
</template>

<style scoped>
.belief-graph {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.loading-state,
.error-state,
.empty-state {
  text-align: center;
  color: #6b7280;
}

.error-state {
  color: #dc2626;
}

.graph-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
}

.network-image {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.step-indicator {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 8px 16px;
  border-radius: 4px;
  font-size: 14px;
}

.state-counts {
  position: absolute;
  top: 20px;
  right: 20px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 8px 16px;
  border-radius: 4px;
  font-size: 14px;
}

.state-counts p {
  display: flex;
  align-items: center;
  margin: 4px 0;
}

.state-counts p::before {
  content: '';
  width: 12px;
  height: 12px;
  border-radius: 50%;
  margin-right: 8px;
}

.state-counts p:nth-child(1)::before {
  background-color: #cccccc;
}

.state-counts p:nth-child(2)::before {
  background-color: #1f77b4;
}

.state-counts p:nth-child(3)::before {
  background-color: #ff7f0e;
}

.state-counts p:nth-child(4)::before {
  background-color: #d62728;
}

.param-button {
  position: absolute;
  bottom: 20px;
  right: 20px;
  width: 48px;
  height: 48px;
  border: none;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.7);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s;
  padding: 0;
}

.param-button:hover {
  background: rgba(0, 0, 0, 0.85);
}

.param-button img {
  width: 24px;
  height: 24px;
  filter: invert(1);
}

.params-panel {
  position: absolute;
  bottom: 80px;
  right: 20px;
  background: rgba(0, 0, 0, 0.9);
  color: white;
  padding: 16px 20px;
  border-radius: 8px;
  font-size: 14px;
  min-width: 250px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.params-panel h3 {
  margin: 0 0 12px 0;
  font-size: 16px;
  font-weight: 600;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  padding-bottom: 8px;
}

.param-item {
  display: flex;
  justify-content: space-between;
  margin: 8px 0;
  gap: 16px;
}

.param-label {
  font-weight: 500;
  color: #9ca3af;
}

.param-value {
  font-weight: 600;
  color: #fff;
}

.load-banner {
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(34, 197, 94, 0.95);
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  z-index: 1000;
}

.load-banner p {
  margin: 0;
  display: flex;
  align-items: center;
  gap: 8px;
}

.banner-enter-active, .banner-leave-active {
  transition: all 0.3s ease;
}

.banner-enter-from {
  opacity: 0;
  transform: translateX(-50%) translateY(-20px);
}

.banner-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(-20px);
}
</style>
