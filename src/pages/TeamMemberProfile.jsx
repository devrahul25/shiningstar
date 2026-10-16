import React from "react";
import { useParams, Link } from "react-router-dom";
import { useWordPressTeamMember } from "@/hooks/useWordPressData";
import SEO from "@/components/SEO";
import PageHero from "@/components/site/PageHero";
import ClosingCta from "@/components/site/ClosingCta";
import EnquirySection from "@/components/site/EnquirySection";
import { ArrowLeft, Rss, User, ShieldCheck, Loader2 } from "lucide-react";
import { HERO_IMGS } from "@/lib/pagesContent";

export default function TeamMemberProfile() {
  const { slug } = useParams();
  const { data: member, isLoading, isError } = useWordPressTeamMember(slug);

  if (isLoading) {
    return (
      <main className="min-h-[60vh] flex flex-col items-center justify-center p-12">
        <Loader2 className="w-10 h-10 text-blue animate-spin mb-4" />
        <p className="text-charcoal/70 font-semibold text-lg">Loading team member profile...</p>
      </main>
    );
  }

  if (isError || !member) {
    return (
      <main className="min-h-[60vh] flex flex-col items-center justify-center p-12 text-center container-ss">
        <SEO title="Team Member Not Found" description="The requested team member profile could not be found." />
        <h1 className="text-3xl font-display font-bold text-charcoal mb-4">Team Member Not Found</h1>
        <p className="text-charcoal/70 max-w-md mb-8">
          The team profile for <code className="bg-slate-100 px-2 py-1 rounded text-sm text-blue">{slug}</code> could not be found.
        </p>
        <Link
          to="/team"
          className="inline-flex items-center gap-2 bg-blue text-white px-6 py-3 rounded-full font-bold hover:bg-orange transition-colors"
        >
          <ArrowLeft size={16} /> Return to Team Directory
        </Link>
      </main>
    );
  }

  return (
    <main>
      <SEO
        title={`${member.name} — ${member.title}`}
        description={`Learn more about ${member.name}, ${member.title} at Shining Stars Fostering Agency.`}
        image={member.img}
      />

      <PageHero
        eyebrow="Team Profile"
        title={member.name}
        intro={member.title}
        img={member.img || HERO_IMGS.about}
        imgAlt={`${member.name}, ${member.title}`}
      >
        <div className="flex flex-wrap items-center gap-3">
          <Link
            to="/team"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-white/80 hover:text-white transition-colors bg-white/10 px-3 py-1.5 rounded-full backdrop-blur"
          >
            <ArrowLeft size={13} /> All Team Members
          </Link>
          {member.isWpLive && (
            <span className="inline-flex items-center gap-1 text-xs font-bold bg-green/20 text-emerald-300 px-3 py-1.5 rounded-full backdrop-blur">
              <Rss size={12} /> JetEngine CPT
            </span>
          )}
          <span className="inline-flex items-center gap-1 text-xs text-white/80 bg-white/10 px-3 py-1.5 rounded-full backdrop-blur">
            <ShieldCheck size={13} /> SSFA Staff
          </span>
        </div>
      </PageHero>

      {/* Main Profile Section */}
      <section className="bg-white py-16 md:py-24">
        <div className="container-ss max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
            {/* Left Column: Portrait Card */}
            <div className="bg-mint/30 rounded-3xl p-6 border border-mint/60 soft-shadow text-center">
              <div className="aspect-square rounded-2xl overflow-hidden bg-sky mb-4 shadow-sm">
                <img
                  src={member.img}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h2 className="text-xl font-bold font-display text-charcoal">{member.name}</h2>
              <p className="text-sm font-semibold text-blue mt-1">{member.title}</p>
              <div className="mt-6 pt-6 border-t border-border flex justify-center">
                <Link
                  to="/foster-with-us#enquire"
                  className="inline-flex items-center gap-2 bg-orange text-white text-xs font-bold px-4 py-2.5 rounded-full hover:bg-orange/90 transition-colors shadow-sm"
                >
                  Contact Our Team
                </Link>
              </div>
            </div>

            {/* Right Column: Bio / Overview */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <User className="text-blue" size={20} />
                <h3 className="text-2xl font-bold font-display text-charcoal">About {member.name}</h3>
              </div>

              {member.bio ? (
                <div
                  className="prose prose-slate max-w-none text-charcoal/80 leading-relaxed space-y-4 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-charcoal [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-charcoal [&_h3]:mt-6 [&_h3]:mb-2 [&_p]:leading-relaxed [&_a]:text-blue [&_a]:font-bold hover:[&_a]:text-orange"
                  dangerouslySetInnerHTML={{ __html: member.bio }}
                />
              ) : (
                <p className="text-charcoal/70 leading-relaxed">
                  {member.name} is an integral member of our fostering family, dedicated to supporting carers and children throughout London and the surrounding areas.
                </p>
              )}

              <div className="mt-12 pt-8 border-t border-border">
                <Link
                  to="/team"
                  className="inline-flex items-center gap-2 text-blue font-bold text-sm hover:text-orange transition-colors"
                >
                  <ArrowLeft size={16} /> Back to all team members
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ClosingCta
        title="Ready to speak with our fostering team?"
        text="Our team of dedicated social workers is ready to guide and support you."
      />
      <EnquirySection />
    </main>
  );
}
