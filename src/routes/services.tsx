import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { Building2, Users, CalendarRange, LineChart, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services | HK Provision Hospitality Solutions" },
      { name: "description", content: "Hotel supply, hospitality consultancy, events management and asset management — one integrated partner." },
      { property: "og:title", content: "Our Services — HK Provision" },
      { property: "og:description", content: "Explore the four pillars of HK Provision: Supply, Consultancy, Events and Asset Management." },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Services,
});

const pillars = [
  {
    id: "supply",
    icon: Building2,
    title: "Hotel Supplies",
    intro: "Premium hospitality products sourced through a trusted global network.",
    items: [
      "Guest amenities",
      "Linen & housekeeping supplies",
      "F&B equipment and operating supplies",
      "Kitchen equipment",
      "Restaurant & banquet supplies",
      "Uniforms",
      "Guest room accessories",
      "OS&E and FF&E sourcing",
    ],
  },
  {
    id: "consultancy",
    icon: Users,
    title: "Hospitality Consultancy",
    intro: "Professional advisory to elevate operations and unlock value.",
    items: [
      "Hotel operational audits",
      "Pre-opening support",
      "SOP development",
      "Staff training",
      "Revenue optimization",
      "Cost control",
      "Procurement consulting",
      "Brand standards implementation",
    ],
  },
  {
    id: "events",
    icon: CalendarRange,
    title: "Events Management",
    intro: "Planning and flawless execution of signature moments.",
    items: [
      "Corporate events",
      "Hotel openings",
      "Conferences",
      "Product launches",
      "Executive meetings",
      "Private functions",
      "Hospitality exhibitions",
    ],
  },
  {
    id: "asset",
    icon: LineChart,
    title: "Asset Management",
    intro: "Protecting owners' interests while improving long-term profitability.",
    items: [
      "Owner representation",
      "Operational performance reviews",
      "Financial analysis",
      "Asset optimization",
      "Budget monitoring",
      "CAPEX planning",
      "Investment advisory",
    ],
  },
];

function Services() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Our Services"
        title="Four pillars of hospitality excellence."
        subtitle="Integrated supply, advisory, events and asset management — tailored to your project and delivered with rigor."
      />

      <nav className="bg-cream border-b border-border sticky top-[73px] z-30">
        <div className="container-x flex flex-wrap justify-center gap-x-8 gap-y-3 py-4 text-sm">
          {pillars.map((p) => (
            <a key={p.id} href={`#${p.id}`} className="text-navy font-medium hover:text-gold uppercase tracking-widest text-xs">
              {p.title}
            </a>
          ))}
        </div>
      </nav>

      {pillars.map((p, i) => (
        <section
          key={p.id}
          id={p.id}
          className={`py-24 ${i % 2 === 0 ? "bg-white" : "bg-cream"} scroll-mt-32`}
        >
          <div className="container-x grid gap-14 md:grid-cols-5 items-start">
            <Reveal variant="left" className="md:col-span-2 block">
              <p className="eyebrow">0{i + 1} / 04</p>
              <p.icon className="text-gold mt-6" size={48} strokeWidth={1.2} />
              <h2 className="mt-6 font-serif text-4xl text-navy">{p.title}</h2>
              <span className="gold-rule mt-4" />
              <p className="mt-5 text-muted-foreground leading-relaxed">{p.intro}</p>
            </Reveal>
            <ul className="md:col-span-3 grid sm:grid-cols-2 gap-3">
              {p.items.map((it, idx) => (
                <Reveal as="li" key={it} variant="up" delay={idx * 60} className="flex items-start gap-3 bg-white p-5 border border-border">
                  <span className="mt-1 h-2 w-2 shrink-0 bg-gold rounded-full" />
                  <span className="text-navy text-sm font-medium">{it}</span>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>
      ))}

      <section className="py-20 bg-navy text-white">
        <div className="container-x flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
          <div>
            <h3 className="font-serif text-3xl">Have a project in mind?</h3>
            <p className="mt-2 text-white/70">Let's design a tailored hospitality solution together.</p>
          </div>
          <Link to="/contact" className="btn-gold">Start a conversation <ArrowRight size={16} /></Link>
        </div>
      </section>
    </SiteLayout>
  );
}
