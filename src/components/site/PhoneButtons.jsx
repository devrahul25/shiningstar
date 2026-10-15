import React from "react";
import { Link } from "react-router-dom";
import { Phone } from "lucide-react";
import { CONTACT } from "@/lib/ssfaData";
import { ENQUIRE_TO } from "@/lib/siteNav";

// Telephone first, enquiry second.
export default function PhoneButtons({ dark = false, enquire = true, enquireTo = ENQUIRE_TO }) {
  const call = "inline-flex items-center justify-center gap-2 bg-orange text-white font-bold px-6 py-3.5 rounded-full min-h-[48px] hover:bg-orange/90 transition-colors shadow-md";
  const second = dark
    ? "border-white/70 text-white hover:bg-white hover:text-charcoal"
    : "border-charcoal/20 bg-white text-charcoal hover:border-blue hover:text-blue";
  return (
    <div className="flex flex-wrap gap-3">
      <a href={CONTACT.phoneHref} className={call}><Phone size={18} /> Call {CONTACT.phone}</a>
      <a href={CONTACT.mobileHref} className={call}><Phone size={18} /> Call {CONTACT.mobile}</a>
      {enquire && (
        <Link to={enquireTo} className={`inline-flex items-center justify-center border-2 font-bold px-6 py-3 rounded-full min-h-[48px] transition-colors ${second}`}>
          Send an enquiry
        </Link>
      )}
    </div>
  );
}