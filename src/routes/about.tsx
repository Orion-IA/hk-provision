import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import lobby from "@/assets/lobby.jpg.asset.json";
import { Award, Handshake, Sparkles, ShieldCheck, Users2, Heart } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us | HK Provision Hospitality Solutions" },
      { name: "description", content: "Decades of international hospitality expertise combined with a reliable supplier network across Saudi Arabia and the GCC." },
      { property: "og:title", content: "About HK Provision" },
      { property: "og:description", content: "Our story, mission, vision and the core values driving HK Provision." },
      { property: "og:type", content: "website" },
    ],
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
          <div>
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
          </div>
          <img src={lobby.url} alt="Hospitality" className="w-full h-[560px] object-cover rounded-sm" width={1600} height={1200} loading="lazy" />
        </div>
      </section>

      <section className="py-24 bg-cream">
        <div className="container-x grid gap-10 md:grid-cols-2">
          <div className="bg-white p-10 border-t-4 border-gold">
            <p className="eyebrow">Our Mission</p>
            <h3 className="mt-4 font-serif text-3xl text-navy leading-tight">
              To provide innovative hospitality solutions that help our clients enhance
              guest satisfaction, optimize operations and create sustainable business growth.
            </h3>
          </div>
          <div className="bg-navy text-white p-10 border-t-4 border-gold">
            <p className="eyebrow">Our Vision</p>
            <h3 className="mt-4 font-serif text-3xl leading-tight">
              To become one of the GCC's most trusted hospitality solutions providers — recognized
              for quality, integrity, innovation and exceptional customer service.
            </h3>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="container-x">
          <div className="text-center max-w-xl mx-auto">
            <p className="eyebrow">Core Values</p>
            <h2 className="mt-4 text-4xl text-navy">The principles behind our work.</h2>
            <span className="gold-rule mt-6" />
          </div>
          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {values.map((v) => (
              <div key={v.t} className="p-8 border border-border hover:border-gold transition-colors">
                <v.icon className="text-gold" size={32} strokeWidth={1.3} />
                <h4 className="mt-5 font-serif text-2xl text-navy">{v.t}</h4>
                <p className="mt-2 text-sm text-muted-foreground">{v.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
