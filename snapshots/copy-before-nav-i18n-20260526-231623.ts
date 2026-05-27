export type AppLanguage = "zh" | "en";

export const copy = {
  zh: {
    appName: "家务便利贴",
    languageLabel: "中文",
    testMessage: "贴贴已准备好"
  },
  en: {
    appName: "Chore Sticky Notes",
    languageLabel: "EN",
    testMessage: "Tiety is ready"
  }
} as const;
