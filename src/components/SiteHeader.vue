<template>
  <header
    id="siteHeader"
    :class="['site-header', { visible: visible }]"
    :aria-hidden="!visible"
  >
    <div class="title">{{ $t('site.title') }}</div>
    <div class="header-actions">
      <!-- 背诵模式：总开关 + 展开的子选项 -->
      <div class="revision-wrap" :class="{ expanded: prefs.revisionActive }">
        <div class="revision-toggle">
          <button
            type="button"
            class="revision-switch"
            :class="{ on: prefs.revisionActive }"
            :aria-pressed="prefs.revisionActive"
            :aria-label="$t('revision.label')"
            @click="prefs.revisionActive = !prefs.revisionActive"
          >
            <span class="revision-switch-track">
              <span class="revision-switch-thumb"></span>
            </span>
            <span class="revision-label">{{ $t('revision.label') }}</span>
          </button>
        </div>
        <Transition name="revision-options">
          <div v-if="prefs.revisionActive" class="revision-options">
            <label class="revision-option">
              <input
                type="checkbox"
                v-model="prefs.revisionHideTime"
                class="revision-checkbox"
              />
              <span class="revision-option-text">{{ $t('revision.hideTime') }}</span>
            </label>
            <label class="revision-option">
              <input
                type="checkbox"
                v-model="prefs.revisionBlurEventCard"
                class="revision-checkbox"
              />
              <span class="revision-option-text">{{ $t('revision.blurCard') }}</span>
            </label>
          </div>
        </Transition>
      </div>
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
    </div>
  </header>
</template>

<script setup>
import { computed } from 'vue'
import { historyPreferenceService } from '../services/historyPreferenceService'

const props = defineProps({
  visible: { type: Boolean, default: false },
  lang: { type: String, default: 'zh' }
})

const emit = defineEmits(['update:lang'])

const currentLang = computed({
  get: () => props.lang,
  set: (v) => emit('update:lang', v)
})

const prefs = historyPreferenceService.state
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

.header-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.revision-wrap {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.revision-toggle {
  display: flex;
  align-items: center;
}

.revision-switch {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: none;
  border: none;
  color: var(--text);
  cursor: pointer;
  padding: 0.25rem 0;
  font-size: 0.85rem;
  border-radius: 6px;
  transition: color 0.2s ease;
}

.revision-switch:hover {
  color: var(--blanc);
}

.revision-switch-track {
  position: relative;
  width: 36px;
  height: 20px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.08);
  transition: background 0.25s ease, border-color 0.25s ease;
  flex-shrink: 0;
}

.revision-switch.on .revision-switch-track {
  background: rgba(201, 168, 76, 0.25);
  border-color: rgba(201, 168, 76, 0.4);
}

.revision-switch-thumb {
  position: absolute;
  top: 2px;
  left: 2px;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: var(--muted);
  transition: transform 0.25s ease, background 0.25s ease;
}

.revision-switch.on .revision-switch-thumb {
  transform: translateX(16px);
  background: var(--gold);
}

.revision-label {
  white-space: nowrap;
}

.revision-options {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding-left: 0.5rem;
  border-left: 1px solid rgba(255, 255, 255, 0.08);
}

.revision-options-enter-active,
.revision-options-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.revision-options-enter-from,
.revision-options-leave-to {
  opacity: 0;
  transform: translateX(-4px);
}

.revision-option {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  cursor: pointer;
  font-size: 0.78rem;
  color: var(--muted);
  white-space: nowrap;
}

.revision-option:hover {
  color: var(--text);
}

.revision-checkbox {
  width: 14px;
  height: 14px;
  accent-color: var(--gold);
  cursor: pointer;
}

.revision-option-text {
  font-weight: 500;
}

.revision-option-hint {
  opacity: 0.85;
  font-size: 0.72rem;
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
