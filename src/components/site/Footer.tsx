import { Link } from "@tanstack/react-router";
import { Mail, Phone, MapPin } from "lucide-react";
import logo from "@/assets/img/hk-logo.jpg?inline";

export function Footer() {
  return (
    <footer className="bg-navy text-white/80 mt-24">
      <div className="container-x py-16 grid gap-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="bg-white inline-block rounded-sm p-3">
            <img src={logo} alt="HK Provision" className="h-14 w-auto" />
          </div>
          <p className="mt-5 max-w-md text-sm leading-relaxed">
            Saudi-based hospitality solutions company delivering premium products and
            professional services to hotels, restaurants and investors across the GCC.
          </p>
          <p className="mt-6 font-serif text-gold text-lg italic">
            Supplying Excellence. Creating Hospitality.
          </p>
        </div>

        <div>
          <h4 className="text-white text-sm font-semibold uppercase tracking-widest mb-4">Explore</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/about" className="hover:text-gold">About Us</Link></li>
            <li><Link to="/services" className="hover:text-gold">Services</Link></li>
            <li><Link to="/projects" className="hover:text-gold">Projects</Link></li>
            <li><Link to="/contact" className="hover:text-gold">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white text-sm font-semibold uppercase tracking-widest mb-4">Contact</h4>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-2"><MapPin size={16} className="text-gold mt-0.5" /> Riyadh, Saudi Arabia</li>
            <li className="flex items-start gap-2"><Phone size={16} className="text-gold mt-0.5" /> <a href="tel:+966567567063" className="hover:text-gold">+966 567 567 063</a></li>
            <li className="flex items-start gap-2"><Mail size={16} className="text-gold mt-0.5" /> <a href="mailto:info@hkprovision.com" className="hover:text-gold">info@hkprovision.com</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-x py-5 text-xs text-white/50 flex flex-col md:flex-row items-center justify-between gap-2">
          <p>© {new Date().getFullYear()} HK Provision Hospitality Solutions. All rights reserved.</p>
          <p>Hotel Supply · Consultancy · Events · Asset Management</p>
        </div>
      </div>
    </footer>
  );
}
