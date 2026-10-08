// Generates the favicon, Apple touch icon, Open Graph image and a web-sized logo from the brand files.
// Run with: node scripts/make-icons.mjs
import sharp from "sharp";

const logo = "public/brand/thinkrisk-logo.png";

// Head-and-puzzle mark only (cropped from the centre of the circular logo) for small favicons.
const meta = await sharp(logo).metadata();
const s = meta.width;
const crop = { left: Math.round(s * 0.33), top: Math.round(s * 0.3), width: Math.round(s * 0.34), height: Math.round(s * 0.36) };
const mark = await sharp(logo).extract(crop).trim().toBuffer();

async function icon(size, out, pad) {
  const inner = Math.round(size * (1 - pad * 2));
  const m = await sharp(mark).resize(inner, inner, { fit: "contain", background: "#ffffff" }).toBuffer();
  await sharp({ create: { width: size, height: size, channels: 4, background: "#ffffff" } })
    .composite([{ input: m, gravity: "center" }])
    .png()
    .toFile(out);
}

await icon(64, "app/icon.png", 0.08);
await icon(180, "app/apple-icon.png", 0.14);

const ogLogo = await sharp(logo).resize(420, 420).toBuffer();
await sharp({ create: { width: 1200, height: 630, channels: 4, background: "#f5f8fc" } })
  .composite([{ input: ogLogo, gravity: "center" }])
  .png()
  .toFile("app/opengraph-image.png");

await sharp(logo).resize(400, 400).png({ compressionLevel: 9 }).toFile("public/brand/thinkrisk-logo-400.png");
await sharp("public/brand/pecb-authorized-partner.png").resize(400).png({ compressionLevel: 9 }).toFile("public/brand/pecb-authorized-partner-400.png");

console.log("icons written");
