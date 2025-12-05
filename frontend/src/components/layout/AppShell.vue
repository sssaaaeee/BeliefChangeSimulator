<script setup>
import SideBar from '@/components/layout/SideBar.vue'
import MainArea from '@/components/layout/MainArea.vue'
// 骨格の設定
console.log('AppShell loaded')
</script>

<template>
  <div class="app-shell">
    <aside class="sidebar">
      <SideBar>
        <slot></slot>
      </SideBar>
    </aside>

    <main class="main-area">
      <MainArea>
        <slot></slot>
      </MainArea>
    </main>
  </div>
</template>

<style scoped>
.app-shell {
  display: flex;
  height: 100vh; /* ここ重要：Sidebar の高さ基準になる */
}

/* ← ここを aside で囲っておくと、スクロールしやすい */
.sidebar {
  width: 25vw;
  height: 100%;
  overflow-y: auto; /* ⭐︎ Sidebar だけスクロール */
  border-right: 1px solid #e5e7eb;
}

.main-area {
  flex: 1;
  height: 100%;
  overflow: hidden; /* ⭐︎ メイン領域のスクロールは切る */
}
</style>
