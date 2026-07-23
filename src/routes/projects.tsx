import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projects | HK Provision Hospitality Solutions" },
      { name: "description", content: "Selected hospitality projects and partnerships — coming soon." },
      { property: "og:title", content: "Projects — HK Provision" },
      { property: "og:description", content: "A curated portfolio of hospitality projects across the GCC. Coming soon." },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Projects,
});

function Projects() {
  return (
    <SiteLayout>
      <PageHero eyebrow="Portfolio" title="Projects" subtitle="A curated selection of hospitality projects and partnerships across the region." />

      <section className="py-32 bg-white">
        <div className="container-x">
          <Reveal variant="zoom" className="max-w-2xl mx-auto text-center border border-border p-14 bg-cream/50 block">
            <p className="eyebrow">Coming Soon</p>
            <h2 className="mt-4 font-serif text-4xl md:text-5xl text-navy">
              Our portfolio is being crafted.
            </h2>
            <span className="gold-rule mt-6" />
            <p className="mt-6 text-muted-foreground">
              We're preparing a showcase of the hotels, restaurants and hospitality
              investors we've had the privilege to partner with. Check back soon —
              or reach out to discuss your project directly.
            </p>
            <Link to="/contact" className="mt-8 inline-flex btn-gold">
              Get in touch <ArrowRight size={16} />
            </Link>
          </Reveal>
        </div>
      </section>
    </SiteLayout>
  );
}
