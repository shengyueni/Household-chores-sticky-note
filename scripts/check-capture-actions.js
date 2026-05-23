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

const requiredInputs = [
  ['id="chatUpload"', 'accept="image/*"'],
  ['id="videoUpload"', 'accept="video/*"'],
  ['id="ocrUpload"', 'accept="image/*,.pdf"'],
];

for (const [id, accept] of requiredInputs) {
  assert(html.includes(id), `missing upload input ${id}`);
  assert(html.includes(accept), `missing expected accept filter ${accept}`);
}

assert(html.includes('id="captureResult"'), "missing capture result panel");
assert(html.includes("function toggleVoiceCapture"), "missing voice capture handler");
assert(html.includes("webkitSpeechRecognition"), "voice handler should use Web Speech API");
assert(html.includes("function handleCaptureFile"), "missing upload file handler");
assert(html.includes("function createTaskFromRecognizedText"), "missing recognized text to task flow");

const directOpenModalPattern =
  /document\.querySelectorAll\("\[data-cap\]"\)[\s\S]*?openModal\(p\)/;
assert(
  !directOpenModalPattern.test(html),
  "capture buttons should not only open static preset modals"
);

console.log("OK capture actions are wired to voice and upload flows");
