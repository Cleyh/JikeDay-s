<template>
  <main>
    <div class="container">
      <router-view/>
      <ButtomBar/>
    </div>
  </main>
</template>

<script setup>
import ButtomBar from "@/components/ButtomBar.vue";
</script>

<style scoped>
header {
  line-height: 1.5;
}
</style>
