import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: { absolute: "Page not found | Think Risk International" } };

// v23 had no custom 404; this reuses its page-title and button styles.
export default function NotFound() {
  return (
    <main id="main" data-page="not-found">
      <section className="section">
        <div className="container">
          <p className="eyebrow dark">PAGE NOT FOUND</p>
          <h1 className="page-title">This page isn’t available.</h1>
          <Link className="button" href="/">
            Return home <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
