import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone, ChevronDown, Sparkles } from "lucide-react";
import { LOGO, CONTACT } from "@/lib/ssfaData";
import { MENU, ENQUIRE_TO } from "@/lib/siteNav";
import NavItem from "@/components/site/NavItem";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState({});
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const toggleMobileSubmenu = (label) => {
    setMobileExpanded((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  const isItemActive = (item) => {
    if (pathname === item.to) return true;
    if (item.children?.some((c) => c.to === pathname || pathname.startsWith(c.to))) return true;
    if (item.columns?.some((col) => col.items?.some((c) => c.to === pathname || pathname.startsWith(c.to)))) return true;
    return false;
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/95 backdrop-blur-md shadow-md" : "bg-white border-b border-slate-100"
      }`}
    >
      <nav
        className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-[76px] gap-4"
        aria-label="Main Navigation"
      >
        {/* Brand Logo */}
        <Link to="/" className="shrink-0 flex items-center py-2" aria-label="Shining Stars Fostering, Home">
          <img
            src={LOGO}
            alt="Shining Stars Fostering Agency"
            className="h-10 sm:h-11 w-auto object-contain"
            width="320"
            height="80"
          />
        </Link>

        {/* Desktop Navigation - Clean, uncrowded single-line items with whitespace-nowrap */}
        <ul className="hidden xl:flex items-center gap-1 2xl:gap-2 shrink-0">
          {MENU.map((item, idx) => {
            const hasSub = Boolean(item.children || item.columns);
            const active = isItemActive(item);
            // Dropdowns near the right edge (like News & More) align to the right to avoid edge clipping
            const isNearRightEdge = idx >= MENU.length - 2;

            return (
              <li key={item.label} className="relative group">
                <NavItem
                  to={item.to}
                  className={`inline-flex items-center gap-1 px-3 py-6 text-[15px] font-semibold whitespace-nowrap transition-colors duration-200 hover:text-blue ${
                    active ? "text-blue font-bold" : "text-charcoal/80"
                  }`}
                >
                  <span className="whitespace-nowrap">{item.label}</span>
                  {hasSub && (
                    <ChevronDown
                      size={13}
                      className="transition-transform duration-200 group-hover:rotate-180 opacity-60 group-hover:opacity-100 shrink-0"
                    />
                  )}
                </NavItem>

                {/* ──────────────────────────────────────────────────────────
                    MEGA-DROPDOWN (Two-column layout for Foster With Us)
                    ────────────────────────────────────────────────────────── */}
                {item.columns && (
                  <div className="absolute left-1/2 -translate-x-1/2 top-full pt-1 hidden group-hover:block group-focus-within:block z-50">
                    <div className="w-[560px] bg-white rounded-2xl shadow-xl ring-1 ring-slate-200/90 p-5 max-h-[80vh] overflow-y-auto">
                      <div className="grid grid-cols-2 gap-5">
                        {item.columns.map((col) => (
                          <div key={col.title}>
                            <div className="flex items-center gap-1.5 pb-2 mb-2 border-b border-slate-100 text-[11px] font-bold uppercase tracking-wider text-charcoal/45">
                              <Sparkles size={13} className="text-orange shrink-0" />
                              <span className="whitespace-nowrap">{col.title}</span>
                            </div>
                            <ul className="space-y-0.5">
                              {col.items.map((sub) => (
                                <li key={sub.label}>
                                  <NavItem
                                    to={sub.to}
                                    className={`block px-3 py-1.5 rounded-lg text-[13.5px] font-medium transition-colors whitespace-nowrap ${
                                      pathname === sub.to
                                        ? "bg-sky/50 text-blue font-semibold"
                                        : "text-charcoal/80 hover:bg-sky/40 hover:text-blue"
                                    }`}
                                  >
                                    {sub.label}
                                  </NavItem>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* ──────────────────────────────────────────────────────────
                    STANDARD DROPDOWN (About Us, Kids Zone, News & More)
                    ────────────────────────────────────────────────────────── */}
                {item.children && !item.columns && (
                  <div
                    className={`absolute ${
                      isNearRightEdge ? "right-0" : "left-0"
                    } top-full pt-1 hidden group-hover:block group-focus-within:block z-50`}
                  >
                    <ul
                      className={`bg-white rounded-2xl shadow-xl ring-1 ring-slate-200/90 p-2.5 ${
                        item.children.length > 7 ? "w-80 max-h-[80vh] overflow-y-auto" : "w-72"
                      }`}
                    >
                      {item.children.map((sub) => (
                        <li key={sub.label}>
                          <NavItem
                            to={sub.to}
                            className={`block px-4 py-2 rounded-xl text-[13.5px] font-medium transition-colors whitespace-nowrap ${
                              pathname === sub.to
                                ? "bg-sky/50 text-blue font-semibold"
                                : "text-charcoal/80 hover:bg-sky/40 hover:text-blue"
                            }`}
                          >
                            {sub.label}
                          </NavItem>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            );
          })}
        </ul>

        {/* Right CTAs & Mobile Hamburger */}
        <div className="shrink-0 flex items-center gap-2.5 sm:gap-3">
          <a
            href={CONTACT.phoneHref}
            className="hidden sm:inline-flex items-center gap-2 bg-orange text-white font-bold text-sm px-5 py-2.5 rounded-full hover:bg-orange/90 transition-all shadow-sm hover:shadow whitespace-nowrap shrink-0"
          >
            <Phone size={15} className="shrink-0" />
            <span>{CONTACT.phone}</span>
          </a>
          <Link
            to={ENQUIRE_TO}
            className="inline-flex items-center border-2 border-charcoal/15 text-charcoal font-bold text-sm px-5 py-2 rounded-full hover:border-blue hover:text-blue transition-colors whitespace-nowrap shrink-0"
          >
            Send an enquiry
          </Link>
          <button
            className="xl:hidden text-charcoal p-2 rounded-lg hover:bg-slate-100 transition-colors"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </nav>

      {/* ──────────────────────────────────────────────────────────────
          MOBILE DRAWER (Responsive, expandable accordion navigation)
          ────────────────────────────────────────────────────────────── */}
      {open && (
        <div className="xl:hidden bg-white border-t border-slate-200 max-h-[calc(100vh-76px)] overflow-y-auto shadow-2xl">
          <div className="max-w-[1360px] mx-auto px-5 py-5 space-y-2">
            {MENU.map((item) => {
              const hasSub = Boolean(item.children || item.columns);
              const isExpanded = Boolean(mobileExpanded[item.label]);

              return (
                <div key={item.label} className="border-b border-slate-100 last:border-none pb-2">
                  <div className="flex items-center justify-between">
                    <NavItem
                      to={item.to}
                      onClick={() => setOpen(false)}
                      className={`py-2.5 text-base font-bold transition-colors ${
                        pathname === item.to ? "text-blue" : "text-charcoal"
                      }`}
                    >
                      {item.label}
                    </NavItem>
                    {hasSub && (
                      <button
                        type="button"
                        onClick={() => toggleMobileSubmenu(item.label)}
                        className="p-2 text-charcoal/60 hover:text-blue"
                        aria-label={`Toggle ${item.label} sub-menu`}
                      >
                        <ChevronDown
                          size={18}
                          className={`transition-transform duration-200 ${isExpanded ? "rotate-180 text-blue" : ""}`}
                        />
                      </button>
                    )}
                  </div>

                  {/* Mobile Submenu: Multi-column */}
                  {hasSub && isExpanded && item.columns && (
                    <div className="pl-3 pr-1 py-2 space-y-4 bg-slate-50/70 rounded-xl my-1 border-l-2 border-blue">
                      {item.columns.map((col) => (
                        <div key={col.title}>
                          <p className="text-xs font-bold uppercase tracking-wider text-charcoal/40 mb-1 px-2">
                            {col.title}
                          </p>
                          <ul className="space-y-1">
                            {col.items.map((sub) => (
                              <li key={sub.label}>
                                <NavItem
                                  to={sub.to}
                                  onClick={() => setOpen(false)}
                                  className="block py-1.5 px-2 text-[14px] font-medium text-charcoal/75 hover:text-blue"
                                >
                                  {sub.label}
                                </NavItem>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Mobile Submenu: Single-column */}
                  {hasSub && isExpanded && item.children && !item.columns && (
                    <ul className="pl-3 py-2 space-y-1 bg-slate-50/70 rounded-xl my-1 border-l-2 border-blue">
                      {item.children.map((sub) => (
                        <li key={sub.label}>
                          <NavItem
                            to={sub.to}
                            onClick={() => setOpen(false)}
                            className="block py-1.5 px-2 text-[14px] font-medium text-charcoal/75 hover:text-blue"
                          >
                            {sub.label}
                          </NavItem>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              );
            })}

            {/* Mobile Call-To-Action buttons */}
            <div className="pt-4 grid gap-3">
              <a
                href={CONTACT.phoneHref}
                className="inline-flex items-center justify-center gap-2 bg-orange text-white font-bold px-5 py-3 rounded-full shadow-sm"
              >
                <Phone size={16} /> Call {CONTACT.phone}
              </a>
              <Link
                to={ENQUIRE_TO}
                onClick={() => setOpen(false)}
                className="inline-flex items-center justify-center border-2 border-charcoal/20 text-charcoal font-bold px-5 py-2.5 rounded-full hover:border-blue hover:text-blue"
              >
                Send an enquiry
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}