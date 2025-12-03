<script setup>
import SideBar from '@/components/layout/SideBar.vue'
import MainArea from '@/components/layout/MainArea.vue'
// 骨格の設定
console.log('AppShell loaded')
</script>

<template>
  <div class="app-shell">
    <!-- 左側のサイドバー -->
    <SideBar class="sidebar" />

    <!-- 右側のメインエリア -->
    <MainArea class="main-area">
      <slot></slot>
    </MainArea>
  </div>
</template>

<style scoped>
.app-shell {
  display: flex;
  height: 100vh;
}

.sidebar {
  width: 30vw;
  border-right: 1px solid #e5e7eb;
}

.main-area {
  flex: 1;
}
</style>
