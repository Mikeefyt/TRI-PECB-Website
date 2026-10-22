import type { Metadata, Viewport } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { CursorField } from "@/components/CursorField";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { PageEffects } from "@/components/PageEffects";
import { ScrollProgress } from "@/components/ScrollProgress";
import { SiteProvider } from "@/components/SiteProvider";
import { SITE_URL } from "@/lib/site";
// v23 stylesheets, unchanged and in v23's cascade order.
import "./styles/styles.css";
import "./styles/theme.css";
import "./styles/client.css";
import "./styles/navy.css";
import "./styles/motion.css";
import "./styles/cursor-animation.css";
import "./styles/particle-motion.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "PECB Training | Think Risk International",
  icons: { icon: { url: "/assets/favicon.svg", type: "image/svg+xml" } },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#07152c" };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en-AU">
      <body id="page-top">
        <SiteProvider>
          <CursorField />
          <ScrollProgress />
          <a className="skip-link" href="#main">
            Skip to content
          </a>
          <div className="announcement">
            PECB certification training <span>·</span> Self-paced. Online. Built around you. <Link href="/your-pathway/">Discover your pathway ↗</Link>
          </div>
          <Header />
          {children}
          <Footer />
          <PageEffects />
        </SiteProvider>
      </body>
    </html>
  );
}
