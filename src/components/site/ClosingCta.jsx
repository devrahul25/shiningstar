import React from "react";
import PhoneButtons from "@/components/site/PhoneButtons";

export default function ClosingCta({ id, title, text, enquire = true, enquireTo }) {
  return (
    <section id={id} className="bg-gradient-to-br from-blue to-purple/80 py-16 md:py-24 scroll-mt-24">
      <div className="container-ss text-center max-w-3xl">
        <h2 className="display-section text-white text-balance">{title}</h2>
        {text && <p className="mt-4 text-lg text-white/90">{text}</p>}
        <div className="mt-8 flex justify-center">
          <PhoneButtons dark enquire={enquire} enquireTo={enquireTo} />
        </div>
      </div>
    </section>
  );
}