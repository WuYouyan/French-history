import { reactive } from 'vue'

const STORAGE_KEY = 'french-history-preferences'

const defaultPrefs = {
  /** 背诵模式总开关：为 true 时启用时间/事件内容的显示控制，便于自测 */
  revisionActive: false,
  /** 背诵模式下是否隐藏时间（event-year、era-label），便于先回忆再对照 */
  revisionHideTime: true,
  /** 背诵模式下是否将 event-card 模糊，点击后显示，便于先回忆再对照 */
  revisionBlurEventCard: true
}

function loadFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return { ...defaultPrefs }
    const parsed = JSON.parse(raw)
    return {
      ...defaultPrefs,
      ...parsed,
      revisionActive: !!parsed.revisionActive,
      revisionHideTime: parsed.revisionHideTime !== false,
      revisionBlurEventCard: parsed.revisionBlurEventCard !== false
    }
  } catch {
    return { ...defaultPrefs }
  }
}

const state = reactive(loadFromStorage())

/** 持久化到 localStorage，由 App.vue 在 watch 中调用 */
export function persistPreferences() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...state }))
  } catch (e) {
    console.warn('[HistoryPreference] persist failed', e)
  }
}

/**
 * 用户偏好：背诵模式及子选项，持久化到 localStorage
 */
export const historyPreferenceService = {
  get state() {
    return state
  },

  get revisionActive() {
    return state.revisionActive
  },

  set revisionActive(v) {
    state.revisionActive = !!v
  },

  get revisionHideTime() {
    return state.revisionHideTime
  },

  set revisionHideTime(v) {
    state.revisionHideTime = !!v
  },

  get revisionBlurEventCard() {
    return state.revisionBlurEventCard
  },

  set revisionBlurEventCard(v) {
    state.revisionBlurEventCard = !!v
  },

  /** 是否应在当前显示中隐藏时间（仅在 revisionActive 时生效） */
  get shouldHideTime() {
    return state.revisionActive && state.revisionHideTime
  },

  /** 是否应将 event-card 模糊（仅在 revisionActive 时生效） */
  get shouldBlurEventCard() {
    return state.revisionActive && state.revisionBlurEventCard
  },

  reset() {
    Object.assign(state, defaultPrefs)
  }
}

export default historyPreferenceService
