import { Contact } from "@/components/sections/Contact";
import { Corporate } from "@/components/sections/Corporate";
import { Courses } from "@/components/sections/Courses";
import { Faq } from "@/components/sections/Faq";
import { Hero } from "@/components/sections/Hero";
import { Journey } from "@/components/sections/Journey";
import { StandardsStrip } from "@/components/sections/StandardsStrip";
import { WhyUs } from "@/components/sections/WhyUs";
import { COURSES, LEVELS } from "@/data/courses";
import { FAQ } from "@/data/faq";
import { ENQUIRY_EMAIL, SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/data/site";

const org = {
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/brand/thinkrisk-logo-400.png`,
  email: ENQUIRY_EMAIL,
  description: SITE_DESCRIPTION,
  areaServed: ["Australia", "Malaysia"],
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    org,
    ...COURSES.flatMap((c) =>
      LEVELS.map((l) => ({
        "@type": "Course",
        name: `${c.code} ${c.title} — ${l.name}`,
        description: c.description,
        provider: { "@id": `${SITE_URL}/#organization` },
        offers: { "@type": "Offer", category: "Paid", price: l.priceAUD, priceCurrency: "AUD" },
        hasCourseInstance: { "@type": "CourseInstance", courseMode: "Online", courseWorkload: l.duration },
      })),
    ),
    {
      "@type": "FAQPage",
      mainEntity: FAQ.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })),
    },
  ],
};

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <Hero />
      <StandardsStrip />
      <Courses />
      <Journey />
      <Corporate />
      <WhyUs />
      <Faq />
      <Contact />
    </>
  );
}
