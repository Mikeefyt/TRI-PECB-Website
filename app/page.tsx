import type { Metadata } from "next";
import Link from "next/link";
import { ProgrammeStory } from "@/components/ProgrammeStory";
import { canonical } from "@/lib/site";

// Markup converted from v23 dist/index.html — keep copy word for word.
export const metadata: Metadata = {
  title: { absolute: "PECB Training | Think Risk International" },
  description: "Explore Think Risk International’s PECB training pathways for individuals and teams worldwide.",
  alternates: { canonical: canonical("/") },
};

export default function HomePage() {
  return (
    <main id="main" data-page="top">

<section className="client-hero" id="top"><div className="container client-hero-layout"><div>
<p className="eyebrow"><span className="status-dot" aria-hidden="true"></span> PECB PROFESSIONAL TRAINING</p>
<h1>Build capability.<br />Move forward<br /><em>with confidence.</em></h1>
<p className="hero-description">Build practical expertise in business continuity, AI governance and information security with PECB certification training.</p>
<div className="hero-actions"><Link className="button" href="/courses/">Explore courses <span aria-hidden="true">↗</span></Link><Link className="text-link" href="/your-pathway/#course-finder">Help me choose <span aria-hidden="true">→</span></Link></div>
<div className="hero-note"><span aria-hidden="true">✓</span> Self-paced online learning <span className="divider" aria-hidden="true">/</span> Available worldwide</div>
</div><div className="executive-visual"><figure className="executive-photo"><img src="/assets/executive-training.png" alt="Illustrative editorial scene of professionals discussing risk management in a contemporary office." width="1672" height="941" fetchPriority="high" /><span className="image-label">KNOWLEDGE WITH REAL-WORLD PURPOSE</span><figcaption>Professional learning, wherever your next step takes you. · Illustrative image</figcaption></figure><div className="executive-focus"><p>THREE DISCIPLINES. ONE PRACTICAL PURPOSE.</p><div className="focus-links"><Link href="/courses/#course-22301"><small>ISO 22301</small><strong>Business<br />Continuity ↗</strong></Link><Link href="/courses/#course-42001"><small>ISO/IEC 42001</small><strong>AI Management<br />Systems ↗</strong></Link><Link href="/courses/#course-27001"><small>ISO/IEC 27001</small><strong>Information<br />Security ↗</strong></Link></div></div></div></div></section>
<div className="trust-band"><div className="container"><div className="trust-item"><img className="partner-badge" src="/assets/pecb-authorized-partner.png" alt="PECB Authorized Partner" width="994" height="1200" /><span>PECB Authorized Partner<small>Think Risk International</small></span></div><div className="trust-item"><span className="trust-symbol" aria-hidden="true">↗</span><span>Learn at your pace<small>Self-paced online courses</small></span></div><div className="trust-item"><span className="trust-symbol" aria-hidden="true">◎</span><span>Available worldwide<small>For individuals and teams</small></span></div><div className="trust-item"><span className="trust-symbol" aria-hidden="true">✓</span><span>Build your pathway<small>Foundation, implementation, audit</small></span></div></div></div>
<section className="client-section" id="training-areas"><div className="container"><div className="client-section-heading"><div><p className="eyebrow">CHOOSE YOUR FOCUS</p><h2>Knowledge for the<br />work that matters.</h2></div><p>From understanding the fundamentals to implementing and auditing a management system, find a pathway that fits your next step.</p></div><ProgrammeStory /><p className="programme-note">Foundation, Lead Implementer and Lead Auditor pathways are available across these three standards. Listed fees are shown in your selected currency. <Link href="/courses/">View all course levels and pricing →</Link></p></div></section>



<section className="client-section client-team" id="team-training"><div className="container client-team-layout"><div><p className="eyebrow">FOR YOUR ORGANISATION</p><h2>A shared language.<br />A stronger team.</h2><p>Give your team a shared language for risk, governance and assurance. Develop a training pathway around the capabilities your organisation needs.</p><Link className="button" href="/corporate-training/">Explore team training <span aria-hidden="true">↗</span></Link></div><div className="team-benefits"><article><span>01</span><div><h3>A shared foundation</h3><p>Build understanding of the standards, concepts and responsibilities relevant to your organisation.</p></div></article><article><span>02</span><div><h3>Role-based pathways</h3><p>Match learning to the people implementing, managing and auditing your systems.</p></div></article><article><span>03</span><div><h3>Flexible online learning</h3><p>Develop capability across locations with self-paced online learning.</p></div></article></div></div></section>


<section className="page-cta"><div className="container"><div><p className="eyebrow">TAKE YOUR NEXT STEP</p><h2>What do you want<br />to achieve?</h2><p>Tell us what you want to achieve. We’ll help you explore the right course or team training pathway.</p></div><Link className="button" href="/contact/">Submit an enquiry <span aria-hidden="true">↗</span></Link></div></section>

    </main>
  );
}
