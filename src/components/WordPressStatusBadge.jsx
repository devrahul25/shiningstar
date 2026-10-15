import React, { useState, useEffect } from "react";
import { testWordPressConnection, WORDPRESS_GRAPHQL_URL } from "@/api/wordpressClient";
import { CheckCircle2, AlertCircle, RefreshCw, X, Database } from "lucide-react";

export default function WordPressStatusBadge() {
  const [status, setStatus] = useState({ checking: true, connected: false, error: null, siteTitle: "" });
  const [open, setOpen] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  const checkConnection = async () => {
    setStatus((prev) => ({ ...prev, checking: true }));
    const result = await testWordPressConnection();
    setStatus({
      checking: false,
      connected: result.connected,
      error: result.error || null,
      siteTitle: result.siteTitle || "",
      siteUrl: result.siteUrl || "",
    });
  };

  useEffect(() => {
    checkConnection();
  }, []);

  if (dismissed) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 font-sans">
      {!open ? (
        <button
          onClick={() => setOpen(true)}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-full shadow-lg border backdrop-blur text-xs font-semibold transition-all hover:scale-105 ${
            status.checking
              ? "bg-white/95 text-charcoal border-slate-200"
              : status.connected
              ? "bg-emerald-50 text-emerald-800 border-emerald-200"
              : "bg-amber-50 text-amber-900 border-amber-200"
          }`}
          title="Click to check WordPress GraphQL connection"
        >
          <Database size={13} className={status.connected ? "text-emerald-600" : "text-amber-600"} />
          <span>
            {status.checking
              ? "Testing WP GraphQL..."
              : status.connected
              ? "WP Connected"
              : "WP Fallback Mode"}
          </span>
          <span
            className={`w-2 h-2 rounded-full ${
              status.checking
                ? "bg-slate-400 animate-ping"
                : status.connected
                ? "bg-emerald-500"
                : "bg-amber-500"
            }`}
          />
        </button>
      ) : (
        <div className="w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 p-5 text-charcoal text-xs animate-in fade-in slide-in-from-bottom-2">
          <div className="flex items-start justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Database size={16} className="text-blue" />
              <h3 className="font-bold text-sm text-charcoal">WordPress GraphQL Status</h3>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={checkConnection}
                disabled={status.checking}
                className="p-1 rounded-md hover:bg-slate-100 text-slate-500 transition-colors"
                title="Re-check connection"
              >
                <RefreshCw size={14} className={status.checking ? "animate-spin" : ""} />
              </button>
              <button
                onClick={() => setOpen(false)}
                className="p-1 rounded-md hover:bg-slate-100 text-slate-500 transition-colors"
              >
                <X size={14} />
              </button>
            </div>
          </div>

          <div className="mt-3 space-y-2.5">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Endpoint URL</span>
              <p className="font-mono text-[11px] text-slate-700 break-all bg-slate-50 p-2 rounded-lg border border-slate-100 mt-1">
                {WORDPRESS_GRAPHQL_URL}
              </p>
            </div>

            <div className="flex items-center gap-2 pt-1">
              {status.connected ? (
                <>
                  <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
                  <span className="text-emerald-800 font-semibold">
                    Successfully connected to {status.siteTitle || "WordPress"}!
                  </span>
                </>
              ) : (
                <>
                  <AlertCircle size={16} className="text-amber-500 shrink-0" />
                  <span className="text-amber-800 font-medium">
                    Currently using safe local fallback data.
                  </span>
                </>
              )}
            </div>

            {status.error && (
              <div className="bg-red-50 border border-red-100 rounded-lg p-2.5 text-red-700 text-[11px] leading-relaxed">
                <span className="font-bold block mb-0.5">Connection Notice:</span>
                {status.error.includes("Failed to fetch") || status.error.includes("NetworkError")
                  ? "CORS or unreachable domain. Ensure WPGraphQL is active and CORS is permitted."
                  : status.error}
              </div>
            )}

            <div className="bg-sky/40 rounded-xl p-3 text-slate-700 text-[11px] leading-relaxed">
              <p className="font-bold text-blue mb-1">To connect your WordPress:</p>
              <ol className="list-decimal list-inside space-y-1 text-slate-600">
                <li>Create or edit <code className="bg-white px-1 py-0.5 rounded border border-slate-200">.env.local</code> in project root</li>
                <li>Set <code className="bg-white px-1 py-0.5 rounded border border-slate-200">VITE_WORDPRESS_GRAPHQL_URL=...</code></li>
                <li>Ensure Pretty Permalinks and WPGraphQL plugin are active</li>
              </ol>
            </div>

            <div className="pt-2 flex justify-between items-center text-[11px] text-slate-400">
              <button
                onClick={() => setDismissed(true)}
                className="hover:text-slate-600 underline"
              >
                Hide badge
              </button>
              <span className="text-[10px]">Auto-fallback enabled</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
