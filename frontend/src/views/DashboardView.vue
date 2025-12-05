<script setup>
import AppShell from '@/components/layout/AppShell.vue';
import SettingsPanel from '@/features/simulationSettings/components/SettingsPanel.vue';
import BeliefGraph from '@/features/beliefNetwork/components/BeliefGraph.vue';
import TimelineControlBar from '@/features/beliefNetwork/components/TimelineControlBar.vue';
console.log('DashboardView loaded')
</script>

<template>
  <AppShell>
    <div class="dashboard">
      <!-- 左：設定パネル（スクロール可能） -->
      <aside class="settings-pane">
        <!--handleRestartでステップを0に戻し，Python APIを再呼び出し-->
        <SettingsPanel
          @restart="handleRestart"
          @help="openHelpModal"
        />
      </aside>

      <!-- 右：グラフ＆タイムライン -->
      <section class="visual-pane">
        <div class="graph-area">
          <BeliefGraph />
        </div>
        <div class="timeline-area">
          <TimelineControlBar />
        </div>
      </section>
    </div>
  </AppShell>
</template>

<style scoped>
.dashboard {
  display: flex;
  height: 100%;
}

/* 左：設定パネル */
.settings-pane {
  width: 350px;
  border-right: 1px solid #e5e7eb;
  padding: 16px;
  box-sizing: border-box;
  overflow-y: auto; /* ← 左だけスクロール */
}

/* 右：可視化エリア */
.visual-pane {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  width: 100vw;
}

/* ネットワーク描画エリア（上） */
.graph-area {
  flex: 1;
  min-height: 0;
  background: #f9fafb;
}

/* タイムライン（下） */
.timeline-area {
  height: 150px;
  background: #000;
  color: #fff;
  padding: 12px 24px;
  box-sizing: border-box;
}
</style>
