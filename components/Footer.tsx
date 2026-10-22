"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useSite } from "./SiteProvider";

export function Footer() {
  const { openPrivacy } = useSite();
  const [year, setYear] = useState(2026);
  useEffect(() => setYear(new Date().getFullYear()), []);

  return (
    <footer>
      <div className="container">
        <div className="footer-main">
          <div className="footer-branding">
            <div className="footer-identity">
              <Link className="brand" href="/">
                <img src="/assets/think-risk-logo-white.png" alt="Think Risk International" width="2048" height="2048" />
              </Link>
            </div>
            <p>
              Think forward.
              <br />
              <span>Build capability that matters.</span>
            </p>
          </div>
          <div className="footer-partner">
            <img className="partner-badge" src="/assets/pecb-authorized-partner.png" alt="PECB Authorized Partner" width="994" height="1200" loading="lazy" />
          </div>
          <nav aria-label="Footer navigation">
            <Link href="/">Home</Link>
            <Link href="/courses/">Courses</Link>
            <Link href="/corporate-training/">Training</Link>
            <Link href="/your-pathway/">Pathway</Link>
            <Link href="/about/">About Us</Link>
            <Link href="/faqs/">FAQs</Link>
            <Link href="/contact/">Contact</Link>
          </nav>
        </div>
        <div className="footer-bottom">
          <span>
            © <span id="year">{year}</span> Think Risk International
          </span>
          <span>
            Australia <span className="dot-separator">·</span> Malaysia
          </span>
          <button id="privacy-open" onClick={openPrivacy}>
            Website privacy
          </button>
          <a href="#page-top">Back to top ↑</a>
        </div>
      </div>
    </footer>
  );
}
