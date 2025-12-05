<script setup>
// ボタンやメニューを配置し，ページ遷移や各機能の切り替えを行う
// AppShellから呼び出す
import { useRouter } from 'vue-router';

// PostListのテストで一時的にここに配置
// import PostList from '@/features/simulationsettings/components/PostList.vue';

const router = useRouter();
console.log('SideBar loaded')
function gotoHome() {
  router.push('/');
}
</script>

<template>
  <div class="sidebar">
    <div class="header">
      <button @click="gotoHome">home</button>
    </div>
    <div class="post-area">
      post list here

      <!-- PostListのテストで一時的にここに配置
      <PostList /> -->

    </div>
  </div>
</template>

<style scoped>
/* headerは固定 */
.header {
  position: sticky;
  top: 0;
  background-color: white;
  padding: 8px;
  border-bottom: 1px solid #e5e7eb;
  z-index: 10;
}
</style>
