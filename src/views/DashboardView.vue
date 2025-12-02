<script setup>
import AppShell from '@/components/layout/AppShell.vue'
import PostPanel from '@/features/posts/components/PostPanel.vue'
import BeliefNetworkPanel from '@/features/beliefNetwork/components/BeliefNetworkPanel.vue'
console.log('DashboardView loaded')
</script>

<template>
  <AppShell>
    <template #sidebar>
      <PostPanel />
    </template>

    <BeliefNetworkPanel />
  </AppShell>
</template>

<style scoped>
</style>
