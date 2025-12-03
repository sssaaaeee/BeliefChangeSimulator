<script setup>
// ボタンやメニューを配置し，ページ遷移や各機能の切り替えを行う
// AppShellから呼び出す
import { useRouter } from 'vue-router';

// PostListのテストで一時的にここに配置
import PostList from '@/features/posts/components/PostList.vue';

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

      <!-- PostListのテストで一時的にここに配置 -->
      <PostList />

    </div>
  </div>
</template>

<style scoped>

</style>
