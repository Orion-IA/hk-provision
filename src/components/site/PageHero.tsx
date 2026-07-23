export function PageHero({ eyebrow, title, subtitle }: { eyebrow?: string; title: string; subtitle?: string }) {
  return (
    <section className="bg-navy text-white">
      <div className="container-x py-24 md:py-32 text-center">
        {eyebrow && <p className="eyebrow mb-5">{eyebrow}</p>}
        <h1 className="font-serif text-4xl md:text-6xl leading-tight">{title}</h1>
        <span className="gold-rule mt-6" />
        {subtitle && (
          <p className="mt-6 max-w-2xl mx-auto text-white/70 text-lg leading-relaxed">{subtitle}</p>
        )}
      </div>
    </section>
  );
}
