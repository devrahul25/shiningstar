import React from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowLeft, Home } from "lucide-react";

export default function PageNotFound() {
  const location = useLocation();
  const pageName = location.pathname.substring(1);

  return (
    <div className="min-h-[70vh] flex items-center justify-center p-6 bg-slate-50">
      <div className="max-w-md w-full text-center space-y-6">
        {/* 404 Error Code */}
        <div className="space-y-2">
          <h1 className="text-7xl font-display font-bold text-slate-300">404</h1>
          <div className="h-0.5 w-16 bg-blue mx-auto" />
        </div>

        {/* Main Message */}
        <div className="space-y-3">
          <h2 className="text-2xl font-bold font-display text-charcoal">
            Page Not Found
          </h2>
          <p className="text-charcoal/70 leading-relaxed text-sm">
            The page <span className="font-semibold text-blue">"{pageName}"</span> could not be found.
          </p>
        </div>

        {/* Action Button */}
        <div className="pt-4 flex items-center justify-center gap-3">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-white bg-blue rounded-full hover:bg-orange transition-colors shadow-sm"
          >
            <Home size={15} />
            Go to Homepage
          </Link>
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-charcoal/80 bg-white border border-slate-200 rounded-full hover:bg-slate-100 transition-colors"
          >
            <ArrowLeft size={15} />
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}