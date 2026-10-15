import React from "react";
import { Phone, Mail, Clock } from "lucide-react";
import { CONTACT } from "@/lib/ssfaData";

export default function TopBar() {
  return (
    <div className="bg-charcoal text-white text-sm">
      <div className="container-ss flex flex-wrap items-center justify-between gap-x-6 gap-y-1 py-2">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-1">
          <span className="inline-flex items-center gap-2">
            <Phone size={14} className="text-yellow" />
            <a href={CONTACT.phoneHref} className="hover:text-yellow py-1">{CONTACT.phone}</a>
            <span className="text-white/40">/</span>
            <a href={CONTACT.mobileHref} className="hover:text-yellow py-1">{CONTACT.mobile}</a>
          </span>
          <a href={`mailto:${CONTACT.email}`} className="hidden sm:inline-flex items-center gap-2 hover:text-yellow transition-colors">
            <Mail size={14} className="text-yellow" />
            {CONTACT.email}
          </a>
        </div>
        <div className="hidden md:inline-flex items-center gap-2 text-white/80">
          <Clock size={14} className="text-green" />
          {CONTACT.hours}
        </div>
      </div>
    </div>
  );
}