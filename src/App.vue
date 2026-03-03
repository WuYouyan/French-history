<template>
  <div class="app">
    <SiteHeader
      :visible="!heroVisible"
      :lang="lang"
      @update:lang="lang = $event"
    />
    <Hero :lang="lang" @update:lang="lang = $event" />
    <Timeline :era-order="eraOrder" :era-map="eraMap" />
    <Footer />
  </div>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import timelineData from './data'
import SiteHeader from './components/SiteHeader.vue'
import Hero from './components/Hero.vue'
import Timeline from './components/Timeline.vue'
import Footer from './components/Footer.vue'

const { locale } = useI18n()

const lang = computed({
  get: () => locale.value,
  set: (v) => {
    locale.value = v
  }
})
const heroVisible = ref(true)
let observer = null

const eraOrder = computed(() => {
  const data = timelineData[lang.value] || []
  const order = []
  const seen = new Set()
  data.forEach((item) => {
    if (!seen.has(item.era)) {
      seen.add(item.era)
      order.push(item.era)
    }
  })
  return order
})

const eraMap = computed(() => {
  const data = timelineData[lang.value] || []
  const map = new Map()
  data.forEach((item) => {
    if (!map.has(item.era)) map.set(item.era, [])
    map.get(item.era).push(item)
  })
  return map
})

onMounted(() => {
  // 使用 Hero 所在 section 的上一兄弟或占位：用 .hero 选择器
  const heroEl = document.querySelector('.hero')
  if (heroEl) {
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          heroVisible.value = entry.isIntersecting
        })
      },
      { threshold: 0.05 }
    )
    observer.observe(heroEl)
  }
})

onUnmounted(() => {
  const heroEl = document.querySelector('.hero')
  if (observer && heroEl) observer.unobserve(heroEl)
})
</script>

<style>
:root {
  --bleu: #002395;
  --blanc: #edede9;
  --rouge: #ed2939;
  --gold: #c9a84c;
  --dark: #0a0a0f;
  --mid: #1c1c2e;
  --text: #e8e4dc;
  --muted: #9a9580;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background-color: var(--dark);
  color: var(--text);
  font-family: 'Noto Serif SC', 'Cormorant Garamond', serif;
  overflow-x: hidden;
}
</style>

<style scoped>
.app {
  min-height: 100vh;
}
</style>
