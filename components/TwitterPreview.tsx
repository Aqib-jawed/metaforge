"use client";

import { useState } from "react";
import type { MetaData } from "@/lib/types";
import { getDomain, normaliseHandle } from "@/lib/metaUtils";

interface TwitterPreviewProps {
  data: MetaData;
}

const PLACEHOLDER_IMAGE = "/og-default.png";

export default function TwitterPreview({ data }: TwitterPreviewProps) {
  const [imgError, setImgError] = useState(false);

  const imageUrl = data.ogImage && !imgError ? data.ogImage : PLACEHOLDER_IMAGE;
  const domain = getDomain(data.url || "https://example.com");
  const handle = normaliseHandle(data.twitterHandle);
  const title  = data.title || "Page Title";
  const desc   = data.description
    ? data.description.slice(0, 100) + (data.description.length > 100 ? "…" : "")
    : "Page description will appear here.";

  return (
    <div className="space-y-3">
      {/* Twitter/X card */}
      <div
        className="rounded-2xl overflow-hidden max-w-[500px] mx-auto"
        style={{
          background: "rgba(15,23,19,0.55)",
          backdropFilter: "blur(14px)",
          border: "1px solid rgba(111,163,122,0.18)",
          boxShadow: "0 12px 48px rgba(0,0,0,0.4)",
        }}
        id="twitter-card-preview"
      >
        {/* Image area */}
        <div
          className="relative overflow-hidden"
          style={{ aspectRatio: "2/1", background: "rgba(10,10,26,0.80)" }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imageUrl}
            alt="OG Preview"
            className="w-full h-full object-cover"
            onError={() => setImgError(true)}
            style={{ display: "block" }}
          />
          {/* Gradient overlay */}
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(to top, rgba(10,10,26,0.85) 0%, rgba(10,10,26,0.30) 50%, transparent 100%)",
            }}
          />
          {/* Amber top-right glow */}
          <div
            className="absolute top-0 right-0 w-24 h-24 pointer-events-none"
            style={{ background: "radial-gradient(circle at top right, rgba(205,138,75,0.20) 0%, transparent 70%)" }}
          />
          {/* Title + desc overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <p className="text-white text-sm font-bold leading-tight line-clamp-2 mb-1"
               style={{ fontFamily: "'Space Grotesk', sans-serif", textShadow: "0 1px 4px rgba(0,0,0,0.6)" }}>
              {title}
            </p>
            <p className="text-xs line-clamp-2 leading-relaxed" style={{ color: "rgba(245,240,232,0.65)" }}>
              {desc}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div
          className="flex items-center gap-3 px-4 py-3"
          style={{ borderTop: "1px solid rgba(111,163,122,0.14)" }}
        >
          {/* X logo */}
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
            style={{ background: "rgba(111,163,122,0.10)", border: "1px solid rgba(111,163,122,0.18)" }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" style={{ color: "rgba(245,240,232,0.80)" }}>
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.738l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.91-5.622Zm-1.161 17.52h1.833L7.084 4.126H5.117Z" />
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold truncate" style={{ color: "rgba(245,240,232,0.90)", fontFamily: "'Space Grotesk', sans-serif" }}>
              {handle || domain}
            </p>
            <p className="text-xs truncate mono" style={{ color: "var(--moss-500)", fontSize: "10px" }}>
              {domain}
            </p>
          </div>
          {/* Card badge */}
          <span
            className="mono shrink-0"
            style={{
              fontSize: "9px",
              letterSpacing: "0.06em",
              padding: "2px 8px",
              borderRadius: "9999px",
              background: "rgba(111,163,122,0.10)",
              border: "1px solid rgba(111,163,122,0.20)",
              color: "var(--moss-400)",
            }}
          >
            CARD
          </span>
        </div>
      </div>

      {/* Note */}
      <p className="text-xs text-center mono" style={{ color: "var(--text-tertiary)", fontSize: "10px", letterSpacing: "0.05em" }}>
        TWITTER / X LINK PREVIEW
      </p>
    </div>
  );
}
