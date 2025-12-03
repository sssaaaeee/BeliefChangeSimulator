<script setup>
// ボタンやメニューを配置し，ページ遷移や各機能の切り替えを行う
// AppShellから呼び出す
import { useRouter } from 'vue-router';
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
    <div>sidebar area</div>
  </div>
</template>

<style scoped>

</style>
