export type AppLanguage = "zh" | "en";

export const copy = {
  zh: {
    appName: "家务便利贴",
    appSubtitle: "家庭分工工作台",
    appIntro: "把家里的小事，变成大家一起接住的便利贴。",
    demoHomeButton: "进入 唐宁in the house",
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
      sleepGuardShort: "睡眠护栏",
      protectSleep: "设为睡眠护栏守护",
      sleepProtected: "睡眠护栏守护中",
      skippedAtNight: "夜间跳过",
      morningQueue: "明早队列",
      allSleepProtected: "所有成员都在睡眠护栏中，贴贴已进入明早队列",
      doNotDisturb: "夜间优先不打扰这些成员",
      relayChoiceRequired: "请先选择一个可以接力的成员",
      current: "当前",
      notSelected: "未选择",
      switchHome: "切换家庭",
      loadDemo: "灌 demo 数据",
      broadcastOn: "贴贴播报 开",
      broadcastOff: "贴贴播报 关"
    },
    buttons: {
      claim: "我来吧",
      askHelp: "请帮忙",
      markDone: "确认完成",
      parse: "让贴贴解析",
      saveInfo: "保存信息",
      saved: "已保存",
      pendingSave: "待保存",
      changeAvatar: "更换形象",
      addMember: "添加成员",
      remove: "删除成员",
      updateRules: "更新协议",
      cancel: "取消",
      confirmChange: "确认更换"
    },
    ui: {
      common: {
        emptyMembers: "还没有家庭成员，先去家庭信息里添加吧。",
        relationFallback: "家人",
        noAssignee: "未指派",
        stickyUnit: "张便利贴",
        balanceLabel: "天平",
        scoreUnit: "分",
        noCurrentRole: "请先选择当前角色",
        types: {
          observe: "观察",
          coordinate: "协调",
          do: "执行",
          backup: "兜底"
        }
      },
      modals: {
        task: {
          title: "贴一张便利贴",
          titleLabel: "事情",
          sourceLabel: "来源",
          typeLabel: "劳动类型",
          noticeByLabel: "谁发现的",
          ownerLabel: "指派给",
          save: "贴上",
          sources: ["语音", "群截图", "视频", "OCR", "手动"],
          types: ["观察", "协调", "执行", "兜底"]
        },
        protocol: {
          title: "更新请帮忙协议",
          desc: "拖拽下面的名字调整顺序，排在前面的人会先收到新便利贴。",
          order: "顺序 {n}",
          drag: "拖拽",
          save: "保存协议"
        },
        transfer: {
          title: "请家人帮忙",
          sticky: "便利贴",
          member: "请谁接一下",
          desc: "贴贴会温柔传贴，不公开比较谁快谁慢。",
          send: "贴过去"
        },
        switchFamily: {
          title: "返回家庭入口？",
          desc: "当前家庭数据已保存在本地，返回后可以重新进入或创建新的家庭空间。",
          returnHome: "返回首页"
        },
        role: {
          title: "切换当前操作角色",
          switch: "切换"
        },
        deleteMember: {
          title: "删除家庭成员？",
          defaultText: "该成员关联的便利贴将改为未指派。",
          removeText: "这位成员会从家庭成员列表里移除。",
          relatedText: "该成员关联的 {count} 张便利贴将改为未指派。",
          confirm: "确认删除"
        },
        wish: {
          title: "修改心愿",
          member: "家人",
          wish: "心愿",
          save: "保存心愿"
        },
        proof: {
          title: "确认完成",
          sticky: "便利贴",
          upload: "凭证图片 / 文件（可选）",
          note: "凭证说明",
          notePlaceholder: "也可以放语音转文字后的说明；不填也能确认完成",
          desc: "确认后，这张便利贴会进入“便利贴手册”，保留 14 天。"
        },
        avatar: {
          title: "更换人物形象",
          previewAlt: "人物形象预览",
          prev: "上一个",
          next: "下一个",
          index: "当前形象 {current} / {total}"
        }
      },
      today: {
        tipTitle: "贴贴温馨提示",
        sampleMeds: "贴一张药品便利贴",
        defaultNext: "家人说“小事快见底了”。贴贴会先找最顺路的人接住。",
        deviceName: "Seeed 单屏 · 客厅常驻",
        sleepOn: "睡眠护栏中",
        deviceTitle: "家人的便利贴",
        deviceMeta: "推荐：等待家庭成员 · ETA 今天 · memAura 会记住上下文",
        sleepTitle: "睡眠护栏",
        sleepQueue: "事情进入明早队列",
        sleepNoRelay: "添加更多家庭成员后，可以开启夜间接力。",
        sleepNone: "暂无夜间接力对象",
        sleepHelper: "接棒候选人",
        sleepMorning: "明早统一提醒",
        pendingTitle: "今日待接便利贴",
        pendingKicker: "待接、已接、请帮忙都在这里看",
        balanceTitle: "家庭天平摘要",
        balanceKicker: "不审判，只看见分布",
        noPending: "今天还没有待接便利贴。<br>点“灌 demo 数据”或去录入一张。",
        suggestPack: "建议 {name} 包了",
        defaultTaskLine: "{care}说“降压药快见底了”。贴贴建议先传给{first}，{next}作为下一棒。",
        quietQueue: "{name}端静默，事情进入明早队列",
        nightTo: "夜间推给{name}",
        protectedButIncluded: "{name}被保护，但不是被排除"
      },
      capture: {
        title: "录入入口",
        kicker: "可以直接输入，也可以通过语音或文件识别生成内容",
        voiceTitle: "说出来，贴贴帮你记",
        voiceDesc: "语音识别后会填入下方草稿区，还能继续手动修改",
        fileTitle: "上传截图/照片/文档",
        fileDesc: "识别结果会填入下方草稿区，再由你确认生成便利贴",
        contentLabel: "便利贴内容",
        defaultDraft: "家里有件小事，明早需要有人顺手接一下。",
        ownerLabel: "指派给",
        emptyDraft: "先写点内容，或者用语音/文件录入。",
        listening: "正在听你说话……",
        notHeard: "没有听清楚。你可以再点一次语音录入，或直接输入文字。",
        unsupported: "当前浏览器不支持语音识别。可以直接在下方输入文字，或换 Chrome/Edge 打开后再试。"
      },
      wall: {
        waitingTitle: "贴贴等待中",
        doneTitle: "贴贴已完成",
        activeSummary: "{total} 张处理中 · {pending} 张待接 · {claimed} 张已接",
        doneSummary: "{done} 张已完成 · 保留 14 天",
        emptyActive: "贴贴在等待你的便利贴。<br>点击页面左侧录入便利贴",
        emptyDone: "手册里还没有已完成的便利贴。<br>确认完成后，贴贴会把它收进这里。",
        sampleMeds: "药品",
        sampleHospital: "复诊",
        sampleGas: "燃气",
        suggest: "建议",
        relay: "接力",
        done: "完成",
        completed: "已完成"
      },
      protocol: {
        committeeTitle: "家庭接力委员会",
        subtitle: "大家按顺序接住便利贴，不公开羞辱任何人",
        updated: "上次修改：{time}",
        neverUpdated: "尚未修改",
        routeTitle: "当前接力顺序",
        statusTitle: "成员接力状态",
        rulesTitle: "请帮忙规则",
        reviewTitle: "今日复盘卡",
        reviewKicker: "不打卡，只做减法确认",
        reviewButton: "生成复盘",
        wishTitle: "心愿池",
        wishKicker: "奖励改善分布的人",
        statusCurrent: "当前角色",
        statusQueued: "接力队列中",
        statusStandby: "待命中",
        rules: ["按家庭成员顺序依次请帮忙", "无人接住时进入明早队列", "夜间优先保护睡眠护栏"],
        reviewEmpty: "还没有家庭成员，先去家庭信息里添加吧。",
        reviewSummary: "贴贴帮你回忆今天：{done}/{total} 张便利贴已经被接住。",
        reviewSelfZero: "{name}今天自己揭了 0 张。夜里那几张都被挡在护栏外。",
        reviewSelfSome: "{name}今天自己揭了 {count} 张。下一轮试着让别人先接一张。",
        balanceStable: "家里的天平现在是 {value}。比开场稳了一点。",
        balanceTilted: "家里的天平现在是 {value}。还在倾斜，但已经被看见了。"
      },
      balance: {
        loadTitle: "负担分布",
        ledgerTitle: "小账本",
        ledgerKicker: "观察 +1 / 协调 +2 / 执行 +3 / 兜底 +5",
        meter: "家里的天平",
        noLedgerTitle: "还没有家庭成员",
        noLedgerHint: "先去家庭信息里添加吧",
        stable: "稳了一点",
        tilted: "还在倾斜"
      },
      familyInfo: {
        doorTitle: "家庭门牌",
        doorKicker: "只保存在这台设备，不需要账号",
        saveFamily: "保存家庭信息",
        nameLabel: "家庭名称",
        sloganLabel: "家庭口号",
        memberTitle: "家庭成员列表",
        memberKicker: "称呼、关系和像素小人形象都能改",
        nameField: "称呼",
        relationField: "关系",
        newMember: "新成员"
      },
      demo: {
        ready: "准备好了。按“走一遍路演”，30 秒看完整条产品链。",
        done: "路演链路结束：录入、请帮忙、睡眠护栏、复诊流水线、复盘都跑通了。",
        captions: ["睡眠护栏先保护{name}。", "录入便利贴生成便利贴。", "请帮忙协议解释推荐逻辑。", "便利贴被接住，天平变化。", "照护项目拆成 6 个节点。", "复盘与月度会形成闭环。"]
      }
    }
  },
  en: {
    appName: "Chore Stickies",
    appSubtitle: "Family workspace",
    appIntro: "Turn small household things into stickies everyone can catch.",
    demoHomeButton: "Enter Tang's House",
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
      sleepGuardShort: "Sleep Guard",
      protectSleep: "Protect sleep",
      sleepProtected: "Sleep protected",
      skippedAtNight: "Skipped at night",
      morningQueue: "Morning queue",
      allSleepProtected: "Everyone is sleep protected. Sticky moved to the morning queue.",
      doNotDisturb: "Do not disturb these members at night",
      relayChoiceRequired: "Please choose someone who can take the relay",
      current: "Current",
      notSelected: "Not selected",
      switchHome: "Switch Home",
      loadDemo: "Load Demo",
      broadcastOn: "Sticky Broadcast On",
      broadcastOff: "Sticky Broadcast Off"
    },
    buttons: {
      claim: "I'll take it",
      askHelp: "Ask for help",
      markDone: "Mark done",
      parse: "Let Sticky parse",
      saveInfo: "Save",
      saved: "Saved",
      pendingSave: "Unsaved",
      changeAvatar: "Change avatar",
      addMember: "Add member",
      remove: "Remove",
      updateRules: "Update rules",
      cancel: "Cancel",
      confirmChange: "Confirm"
    },
    ui: {
      common: {
        emptyMembers: "No family members yet. Add them in Family Settings first.",
        relationFallback: "Family",
        noAssignee: "Unassigned",
        stickyUnit: "stickies",
        balanceLabel: "Balance",
        scoreUnit: "pts",
        noCurrentRole: "Choose a current role first",
        types: {
          observe: "Observe",
          coordinate: "Coordinate",
          do: "Do",
          backup: "Backup"
        }
      },
      modals: {
        task: {
          title: "Add a sticky",
          titleLabel: "Thing",
          sourceLabel: "Source",
          typeLabel: "Labor type",
          noticeByLabel: "Who noticed it?",
          ownerLabel: "Assign to",
          save: "Stick it",
          sources: ["Voice", "Group screenshot", "Video", "OCR", "Manual"],
          types: ["Observe", "Coordinate", "Do", "Backup"]
        },
        protocol: {
          title: "Update relay rules",
          desc: "Drag names to adjust the order. Members at the front will receive new stickies first.",
          order: "Order {n}",
          drag: "Drag",
          save: "Save rules"
        },
        transfer: {
          title: "Ask for help",
          sticky: "Sticky",
          member: "Who should take it?",
          desc: "Sticky will pass it gently without ranking anyone.",
          send: "Send over"
        },
        switchFamily: {
          title: "Return to home entrance?",
          desc: "Current family data is saved locally. You can return and continue or create a new family space.",
          returnHome: "Return home"
        },
        role: {
          title: "Switch current role",
          switch: "Switch"
        },
        deleteMember: {
          title: "Remove family member?",
          defaultText: "Related stickies will become unassigned.",
          removeText: "This member will be removed from the family list.",
          relatedText: "{count} related stickies will become unassigned.",
          confirm: "Remove"
        },
        wish: {
          title: "Edit wish",
          member: "Member",
          wish: "Wish",
          save: "Save wish"
        },
        proof: {
          title: "Mark done",
          sticky: "Sticky",
          upload: "Proof image / file (optional)",
          note: "Proof note",
          notePlaceholder: "You can add a note here. This is optional.",
          desc: "After confirmation, this sticky will move to Sticky Archive and stay for 14 days."
        },
        avatar: {
          title: "Change avatar",
          previewAlt: "Avatar preview",
          prev: "Previous",
          next: "Next",
          index: "Current avatar {current} / {total}"
        }
      },
      today: {
        tipTitle: "Sticky Tip",
        sampleMeds: "Add a medicine sticky",
        defaultNext: "A small household note is waiting. Sticky will find the nearest helper first.",
        deviceName: "Seeed Screen · Living Room",
        sleepOn: "Sleep Guard on",
        deviceTitle: "Family sticky",
        deviceMeta: "Suggested: waiting for members · ETA today · memAura keeps context",
        sleepTitle: "Sleep Guard",
        sleepQueue: "This goes into tomorrow morning's queue",
        sleepNoRelay: "Add more family members to enable night handoff.",
        sleepNone: "No night handoff yet",
        sleepHelper: "Handoff candidates",
        sleepMorning: "Morning reminder",
        pendingTitle: "Pending Stickies",
        pendingKicker: "Pending, claimed, and help requests stay here",
        balanceTitle: "Balance Snapshot",
        balanceKicker: "No judging, just seeing the distribution",
        noPending: "No pending stickies today.<br>Load demo data or create one.",
        suggestPack: "Suggested: {name}",
        defaultTaskLine: "{care} says the medicine is running low. Sticky suggests {first} first, with {next} next.",
        quietQueue: "{name} stays quiet at night; this moves to tomorrow morning.",
        nightTo: "Night handoff to {name}",
        protectedButIncluded: "{name} is protected, not excluded"
      },
      capture: {
        title: "Input Station",
        kicker: "Type directly, or let voice and files create the draft.",
        voiceTitle: "Say it, Sticky writes it",
        voiceDesc: "Speech results land in the draft so you can edit them",
        fileTitle: "Upload image / photo / document",
        fileDesc: "Recognition results land below before creating a sticky",
        contentLabel: "Sticky content",
        defaultDraft: "There’s a small thing at home that someone can pick up tomorrow morning.",
        ownerLabel: "Assign to",
        emptyDraft: "Write something first, or use voice/file input.",
        listening: "Listening…",
        notHeard: "Sticky did not catch that. Try voice again or type directly.",
        unsupported: "This browser does not support speech recognition. You can type below or try Chrome/Edge."
      },
      wall: {
        waitingTitle: "Waiting Stickies",
        doneTitle: "Completed Stickies",
        activeSummary: "{total} active · {pending} pending · {claimed} claimed",
        doneSummary: "{done} completed · kept for 14 days",
        emptyActive: "Sticky is waiting for your first note.<br>Use Create Sticky from the left.",
        emptyDone: "No completed stickies yet.<br>Marked items will be collected here.",
        sampleMeds: "Medicine",
        sampleHospital: "Clinic",
        sampleGas: "Gas",
        suggest: "Suggest",
        relay: "Relay",
        done: "Done",
        completed: "Completed"
      },
      protocol: {
        committeeTitle: "Family Relay Board",
        subtitle: "Everyone catches stickies in order, with no public shaming",
        updated: "Last updated: {time}",
        neverUpdated: "not updated yet",
        routeTitle: "Current relay order",
        statusTitle: "Relay status",
        rulesTitle: "Help rules",
        reviewTitle: "Daily Review",
        reviewKicker: "No check-ins, just a light review",
        reviewButton: "Generate review",
        wishTitle: "Wish Pool",
        wishKicker: "Rewards people who improve the distribution",
        statusCurrent: "Current role",
        statusQueued: "In relay queue",
        statusStandby: "Standing by",
        rules: ["Ask for help in family order", "If nobody catches it, move it to tomorrow morning", "At night, protect the Sleep Guard first"],
        reviewEmpty: "No family members yet. Add them in Family Settings first.",
        reviewSummary: "Sticky recalls today: {done}/{total} stickies have been caught.",
        reviewSelfZero: "{name} caught 0 stickies alone today. The night ones stayed outside the guardrail.",
        reviewSelfSome: "{name} caught {count} stickies alone today. Next round, let someone else catch one first.",
        balanceStable: "The family balance is {value}. It is steadier than at the start.",
        balanceTilted: "The family balance is {value}. It still tilts, but now it is visible."
      },
      balance: {
        loadTitle: "Load Distribution",
        ledgerTitle: "Ledger",
        ledgerKicker: "Observe +1 / Coordinate +2 / Do +3 / Backup +5",
        meter: "Family balance",
        noLedgerTitle: "No family members yet",
        noLedgerHint: "Add them in Family Settings first",
        stable: "steadier",
        tilted: "still tilted"
      },
      familyInfo: {
        doorTitle: "Home Sign",
        doorKicker: "Saved only on this device, no account needed",
        saveFamily: "Save family",
        nameLabel: "Family name",
        sloganLabel: "Family slogan",
        memberTitle: "Family Members",
        memberKicker: "Edit names, relationships, and pixel avatars",
        nameField: "Name",
        relationField: "Relationship",
        newMember: "New member"
      },
      demo: {
        ready: "Ready. Run the demo path to see the full loop in 30 seconds.",
        done: "Demo path complete: input, help request, Sleep Guard, clinic pipeline, and review all ran.",
        captions: ["Sleep Guard protects {name} first.", "Input creates a sticky.", "Help rules explain the recommendation.", "A sticky is caught and the balance changes.", "The clinic visit splits into 6 nodes.", "Review and monthly meeting close the loop."]
      }
    }
  }
} as const;
