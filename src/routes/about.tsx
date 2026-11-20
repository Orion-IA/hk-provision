import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { seo } from "@/lib/seo";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import lobby from "@/assets/img/lobby.jpg";
import { Award, Handshake, Sparkles, ShieldCheck, Users2, Heart } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => seo({
    title: "About HK Provision | Hospitality Experts in Saudi Arabia",
    description:
      "Decades of international hospitality expertise combined with a trusted supplier network. Discover the story, mission and values behind HK Provision in Riyadh.",
    path: "/about",
  }),
  component: About,
});

const values = [
  { icon: Award, t: "Excellence", d: "Uncompromising quality in every product and service." },
  { icon: ShieldCheck, t: "Integrity", d: "Transparent, principled and accountable partnerships." },
  { icon: Handshake, t: "Reliability", d: "Consistent delivery, on schedule and on brand." },
  { icon: Sparkles, t: "Innovation", d: "Forward-thinking solutions for modern hospitality." },
  { icon: Users2, t: "Partnership", d: "Aligned with owner and operator objectives." },
  { icon: Heart, t: "Customer Focus", d: "Guest satisfaction guides every decision." },
];

function About() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="About HK Provision"
        title="Hospitality expertise, GCC roots."
        subtitle="A Saudi-based partner delivering integrated hospitality advisory and supply services across the Kingdom and the wider Gulf."
      />

      <section className="py-24 bg-white">
        <div className="container-x grid gap-16 md:grid-cols-2 items-start">
          <Reveal variant="left">
            <p className="eyebrow">Our Story</p>
            <h2 className="mt-4 text-4xl text-navy">From concept to execution.</h2>
            <span className="gold-rule mt-6" />
            <div className="mt-6 space-y-5 text-muted-foreground leading-relaxed">
              <p>
                HK Provision was founded to bring together the two capabilities the region's
                hospitality projects need most: premium supply and seasoned advisory.
              </p>
              <p>
                Combining decades of international hospitality expertise with a trusted global
                supplier network, we help hotels, restaurants, resorts and investors launch new
                properties, upgrade operations, and source with confidence.
              </p>
              <p>
                Our positioning aligns with the growing demand for integrated hospitality
                advisory and supply services across the GCC — a market undergoing one of the
                world's most ambitious tourism expansions.
              </p>
            </div>
          </Reveal>
          <Reveal variant="right" delay={150}>
            <img src={lobby} alt="Elegant hotel lobby representing HK Provision hospitality projects" loading="lazy" decoding="async" className="w-full h-[560px] object-cover rounded-sm" width={1600} height={1200} />
          </Reveal>
        </div>
      </section>

      <section className="py-24 bg-cream">
        <div className="container-x grid gap-10 md:grid-cols-2">
          <Reveal variant="up" className="bg-white p-10 border-t-4 border-gold block">
            <p className="eyebrow">Our Mission</p>
            <h3 className="mt-4 font-serif text-3xl text-navy leading-tight">
              To provide innovative hospitality solutions that help our clients enhance
              guest satisfaction, optimize operations and create sustainable business growth.
            </h3>
          </Reveal>
          <Reveal variant="up" delay={150} className="bg-navy text-white p-10 border-t-4 border-gold block">
            <p className="eyebrow">Our Vision</p>
            <h3 className="mt-4 font-serif text-3xl leading-tight">
              To become one of the GCC's most trusted hospitality solutions providers — recognized
              for quality, integrity, innovation and exceptional customer service.
            </h3>
          </Reveal>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="container-x">
          <Reveal className="text-center max-w-xl mx-auto block">
            <p className="eyebrow">Core Values</p>
            <h2 className="mt-4 text-4xl text-navy">The principles behind our work.</h2>
            <span className="gold-rule mt-6" />
          </Reveal>
          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {values.map((v, idx) => (
              <Reveal key={v.t} variant="up" delay={idx * 100} className="p-8 border border-border hover:border-gold transition-colors block">
                <v.icon className="text-gold" size={32} strokeWidth={1.3} />
                <h4 className="mt-5 font-serif text-2xl text-navy">{v.t}</h4>
                <p className="mt-2 text-sm text-muted-foreground">{v.d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
