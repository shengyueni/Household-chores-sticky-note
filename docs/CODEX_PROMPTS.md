# Codex 提示词速查表

> 复制粘贴即可用。每条都已包含视觉/文案铁律提示。

---

## P0 任务

### 1. 拆 HTML / CSS / JS 三文件

```
读 AGENTS.md 和 public/index.html。
把 index.html 的内联 <style> 拆到 src/styles.css，
内联 <script> 拆到 src/app.js。
index.html 用 <link rel="stylesheet"> 和 <script src> 引。
保持所有交互行为 100% 不变。
更新 CHANGELOG.md。
```

### 2. Q 版 SVG 头像

```
读 AGENTS.md 角色铁律。
当前 5 个家庭成员用 emoji（😩 🧑‍💻 👨 👴 👵）。
设计 5 个 Q 版简笔 SVG 头像 + 1 个吉祥物贴贴方块小人，
存到 assets/avatars/ 目录下，每人一个独立 .svg 文件。
风格：圆润、可爱、便利贴黄主调、手绘感。
更新 src/app.js 用 <img src> 引用。
头像位置和大小不变。
```

---

## P1 任务

### 3. 贴贴 TTS 语音播报

```
所有 vibe(text) 调用处加 Web Speech API 语音播报。
中文女声、语速稍慢、音量 0.8。
顶部加「贴贴说话 开/关」开关，默认关。
保留现有文字气泡显示。
不引入新库。
```

### 4. 升级链动画（传贴）

```
读 docs/PRD.md 第 5.2 节接棒协议升级链。
便利贴未揭超过 N 秒（demo 调到 5s），
当前推荐人头像变灰，下一候选人头像亮黄脉冲，
便利贴上的「📍XX」标签从弟过渡到爸（带过渡动画）。
日志区记录「弟今天可能在忙，便利贴贴到爸桌上啦」。
扣分：弟 -1（错过），不公开羞辱。
```

### 5. 便利贴墙拖拽 + 撕掉动画

```
便利贴墙支持鼠标拖拽排序。
认领后「揭起」动画：便利贴向上飘 + 旋转 + 渐隐，
约 0.6s 后变绿放回原位标 ✓ 已揭。
不要用红色或快速闪烁。
保留点击认领的 prompt 流程。
```

---

## P2 任务

### 6. 月度天平大会动画

```
新增「月度大会」按钮（在底部）。
点击后全屏覆盖动画：
1. 贴贴 Q 版主持镜头（中央）
2. 5 角色 Q 版逐个出场，显示本月负担分变化值
3. 改善度最高者获「家庭决策权」徽章（黄色奖牌 SVG）
4. 贴贴台词：「这个月让家最平衡的人是 XX，下次旅行去哪由 XX 定～」
风格：温柔、可爱、慢节奏。无红色。配轻铃声。
按 ESC 关闭。
```

### 7. HaiSnap Agent mock 接口

```
新建 src/agents/ 目录，mock 9 个 HaiSnap Agent：
VoiceParser / VideoExtractor / ChatExtractor / NoteExtractor /
DailyDigest / MessageClassifier / HospitalPipeline /
BatonRouter / GiniReporter

每个 Agent 一个 JS 文件，导出 async function process(input)。
内部用 setTimeout(800ms) 模拟 LLM 调用，返回预设 JSON。
src/app.js 改为通过 Agent 调用，不再硬编码。
更新 PRD 第 7.2 节标记「mock 已就位」。
（注：本次允许更新 PRD，例外授权）
```

### 8. 复诊 6 节点动画

```
复诊流水线 6 节点之间加交接动画：
节点完成时，从当前节点向下一节点飞出黄色「便利贴粒子」，
带「咻」音效（用 Web Audio API 合成短音）。
节点间 memAura 上下文气泡浮现 0.5s 后消失：
「上次复诊医生说血压偏高，本次记得带血压计」
```

---

## P3 任务

### 9. 演示模式

```
按 D 键进入演示模式：
1. 全屏，隐藏开发者元素
2. 自动按 PRD 第 10 节演示脚本顺序播放：
   - 0:00 黑屏字幕「凌晨 1:23，唐宁的购药记录」
   - 0:20 模拟群消息抽取
   - 0:40 弟揭贴
   - 1:00 复诊 6 节点动画
   - 1:40 天平变化
   - 2:10 月度大会
   - 2:30 收尾文案
3. 总时长 3 分钟，可暂停（空格）/ 上一步（左键）/ 下一步（右键）
按 ESC 退出。
```

### 10. mobile 响应式

```
当前 grid 在 1100px 以下断为单列。
进一步优化：
- 768px 以下：5 路录入按钮变 2 行
- 480px 以下：天平柱状图改横向条
- 触摸优先：所有 hover 改 tap
- 文字缩放跟视口走
保持视觉风格不变。
```

---

## 通用 Prompt 模板

### 加新功能
```
读 AGENTS.md 和 docs/PRD.md 第 X 节。
在 public/index.html（或 src/app.js）加 [功能描述]。
视觉：沿用便利贴黄风格，不引入新色。
文案：以贴贴口吻，不要冷冰冰系统语。
不引入外部库。
更新 CHANGELOG.md。
```

### 修 bug
```
[复现步骤]
[期望行为]
[实际行为]

最小改动修复，不要重构。
不要删除或简化现有功能。
```

### 改视觉
```
当前 [元素] 是 [现状]。
改成 [目标]。
保持便利贴黄主色和手写感。
不引入红色、霓虹色。
其余元素不动。
```

### 拆模块
```
src/app.js 太长。
按功能拆分到 src/modules/：
- modules/state.js（PEOPLE/SCORE 等常量 + 全局状态）
- modules/render.js（renderXXX 函数）
- modules/actions.js（用户交互 handler）
- modules/agents.js（mock Agent 调用）
其余文件不动。验证 demo 仍能跑。
```

---

## 改动后必做

- [ ] 双击 `public/index.html` 验证仍能跑
- [ ] 截图前后对比，视觉无突兀色块
- [ ] 更新 `CHANGELOG.md`
- [ ] git commit（不要 push）

---

## 禁忌清单

- ❌ 改 `docs/PRD.md`（除非明确授权）
- ❌ 改 `AGENTS.md`
- ❌ 引入红色警报、纯黑、霓虹色
- ❌ 写「逾期」「紧急」「失败」「错误」等焦虑词
- ❌ 让唐宁默认接棒
- ❌ 删除现有功能
- ❌ npm install（仅允许 CDN）
- ❌ git push 到远程
