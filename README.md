# 家务便利贴 / Chore Stickies

一个本地优先的家庭家务协作 Demo。  
A local-first demo for coordinating household chores and care work.

---

## 中文

### 项目简介

家务便利贴把家里的小事做成“便利贴”，通过家庭成员、当前角色、请帮忙接力、睡眠护栏和家庭天平，帮助家庭看见并分担日常家务与照护劳动。

当前项目是前端本地 Demo，不包含账号系统、后端数据库、邀请链接或多人实时同步。数据保存在浏览器 `localStorage` 中。

### 功能列表

- 家庭空间初始化：首次进入可创建家庭空间，配置家庭名称、口号和成员。
- Demo 小家：提供中文和英文 Demo 数据。
- 成员管理：编辑成员称呼、关系、像素头像，支持添加和删除成员。
- 睡眠护栏：可为成员设置夜间不优先接收便利贴。
- 当前角色：切换当前操作成员，用于揭贴、请帮忙和确认完成。
- 便利贴录入：支持直接输入、浏览器语音识别和文件上传模拟识别。
- 便利贴手册：查看待处理、接力中和已完成的便利贴。
- 家庭接力委员会：展示接力顺序、成员状态和请帮忙规则。
- 家庭天平：根据便利贴行为统计家庭小账本和负担分布。
- 中英文切换：支持中文 / English 界面切换。
- 本地保存：使用 `localStorage` 保存 `familySpace`、`stickyNotes`、`currentMemberId` 和 `appLanguage`。

### 安装步骤

项目不依赖后端服务。运行本地脚本需要 Node.js。

```bash
git clone <repository-url>
cd jiawu-bianliti
npm install
```

如果只需要查看静态页面，也可以直接打开 `public/index.html`。

### 本地运行方法

启动本地预览服务：

```bash
npm run preview
```

然后在浏览器打开：

```text
http://127.0.0.1:5173/
```

运行构建检查：

```bash
npm run build
```

重新生成小尺寸头像素材：

```bash
npm run generate:heads
```

### 项目结构

```text
jiawu-bianliti/
├── public/
│   ├── index.html
│   └── assets/
├── scripts/
│   ├── build-check.js
│   ├── preview-server.js
│   └── generate-character-heads.js
├── src/
│   └── i18n/
├── assets/
├── docs/
├── package.json
└── README.md
```

### 技术栈

- HTML
- CSS
- JavaScript
- `localStorage`
- Web Speech API（取决于浏览器支持）
- Node.js 脚本

---

## English

### Project Overview

Chore Stickies turns small household tasks into “stickies.” It uses family members, a current role, relay-based help requests, Sleep Guard, and Family Balance to make everyday chores and care work easier to see and share.

This project is a local front-end demo. It does not include user accounts, a backend database, invite links, or real-time multi-user sync. Data is stored in the browser with `localStorage`.

### Features

- Home space setup: create a family space with a name, slogan, and members.
- Demo home: includes Chinese and English demo data.
- Member management: edit member names, relationships, pixel avatars, add members, and remove members.
- Sleep Guard: mark members as protected from being prioritized at night.
- Current role: switch the active member used for claiming, asking for help, and marking stickies done.
- Sticky input: supports direct text input, browser speech recognition, and simulated file recognition.
- Sticky archive: view pending, relayed, and completed stickies.
- Family Relay Board: shows relay order, member status, and help-request rules.
- Family Balance: summarizes household ledger points and workload distribution.
- Language switching: supports Chinese and English UI.
- Local persistence: stores `familySpace`, `stickyNotes`, `currentMemberId`, and `appLanguage` in `localStorage`.

### Installation

The project does not require a backend service. Node.js is needed for the local scripts.

```bash
git clone <repository-url>
cd jiawu-bianliti
npm install
```

If you only want to view the static page, you can open `public/index.html` directly.

### Local Development

Start the local preview server:

```bash
npm run preview
```

Then open:

```text
http://127.0.0.1:5173/
```

Run the build check:

```bash
npm run build
```

Regenerate small avatar assets:

```bash
npm run generate:heads
```

### Project Structure

```text
jiawu-bianliti/
├── public/
│   ├── index.html
│   └── assets/
├── scripts/
│   ├── build-check.js
│   ├── preview-server.js
│   └── generate-character-heads.js
├── src/
│   └── i18n/
├── assets/
├── docs/
├── package.json
└── README.md
```

### Tech Stack

- HTML
- CSS
- JavaScript
- `localStorage`
- Web Speech API, depending on browser support
- Node.js scripts
