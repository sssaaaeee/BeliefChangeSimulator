<script setup>
console.log('MainArea loaded')
</script>

<template>
  <div class="main-area">
    <slot ></slot>
  </div>
</template>

<style scoped>
.main-area {
  height: 100%;
  padding: 16px;
  box-sizing: border-box;
  overflow: hidden;
}
</style>
