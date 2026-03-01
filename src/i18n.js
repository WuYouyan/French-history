import { createI18n } from 'vue-i18n'

const messages = {
  zh: {
    site: {
      title: '法国历史',
      langLabel: '语言',
      langAria: '选择语言'
    },
    hero: {
      label: '公民手册',
      title: '法国历史',
      subtitle: '大事年表',
      subline: '从史前时代到当代欧洲',
      langLabel: '语言',
      langAria: '选择语言',
      scrollHint: '向下滚动'
    },
    footer: {
      motto: '自由 · 平等 · 博爱',
      credit: '根据法国内政部《公民手册》(Livret du Citoyen, Février 2022) 整理'
    }
  },
  fr: {
    site: {
      title: 'Histoire de la France',
      langLabel: 'Langue',
      langAria: 'Choisir la langue'
    },
    hero: {
      label: 'Livret du Citoyen',
      title: 'Histoire de la France',
      subtitle: 'Chronologie des grands événements',
      subline: "De la préhistoire à l'Europe contemporaine",
      langLabel: 'Langue',
      langAria: 'Choisir la langue',
      scrollHint: 'Faire défiler'
    },
    footer: {
      motto: 'Liberté · Égalité · Fraternité',
      credit: "D'après le « Livret du Citoyen » du ministère de l’Intérieur (février 2022)"
    }
  }
}

const i18n = createI18n({
  legacy: false,
  locale: 'zh',
  fallbackLocale: 'fr',
  messages
})

export default i18n

