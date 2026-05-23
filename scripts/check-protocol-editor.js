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

assert(html.includes('id="protocolModal"'), "missing protocol editor modal");
assert(html.includes('id="protocolOrder"'), "missing draggable order list");
assert(html.includes('id="protocolUpdatedAt"'), "missing protocol updated timestamp");
assert(html.includes('draggable="true"'), "protocol names should be draggable");
assert(html.includes("function openProtocolModal"), "missing openProtocolModal handler");
assert(html.includes("function saveProtocolOrder"), "missing saveProtocolOrder handler");
assert(html.includes("function renderProtocolEditor"), "missing protocol editor renderer");
assert(html.includes("dragstart"), "protocol editor should wire dragstart");
assert(html.includes("drop"), "protocol editor should wire drop");
assert(html.includes('$("updateProtocolBtn").onclick=openProtocolModal'), "update button should open modal");
assert(html.includes("label.textContent=state.protocolRoute.map"), "current route label should follow saved order");

console.log("OK protocol editor modal, drag ordering, and timestamp");
