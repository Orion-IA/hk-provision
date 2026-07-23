import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { PageHero } from "@/components/site/PageHero";
import { Mail, Phone, MapPin, MessageCircle, Send } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact | HK Provision Hospitality Solutions" },
      { name: "description", content: "Contact HK Provision in Riyadh — phone, email, WhatsApp. Let's discuss your hospitality project." },
      { property: "og:title", content: "Contact HK Provision" },
      { property: "og:description", content: "Reach the HK Provision team in Riyadh to discuss supply, consultancy, events or asset management." },
      { property: "og:type", content: "website" },
    ],
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
            <div>
              <p className="eyebrow">Get in touch</p>
              <h2 className="mt-4 font-serif text-3xl text-navy">Reach the HK Provision team</h2>
              <span className="gold-rule mt-4" />
            </div>

            {[
              { icon: MapPin, label: "Location", value: "Riyadh, Saudi Arabia", href: null },
              { icon: Phone, label: "Phone", value: "+966 567 567 063", href: "tel:+966567567063" },
              { icon: MessageCircle, label: "WhatsApp", value: "+966 567 567 063", href: "https://wa.me/966567567063" },
              { icon: Mail, label: "Email", value: "info@hkprovision.com", href: "mailto:info@hkprovision.com" },
            ].map((c) => (
              <div key={c.label} className="flex gap-5 items-start border-b border-border pb-6">
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
              </div>
            ))}
          </div>

          <div className="lg:col-span-3 bg-cream p-10">
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
          </div>
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
