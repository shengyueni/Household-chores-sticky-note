const fs = require("fs");
const path = require("path");
const zlib = require("zlib");

const transparentDir = path.join(__dirname, "..", "public", "assets", "character-transparent");
const bodyDir = path.join(__dirname, "..", "public", "assets", "character");
const outputDir = path.join(__dirname, "..", "public", "assets", "character-heads");
const ids = Array.from({ length: 14 }, (_, index) => `b${String(index + 1).padStart(2, "0")}`);
const pngSignature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
const crcTable = new Uint32Array(256);

for (let n = 0; n < 256; n += 1) {
  let c = n;
  for (let k = 0; k < 8; k += 1) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
  crcTable[n] = c >>> 0;
}

function crc32(buffer) {
  let c = 0xffffffff;
  for (let i = 0; i < buffer.length; i += 1) c = crcTable[(c ^ buffer[i]) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}

function chunk(type, data) {
  const typeBuffer = Buffer.from(type, "ascii");
  const out = Buffer.alloc(12 + data.length);
  out.writeUInt32BE(data.length, 0);
  typeBuffer.copy(out, 4);
  data.copy(out, 8);
  out.writeUInt32BE(crc32(Buffer.concat([typeBuffer, data])), 8 + data.length);
  return out;
}

function paeth(a, b, c) {
  const p = a + b - c;
  const pa = Math.abs(p - a);
  const pb = Math.abs(p - b);
  const pc = Math.abs(p - c);
  if (pa <= pb && pa <= pc) return a;
  return pb <= pc ? b : c;
}

function parsePng(file) {
  const buffer = fs.readFileSync(file);
  if (!buffer.subarray(0, 8).equals(pngSignature)) throw new Error(`${file} is not a PNG`);
  let offset = 8;
  const idat = [];
  let ihdr = null;
  while (offset < buffer.length) {
    const length = buffer.readUInt32BE(offset);
    const type = buffer.toString("ascii", offset + 4, offset + 8);
    const data = buffer.subarray(offset + 8, offset + 8 + length);
    if (type === "IHDR") {
      ihdr = {
        width: data.readUInt32BE(0),
        height: data.readUInt32BE(4),
        bitDepth: data[8],
        colorType: data[9],
        interlace: data[12]
      };
    }
    if (type === "IDAT") idat.push(data);
    if (type === "IEND") break;
    offset += length + 12;
  }
  if (!ihdr) throw new Error(`${file} has no IHDR`);
  if (ihdr.bitDepth !== 8 || ihdr.interlace !== 0 || ![2, 6].includes(ihdr.colorType)) {
    throw new Error(`${file} must be non-interlaced 8-bit RGB/RGBA PNG`);
  }
  return { ...ihdr, data: zlib.inflateSync(Buffer.concat(idat)) };
}

function unfilter({ width, height, colorType, data }) {
  const channels = colorType === 6 ? 4 : 3;
  const stride = width * channels;
  const raw = Buffer.alloc(width * height * channels);
  let inputOffset = 0;
  for (let y = 0; y < height; y += 1) {
    const filter = data[inputOffset];
    inputOffset += 1;
    const rowOffset = y * stride;
    for (let x = 0; x < stride; x += 1) {
      const current = data[inputOffset + x];
      const left = x >= channels ? raw[rowOffset + x - channels] : 0;
      const up = y > 0 ? raw[rowOffset + x - stride] : 0;
      const upLeft = y > 0 && x >= channels ? raw[rowOffset + x - stride - channels] : 0;
      if (filter === 0) raw[rowOffset + x] = current;
      else if (filter === 1) raw[rowOffset + x] = (current + left) & 0xff;
      else if (filter === 2) raw[rowOffset + x] = (current + up) & 0xff;
      else if (filter === 3) raw[rowOffset + x] = (current + Math.floor((left + up) / 2)) & 0xff;
      else if (filter === 4) raw[rowOffset + x] = (current + paeth(left, up, upLeft)) & 0xff;
      else throw new Error(`Unsupported PNG filter ${filter}`);
    }
    inputOffset += stride;
  }
  return { raw, channels };
}

function toRgba(png) {
  const { raw, channels } = unfilter(png);
  const rgba = Buffer.alloc(png.width * png.height * 4);
  for (let source = 0, target = 0; source < raw.length; source += channels, target += 4) {
    rgba[target] = raw[source];
    rgba[target + 1] = raw[source + 1];
    rgba[target + 2] = raw[source + 2];
    rgba[target + 3] = channels === 4 ? raw[source + 3] : 255;
  }
  return rgba;
}

function isBackgroundPixel(rgba, index) {
  const r = rgba[index];
  const g = rgba[index + 1];
  const b = rgba[index + 2];
  const a = rgba[index + 3];
  const spread = Math.max(r, g, b) - Math.min(r, g, b);
  return a < 24 || (r > 205 && g > 205 && b > 195 && spread < 48) || (r > 220 && g > 216 && b > 204);
}

function clearEdgeBackground(width, height, rgba) {
  const visited = new Uint8Array(width * height);
  const queue = [];
  const push = (x, y) => {
    if (x < 0 || y < 0 || x >= width || y >= height) return;
    const pixel = y * width + x;
    if (visited[pixel]) return;
    const index = pixel * 4;
    if (!isBackgroundPixel(rgba, index)) return;
    visited[pixel] = 1;
    queue.push(pixel);
  };

  for (let x = 0; x < width; x += 1) {
    push(x, 0);
    push(x, height - 1);
  }
  for (let y = 0; y < height; y += 1) {
    push(0, y);
    push(width - 1, y);
  }

  for (let cursor = 0; cursor < queue.length; cursor += 1) {
    const pixel = queue[cursor];
    const x = pixel % width;
    const y = Math.floor(pixel / width);
    rgba[pixel * 4 + 3] = 0;
    push(x + 1, y);
    push(x - 1, y);
    push(x, y + 1);
    push(x, y - 1);
  }
}

function findBounds(width, height, rgba) {
  let minX = width;
  let minY = height;
  let maxX = -1;
  let maxY = -1;
  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const index = (y * width + x) * 4;
      if (rgba[index + 3] > 24) {
        minX = Math.min(minX, x);
        minY = Math.min(minY, y);
        maxX = Math.max(maxX, x);
        maxY = Math.max(maxY, y);
      }
    }
  }
  if (maxX < minX || maxY < minY) return { x: 0, y: 0, width, height };
  return { x: minX, y: minY, width: maxX - minX + 1, height: maxY - minY + 1 };
}

function cropUpperBody(width, height, rgba) {
  const bounds = findBounds(width, height, rgba);
  const upperBottom = Math.min(height, Math.ceil(bounds.y + bounds.height * 0.6));
  const upperBounds = findBounds(width, upperBottom, rgba);
  const centerX = upperBounds.x + upperBounds.width / 2;
  const cropHeight = Math.max(1, Math.round(bounds.height * 0.56));
  const cropWidth = Math.max(upperBounds.width * 1.08, cropHeight * 0.82);
  const x = Math.max(0, Math.floor(centerX - cropWidth / 2));
  const y = Math.max(0, Math.floor(bounds.y - bounds.height * 0.035));
  const right = Math.min(width, Math.ceil(x + cropWidth));
  const bottom = Math.min(height, Math.ceil(y + cropHeight));
  return { x, y, width: right - x, height: bottom - y };
}

function renderHead(width, height, rgba, crop, size = 128) {
  const out = Buffer.alloc(size * size * 4);
  const scale = Math.min((size * 0.96) / crop.width, (size * 0.96) / crop.height);
  const drawWidth = Math.max(1, Math.round(crop.width * scale));
  const drawHeight = Math.max(1, Math.round(crop.height * scale));
  const offsetX = Math.floor((size - drawWidth) / 2);
  const offsetY = Math.floor((size - drawHeight) / 2);
  for (let y = 0; y < drawHeight; y += 1) {
    const sourceY = Math.min(height - 1, crop.y + Math.floor(y / scale));
    for (let x = 0; x < drawWidth; x += 1) {
      const sourceX = Math.min(width - 1, crop.x + Math.floor(x / scale));
      const source = (sourceY * width + sourceX) * 4;
      const target = ((offsetY + y) * size + offsetX + x) * 4;
      rgba.copy(out, target, source, source + 4);
    }
  }
  return out;
}

function encodePng(width, height, rgba) {
  const stride = width * 4;
  const filtered = Buffer.alloc((stride + 1) * height);
  for (let y = 0; y < height; y += 1) {
    const rowStart = y * (stride + 1);
    filtered[rowStart] = 0;
    rgba.copy(filtered, rowStart + 1, y * stride, y * stride + stride);
  }
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8;
  ihdr[9] = 6;
  return Buffer.concat([
    pngSignature,
    chunk("IHDR", ihdr),
    chunk("IDAT", zlib.deflateSync(filtered, { level: 9 })),
    chunk("IEND", Buffer.alloc(0))
  ]);
}

fs.mkdirSync(outputDir, { recursive: true });

for (const id of ids) {
  const transparent = path.join(transparentDir, `${id}.png`);
  const body = path.join(bodyDir, `${id}.png`);
  const usesTransparent = fs.existsSync(transparent);
  const input = usesTransparent ? transparent : body;
  const png = parsePng(input);
  const rgba = toRgba(png);
  if (!usesTransparent) clearEdgeBackground(png.width, png.height, rgba);
  const crop = cropUpperBody(png.width, png.height, rgba);
  const head = renderHead(png.width, png.height, rgba, crop);
  fs.writeFileSync(path.join(outputDir, `${id}.png`), encodePng(128, 128, head));
  console.log(`generated ${id}.png`);
}
