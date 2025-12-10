<script setup>
import { ref, computed } from 'vue';
import { useBeliefNetworkView } from '../useBeliefNetworkView';

console.log('TimelineControlBar loaded');

const {
  currentStep,
  totalSteps,
  loading,
  nextStep,
  prevStep,
  goToStep
} = useBeliefNetworkView();

const isPlaying = ref(false);
const playInterval = ref(null);
const playSpeed = ref(300); // ms per frame

const canGoPrev = computed(() => currentStep.value > 0);
const canGoNext = computed(() => currentStep.value < totalSteps.value - 1);

const play = () => {
  if (isPlaying.value) return;

  isPlaying.value = true;
  playInterval.value = setInterval(() => {
    if (currentStep.value >= totalSteps.value - 1) {
      pause();
    } else {
      nextStep();
    }
  }, playSpeed.value);
};

const pause = () => {
  isPlaying.value = false;
  if (playInterval.value) {
    clearInterval(playInterval.value);
    playInterval.value = null;
  }
};

const reset = () => {
  pause();
  goToStep(0);
};

const onSliderChange = (event) => {
  pause();
  goToStep(parseInt(event.target.value));
};
</script>

<template>
  <div class="timeline-control-bar">
    <div class="controls">
      <!-- Play/Pause Button -->
      <button
        class="control-btn play-btn"
        @click="isPlaying ? pause() : play()"
        :disabled="loading || totalSteps === 0"
      >
        <span v-if="isPlaying">⏸</span>
        <span v-else>▶</span>
      </button>

      <!-- Reset Button -->
      <button
        class="control-btn"
        @click="reset"
        :disabled="loading || totalSteps === 0"
      >
        ⏮
      </button>

      <!-- Previous Button -->
      <button
        class="control-btn"
        @click="prevStep"
        :disabled="loading || !canGoPrev"
      >
        ⏪
      </button>

      <!-- Next Button -->
      <button
        class="control-btn"
        @click="nextStep"
        :disabled="loading || !canGoNext"
      >
        ⏩
      </button>

      <!-- Step Display -->
      <div class="step-display">
        {{ currentStep + 1 }} / {{ totalSteps }}
      </div>
    </div>

    <!-- Timeline Slider -->
    <div class="timeline-slider-container">
      <input
        type="range"
        class="timeline-slider"
        :min="0"
        :max="totalSteps - 1"
        :value="currentStep"
        @input="onSliderChange"
        :disabled="loading || totalSteps === 0"
      />
    </div>
  </div>
</template>

<style scoped>
.timeline-control-bar {
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  height: 100%;
  padding: 16px 24px;
  box-sizing: border-box;
}

.controls {
  display: flex;
  align-items: center;
  gap: 12px;
}

.control-btn {
  width: 40px;
  height: 40px;
  border: none;
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  border-radius: 4px;
  cursor: pointer;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s;
}

.control-btn:hover:not(:disabled) {
  background: rgba(255, 255, 255, 0.2);
}

.control-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.play-btn {
  background: rgba(59, 130, 246, 0.3);
}

.play-btn:hover:not(:disabled) {
  background: rgba(59, 130, 246, 0.5);
}

.step-display {
  margin-left: auto;
  font-size: 14px;
  color: #fff;
  font-weight: 500;
  min-width: 80px;
  text-align: right;
}

.timeline-slider-container {
  flex: 1;
  display: flex;
  align-items: center;
}

.timeline-slider {
  width: 100%;
  height: 6px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
  outline: none;
  -webkit-appearance: none;
}

.timeline-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 16px;
  height: 16px;
  background: #3b82f6;
  border-radius: 50%;
  cursor: pointer;
}

.timeline-slider::-moz-range-thumb {
  width: 16px;
  height: 16px;
  background: #3b82f6;
  border-radius: 50%;
  cursor: pointer;
  border: none;
}

.timeline-slider:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.timeline-slider:disabled::-webkit-slider-thumb {
  cursor: not-allowed;
}

.timeline-slider:disabled::-moz-range-thumb {
  cursor: not-allowed;
}
</style>
