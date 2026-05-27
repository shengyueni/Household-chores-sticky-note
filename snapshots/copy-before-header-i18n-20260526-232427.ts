export type AppLanguage = "zh" | "en";

export const copy = {
  zh: {
    appName: "家务便利贴",
    languageLabel: "中文",
    testMessage: "贴贴已准备好",
    nav: {
      today: "今日工作台",
      capture: "录入便利贴",
      wall: "便利贴手册",
      protocol: "便利贴委员会",
      balance: "家庭天平",
      familyInfo: "家庭信息"
    }
  },
  en: {
    appName: "Chore Sticky Notes",
    languageLabel: "EN",
    testMessage: "Tiety is ready",
    nav: {
      today: "Today Board",
      capture: "Create Sticky",
      wall: "Sticky Archive",
      protocol: "Family Relay Board",
      balance: "Family Balance",
      familyInfo: "Family Settings"
    }
  }
} as const;
