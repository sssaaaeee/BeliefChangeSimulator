<script setup>
// 骨格の設定
console.log('AppShell loaded')
import { useRouter } from 'vue-router';
import { useBeliefNetworkView } from '@/features/beliefNetwork/useBeliefNetworkView';
const router = useRouter();
function goHome() {
  router.push('/');
  // ホームに戻ったときに状態をリセット
  const { resetView } = useBeliefNetworkView();
  resetView();
}
</script>

<template>
  <div class="app-shell">
    <!-- 上部ナビゲーション -->
    <header class="app-header">
      <button class="nav-btn" @click="goHome">
        <img src="../../assets/home.svg" class="icon" alt="Home" />
      </button>
      <slot name="header-right"></slot>
    </header>

    <!-- メインのページ表示領域 -->
    <main class="app-main">
      <slot></slot>
    </main>
  </div>
</template>

<style scoped>
.app-shell {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

/* 上部ナビゲーション */
.app-header {
  height: 30px;
  display: flex;
  align-items: center;
  padding: 0 12px;
  border-bottom: 1px solid #e5e7eb;

}

.nav-btn {
  width: 32px;
  height: 32px;
  border: none;
  background: transparent;
  cursor: pointer;
}

.icon {
  width: 20px;
  height: 20px;
  opacity: 0.7;
}

/* メイン領域：ページ側がレイアウトを作る */
.app-main {
  flex: 1;
  overflow: hidden;
  display: flex;
}
</style>
