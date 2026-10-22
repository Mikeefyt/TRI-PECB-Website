import type { Metadata } from "next";
import Link from "next/link";
import { EnquiryForm } from "@/components/EnquiryForm";
import { canonical } from "@/lib/site";

// Markup converted from v23 dist/contact/index.html — keep copy word for word.
export const metadata: Metadata = {
  title: { absolute: "Contact & Training Enquiries | Think Risk International" },
  description: "Contact Think Risk International at pecb@thinkrisk.com.au to discuss individual PECB training or team learning requirements.",
  alternates: { canonical: canonical("/contact/") },
};

export default function ContactPage() {
  return (
    <main id="main" data-page="contact">
<div className="page-breadcrumb container"><Link href="/">Home</Link><span aria-hidden="true">/</span><span aria-current="page">Contact</span></div><section className="section contact" id="contact"><div className="container contact-layout"><div><p className="eyebrow dark">05 / TAKE YOUR NEXT STEP</p><h1 className="page-title">Let’s find your<br /><span>way forward.</span></h1><p>Enquire from any location. Tell us about your goals to explore suitable courses and team training options.</p><a className="email-link" href="mailto:pecb@thinkrisk.com.au">pecb@thinkrisk.com.au <span aria-hidden="true">↗</span></a></div><EnquiryForm /></div></section><section className="insight-section soft-section" id="enquiry-guide"><div className="container"><div className="editorial-heading"><p className="eyebrow dark">HELP US UNDERSTAND YOUR GOALS</p><h2>A few details make a useful enquiry.</h2></div><div className="outcome-grid"><article><span className="insight-icon" aria-hidden="true">01</span><h3>For your own development</h3><p>Tell us your role, the standard that interests you and whether you want to build awareness, implementation knowledge or audit skills.</p></article><article><span className="insight-icon" aria-hidden="true">02</span><h3>For your organisation</h3><p>Include your team size, participant responsibilities and locations, relevant time zones and preferred start period.</p></article><article><span className="insight-icon" aria-hidden="true">03</span><h3>Before enrolling</h3><p>Ask about the current fees, course prerequisites, learning format, access period and examination arrangements.</p></article></div></div></section><section className="insight-section " id="send-your-enquiry"><div className="container"><div className="editorial-split"><div><div className="editorial-heading"><p className="eyebrow dark">HOW TO SEND</p><h2>Prepare. Review.<br />Send your enquiry.</h2></div><ol className="numbered-list"><li><strong>Complete the form.</strong> Add your contact details and training goals.</li><li><strong>Select Submit Enquiry.</strong> Your details are prepared as an email draft.</li><li><strong>Review and send.</strong> Open the draft in your email app or copy the text into an email to Think Risk.</li></ol></div><aside className="preparation-panel"><p className="eyebrow dark">PREFER TO EMAIL DIRECTLY?</p><h3>Start the conversation.</h3><p>You can send your course questions or team training brief directly to:</p><a className="contact-direct-email" href="mailto:pecb@thinkrisk.com.au">pecb@thinkrisk.com.au</a><p>Still exploring? Our FAQs explain study formats, course levels and the enquiry process.</p><Link className="text-link dark-link" href="/faqs/">Read the FAQs <span aria-hidden="true">→</span></Link></aside></div></div></section>

    </main>
  );
}
