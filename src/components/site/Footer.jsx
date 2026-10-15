import React from "react";
import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Clock, Star } from "lucide-react";
import { LOGO, CONTACT, OFSTED_BADGE } from "@/lib/ssfaData";
import { ENQUIRE_TO } from "@/lib/siteNav";
import NavItem from "@/components/site/NavItem";

const EXPLORE = [
  { label: "Home", to: "/" },
  { label: "About Us", to: "/about" },
  { label: "Meet the Team", to: "/about#team" },
  { label: "Foster With Us", to: "/foster-with-us" },
  { label: "Types of Fostering", to: "/foster-with-us#types" },
  { label: "Fostering FAQs", to: "/foster-with-us#faqs" },
  { label: "Kids Zone", to: "/kids-zone" },
  { label: "News & Events", to: "/#news" },
  { label: "Transfer to Us", to: "https://www.shiningstarsfostering.com/how-to-transfer-to-us/" },
];

export default function Footer() {
  return (
    <footer id="contact" className="bg-charcoal text-white">
      <div className="container-ss pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <div className="bg-white rounded-2xl p-3 inline-block">
              <img src={LOGO} alt="Shining Stars Fostering Agency" className="h-12 w-auto" loading="lazy" />
            </div>
            <p className="mt-4 text-white/75 text-sm leading-relaxed">
              An independent fostering agency based in Croydon, rated Outstanding by Ofsted.
            </p>
            <img src={OFSTED_BADGE} alt="Ofsted Outstanding" className="mt-5 w-20 h-20 object-contain" loading="lazy" />
          </div>

          <div>
            <h2 className="text-yellow text-sm font-bold uppercase tracking-wider mb-4">Explore</h2>
            <ul className="space-y-1 text-sm">
              {EXPLORE.map((l) => (
                <li key={l.label}>
                  <NavItem to={l.to} className="text-white/80 hover:text-yellow inline-flex items-center gap-2 py-1">
                    <Star size={11} className="text-green" />
                    {l.label}
                  </NavItem>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-yellow text-sm font-bold uppercase tracking-wider mb-4">Contact</h2>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3"><MapPin size={16} className="text-orange mt-0.5 shrink-0" /><span className="text-white/85">{CONTACT.address}</span></li>
              <li className="flex items-center gap-3"><Phone size={16} className="text-orange shrink-0" /><a href={CONTACT.phoneHref} className="text-white/85 hover:text-yellow">{CONTACT.phone}</a></li>
              <li className="flex items-center gap-3"><Phone size={16} className="text-orange shrink-0" /><a href={CONTACT.mobileHref} className="text-white/85 hover:text-yellow">{CONTACT.mobile}</a></li>
              <li className="flex items-center gap-3"><Mail size={16} className="text-orange shrink-0" /><a href={`mailto:${CONTACT.email}`} className="text-white/85 hover:text-yellow break-all">{CONTACT.email}</a></li>
              <li className="flex items-center gap-3"><Clock size={16} className="text-orange shrink-0" /><span className="text-white/85">{CONTACT.hours}</span></li>
            </ul>
          </div>

          <div>
            <h2 className="text-yellow text-sm font-bold uppercase tracking-wider mb-4">Ready to foster?</h2>
            <p className="text-white/80 text-sm mb-4">The best way to start is a friendly phone call with our team.</p>
            <div className="grid gap-3">
              <a href={CONTACT.phoneHref} className="inline-flex items-center justify-center gap-2 bg-orange text-white font-bold px-5 py-3 rounded-full hover:bg-orange/90"><Phone size={15} /> {CONTACT.phone}</a>
              <a href={CONTACT.mobileHref} className="inline-flex items-center justify-center gap-2 bg-orange text-white font-bold px-5 py-3 rounded-full hover:bg-orange/90"><Phone size={15} /> {CONTACT.mobile}</a>
              <Link to={ENQUIRE_TO} className="text-center border-2 border-white/40 text-white font-bold px-5 py-2.5 rounded-full hover:bg-white hover:text-charcoal">Send an enquiry</Link>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/15 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-white/60">
          <p>© {new Date().getFullYear()} Shining Stars Fostering Agency Ltd. Prototype for review.</p>
          <div className="flex gap-5">
            <a href="https://www.shiningstarsfostering.com/privacy-policy-shining-stars-fostering/" className="hover:text-yellow py-1">Privacy Policy</a>
            <a href="https://www.shiningstarsfostering.com/our-site-cookies/" className="hover:text-yellow py-1">Cookies</a>
            <a href="https://www.proceduresonline.com/shiningstars/index.html" className="hover:text-yellow py-1">Policies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}