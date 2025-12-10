<script setup>
import { computed } from 'vue';
import { useBeliefNetworkView } from '../useBeliefNetworkView';
console.log('BeliefGraph loaded')
const {
  currentStep,
  totalSteps,
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
  return `Step ${currentStep.value + 1} / ${totalSteps.value}`;
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
</style>
