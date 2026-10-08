"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowUpRight, Check, ChevronDown, Copy } from "lucide-react";
import { useEffect, useId, useState, type ReactNode } from "react";
import { useForm } from "react-hook-form";
import { INTEREST_OPTIONS } from "@/data/courses";
import { ENQUIRY_EMAIL } from "@/data/site";
import { ENQUIRY_EVENT } from "@/lib/events";
import { buildMailto, enquiryBody, enquirySubject } from "@/lib/mailto";
import { MARKET, useRegion } from "@/lib/region";
import { enquirySchema, type EnquiryValues } from "@/lib/validation";
import { Button } from "@/components/ui/Button";
import { Dot, Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";

const fieldBase =
  "w-full rounded-[6px] border bg-field px-[17px] text-[15px] font-medium text-navy outline-none transition-[border-color,box-shadow,background-color] duration-200 placeholder:font-medium placeholder:text-muted hover:border-[#bccbdd] focus:border-blue focus:bg-white focus:shadow-[0_0_0_3px_rgb(31_95_166/0.15)]";

function Field({ id, label, error, children, className = "" }: { id: string; label: string; error?: string; children: ReactNode; className?: string }) {
  return (
    <div className={className}>
      <label htmlFor={id} className="block text-[13.5px] font-bold text-navy">
        {label}
      </label>
      <div className="mt-3">{children}</div>
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-2 text-[13px] font-medium text-[#b42318]">
          {error}
        </p>
      )}
    </div>
  );
}

export function Contact() {
  const uid = useId();
  const ids = {
    fullName: `${uid}-name`,
    email: `${uid}-email`,
    organisation: `${uid}-org`,
    market: `${uid}-market`,
    interest: `${uid}-interest`,
    goals: `${uid}-goals`,
  };
  const { region } = useRegion();
  const [sent, setSent] = useState<EnquiryValues | null>(null);
  const [copied, setCopied] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    getFieldState,
    formState: { errors },
  } = useForm<EnquiryValues>({
    resolver: zodResolver(enquirySchema),
    defaultValues: { fullName: "", email: "", organisation: "", market: "Australia", interest: "", goals: "" },
  });

  // The training market follows the AU/MY toggle until the visitor picks one themselves.
  useEffect(() => {
    if (!getFieldState("market").isDirty) setValue("market", MARKET[region]);
  }, [region, getFieldState, setValue]);

  // Course rows and team-training buttons pre-select an interest.
  useEffect(() => {
    const onEnquiry = (e: Event) => {
      setValue("interest", (e as CustomEvent<string>).detail, { shouldDirty: true, shouldValidate: true });
    };
    window.addEventListener(ENQUIRY_EVENT, onEnquiry);
    return () => window.removeEventListener(ENQUIRY_EVENT, onEnquiry);
  }, [setValue]);

  function onSubmit(values: EnquiryValues) {
    setSent(values);
    setCopied(false);
    window.location.href = buildMailto(values);
  }

  async function copyEnquiry() {
    if (!sent) return;
    const text = `To: ${ENQUIRY_EMAIL}\nSubject: ${enquirySubject(sent)}\n\n${enquiryBody(sent)}`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  const describedBy = (k: keyof EnquiryValues) => (errors[k] ? `${ids[k]}-error` : undefined);

  return (
    <section id="contact" aria-labelledby="contact-title" className="border-t border-line bg-bg-tint py-20 md:pb-[110px] md:pt-[118px]">
      <div className="container-site grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,746px)] lg:gap-16">
        <Reveal>
          <Eyebrow>05 / TAKE YOUR NEXT STEP</Eyebrow>
          <h2 id="contact-title" className="heading-lg mt-6 md:mt-[34px]">
            Let’s find your
            <br />
            <span className="text-blue-soft">way forward.</span>
          </h2>
          <p className="lead mt-8 max-w-[400px] md:mt-[38px]">
            Tell us what you want to achieve. We’ll help you explore the right course or team training pathway.
          </p>
          <a
            href={`mailto:${ENQUIRY_EMAIL}`}
            className="group mt-10 inline-flex items-center gap-7 border-b border-[#9fb4cf] pb-[18px] text-[19px] text-blue transition-colors hover:border-blue md:mt-[50px] md:text-[21px]"
          >
            {ENQUIRY_EMAIL}
            <ArrowUpRight aria-hidden strokeWidth={1.5} className="size-[18px] transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
          <p className="mt-10 flex items-center gap-4 text-[12px] text-ink md:mt-[44px]">
            <Dot />
            Supporting professionals in Australia &amp; Malaysia
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <form
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            aria-label="Enquiry form"
            className="rounded-2xl border border-line bg-white px-6 py-9 shadow-float md:px-10 md:py-[42px]"
          >
            <div className="grid gap-x-[21px] gap-y-6 md:grid-cols-2">
              <Field id={ids.fullName} label="Full name" error={errors.fullName?.message}>
                <input
                  id={ids.fullName}
                  type="text"
                  autoComplete="name"
                  placeholder="Your full name"
                  aria-invalid={!!errors.fullName}
                  aria-describedby={describedBy("fullName")}
                  aria-required
                  className={`${fieldBase} h-[57px] ${errors.fullName ? "border-[#d92d20]" : "border-[#d3deea]"}`}
                  {...register("fullName")}
                />
              </Field>
              <Field id={ids.email} label="Work email" error={errors.email?.message}>
                <input
                  id={ids.email}
                  type="email"
                  autoComplete="email"
                  inputMode="email"
                  placeholder="you@company.com"
                  aria-invalid={!!errors.email}
                  aria-describedby={describedBy("email")}
                  aria-required
                  className={`${fieldBase} h-[57px] ${errors.email ? "border-[#d92d20]" : "border-[#d3deea]"}`}
                  {...register("email")}
                />
              </Field>
              <Field id={ids.organisation} label="Organisation">
                <input
                  id={ids.organisation}
                  type="text"
                  autoComplete="organization"
                  placeholder="Company name"
                  className={`${fieldBase} h-[57px] border-[#d3deea]`}
                  {...register("organisation")}
                />
              </Field>
              <Field id={ids.market} label="Training market">
                <div className="relative">
                  <select id={ids.market} className={`${fieldBase} h-[53px] cursor-pointer appearance-none border-[#d3deea] bg-white pl-[21px] pr-12`} {...register("market")}>
                    <option value="Australia">Australia</option>
                    <option value="Malaysia">Malaysia</option>
                  </select>
                  <ChevronDown aria-hidden strokeWidth={2.25} className="pointer-events-none absolute right-3.5 top-1/2 size-4 -translate-y-1/2 text-navy" />
                </div>
              </Field>
              <Field id={ids.interest} label="What are you interested in?" error={errors.interest?.message} className="md:col-span-2">
                <div className="relative">
                  <select
                    id={ids.interest}
                    aria-invalid={!!errors.interest}
                    aria-describedby={describedBy("interest")}
                    aria-required
                    className={`${fieldBase} h-[54px] cursor-pointer appearance-none bg-white pl-[22px] pr-12 ${errors.interest ? "border-[#d92d20]" : "border-[#d3deea]"}`}
                    {...register("interest")}
                  >
                    <option value="">Select a course or team training</option>
                    {INTEREST_OPTIONS.map((o) => (
                      <option key={o} value={o}>
                        {o}
                      </option>
                    ))}
                  </select>
                  <ChevronDown aria-hidden strokeWidth={2.25} className="pointer-events-none absolute right-3.5 top-1/2 size-4 -translate-y-1/2 text-navy" />
                </div>
              </Field>
              <Field id={ids.goals} label="Your goals" className="md:col-span-2">
                <textarea
                  id={ids.goals}
                  rows={4}
                  placeholder="Your preferred level, team size or what you’d like to achieve…"
                  className={`${fieldBase} block min-h-[125px] resize-y border-[#d3deea] py-[18px] leading-relaxed`}
                  {...register("goals")}
                />
              </Field>
            </div>

            <Button type="submit" className="mt-[22px] w-full md:h-[64px] md:px-7">
              Submit Enquiry
            </Button>
            <p className="mt-7 text-[12.5px] text-muted">Your details will be placed into an email draft. Review and send it using your email app.</p>

            <div aria-live="polite">
              {sent && (
                <div className="mt-6 rounded-xl border border-line bg-bg-alt p-5">
                  <p className="flex items-start gap-3 text-[14px] font-medium text-navy">
                    <Check aria-hidden strokeWidth={2.25} className="mt-0.5 size-4 shrink-0 text-blue" />
                    Your email app should open with your enquiry ready to send.
                  </p>
                  <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-3 pl-7 text-[13px] text-muted">
                    <button
                      type="button"
                      onClick={copyEnquiry}
                      className="inline-flex cursor-pointer items-center gap-2 rounded-md border border-line bg-white px-3 py-2 font-bold text-blue transition-colors hover:border-blue"
                    >
                      {copied ? <Check aria-hidden className="size-4" /> : <Copy aria-hidden className="size-4" />}
                      {copied ? "Enquiry copied" : "Copy enquiry"}
                    </button>
                    <a href={buildMailto(sent)} data-testid="mailto-draft" className="font-medium text-blue underline-offset-4 hover:underline">
                      {ENQUIRY_EMAIL}
                    </a>
                  </div>
                </div>
              )}
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
