const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const html = fs.readFileSync(path.join(root, "public", "index.html"), "utf8");

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

const menu = [
  ["today", "今日工作台"],
  ["capture", "零打字录入"],
  ["wall", "便利贴墙"],
  ["protocol", "传贴协议与复盘"],
  ["balance", "家庭天平"],
  ["care", "照护项目"],
  ["sleep", "睡眠护栏"],
  ["memory", "记忆与空间"],
  ["demo", "路演控制台"],
];

const sidebarMatch = html.match(/<aside[\s\S]*?<\/aside>/);
assert(sidebarMatch, "expected a left sidebar <aside> for product navigation");

const sidebar = sidebarMatch[0];
for (const [id, label] of menu) {
  assert(sidebar.includes(label), `missing sidebar menu item: ${label}`);
  assert(sidebar.includes(`data-target="${id}"`), `missing data-target for ${label}`);
  assert(html.includes(`data-section="${id}"`), `missing content section for ${label}`);
}

assert(
  /data-section="today"[\s\S]{0,120}section-active/.test(html) ||
    /section-active[\s\S]{0,120}data-section="today"/.test(html),
  "today dashboard should be the default active section"
);

const requiredWidgets = [
  "taskWall",
  "bars",
  "pipeline",
  "review",
  "route",
  "demoBtn",
  "seedBtn",
  "nextBtn",
];

for (const id of requiredWidgets) {
  assert(html.includes(`id="${id}"`), `existing demo widget should be preserved: ${id}`);
}

console.log("OK product sidebar structure");
