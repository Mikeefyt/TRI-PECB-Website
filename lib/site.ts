// Final website address. v23 used its temporary Sites address for canonical URLs;
// set NEXT_PUBLIC_SITE_URL to the chosen domain before launch.
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://think-risk-training.workspace-567439.chatgpt.site").replace(/\/$/, "");

export const ROUTES = ["/", "/courses/", "/corporate-training/", "/your-pathway/", "/about/", "/faqs/", "/contact/"] as const;

export function canonical(path: string) {
  return SITE_URL + path;
}
