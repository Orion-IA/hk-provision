// Canonical origin used for canonical URLs, Open Graph, sitemap and robots.
// Override at build time with VITE_SITE_URL (no trailing slash).
export const SITE_URL = (import.meta.env.VITE_SITE_URL || "https://www.hk-provision.com").replace(/\/+$/, "");

export const SITE_NAME = "HK Provision";
export const DEFAULT_OG_IMAGE = "/og-image.jpg";

export const CONTACT = {
  phone: "+966567567063",
  email: "info@hk-provision.com",
  city: "Riyadh",
  country: "SA",
};

export function absoluteUrl(path: string) {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

interface SeoOptions {
  title: string;
  description: string;
  path: string;
  image?: string;
  imageAlt?: string;
  noindex?: boolean;
}

// Builds the per-page meta tags and canonical link for a route's head().
export function seo({ title, description, path, image = DEFAULT_OG_IMAGE, imageAlt, noindex }: SeoOptions) {
  const url = absoluteUrl(path);
  const imageUrl = image.startsWith("http") ? image : absoluteUrl(image);
  const alt = imageAlt ?? `${SITE_NAME} — Hospitality Solutions in Saudi Arabia`;

  return {
    meta: [
      { title },
      { name: "description", content: description },
      { name: "robots", content: noindex ? "noindex, nofollow" : "index, follow, max-image-preview:large" },
      { property: "og:site_name", content: SITE_NAME },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "en_US" },
      { property: "og:url", content: url },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:image", content: imageUrl },
      { property: "og:image:width", content: "1920" },
      { property: "og:image:height", content: "1080" },
      { property: "og:image:alt", content: alt },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: imageUrl },
      { name: "twitter:image:alt", content: alt },
    ],
    links: [{ rel: "canonical", href: url }],
  };
}

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      legalName: "HK Provision Hospitality Solutions",
      url: SITE_URL,
      logo: absoluteUrl("/favicon.png"),
      email: CONTACT.email,
      telephone: CONTACT.phone,
      slogan: "Supplying Excellence. Creating Hospitality.",
      areaServed: ["SA", "AE", "QA", "KW", "BH", "OM"],
      contactPoint: {
        "@type": "ContactPoint",
        telephone: CONTACT.phone,
        email: CONTACT.email,
        contactType: "customer service",
        areaServed: ["SA", "AE", "QA", "KW", "BH", "OM"],
        availableLanguage: ["English", "Arabic"],
      },
    },
    {
      "@type": "ProfessionalService",
      "@id": `${SITE_URL}/#business`,
      name: SITE_NAME,
      url: SITE_URL,
      image: absoluteUrl(DEFAULT_OG_IMAGE),
      telephone: CONTACT.phone,
      email: CONTACT.email,
      parentOrganization: { "@id": `${SITE_URL}/#organization` },
      address: {
        "@type": "PostalAddress",
        addressLocality: CONTACT.city,
        addressCountry: CONTACT.country,
      },
      areaServed: { "@type": "Place", name: "Gulf Cooperation Council (GCC)" },
      knowsAbout: [
        "Hotel supply",
        "OS&E and FF&E sourcing",
        "Hospitality consultancy",
        "Hotel pre-opening",
        "Events management",
        "Hotel asset management",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      publisher: { "@id": `${SITE_URL}/#organization` },
      inLanguage: "en",
    },
  ],
};
