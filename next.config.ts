import type { NextConfig } from "next";

// Static export: `npm run build` writes plain HTML/CSS/JS to out/, which can be uploaded to any
// static host (e.g. Hostinger) or deployed on Vercel. Trailing slashes keep v23's URLs
// (/courses/, /your-pathway/ …).
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
