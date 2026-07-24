import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { Reveal } from "@/components/site/Reveal";
import hero from "@/assets/riyadh-hero.jpg.asset.json";
import lobby from "@/assets/lobby.jpg.asset.json";
import { Building2, Users, CalendarRange, LineChart, ArrowRight, CheckCircle2, MapPin, Phone, Mail, Compass, ClipboardList, Handshake, Sparkles, Quote, Globe2 } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "HK Provision — Hospitality Solutions. Delivered." },
      { name: "description", content: "Premium hotel supply, hospitality consultancy, events and asset management from Riyadh, serving the Kingdom and the GCC." },
      { property: "og:title", content: "HK Provision — Hospitality Solutions. Delivered." },
      { property: "og:description", content: "Trusted hospitality partner from concept to execution — supply, consultancy, events and asset management." },
      { property: "og:image", content: `https://id-preview--a2fd2b8d-9922-41c1-8636-9da30c25d595.lovable.app${hero.url}` },
      { name: "twitter:image", content: `https://id-preview--a2fd2b8d-9922-41c1-8636-9da30c25d595.lovable.app${hero.url}` },
    ],
  }),
  component: Home,
});

const services = [
  { icon: Building2, title: "Hotel Supply", desc: "Guest amenities, linen, F&B, kitchen and FF&E sourcing.", to: "/services" },
  { icon: Users, title: "Consultancy", desc: "Operational audits, SOPs, pre-opening and training.", to: "/services" },
  { icon: CalendarRange, title: "Events", desc: "Hotel openings, conferences and executive functions.", to: "/services" },
  { icon: LineChart, title: "Asset Management", desc: "Owner representation, CAPEX planning and advisory.", to: "/services" },
];

function Home() {
  return (
    <SiteLayout>
      {/* HERO */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden">
        <img
          src={hero.url}
          alt="Riyadh skyline at dusk"
          className="absolute inset-0 h-full w-full object-cover animate-hero-ken"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-deep/95 via-navy/80 to-navy/40" />
        <div className="absolute inset-y-0 left-0 w-1 bg-gold hidden md:block" />

        <div className="container-x relative py-24 text-white">
          <p className="eyebrow animate-float-up" style={{ animationDelay: "100ms" }}>Riyadh · Saudi Arabia</p>
          <h1 className="mt-6 font-serif text-5xl md:text-7xl leading-[1.05] max-w-4xl animate-float-up" style={{ animationDelay: "250ms" }}>
            Hospitality Solutions. <span className="text-gold italic">Delivered.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-white/80 leading-relaxed animate-float-up" style={{ animationDelay: "450ms" }}>
            Premium products and professional services for hotels, restaurants, resorts
            and hospitality investors — from concept to execution.
          </p>
          <div className="mt-10 flex flex-wrap gap-4 animate-float-up" style={{ animationDelay: "650ms" }}>
            <Link to="/services" className="btn-gold">Our Services <ArrowRight size={16} /></Link>
            <Link to="/contact" className="btn-outline-light">Contact Us</Link>
          </div>

          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl border-t border-white/15 pt-8 animate-float-up" style={{ animationDelay: "850ms" }}>
            {["Hotel Supply", "Consultancy", "Events", "Asset Management"].map((p) => (
              <div key={p} className="text-xs md:text-sm uppercase tracking-[0.2em] text-white/70 font-medium">
                <span className="text-gold mr-2">●</span>{p}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section className="py-24 md:py-32 bg-white">
        <div className="container-x grid gap-16 md:grid-cols-2 items-center">
          <Reveal variant="left">
            <p className="eyebrow">About HK Provision</p>
            <h2 className="mt-4 text-4xl md:text-5xl text-navy">
              A trusted hospitality partner from concept to execution.
            </h2>
            <span className="gold-rule mt-6" />
            <p className="mt-6 text-muted-foreground leading-relaxed">
              HK Provision is a Saudi-based hospitality solutions company dedicated to
              supporting hotels, restaurants, resorts and hospitality investors with
              premium products and professional services.
            </p>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Combining decades of international hospitality expertise with a reliable
              supplier network, we deliver tailored solutions that enhance guest
              experiences, improve operational efficiency, and maximize asset value.
            </p>
            <Link to="/about" className="mt-8 inline-flex items-center gap-2 text-navy font-medium border-b-2 border-gold pb-1 hover:text-gold transition-colors">
              Discover our story <ArrowRight size={16} />
            </Link>
          </Reveal>
          <Reveal variant="right" delay={150} className="relative">
            <img src={lobby.url} alt="Luxury hotel lobby" className="w-full h-[520px] object-cover rounded-sm" width={1600} height={1200} loading="lazy" />
            <div className="absolute -bottom-6 -left-6 bg-gold text-navy p-6 max-w-[220px] hidden md:block">
              <p className="font-serif text-3xl leading-none">GCC</p>
              <p className="mt-2 text-xs uppercase tracking-widest font-semibold">Regional reach & network</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-24 md:py-32 bg-cream">
        <div className="container-x">
          <Reveal className="text-center max-w-2xl mx-auto block">
            <p className="eyebrow">Our Services</p>
            <h2 className="mt-4 text-4xl md:text-5xl text-navy">Four pillars, one integrated partner.</h2>
            <span className="gold-rule mt-6" />
          </Reveal>
          <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {services.map((s, idx) => (
              <Reveal key={s.title} variant="up" delay={idx * 120}>
                <Link to={s.to} className="group bg-white p-8 border border-border hover:border-gold transition-all hover:-translate-y-1 duration-300 block h-full">
                  <s.icon className="text-gold" size={36} strokeWidth={1.2} />
                  <h3 className="mt-6 font-serif text-2xl text-navy">{s.title}</h3>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                  <span className="mt-6 inline-flex items-center gap-2 text-xs uppercase tracking-widest text-gold font-semibold">
                    Learn more <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* WHY */}
      <section className="py-24 md:py-32 bg-navy text-white">
        <div className="container-x grid gap-16 md:grid-cols-2 items-center">
          <Reveal variant="left">
            <p className="eyebrow">Why HK Provision</p>
            <h2 className="mt-4 text-4xl md:text-5xl">Excellence, delivered end-to-end.</h2>
            <span className="gold-rule mt-6" />
            <p className="mt-6 text-white/70 leading-relaxed">
              Whether launching a new property, upgrading operations or sourcing
              high-quality hospitality products — we align every detail with your
              brand standards and business objectives.
            </p>
          </Reveal>
          <ul className="space-y-5">
            {[
              { t: "Premium Products", d: "Curated FF&E and OS&E from a trusted global supplier network." },
              { t: "Expert Advice", d: "International operators and hoteliers with GCC market fluency." },
              { t: "Trusted Partnership", d: "Transparent process from concept to opening and beyond." },
              { t: "Sustainable Value", d: "Solutions that protect owner interests and grow long-term profitability." },
            ].map((i, idx) => (
              <Reveal as="li" key={i.t} variant="right" delay={idx * 120} className="flex gap-4 border-b border-white/10 pb-5">
                <CheckCircle2 className="text-gold shrink-0" size={22} />
                <div>
                  <h4 className="font-serif text-xl text-white">{i.t}</h4>
                  <p className="text-sm text-white/60 mt-1">{i.d}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* STATS */}
      <section className="py-20 bg-white border-y border-border">
        <div className="container-x grid grid-cols-2 md:grid-cols-4 gap-10">
          {[
            { k: "20+", l: "Years of combined expertise" },
            { k: "150+", l: "Trusted global suppliers" },
            { k: "40+", l: "Hospitality projects delivered" },
            { k: "6", l: "GCC markets served" },
          ].map((s, idx) => (
            <Reveal key={s.l} variant="up" delay={idx * 120} className="text-center block">
              <p className="font-serif text-5xl md:text-6xl text-navy">{s.k}</p>
              <span className="gold-rule mt-4" />
              <p className="mt-3 text-xs md:text-sm uppercase tracking-[0.2em] text-muted-foreground">{s.l}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* PROCESS */}
      <section className="py-24 md:py-32 bg-cream">
        <div className="container-x">
          <Reveal className="text-center max-w-2xl mx-auto block">
            <p className="eyebrow">Our Approach</p>
            <h2 className="mt-4 text-4xl md:text-5xl text-navy">A disciplined path from vision to delivery.</h2>
            <span className="gold-rule mt-6" />
            <p className="mt-6 text-muted-foreground leading-relaxed">
              Every engagement follows a proven four-step methodology designed to align execution with your standards, timeline and returns.
            </p>
          </Reveal>
          <div className="mt-16 grid gap-6 md:grid-cols-4">
            {[
              { icon: Compass, step: "01", title: "Discover", desc: "Deep dive into brand, positioning and operational objectives." },
              { icon: ClipboardList, step: "02", title: "Design", desc: "Tailored scope, sourcing plan and specifications aligned with budget." },
              { icon: Handshake, step: "03", title: "Deliver", desc: "Coordinated execution with trusted partners and transparent reporting." },
              { icon: Sparkles, step: "04", title: "Elevate", desc: "Continuous improvement, training and asset performance follow-up." },
            ].map((s, idx) => (
              <Reveal key={s.title} variant="up" delay={idx * 130}>
                <div className="relative bg-white p-8 border border-border h-full hover:border-gold transition-colors duration-300">
                  <span className="absolute top-6 right-6 font-serif text-4xl text-gold/40">{s.step}</span>
                  <s.icon className="text-gold" size={34} strokeWidth={1.2} />
                  <h3 className="mt-6 font-serif text-2xl text-navy">{s.title}</h3>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24 md:py-32 bg-white">
        <div className="container-x">
          <Reveal className="text-center max-w-2xl mx-auto block">
            <p className="eyebrow">Client Voices</p>
            <h2 className="mt-4 text-4xl md:text-5xl text-navy">Trusted by hospitality leaders.</h2>
            <span className="gold-rule mt-6" />
          </Reveal>
          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {[
              { q: "HK Provision transformed our pre-opening — from sourcing to SOPs, every detail was handled with precision.", a: "General Manager", r: "5-star resort, Riyadh" },
              { q: "A rare combination of international standards and deep GCC market fluency. A truly reliable partner.", a: "Hospitality Investor", r: "Jeddah" },
              { q: "Their event execution for our launch was flawless. Elegant, on brand, and delivered on time.", a: "Marketing Director", r: "Luxury hotel group" },
            ].map((t, idx) => (
              <Reveal key={t.a} variant="up" delay={idx * 140}>
                <figure className="bg-cream p-8 h-full border-l-2 border-gold">
                  <Quote className="text-gold" size={28} strokeWidth={1.2} />
                  <blockquote className="mt-5 text-navy font-serif text-xl leading-snug">"{t.q}"</blockquote>
                  <figcaption className="mt-6 pt-5 border-t border-border">
                    <p className="text-navy font-semibold text-sm">{t.a}</p>
                    <p className="text-xs uppercase tracking-widest text-muted-foreground mt-1">{t.r}</p>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* REACH */}
      <section className="py-24 bg-navy text-white overflow-hidden">
        <div className="container-x grid gap-14 md:grid-cols-2 items-center">
          <Reveal variant="left">
            <p className="eyebrow">Regional Reach</p>
            <h2 className="mt-4 text-4xl md:text-5xl">Rooted in Riyadh. Active across the GCC.</h2>
            <span className="gold-rule mt-6" />
            <p className="mt-6 text-white/70 leading-relaxed">
              From flagship hotels in the Kingdom to resorts and mixed-use developments across the Gulf,
              we bring an international supplier network and hands-on local expertise to every project.
            </p>
          </Reveal>
          <Reveal variant="right" delay={150}>
            <div className="grid grid-cols-2 gap-4">
              {["Saudi Arabia", "United Arab Emirates", "Qatar", "Bahrain", "Kuwait", "Oman"].map((c) => (
                <div key={c} className="flex items-center gap-3 border border-white/15 px-5 py-4 hover:border-gold transition-colors">
                  <Globe2 className="text-gold shrink-0" size={18} />
                  <span className="text-sm tracking-wide">{c}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA CONTACT */}
      <section className="py-24 md:py-28 bg-white">
        <div className="container-x">
          <Reveal variant="zoom" className="border border-border p-10 md:p-16 bg-cream/50 grid md:grid-cols-3 gap-10 items-center block">
            <div className="md:col-span-2">
              <p className="eyebrow">Let's talk</p>
              <h2 className="mt-3 text-3xl md:text-4xl text-navy">Ready to elevate your property?</h2>
              <p className="mt-4 text-muted-foreground max-w-xl">
                Speak with our team about supply, consultancy, events or asset management —
                tailored to your project.
              </p>
              <div className="mt-6 flex flex-wrap gap-6 text-sm text-navy">
                <span className="flex items-center gap-2"><MapPin className="text-gold" size={16} /> Riyadh, KSA</span>
                <span className="flex items-center gap-2"><Phone className="text-gold" size={16} /> +966 567 567 063</span>
                <span className="flex items-center gap-2"><Mail className="text-gold" size={16} /> info@hkprovision.com</span>
              </div>
            </div>
            <div className="flex md:justify-end">
              <Link to="/contact" className="btn-gold">Get in touch <ArrowRight size={16} /></Link>
            </div>
          </Reveal>
        </div>
      </section>
    </SiteLayout>
  );
}
