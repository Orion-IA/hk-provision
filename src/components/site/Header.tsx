import { Link } from "@tanstack/react-router";
import { useState } from "react";
import logo from "@/assets/img/hk-logo.jpg?inline";
import { Menu, X } from "lucide-react";

const nav = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/projects", label: "Projects" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-border">
      <div className="container-x flex items-center justify-between py-4">
        <Link to="/" className="flex items-center gap-3">
          <img src={logo} alt="HK Provision" className="h-12 w-auto" />
        </Link>
        <nav className="hidden md:flex items-center gap-9">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="text-sm font-medium text-navy hover:text-gold transition-colors [&.active]:text-gold"
              activeProps={{ className: "active" }}
              activeOptions={{ exact: n.to === "/" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <Link to="/contact" className="hidden md:inline-flex btn-gold !py-2.5 !px-5 !text-xs">
          Get in touch
        </Link>
        <button
          className="md:hidden text-navy"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t border-border bg-white">
          <div className="container-x py-4 flex flex-col gap-3">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="text-sm font-medium text-navy py-2"
              >
                {n.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
