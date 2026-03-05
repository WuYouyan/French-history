import { createI18n } from 'vue-i18n'
import zh from '../../resources/locales/zh.js'

const i18n = createI18n({
  legacy: false,
  locale: 'zh',
  fallbackLocale: 'fr',
  messages: {
    zh
  }
})

/**
 * 加载并切换语言
 * @param {string} locale - 语言代码，如 'zh' | 'fr'
 */
export async function loadLocaleMessages(locale) {
  if (i18n.global.availableLocales.includes(locale)) {
    i18n.global.locale.value = locale
    return
  }

  try {
    const mod = await import(`../../resources/locales/${locale}.js`)
    i18n.global.setLocaleMessage(locale, mod.default)
    i18n.global.locale.value = locale
  } catch (err) {
    console.error(`[i18n] Failed to load locale "${locale}"`, err)
  }
}

/**
 * 获取当前语言
 * @returns {string}
 */
export function getLocale() {
  return i18n.global.locale.value
}

/**
 * 设置当前语言（懒加载并切换）
 * @param {string} locale - 语言代码
 */
export async function setLocale(locale) {
  await loadLocaleMessages(locale)
}

/**
 * 获取已加载的语言列表
 * @returns {string[]}
 */
export function getAvailableLocales() {
  return i18n.global.availableLocales
}

export default i18n
