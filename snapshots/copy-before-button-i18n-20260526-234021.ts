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
    },
    pages: {
      today: { title: "今日工作台", desc: "一天一天贴出全家的心愿，我们开心，我们关心。" },
      capture: { title: "录入入口", desc: "可以直接输入，也可以通过语音或文件识别生成内容" },
      wall: { title: "便利贴手册", desc: "管理全部便利贴：待接、已接和完成，以及每张贴的上下文。" },
      protocol: { title: "家庭接力委员会", desc: "大家按顺序接住便利贴，不公开羞辱任何人" },
      balance: { title: "家庭天平", desc: "把观察、协调、执行和兜底都记进小账本，看见分布是否倾斜。" },
      familyInfo: { title: "家庭信息", desc: "维护家庭门牌、口号和成员贴纸，所有便利贴会立刻使用新的家人数据。" }
    },
    topbar: {
      sleepGuard: "睡眠护栏",
      current: "当前",
      notSelected: "未选择",
      switchHome: "切换家庭",
      loadDemo: "灌 demo 数据",
      broadcastOn: "贴贴播报 开",
      broadcastOff: "贴贴播报 关"
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
    },
    pages: {
      today: { title: "Today Board", desc: "Small household notes, shared by everyone." },
      capture: { title: "Input Station", desc: "Type directly, or let voice and files create the draft." },
      wall: { title: "Sticky Archive", desc: "Track pending, claimed, and completed stickies with context." },
      protocol: { title: "Family Relay Board", desc: "Everyone catches stickies in order, with no public shaming." },
      balance: { title: "Family Balance", desc: "See how observing, coordinating, doing, and backing up are distributed." },
      familyInfo: { title: "Family Settings", desc: "Edit the home name, slogan, and members used across every sticky." }
    },
    topbar: {
      sleepGuard: "Sleep Guard",
      current: "Current",
      notSelected: "Not selected",
      switchHome: "Switch Home",
      loadDemo: "Load Demo",
      broadcastOn: "Sticky Broadcast On",
      broadcastOff: "Sticky Broadcast Off"
    }
  }
} as const;
