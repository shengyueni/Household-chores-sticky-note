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

const style = (html.match(/<style>([\s\S]*?)<\/style>/) || [])[1];
assert(style, "expected inline stylesheet");

const foldingRules = [
  ...style.matchAll(
    /@media\(max-width:(\d+)px\)\{([^@]*?\.shell\{grid-template-columns:1fr\}[\s\S]*?)\}/g
  ),
];

assert(foldingRules.length > 0, "expected a mobile sidebar folding rule");

for (const rule of foldingRules) {
  const breakpoint = Number(rule[1]);
  assert(
    breakpoint <= 720,
    `sidebar should only fold on phone widths, found max-width:${breakpoint}px`
  );
}

assert(
  /\.shell\{display:grid;grid-template-columns:248px minmax\(0,1fr\)/.test(style),
  "desktop layout should keep a fixed left sidebar column"
);

console.log("OK sidebar breakpoint keeps desktop/tablet left navigation");
