<script setup>
console.log('MainArea loaded')
</script>

<template>
  <div class="main-area">
    Here is MainArea
    <slot ></slot>
  </div>
</template>

<style scoped>
.main-area {
  height: 100%;
  padding: 16px;
  box-sizing: border-box;
  overflow: hidden;
  background-color: #f9fafb;
}
</style>
