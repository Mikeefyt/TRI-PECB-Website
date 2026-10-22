import type { MetadataRoute } from "next";
import { ROUTES, canonical } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map((route) => ({ url: canonical(route), changeFrequency: "monthly", priority: route === "/" ? 1 : 0.8 }));
}
