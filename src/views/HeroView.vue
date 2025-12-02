<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
function simulation() {
  router.push('/simulation')
}
</script>

<template>
  <section class="hero">
    <h1 class="hero-title">Welcome to Our App</h1>
    <p class="hero-subtitle">This is Belief Change Simulator</p>
    <button class="hero-button" @click="simulation">Get Started</button>
  </section>
</template>

<style scoped>
.hero {
  text-align: center;
  padding: 4rem 1rem;
  background-color: var(--color-background-light);
}
</style>
