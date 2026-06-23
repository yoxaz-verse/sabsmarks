import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { basename, join } from "node:path";
import { fileURLToPath } from "node:url";

const SOURCE_URL = "https://naturalearth.s3.amazonaws.com/10m_cultural/ne_10m_admin_0_countries.zip";
const ROOT = fileURLToPath(new URL("..", import.meta.url));
const CACHE_DIR = join(ROOT, ".cache", "natural-earth");
const ZIP_PATH = join(CACHE_DIR, basename(SOURCE_URL));
const EXTRACT_DIR = join(CACHE_DIR, "ne_10m_admin_0_countries");
const OUTPUT_PATH = join(ROOT, "public", "maps", "india-outline.svg");
const WIDTH = 800;
const HEIGHT = 900;
const PAD = 28;

function ensureSourceFiles() {
  mkdirSync(CACHE_DIR, { recursive: true });
  mkdirSync(EXTRACT_DIR, { recursive: true });

  if (!existsSync(ZIP_PATH)) {
    execFileSync("curl", ["-L", SOURCE_URL, "-o", ZIP_PATH], { stdio: "inherit" });
  }

  const shpPath = join(EXTRACT_DIR, "ne_10m_admin_0_countries.shp");
  const dbfPath = join(EXTRACT_DIR, "ne_10m_admin_0_countries.dbf");
  if (!existsSync(shpPath) || !existsSync(dbfPath)) {
    execFileSync("unzip", ["-o", ZIP_PATH, "-d", EXTRACT_DIR], { stdio: "inherit" });
  }

  return { shpPath, dbfPath };
}

function readDbfRecords(dbfPath) {
  const buffer = readFileSync(dbfPath);
  const headerLength = buffer.readUInt16LE(8);
  const recordLength = buffer.readUInt16LE(10);
  const fields = [];

  for (let offset = 32; offset < headerLength - 1; offset += 32) {
    if (buffer[offset] === 0x0d) break;
    const name = buffer.toString("ascii", offset, offset + 11).replace(/\0/g, "").trim();
    fields.push({
      name,
      type: String.fromCharCode(buffer[offset + 11]),
      length: buffer[offset + 16],
      decimalCount: buffer[offset + 17],
    });
  }

  const records = [];
  for (let offset = headerLength; offset + recordLength <= buffer.length; offset += recordLength) {
    if (buffer[offset] === 0x2a) continue;
    let cursor = offset + 1;
    const record = {};

    for (const field of fields) {
      const raw = buffer.toString("utf8", cursor, cursor + field.length).trim();
      record[field.name] = raw;
      cursor += field.length;
    }

    records.push(record);
  }

  return records;
}

function readShapeRecords(shpPath) {
  const buffer = readFileSync(shpPath);
  const records = [];
  let offset = 100;

  while (offset + 8 < buffer.length) {
    const contentLength = buffer.readInt32BE(offset + 4) * 2;
    const contentOffset = offset + 8;
    const shapeType = buffer.readInt32LE(contentOffset);

    if (shapeType === 0) {
      records.push([]);
      offset = contentOffset + contentLength;
      continue;
    }

    if (shapeType !== 5 && shapeType !== 15 && shapeType !== 25) {
      throw new Error(`Unsupported shapefile polygon type: ${shapeType}`);
    }

    const numParts = buffer.readInt32LE(contentOffset + 36);
    const numPoints = buffer.readInt32LE(contentOffset + 40);
    const partsOffset = contentOffset + 44;
    const pointOffset = partsOffset + numParts * 4;
    const parts = [];
    const points = [];

    for (let index = 0; index < numParts; index++) {
      parts.push(buffer.readInt32LE(partsOffset + index * 4));
    }

    for (let index = 0; index < numPoints; index++) {
      const cursor = pointOffset + index * 16;
      points.push([buffer.readDoubleLE(cursor), buffer.readDoubleLE(cursor + 8)]);
    }

    const rings = parts.map((start, index) => {
      const end = parts[index + 1] ?? points.length;
      return points.slice(start, end);
    });

    records.push(rings);
    offset = contentOffset + contentLength;
  }

  return records;
}

function chooseIndiaRecord(dbfRecords, shapeRecords) {
  const index = dbfRecords.findIndex((record) =>
    ["ADM0_A3", "ISO_A3", "SOV_A3", "BRK_A3"].some((field) => record[field] === "IND") || record.NAME === "India" || record.ADMIN === "India"
  );

  if (index < 0) throw new Error("Could not find India in Natural Earth Admin 0 countries data.");
  return { metadata: dbfRecords[index], rings: shapeRecords[index] };
}

function polygonArea(ring) {
  let area = 0;
  for (let index = 0; index < ring.length - 1; index++) {
    const [x1, y1] = ring[index];
    const [x2, y2] = ring[index + 1];
    area += x1 * y2 - x2 * y1;
  }
  return area / 2;
}

function generateSvg(rings) {
  const allPoints = rings.flat();
  const west = Math.min(...allPoints.map(([longitude]) => longitude));
  const east = Math.max(...allPoints.map(([longitude]) => longitude));
  const south = Math.min(...allPoints.map(([, latitude]) => latitude));
  const north = Math.max(...allPoints.map(([, latitude]) => latitude));
  const xScale = (WIDTH - PAD * 2) / (east - west);
  const yScale = (HEIGHT - PAD * 2) / (north - south);
  const scale = Math.min(xScale, yScale);
  const mapWidth = (east - west) * scale;
  const mapHeight = (north - south) * scale;
  const offsetX = (WIDTH - mapWidth) / 2;
  const offsetY = (HEIGHT - mapHeight) / 2;

  function project([longitude, latitude]) {
    const x = offsetX + (longitude - west) * scale;
    const y = offsetY + (north - latitude) * scale;
    return `${x.toFixed(2)} ${y.toFixed(2)}`;
  }

  const sortedRings = [...rings].sort((a, b) => Math.abs(polygonArea(b)) - Math.abs(polygonArea(a)));
  const d = sortedRings
    .map((ring) => ring.map((point, index) => `${index === 0 ? "M" : "L"}${project(point)}`).join(" ") + " Z")
    .join(" ");
  const metadata = { width: WIDTH, height: HEIGHT, offsetX, offsetY, scale, west, east, south, north, rings: rings.length, points: allPoints.length };

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${WIDTH} ${HEIGHT}" role="img" aria-label="Map outline of India">
  <!-- India boundary generated from Natural Earth 1:10m Admin 0 Countries (${SOURCE_URL}). Natural Earth data is public domain. -->
  <!-- map-metadata ${JSON.stringify(metadata)} -->
  <defs>
    <filter id="india-outline-shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="18" flood-color="#020617" flood-opacity="0.35" stdDeviation="16" />
    </filter>
    <linearGradient id="india-outline-fill" x1="130" x2="700" y1="120" y2="820" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#0b77bd" />
      <stop offset="1" stop-color="#005c9d" />
    </linearGradient>
  </defs>
  <path d="${d}" fill="url(#india-outline-fill)" fill-rule="evenodd" filter="url(#india-outline-shadow)" stroke="#d7f7e1" stroke-linejoin="round" stroke-width="4" />
  <path d="${d}" fill="none" opacity="0.24" stroke="#ffffff" stroke-linejoin="round" stroke-width="1.4" />
</svg>
`;

  return { svg, metadata };
}

const { shpPath, dbfPath } = ensureSourceFiles();
const dbfRecords = readDbfRecords(dbfPath);
const shapeRecords = readShapeRecords(shpPath);
const india = chooseIndiaRecord(dbfRecords, shapeRecords);
const { svg, metadata } = generateSvg(india.rings);

mkdirSync(join(ROOT, "public", "maps"), { recursive: true });
writeFileSync(OUTPUT_PATH, svg);
console.log(JSON.stringify({ output: OUTPUT_PATH, metadata, sourceName: india.metadata.NAME || india.metadata.ADMIN }, null, 2));
