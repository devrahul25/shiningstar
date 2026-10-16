import React from "react";
import { useParams, Link } from "react-router-dom";
import { useWordPressPost } from "@/hooks/useWordPressData";
import SEO from "@/components/SEO";
import PageHero from "@/components/site/PageHero";
import ClosingCta from "@/components/site/ClosingCta";
import EnquirySection from "@/components/site/EnquirySection";
import { ArrowLeft, Calendar, User, Tag, Rss, Loader2 } from "lucide-react";
import { HERO_IMGS } from "@/lib/pagesContent";

export default function SinglePost() {
  const { slug } = useParams();
  const { data: post, isLoading, isError } = useWordPressPost(slug);

  if (isLoading) {
    return (
      <main className="min-h-[60vh] flex flex-col items-center justify-center p-12">
        <Loader2 className="w-10 h-10 text-blue animate-spin mb-4" />
        <p className="text-charcoal/70 font-semibold text-lg">Loading article from WordPress...</p>
      </main>
    );
  }

  if (isError || !post) {
    return (
      <main className="min-h-[60vh] flex flex-col items-center justify-center p-12 text-center container-ss">
        <SEO title="Article Not Found" description="The requested article could not be found." />
        <h1 className="text-3xl font-display font-bold text-charcoal mb-4">Article Not Found</h1>
        <p className="text-charcoal/70 max-w-md mb-8">
          The article you are looking for does not exist or may have been relocated.
        </p>
        <Link
          to="/news"
          className="inline-flex items-center gap-2 bg-blue text-white px-6 py-3 rounded-full font-bold hover:bg-orange transition-colors"
        >
          <ArrowLeft size={16} /> Back to News & Updates
        </Link>
      </main>
    );
  }

  return (
    <main>
      <SEO
        title={post.title}
        description={post.excerpt || `Read "${post.title}" on the Shining Stars Fostering website.`}
        image={post.image}
      />

      <PageHero
        eyebrow="News & Updates"
        title={post.title}
        intro={post.excerpt}
        img={post.image || HERO_IMGS.about}
        imgAlt={post.imageAlt || post.title}
      >
        <div className="flex flex-wrap items-center gap-3">
          <Link
            to="/news"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-white/80 hover:text-white transition-colors bg-white/10 px-3 py-1.5 rounded-full backdrop-blur"
          >
            <ArrowLeft size={13} /> All News
          </Link>
          {post.isWpLive && (
            <span className="inline-flex items-center gap-1 text-xs font-bold bg-green/20 text-emerald-300 px-3 py-1.5 rounded-full backdrop-blur">
              <Rss size={12} /> Live from WordPress
            </span>
          )}
          {post.formattedDate && (
            <span className="inline-flex items-center gap-1 text-xs text-white/80 bg-white/10 px-3 py-1.5 rounded-full backdrop-blur">
              <Calendar size={13} /> {post.formattedDate}
            </span>
          )}
          <span className="inline-flex items-center gap-1 text-xs text-white/80 bg-white/10 px-3 py-1.5 rounded-full backdrop-blur">
            <User size={13} /> By {post.author}
          </span>
        </div>
      </PageHero>

      {/* Article Content Section */}
      <article className="bg-white py-16 md:py-24">
        <div className="container-ss max-w-4xl mx-auto">
          {/* Categories / Tags bar */}
          {(post.categories?.length > 0 || post.tags?.length > 0) && (
            <div className="flex flex-wrap items-center gap-2 mb-10 pb-6 border-b border-border">
              {post.categories.map((c) => (
                <span
                  key={c.slug}
                  className="inline-flex items-center gap-1 text-xs font-bold text-blue bg-blue/10 px-3 py-1 rounded-full"
                >
                  <Tag size={12} /> {c.name}
                </span>
              ))}
              {post.tags?.map((t) => (
                <span
                  key={t.slug}
                  className="text-xs font-semibold text-charcoal/60 bg-slate-100 px-2.5 py-1 rounded-full"
                >
                  #{t.name}
                </span>
              ))}
            </div>
          )}

          {/* Featured Image display if not in hero */}
          {post.image && (
            <div className="mb-12 rounded-3xl overflow-hidden shadow-lg border border-border">
              <img
                src={post.image}
                alt={post.imageAlt || post.title}
                className="w-full max-h-[500px] object-cover"
              />
            </div>
          )}

          {/* Sanitized Content Body */}
          {post.content ? (
            <div
              className="prose prose-slate lg:prose-lg max-w-none text-charcoal/80 leading-relaxed space-y-6 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:font-display [&_h2]:text-charcoal [&_h2]:mt-10 [&_h2]:mb-4 [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-charcoal [&_h3]:mt-8 [&_h3]:mb-3 [&_p]:leading-relaxed [&_img]:rounded-3xl [&_img]:my-6 [&_img]:shadow-md [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_a]:text-blue [&_a]:font-bold hover:[&_a]:text-orange"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          ) : (
            <div className="bg-sky/40 p-8 rounded-3xl text-center">
              <p className="text-charcoal/70">No content is available for this article.</p>
            </div>
          )}

          <div className="mt-16 pt-8 border-t border-border flex items-center justify-between">
            <Link
              to="/news"
              className="inline-flex items-center gap-2 text-blue font-bold hover:text-orange transition-colors"
            >
              <ArrowLeft size={16} /> Back to all articles
            </Link>
          </div>
        </div>
      </article>

      <ClosingCta
        title="Inspired by what you've read?"
        text="Discover how you can make a meaningful difference in a child's life with Shining Stars Fostering."
      />
      <EnquirySection />
    </main>
  );
}
