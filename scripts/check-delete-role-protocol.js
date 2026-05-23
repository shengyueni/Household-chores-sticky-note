const fs = require("fs");
const path = require("path");

const html = fs.readFileSync(
  path.resolve(__dirname, "..", "public", "index.html"),
  "utf8"
);

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

assert(html.includes("data-delete="), "each sticky note should expose a delete action");
assert(html.includes("function deleteTask"), "deleteTask handler should exist");
assert(!html.includes("爸爸"), "the Dad role should be removed from the page");
assert(html.includes("唐母（林女士）"), "Dad role should be replaced by 唐母（林女士）");
assert(html.includes("唐小鸭（唐弟）"), "route should name 唐小鸭（唐弟）");
assert(html.includes("周勉（丈夫）"), "route should name 周勉（丈夫）");
assert(html.includes('data-section="protocol"'), "protocol and review should be merged into one page");
assert(!html.includes('data-section="baton"'), "old standalone baton page should be removed");
assert(!html.includes('data-section="review"'), "old standalone review page should be removed");
assert(html.includes("更新协议"), "merged protocol page should include an update protocol button");
assert(
  html.includes('["brother","husband","tangning"]'),
  "default transfer route should be 唐小鸭 -> 周勉 -> 唐宁"
);

console.log("OK delete action, role replacement, route, and merged protocol page");
