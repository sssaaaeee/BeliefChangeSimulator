<script setup>
console.log('AppShell loaded')
</script>

<template>
  <div class="app-shell">
  <aside class="sidebar">
    <slot name="sidebar"></slot>
  </aside>
  <main class="main">
    <slot></slot>
  </main>
  </div>
</template>

<style scoped></style>
