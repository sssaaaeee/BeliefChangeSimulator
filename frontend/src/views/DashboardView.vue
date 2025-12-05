<script setup>
import AppShell from '@/components/layout/AppShell.vue';
import SettingsPanel from '@/features/simulationsettings/components/SettingsPanel.vue';
import BeliefGraph from '@/features/beliefNetwork/components/BeliefGraph.vue';
import TimelineControlBar from '@/features/beliefNetwork/components/TimelineControlBar.vue';
console.log('DashboardView loaded')
</script>

<template>
  <AppShell>
    <div class="dashboard">
      <!-- 左：設定パネル -->
      <aside class="settings-pane">
        <SettingsPanel />
      </aside>

      <!-- 右：ネットワーク + タイムライン -->
      <section class="visual-pane">
        <!-- 上：グラフ描画エリア -->
        <div class="graph-area">
          <BeliefGraph />
        </div>

        <!-- 下：タイムライン -->
        <div class="timeline-area">
          <TimelineControlBar />
        </div>
      </section>
    </div>
  </AppShell>
</template>

<style scoped>
</style>
