import React from "react";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { CONTACT } from "@/lib/ssfaData";
import SectionHeading from "@/components/site/SectionHeading";

export default function OfficeContact() {
  const rows = [
    { icon: MapPin, content: CONTACT.address },
    { icon: Phone, content: <><a href={CONTACT.phoneHref} className="hover:text-blue font-semibold">{CONTACT.phone}</a> / <a href={CONTACT.mobileHref} className="hover:text-blue font-semibold">{CONTACT.mobile}</a></> },
    { icon: Mail, content: <a href={`mailto:${CONTACT.email}`} className="hover:text-blue font-semibold break-all">{CONTACT.email}</a> },
    { icon: Clock, content: CONTACT.hours },
  ];
  return (
    <section id="office" className="bg-mint/50 py-16 md:py-24 scroll-mt-24">
      <div className="container-ss grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        <SectionHeading eyebrow="Visit or call" color="green" title="Our office in Croydon."
          intro="Our main office is in Croydon. Please call before visiting so we can make sure the right person is available to meet you." />
        <div className="bg-white rounded-3xl p-7 soft-shadow">
          <ul className="space-y-5 text-charcoal/85">
            {rows.map(({ icon: Icon, content }, i) => (
              <li key={i} className="flex items-start gap-4">
                <span className="w-10 h-10 rounded-full bg-blue/10 text-blue flex items-center justify-center shrink-0"><Icon size={18} /></span>
                <span className="pt-2">{content}</span>
              </li>
            ))}
          </ul>
          <a href={CONTACT.mapHref} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-2 bg-blue text-white font-bold px-6 py-3 rounded-full hover:bg-blue/90">
            <MapPin size={16} /> Open in Google Maps
          </a>
        </div>
      </div>
    </section>
  );
}