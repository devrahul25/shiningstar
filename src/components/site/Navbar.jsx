import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone, ChevronDown } from "lucide-react";
import { LOGO, CONTACT } from "@/lib/ssfaData";
import { MENU, ENQUIRE_TO } from "@/lib/siteNav";
import NavItem from "@/components/site/NavItem";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  const isActive = (to) => to === pathname;

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/95 backdrop-blur-md shadow-md" : "bg-white"}`}>
      <nav className="container-ss flex items-center justify-between h-[72px]" aria-label="Main">
        <Link to="/" className="shrink-0" aria-label="Shining Stars Fostering, home">
          <img src={LOGO} alt="Shining Stars Fostering Agency" className="h-11 w-auto" width="320" height="80" />
        </Link>

        <ul className="flex max-xl:hidden items-center gap-6">
          {MENU.map((item) => (
            <li key={item.label} className="relative group">
              <NavItem
                to={item.to}
                className={`inline-flex items-center gap-1 py-6 text-[15px] font-semibold transition-colors hover:text-blue ${isActive(item.to) ? "text-blue" : "text-charcoal/80"}`}
              >
                {item.label}
                {item.children && <ChevronDown size={14} />}
              </NavItem>
              {item.children && (
                <ul className="absolute left-0 top-full w-64 bg-white rounded-2xl soft-shadow ring-1 ring-border p-2 hidden group-hover:block group-focus-within:block">
                  {item.children.map((c) => (
                    <li key={c.label}>
                      <NavItem to={c.to} className="block px-4 py-2.5 rounded-xl text-sm font-semibold text-charcoal/80 hover:bg-sky hover:text-blue">
                        {c.label}
                      </NavItem>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <a href={CONTACT.phoneHref} className="hidden sm:inline-flex items-center gap-2 bg-orange text-white font-bold text-sm px-5 py-3 rounded-full hover:bg-orange/90 transition-colors shadow-sm">
            <Phone size={15} />
            {CONTACT.phone}
          </a>
          <Link to={ENQUIRE_TO} className="inline-flex max-xl:hidden items-center border-2 border-charcoal/15 text-charcoal font-bold text-sm px-5 py-2.5 rounded-full hover:border-blue hover:text-blue transition-colors">
            Enquire
          </Link>
          <button className="xl:hidden text-charcoal p-2" onClick={() => setOpen(!open)} aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open}>
            {open ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="xl:hidden bg-white border-t border-border max-h-[calc(100vh-72px)] overflow-y-auto">
          <ul className="container-ss py-4">
            {MENU.map((item) => (
              <li key={item.label}>
                <NavItem to={item.to} onClick={() => setOpen(false)} className={`block py-3 text-base font-bold ${isActive(item.to) ? "text-blue" : "text-charcoal"}`}>
                  {item.label}
                </NavItem>
                {item.children && (
                  <ul className="pl-4 border-l-2 border-sky mb-2">
                    {item.children.map((c) => (
                      <li key={c.label}>
                        <NavItem to={c.to} onClick={() => setOpen(false)} className="block py-2.5 text-[15px] font-semibold text-charcoal/70 hover:text-blue">
                          {c.label}
                        </NavItem>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
            <li className="mt-4 grid gap-3">
              <a href={CONTACT.phoneHref} className="inline-flex items-center justify-center gap-2 bg-orange text-white font-bold px-5 py-3.5 rounded-full"><Phone size={16} /> Call {CONTACT.phone}</a>
              <a href={CONTACT.mobileHref} className="inline-flex items-center justify-center gap-2 bg-orange text-white font-bold px-5 py-3.5 rounded-full"><Phone size={16} /> Call {CONTACT.mobile}</a>
              <Link to={ENQUIRE_TO} onClick={() => setOpen(false)} className="inline-flex items-center justify-center border-2 border-charcoal/15 text-charcoal font-bold px-5 py-3 rounded-full">Send an enquiry</Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}