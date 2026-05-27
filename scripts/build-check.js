const fs = require("fs");
const path = require("path");

const indexPath = path.join(__dirname, "..", "public", "index.html");
const html = fs.readFileSync(indexPath, "utf8");

const requiredMarkers = [
  'id="welcomeFlow"',
  'id="createFamilyBtn"',
  'id="enterDemoHomeBtn"',
  'id="currentRoleBtn"',
  'id="switchFamilyBtn"',
  'id="familyMemberEditor"',
  'id="quickOwner"',
  'id="taskOwner"',
  'id="transferModal"',
  'id="roleModal"',
  'id="switchFamilyModal"',
  "localStorage",
  "familySpace",
  "stickyNotes",
  "currentMemberId"
];

const missing = requiredMarkers.filter((marker) => !html.includes(marker));
if (missing.length) {
  throw new Error(`Missing expected page markers: ${missing.join(", ")}`);
}

const scripts = [...html.matchAll(/<script>([\s\S]*?)<\/script>/gi)].map((match) => match[1]);
if (!scripts.length) {
  throw new Error("No inline script found in public/index.html");
}

for (const script of scripts) {
  // Parse only; the browser provides document, localStorage, and speech APIs at runtime.
  new Function(script);
}

console.log("Build check passed: public/index.html is present and scripts parse.");
