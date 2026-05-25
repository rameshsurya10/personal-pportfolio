"use client";
import { useRef, useState } from "react";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import { site } from "@/content/site";
import { Button } from "@/components/ui/Button";

const sitekey =
  process.env.NEXT_PUBLIC_HCAPTCHA_SITEKEY ?? "10000000-ffff-ffff-ffff-000000000001";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useToast } from "@/components/ui/Toast";
import { Reveal } from "@/components/sections/Reveal";
import { validateContact, type ContactFields, type ContactErrors } from "@/lib/validateContact";

const EMPTY_FIELDS: ContactFields = { name: "", email: "", subject: "", message: "" };

const linkedIn = site.socials.find((s) => s.icon === "linkedin");

const contactMethods = [
  {
    label: "Email",
    href: `mailto:${site.email}`,
    value: site.email,
    external: false,
  },
  {
    label: "WhatsApp",
    href: `https://wa.me/${site.whatsapp}`,
    value: "Message me on WhatsApp",
    external: true,
  },
  ...(linkedIn
    ? [{ label: "LinkedIn", href: linkedIn.href, value: site.name, external: true }]
    : []),
];

const inputBase =
  "w-full border-b border-border bg-transparent py-3 text-base text-ink placeholder:text-ink-muted/50 focus:border-ink focus:outline-none transition-colors";

const labelBase = "mt-6 mb-1 font-mono text-xs uppercase tracking-widest text-ink-muted block";

export function Contact() {
  const { showToast } = useToast();
  const captchaRef = useRef<HCaptcha | null>(null);

  const [fields, setFields] = useState<ContactFields>(EMPTY_FIELDS);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setFields((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof ContactFields]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const validationErrors = validateContact(fields);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    if (!captchaToken) {
      showToast("Please complete the captcha.", "error");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fields.name,
          email: fields.email,
          subject: fields.subject,
          message: fields.message,
          captchaToken,
        }),
      });
      const result = await res.json();

      if (res.ok && result.success) {
        showToast("Message sent successfully", "success");
        setFields(EMPTY_FIELDS);
        setErrors({});
        captchaRef.current?.resetCaptcha();
        setCaptchaToken(null);
      } else {
        showToast(result.error || "Couldn't send your message. Please try again.", "error");
      }
    } catch {
      showToast("Couldn't send your message. Please try again.", "error");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section id="contact" className="py-24 md:py-32 border-t border-border">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <SectionHeading index={6} eyebrow="Contact" title="Get in touch" />

        <div className="max-w-3xl mx-auto">
          <Reveal>
            <div>
              {/* Contact methods — plain text links */}
              <div className="space-y-3 mb-12 text-ink">
                {contactMethods.map((method) => (
                  <div key={method.label} className="flex items-baseline gap-3">
                    <span className="font-mono text-xs uppercase tracking-widest text-ink-muted shrink-0">
                      {method.label} →
                    </span>
                    <a
                      href={method.href}
                      target={method.external ? "_blank" : undefined}
                      rel={method.external ? "noopener noreferrer" : undefined}
                      className="text-ink hover:opacity-70 transition-opacity break-all border-b border-border pb-px"
                    >
                      {method.value}
                    </a>
                  </div>
                ))}
              </div>

              {/* Contact form */}
              <form onSubmit={handleSubmit} noValidate>
                {/* Name */}
                <div>
                  <label htmlFor="contact-name" className={labelBase}>
                    Name <span aria-hidden="true" className="opacity-60">*</span>
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    aria-required="true"
                    value={fields.name}
                    onChange={handleChange}
                    placeholder="Your full name"
                    className={`${inputBase}${errors.name ? " border-red-500" : ""}`}
                    aria-invalid={errors.name ? true : undefined}
                    aria-describedby={errors.name ? "contact-name-error" : undefined}
                  />
                  {errors.name && (
                    <p id="contact-name-error" className="mt-1 text-xs text-red-500">
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="contact-email" className={labelBase}>
                    Email <span aria-hidden="true" className="opacity-60">*</span>
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    aria-required="true"
                    value={fields.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className={`${inputBase}${errors.email ? " border-red-500" : ""}`}
                    aria-invalid={errors.email ? true : undefined}
                    aria-describedby={errors.email ? "contact-email-error" : undefined}
                  />
                  {errors.email && (
                    <p id="contact-email-error" className="mt-1 text-xs text-red-500">
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Subject */}
                <div>
                  <label htmlFor="contact-subject" className={labelBase}>
                    Subject <span aria-hidden="true" className="opacity-60">*</span>
                  </label>
                  <input
                    id="contact-subject"
                    name="subject"
                    type="text"
                    required
                    aria-required="true"
                    value={fields.subject}
                    onChange={handleChange}
                    placeholder="What's this about?"
                    className={`${inputBase}${errors.subject ? " border-red-500" : ""}`}
                    aria-invalid={errors.subject ? true : undefined}
                    aria-describedby={errors.subject ? "contact-subject-error" : undefined}
                  />
                  {errors.subject && (
                    <p id="contact-subject-error" className="mt-1 text-xs text-red-500">
                      {errors.subject}
                    </p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="contact-message" className={labelBase}>
                    Message <span aria-hidden="true" className="opacity-60">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={5}
                    required
                    aria-required="true"
                    value={fields.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project or question…"
                    className={`${inputBase} resize-none${errors.message ? " border-red-500" : ""}`}
                    aria-invalid={errors.message ? true : undefined}
                    aria-describedby={errors.message ? "contact-message-error" : undefined}
                  />
                  {errors.message && (
                    <p id="contact-message-error" className="mt-1 text-xs text-red-500">
                      {errors.message}
                    </p>
                  )}
                </div>

                {/* hCaptcha */}
                <div className="mt-8">
                  <HCaptcha
                    ref={captchaRef}
                    sitekey={sitekey}
                    onVerify={(token) => setCaptchaToken(token)}
                    onExpire={() => setCaptchaToken(null)}
                  />
                  <p className="mt-2 text-xs text-ink-muted">
                    Spam protection by hCaptcha.
                  </p>
                </div>

                {/* Submit */}
                <div className="mt-10">
                  <Button type="submit" variant="primary" disabled={submitting}>
                    {submitting ? "Sending…" : "Send message"}
                  </Button>
                </div>
              </form>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
