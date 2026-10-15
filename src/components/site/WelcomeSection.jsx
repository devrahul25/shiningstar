import React from "react";
import { MISSION_IMG, VALUES_IMG, CHILDREN_FUTURE_IMG } from "@/lib/ssfaData";

const PILLARS = [
  {
    img: MISSION_IMG,
    title: "Our Mission",
    body: "To provide a fostering service that is quality-driven and changes the lives of all those attached to it for the better — focusing on the security and well-being of children through a stable, nurturing home environment.",
    color: "blue",
  },
  {
    img: VALUES_IMG,
    title: "Our Values",
    body: "We are committed to services that address and exceed government targets for outcomes for children. Our ethos is respect and the celebration of diversity, promoting equal opportunities in all we do.",
    color: "green",
  },
  {
    img: CHILDREN_FUTURE_IMG,
    title: "Children's Future",
    body: "Our strong, stable and caring family environment model places children with carers who truly have faith in children — and in their future, regardless of the circumstances they have been through.",
    color: "orange",
  },
];

const ring = {
  blue: "ring-blue/30",
  green: "ring-green/30",
  orange: "ring-orange/30",
};

export default function WelcomeSection() {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="container-ss">
        <div className="max-w-3xl">
          <p className="text-blue font-bold text-sm uppercase tracking-[0.2em] mb-3">
            Welcome to Shining Stars
          </p>
          <h2 className="display-section text-charcoal text-balance">
            Bringing a fresh perspective to foster care.
          </h2>
          <p className="mt-5 text-lg text-charcoal/70 leading-relaxed">
            We are an independent fostering agency based in Croydon, supporting
            foster families across London and the surrounding counties, with the
            aim of welcoming foster carers from across England. We are determined
            to make a difference to the lives of children by placing them at the
            heart of a community which values them and supports their needs. Set
            up and run by two experienced social workers with over 25 years of
            combined fostering experience, we are a family — and you will be
            warmly welcomed as part of it.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-7">
          {PILLARS.map((p) => (
            <article
              key={p.title}
              className="bg-mint/40 rounded-3xl p-7 hover:-translate-y-1 transition-transform duration-300 soft-shadow"
            >
              <div className={`rounded-2xl overflow-hidden ring-4 ${ring[p.color]} aspect-[4/3] bg-white`}>
                <img src={p.img} alt={p.title} className="w-full h-full object-cover" loading="lazy" />
              </div>
              <h3 className={`text-2xl mt-5 ${p.color === "blue" ? "text-blue" : p.color === "green" ? "text-green" : "text-orange"}`}>
                {p.title}
              </h3>
              <p className="mt-2 text-charcoal/70 leading-relaxed">{p.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}