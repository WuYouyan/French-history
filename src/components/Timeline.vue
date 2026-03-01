<template>
  <main class="timeline-container" id="timeline">
    <EraSection
      v-for="era in eraOrder"
      :key="era"
      :era="era"
      :events="eraMap.get(era) || []"
    />
  </main>
</template>

<script setup>
import { computed } from 'vue'
import EraSection from './EraSection.vue'

const props = defineProps({
  eraOrder: { type: Array, required: true },
  eraMap: { type: Map, required: true }
})
</script>

<style scoped>
.timeline-container {
  width: 100%;
  max-width: 100%;
  margin: 0;
  padding: 5rem 2rem 8rem;
  position: relative;
}

.timeline-container::before {
  content: '';
  position: absolute;
  left: 50%;
  top: 0;
  bottom: 0;
  width: 1px;
  background: linear-gradient(
    to bottom,
    transparent 0%,
    rgba(201, 168, 76, 0.4) 5%,
    rgba(201, 168, 76, 0.4) 95%,
    transparent 100%
  );
  transform: translateX(-50%);
}
</style>
