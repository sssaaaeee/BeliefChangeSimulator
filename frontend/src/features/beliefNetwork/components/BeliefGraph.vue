<script setup>
import { useBeliefNetworkView } from '../useBeliefNetworkView';
console.log('BeliefGraph loaded')
const { output } = useBeliefNetworkView();
console.log(output);
</script>

<template>
  <div class="belief-graph">
    Belief Graph Component
    {{ output }}
  </div>
</template>
