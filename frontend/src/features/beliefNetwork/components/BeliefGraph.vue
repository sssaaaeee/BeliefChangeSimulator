<script setup>
import { computed } from 'vue';
import { useBeliefNetworkView } from '../useBeliefNetworkView';
console.log('BeliefGraph loaded')
const {
  currentStep,
  totalSteps,
  stateCounts,
  loading,
  error,
  getCurrentFrame
} = useBeliefNetworkView();

// currentStepが変わると自動的に再計算される
const currentFrameUrl = computed(() => {
  console.log('Computing frame for step:', currentStep.value);
  return getCurrentFrame();
});

const stepDisplay = computed(() => {
  console.log('Computing step display:', currentStep.value, '/', totalSteps.value);
  return `Step ${currentStep.value} / ${totalSteps.value - 1}`;
});
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
      />
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
</style>
