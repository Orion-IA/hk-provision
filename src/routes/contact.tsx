import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { seo } from "@/lib/seo";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { Mail, Phone, MapPin, MessageCircle, Send } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/contact")({
  head: () => seo({
    title: "Contact HK Provision | Hospitality Solutions in Riyadh",
    description:
      "Contact HK Provision in Riyadh by phone, email or WhatsApp to discuss hotel supply, consultancy, events or asset management for your hospitality project.",
    path: "/contact",
  }),
  component: Contact,
});

function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <SiteLayout>
      <PageHero eyebrow="Contact" title="Let's build something remarkable." subtitle="Speak with our team about your next hospitality project — we respond within one business day." />

      <section className="py-24 bg-white">
        <div className="container-x grid gap-14 lg:grid-cols-5">
          <div className="lg:col-span-2 space-y-8">
            <Reveal variant="left">
              <p className="eyebrow">Get in touch</p>
              <h2 className="mt-4 font-serif text-3xl text-navy">Reach the HK Provision team</h2>
              <span className="gold-rule mt-4" />
            </Reveal>

            {[
              { icon: MapPin, label: "Location", value: "Riyadh, Saudi Arabia", href: null },
              { icon: Phone, label: "Phone", value: "+966 567 567 063", href: "tel:+966567567063" },
              { icon: MessageCircle, label: "WhatsApp", value: "+966 567 567 063", href: "https://wa.me/966567567063" },
              { icon: Mail, label: "Email", value: "info@hk-provision.com", href: "mailto:info@hk-provision.com" },
            ].map((c, idx) => (
              <Reveal key={c.label} variant="left" delay={idx * 100} className="flex gap-5 items-start border-b border-border pb-6">
                <div className="p-3 bg-cream">
                  <c.icon className="text-gold" size={22} />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-muted-foreground">{c.label}</p>
                  {c.href ? (
                    <a href={c.href} className="mt-1 block text-lg text-navy font-medium hover:text-gold">{c.value}</a>
                  ) : (
                    <p className="mt-1 text-lg text-navy font-medium">{c.value}</p>
                  )}
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal variant="right" delay={100} className="lg:col-span-3 bg-cream p-10 block">
            {sent ? (
              <div className="text-center py-16">
                <div className="mx-auto w-14 h-14 bg-gold flex items-center justify-center rounded-full">
                  <Send className="text-navy" />
                </div>
                <h3 className="mt-6 font-serif text-3xl text-navy">Thank you.</h3>
                <p className="mt-3 text-muted-foreground">We've received your message and will reply within one business day.</p>
              </div>
            ) : (
              <form
                onSubmit={(e) => { e.preventDefault(); setSent(true); }}
                className="space-y-5"
              >
                <p className="eyebrow">Send us a message</p>
                <h3 className="font-serif text-3xl text-navy">Tell us about your project</h3>
                <span className="gold-rule" />

                <div className="grid sm:grid-cols-2 gap-5 pt-2">
                  <Field label="Full name" name="name" required />
                  <Field label="Company" name="company" />
                  <Field label="Email" name="email" type="email" required />
                  <Field label="Phone" name="phone" type="tel" />
                </div>

                <div>
                  <label className="text-xs uppercase tracking-widest text-navy font-semibold">Interested in</label>
                  <select className="mt-2 w-full bg-white border border-border px-4 py-3 text-navy focus:outline-none focus:border-gold">
                    <option>Hotel Supply</option>
                    <option>Hospitality Consultancy</option>
                    <option>Events Management</option>
                    <option>Asset Management</option>
                    <option>Other</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs uppercase tracking-widest text-navy font-semibold">Message</label>
                  <textarea rows={5} required className="mt-2 w-full bg-white border border-border px-4 py-3 text-navy focus:outline-none focus:border-gold" />
                </div>

                <button type="submit" className="btn-gold w-full sm:w-auto">
                  Send message <Send size={16} />
                </button>
              </form>
            )}
          </Reveal>
        </div>
      </section>
    </SiteLayout>
  );
}

function Field({ label, name, type = "text", required = false }: { label: string; name: string; type?: string; required?: boolean }) {
  return (
    <div>
      <label className="text-xs uppercase tracking-widest text-navy font-semibold">{label}{required && <span className="text-gold"> *</span>}</label>
      <input name={name} type={type} required={required} className="mt-2 w-full bg-white border border-border px-4 py-3 text-navy focus:outline-none focus:border-gold" />
    </div>
  );
}
