<template>
  <header
    id="siteHeader"
    :class="['site-header', { visible: visible }]"
    :aria-hidden="!visible"
  >
    <div class="title">{{ $t('site.title') }}</div>
    <div class="lang-wrap">
      <label for="langSelectTop" class="lang-label">{{ $t('site.langLabel') }}</label>
      <select
        id="langSelectTop"
        v-model="currentLang"
        :aria-label="$t('site.langAria')"
      >
        <option value="zh">中文</option>
        <option value="fr">Français</option>
      </select>
    </div>
  </header>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  visible: { type: Boolean, default: false },
  lang: { type: String, default: 'zh' }
})

const emit = defineEmits(['update:lang'])

const currentLang = computed({
  get: () => props.lang,
  set: (v) => emit('update:lang', v)
})
</script>

<style scoped>
.site-header {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0 1rem;
  background: rgba(10, 10, 15, 0.85);
  backdrop-filter: blur(6px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.03);
  transform: translateY(-120%);
  transition: transform 240ms ease;
  z-index: 9999;
}

.site-header.visible {
  transform: translateY(0);
}

.site-header .title {
  font-family: 'Playfair Display', serif;
  font-size: 1rem;
  font-weight: 700;
  color: var(--blanc);
}

.site-header .lang-wrap {
  display: flex;
  align-items: center;
  gap: 0.6rem;
}

.lang-label {
  font-size: 0.78rem;
  color: var(--muted);
}

.site-header select {
  background: transparent;
  color: var(--text);
  border: 1px solid rgba(255, 255, 255, 0.06);
  padding: 0.25rem 0.5rem;
  border-radius: 6px;
}

@media (max-width: 640px) {
  .site-header {
    height: 48px;
    padding: 0 0.8rem;
  }
  .site-header .title {
    font-size: 0.95rem;
  }
}
</style>
