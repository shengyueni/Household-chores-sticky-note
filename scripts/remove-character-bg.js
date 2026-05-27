const fs = require("fs");
const path = require("path");
const zlib = require("zlib");

const inputDir = path.join(__dirname, "..", "public", "assets", "character");
const outputDir = path.join(__dirname, "..", "public", "assets", "character-transparent");
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
  if (pb <= pc) return b;
  return c;
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

function transparentRgba({ width, height, colorType, data }) {
  const { raw, channels } = unfilter({ width, height, colorType, data });
  const rgba = Buffer.alloc(width * height * 4);

  for (let source = 0, target = 0; source < raw.length; source += channels, target += 4) {
    const r = raw[source];
    const g = raw[source + 1];
    const b = raw[source + 2];
    const sourceAlpha = channels === 4 ? raw[source + 3] : 255;
    const white = r > 235 && g > 235 && b > 235;
    const softEdge = r > 228 && g > 228 && b > 228 && Math.max(r, g, b) - Math.min(r, g, b) < 18;

    rgba[target] = r;
    rgba[target + 1] = g;
    rgba[target + 2] = b;
    rgba[target + 3] = white ? 0 : softEdge ? Math.min(sourceAlpha, 72) : sourceAlpha;
  }

  return rgba;
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
  ihdr[10] = 0;
  ihdr[11] = 0;
  ihdr[12] = 0;

  return Buffer.concat([
    pngSignature,
    chunk("IHDR", ihdr),
    chunk("IDAT", zlib.deflateSync(filtered, { level: 9 })),
    chunk("IEND", Buffer.alloc(0))
  ]);
}

fs.mkdirSync(outputDir, { recursive: true });

for (const id of ids) {
  const input = path.join(inputDir, `${id}.png`);
  const output = path.join(outputDir, `${id}.png`);
  const png = parsePng(input);
  const rgba = transparentRgba(png);
  fs.writeFileSync(output, encodePng(png.width, png.height, rgba));
  console.log(`processed ${id}.png`);
}
