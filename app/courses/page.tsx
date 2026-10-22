import type { Metadata } from "next";
import Link from "next/link";
import { CourseCatalogue } from "@/components/CourseCatalogue";
import { canonical } from "@/lib/site";

// Markup converted from v23 dist/courses/index.html — keep copy word for word.
export const metadata: Metadata = {
  title: { absolute: "PECB Courses | Think Risk International" },
  description: "Build your capability in business continuity, AI governance and information security with Think Risk International. Explore online PECB courses and team training worldwide.",
  alternates: { canonical: canonical("/courses/") },
};

export default function CoursesPage() {
  return (
    <main id="main" data-page="courses">
<div className="page-breadcrumb container"><Link href="/">Home</Link><span aria-hidden="true">/</span><span aria-current="page">Courses</span></div><section className="section courses" id="courses"><div className="container"><div className="section-heading"><div><p className="eyebrow dark">01 / EXPLORE THE COURSES</p><h1 className="page-title">Choose your focus.<br />Build your expertise.</h1></div><p>Explore self-paced online PECB training in business continuity, AI management systems and information security. Select a course to review its focus, intended audience and listed fee.</p></div><CourseCatalogue /><p className="pricing-note">Listed durations describe the course structure; self-paced study time may vary. Enquire about current fees and package inclusions.</p></div></section><section className="insight-section soft-section" id="course-focus"><div className="container"><div className="editorial-heading"><p className="eyebrow dark">EXPLORE THE STANDARDS</p><h2>Three areas of focus.<br />Knowledge with a purpose.</h2><p className="section-intro">Explore the subject areas covered by Think Risk’s existing PECB course catalogue.</p></div><div className="focus-rows">
<article><span className="focus-code">ISO 22301</span><div><h3>Business continuity</h3><p>Explore business continuity principles, business impact analysis, continuity strategies and planning. Build understanding of how a management system supports preparation for disruption and continual improvement.</p></div><Link href="/courses/#course-22301">View courses <span aria-hidden="true">↗</span></Link></article>
<article><span className="focus-code">ISO/IEC 42001</span><div><h3>AI management systems</h3><p>Explore AI management concepts, governance, accountability and risk. Develop knowledge of the responsibilities and processes used to manage and evaluate an AI management system.</p></div><Link href="/courses/#course-42001">View courses <span aria-hidden="true">↗</span></Link></article>
<article><span className="focus-code">ISO/IEC 27001</span><div><h3>Information security</h3><p>Explore information security principles, risk management and controls. Build knowledge of a systematic approach to managing information security and evaluating conformity.</p></div><Link href="/courses/#course-27001">View courses <span aria-hidden="true">↗</span></Link></article>
</div><div className="resource-line"><span>Need help choosing a level or planning your study?</span><Link href="/your-pathway/#training-pathways">Explore your pathway <span aria-hidden="true">→</span></Link></div></div></section>
<section className="page-cta" id="course-enquiry"><div className="container"><div><p className="eyebrow dark">DISCUSS YOUR COURSE</p><h2>Ask about your selected course.</h2><p>Tell us the standard and level you are interested in. Think Risk can confirm current availability, fees and inclusions.</p></div><Link className="button" href="/contact/#enquiry-form">Submit a course enquiry <span aria-hidden="true">↗</span></Link></div></section>
    </main>
  );
}
