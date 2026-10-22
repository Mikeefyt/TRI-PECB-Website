import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __dirname = dirname(fileURLToPath(import.meta.url));
const compat = new FlatCompat({ baseDirectory: __dirname });

const config = [
  { ignores: [".next/**", "out/**", "node_modules/**", "reference/**", "reference_docx/**", "scripts/**", "next-env.d.ts"] },
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // The site reproduces v23's markup exactly, including plain <img> tags (static export, no image optimiser).
      "@next/next/no-img-element": "off",
    },
  },
];

export default config;
