"use client";

import { useState } from "react";
import type { MetaData } from "@/lib/types";
import { getDomain } from "@/lib/metaUtils";

interface OGPreviewProps {
  data: MetaData;
}

const PLACEHOLDER_IMAGE = "/og-default.png";

export default function OGPreview({ data }: OGPreviewProps) {
  const [imgError, setImgError] = useState(false);

  const imageUrl = data.ogImage && !imgError ? data.ogImage : PLACEHOLDER_IMAGE;
  const domain   = getDomain(data.url || "https://example.com");
  const siteName = data.siteName || domain.toUpperCase();
  const title    = data.title || "Page Title";
  const desc     = data.description
    ? data.description.slice(0, 120) + (data.description.length > 120 ? "…" : "")
    : "Page description will appear here.";

  return (
    <div className="space-y-3">
      {/* Facebook/LinkedIn card */}
      <div
        className="rounded-xl overflow-hidden max-w-[500px] mx-auto"
        style={{
          background: "rgba(15,23,19,0.55)",
          backdropFilter: "blur(14px)",
          border: "1px solid rgba(111,163,122,0.18)",
          boxShadow: "0 12px 48px rgba(0,0,0,0.40)",
        }}
        id="og-card-preview"
      >
        {/* OG Image */}
        <div
          className="relative overflow-hidden"
          style={{ aspectRatio: "1.91/1", background: "rgba(10,10,26,0.80)" }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imageUrl}
            alt="OG Image"
            className="w-full h-full object-cover"
            onError={() => setImgError(true)}
          />
          {/* Subtle corner glows */}
          <div
            className="absolute top-0 left-0 w-32 h-32 pointer-events-none"
            style={{ background: "radial-gradient(circle at top left, rgba(111,163,122,0.15) 0%, transparent 70%)" }}
          />
          <div
            className="absolute bottom-0 right-0 w-24 h-24 pointer-events-none"
            style={{ background: "radial-gradient(circle at bottom right, rgba(205,138,75,0.12) 0%, transparent 70%)" }}
          />
        </div>

        {/* Card content */}
        <div
          className="px-4 py-4"
          style={{ borderTop: "1px solid rgba(111,163,122,0.14)" }}
        >
          {/* Site name */}
          <p
            className="mono mb-1"
            style={{ fontSize: "9px", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--moss-500)" }}
          >
            {siteName}
          </p>
          {/* Moss accent rule */}
          <div className="moss-rule mb-2.5" style={{ opacity: 0.3 }} />

          {/* Title */}
          <h3
            className="text-sm font-bold leading-snug mb-1.5 line-clamp-2"
            style={{ color: "rgba(245,240,232,0.94)", fontFamily: "'Space Grotesk', sans-serif", letterSpacing: "-0.02em" }}
            id="og-preview-title"
          >
            {title}
          </h3>

          {/* Description */}
          <p
            className="text-xs leading-relaxed line-clamp-2"
            style={{ color: "rgba(245,240,232,0.55)", fontFamily: "'Inter', sans-serif" }}
            id="og-preview-desc"
          >
            {desc}
          </p>

          {/* Domain */}
          <p
            className="mono mt-2.5"
            style={{ fontSize: "9px", letterSpacing: "0.1em", color: "rgba(111,163,122,0.45)", textTransform: "uppercase" }}
          >
            {domain}
          </p>
        </div>

        {/* Facebook action bar */}
        <div
          className="flex items-center gap-4 px-4 py-2.5"
          style={{
            borderTop: "1px solid rgba(111,163,122,0.10)",
            background: "rgba(10,10,18,0.30)",
          }}
        >
          {[
            {
              label: "Like",
              icon: (
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3H14z" />
                  <path d="M7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
                </svg>
              ),
            },
            {
              label: "Comment",
              icon: (
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
              ),
            },
            {
              label: "Share",
              icon: (
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
                  <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                  <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                </svg>
              ),
            },
          ].map(({ label, icon }) => (
            <button
              key={label}
              className="flex items-center gap-1.5 text-xs font-medium transition-colors hover:opacity-80"
              style={{ color: "rgba(245,240,232,0.40)", fontFamily: "'Space Grotesk', sans-serif" }}
            >
              {icon}
              {label}
            </button>
          ))}
        </div>
      </div>

      <p className="text-xs text-center mono" style={{ color: "var(--text-tertiary)", fontSize: "10px", letterSpacing: "0.05em" }}>
        FACEBOOK &amp; LINKEDIN PREVIEW
      </p>
    </div>
  );
}
