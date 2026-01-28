<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import AppShell from '@/components/layout/AppShell.vue';
import SettingsPanel from '@/features/simulationSettings/components/SettingsPanel.vue';
import BeliefGraph from '@/features/beliefNetwork/components/BeliefGraph.vue';
import TimelineControlBar from '@/features/beliefNetwork/components/TimelineControlBar.vue';
import { useBeliefNetworkView } from '@/features/beliefNetwork/useBeliefNetworkView.js';
console.log('DashboardView loaded')

// 設定パネルの表示状態
const isPanelVisible = ref(true);
// グラフの最小推奨幅（設定パネル350px + グラフ最小幅）
const MIN_WIDTH_WITH_PANEL = 1200;

// 画面サイズに応じてパネルの表示を自動調整
function checkScreenSize() {
  const windowWidth = window.innerWidth;
  if (windowWidth < MIN_WIDTH_WITH_PANEL) {
    isPanelVisible.value = false;
  } else {
    isPanelVisible.value = true;
  }
}

// DashboardViewがマウントされたら必ずfetchを実行
onMounted(() => {
  const { fetchSimulation } = useBeliefNetworkView();
  fetchSimulation();
  // 初回チェック
  checkScreenSize();
  // リサイズイベントリスナーを追加
  window.addEventListener('resize', checkScreenSize);
});

onUnmounted(() => {
  // クリーンアップ
  window.removeEventListener('resize', checkScreenSize);
});

function handleRestart() {
  // ステップを0に戻し，Python APIを再呼び出し
  const { goToStep, fetchSimulation } = useBeliefNetworkView();
  goToStep(0);
  fetchSimulation();
}
function openHelpModal() {
  // ヘルプモーダルを開く（実装は後で）
  alert('Help modal would open here.');
}
function hiddenPanel() {
  // 設定パネルの表示/非表示をトグル
  isPanelVisible.value = !isPanelVisible.value;
}
</script>

<template>
  <AppShell>
    <div class="dashboard">
      <!-- 左：設定パネル（スクロール可能） -->
      <aside class="settings-pane" :class="{ 'settings-pane--hidden': !isPanelVisible }">
        <!--handleRestartでステップを0に戻し，Python APIを再呼び出し-->
        <SettingsPanel
          @restart="handleRestart"
          @help="openHelpModal"
          @hidden="hiddenPanel"
        />
      </aside>

      <!-- パネルを再表示するボタン -->
      <button
        v-if="!isPanelVisible"
        class="show-panel-btn"
        @click="hiddenPanel"
      >
        →
      </button>

      <!-- 右：グラフ＆タイムライン -->
      <section class="visual-pane">
        <!-- オーバーレイ（小画面でパネル表示時） -->
        <div
          v-if="isPanelVisible"
          class="overlay"
          @click="hiddenPanel"
        ></div>

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
  width: 100%;
}

/* 左：設定パネル */
.settings-pane {
  width: 350px;
  border-right: 1px solid #e5e7eb;
  box-sizing: border-box;
  position: relative;
  transition: width 0.3s ease, transform 0.3s ease;
  transform: translateX(0);
  flex-shrink: 0;
  overflow: hidden;
}

.settings-pane--hidden {
  transform: translateX(-100%);
  width: 0px;
}

/* 画面幅800px未満でのオーバーレイ表示 */
@media (max-width: 800px) {
  .settings-pane {
    position: fixed;
    left: 0;
    top: 0;
    height: 100vh;
    z-index: 1000;
    background: white;
    box-shadow: 2px 0 8px rgba(0, 0, 0, 0.2);
  }

  .settings-pane--hidden {
    transform: translateX(-100%);
    width: 350px;
  }
}

/* パネル再表示ボタン */
.show-panel-btn {
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 40px;
  height: 60px;
  background: #111827;
  color: #fff;
  border: none;
  border-radius: 0 8px 8px 0;
  cursor: pointer;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  transition: background 0.2s;
}

.show-panel-btn:hover {
  background: #374151;
}

/* 右：可視化エリア */
.visual-pane {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  width: 100%;
  position: relative;
}

/* オーバーレイ（小画面でパネル表示時のみ） */
.overlay {
  display: none;
}

@media (max-width: 800px) {
  .overlay {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 999;
    cursor: pointer;
  }
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
