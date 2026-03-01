<template>
  <section class="hero">
    <div class="tricolor-bar">
      <span></span><span></span><span></span>
    </div>
    <p class="hero-label">{{ $t('hero.label') }}</p>
    <h1>
      {{ $t('hero.title') }}<br />
      <em>{{ $t('hero.subtitle') }}</em>
    </h1>
    <p class="hero-sub">
      {{ $t('hero.subline') }}
    </p>
    <div class="hero-lang">
      <label for="langSelect" class="hero-lang-label">
        {{ $t('hero.langLabel') }}
      </label>
      <select
        id="langSelect"
        v-model="currentLang"
        :aria-label="$t('hero.langAria')"
        class="hero-lang-select"
      >
        <option value="zh">中文</option>
        <option value="fr">Français</option>
      </select>
    </div>
    <div class="scroll-hint">{{ $t('hero.scrollHint') }}</div>
  </section>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  lang: { type: String, default: 'zh' }
})

const emit = defineEmits(['update:lang'])

const currentLang = computed({
  get: () => props.lang,
  set: (v) => emit('update:lang', v)
})
</script>

<style scoped>
.hero {
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  position: relative;
  background:
    radial-gradient(ellipse at 20% 50%, rgba(0, 35, 149, 0.35) 0%, transparent 60%),
    radial-gradient(ellipse at 80% 50%, rgba(237, 41, 57, 0.25) 0%, transparent 60%),
    var(--dark);
  padding: 2rem 2rem 5rem;
  overflow: hidden;
}

.hero::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image:
    repeating-linear-gradient(0deg, transparent, transparent 60px, rgba(255, 255, 255, 0.015) 60px, rgba(255, 255, 255, 0.015) 61px),
    repeating-linear-gradient(90deg, transparent, transparent 60px, rgba(255, 255, 255, 0.015) 60px, rgba(255, 255, 255, 0.015) 61px);
  pointer-events: none;
}

.tricolor-bar {
  display: flex;
  width: 80px;
  height: 4px;
  margin: 0 auto 2.5rem;
  border-radius: 2px;
  overflow: hidden;
  gap: 2px;
}

.tricolor-bar span {
  flex: 1;
}

.tricolor-bar span:nth-child(1) {
  background: var(--bleu);
}

.tricolor-bar span:nth-child(2) {
  background: var(--blanc);
}

.tricolor-bar span:nth-child(3) {
  background: var(--rouge);
}

.hero-label {
  font-size: 0.7rem;
  letter-spacing: 0.35em;
  text-transform: uppercase;
  color: var(--gold);
  margin-bottom: 1rem;
  opacity: 0;
  animation: fadeUp 0.8s 0.2s ease forwards;
}

.hero h1 {
  font-family: 'Playfair Display', serif;
  font-size: clamp(2.8rem, 7vw, 5.5rem);
  font-weight: 700;
  line-height: 1.05;
  letter-spacing: -0.02em;
  color: var(--blanc);
  margin-bottom: 1rem;
  opacity: 0;
  animation: fadeUp 0.8s 0.4s ease forwards;
}

.hero h1 em {
  font-style: italic;
  color: var(--gold);
}

.hero-sub {
  font-size: 1rem;
  color: var(--muted);
  letter-spacing: 0.05em;
  opacity: 0;
  animation: fadeUp 0.8s 0.6s ease forwards;
}

.hero-lang {
  margin-top: 1rem;
  display: flex;
  gap: 0.8rem;
  align-items: center;
  justify-content: center;
}

.hero-lang-label {
  font-size: 0.85rem;
  color: var(--muted);
}

.hero-lang-select {
  background: var(--dark);
  color: var(--text);
  border: 1px solid rgba(255, 255, 255, 0.06);
  padding: 0.35rem 0.6rem;
  border-radius: 6px;
}

.scroll-hint {
  position: absolute;
  bottom: 2rem;
  opacity: 0;
  animation: fadeUp 0.8s 1.2s ease forwards;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  color: var(--muted);
  font-size: 0.7rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
}

.scroll-hint::after {
  content: '';
  width: 1px;
  height: 40px;
  background: linear-gradient(to bottom, var(--gold), transparent);
  animation: pulse-line 2s ease-in-out infinite;
  display: block;
  margin: 0.5rem auto 0;
}

@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes pulse-line {
  0%, 100% {
    opacity: 0.4;
  }
  50% {
    opacity: 1;
  }
}

@media (max-width: 640px) {
  .hero {
    padding-bottom: 6rem;
  }
}
</style>
