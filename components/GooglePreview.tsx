"use client";

import type { MetaData } from "@/lib/types";

interface GooglePreviewProps {
  data: MetaData;
}

const MAX_TITLE_CHARS = 60;
const MAX_DESC_CHARS = 160;

function truncate(str: string, max: number): { text: string; truncated: boolean } {
  if (str.length <= max) return { text: str, truncated: false };
  return { text: str.slice(0, max - 1) + "…", truncated: true };
}

function WarnBadge({ message }: { message: string }) {
  return (
    <div
      className="flex items-start gap-2.5 mt-3 px-3.5 py-2.5 rounded-xl"
      style={{
        background: "rgba(205,138,75,0.08)",
        border: "1px solid rgba(205,138,75,0.22)",
        borderLeft: "3px solid rgba(205,138,75,0.70)",
      }}
    >
      <svg width="12" height="12" className="mt-0.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="#cd8a4b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
        <line x1="12" y1="9" x2="12" y2="13" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
      <p className="text-xs leading-relaxed" style={{ color: "rgba(205,138,75,0.90)", fontFamily: "'Inter', sans-serif" }}>
        {message}
      </p>
    </div>
  );
}

export default function GooglePreview({ data }: GooglePreviewProps) {
  const { title, description, url } = data;

  const titleResult = truncate(title || "Untitled Page", MAX_TITLE_CHARS);
  const descResult  = truncate(description || "", MAX_DESC_CHARS);

  const warnings: string[] = [];
  if (!title) warnings.push("Missing title — Google won't know what to display.");
  else if (title.length < 10) warnings.push("Title is too short. Aim for 30–60 characters.");
  else if (title.length > 60) warnings.push(`Title is too long (${title.length} chars). Google may truncate it.`);

  if (!description) warnings.push("Missing meta description — Google may auto-generate one.");
  else if (description.length < 50) warnings.push("Description is too short. Aim for 100–160 characters.");
  else if (description.length > 160) warnings.push(`Description is too long (${description.length} chars). It may be cut off.`);

  let displayUrl = url || "https://example.com";
  try {
    const parsed = new URL(displayUrl);
    displayUrl = parsed.hostname + (parsed.pathname !== "/" ? parsed.pathname : "");
  } catch {
    displayUrl = url || "example.com";
  }

  return (
    <div className="space-y-3">
      {/* Google chrome mock */}
      <div
        className="rounded-xl overflow-hidden"
        style={{
          background: "rgba(255,255,255,0.96)",
          border: "1px solid rgba(111,163,122,0.18)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.25)",
        }}
      >
        {/* Browser chrome bar */}
        <div
          className="px-4 py-2.5 flex items-center gap-3"
          style={{ background: "#f8f9fa", borderBottom: "1px solid #e8eaed" }}
        >
          {/* Window dots */}
          <div className="flex gap-1.5 shrink-0">
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#FF5F57" }} />
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#FFBD2E" }} />
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#28C840" }} />
          </div>
          {/* Google logo */}
          <div className="flex items-center gap-0.5 shrink-0">
            {["G","o","o","g","l","e"].map((l, i) => (
              <span key={i} className="font-bold text-sm" style={{ color: ["#4285F4","#EA4335","#FBBC04","#4285F4","#34A853","#EA4335"][i] }}>{l}</span>
            ))}
          </div>
          {/* Address bar */}
          <div
            className="flex-1 h-7 rounded-full flex items-center px-3 gap-2"
            style={{ background: "#fff", border: "1px solid #dadce0" }}
          >
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#5f6368" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <span className="text-xs truncate" style={{ color: "#5f6368" }}>
              {title.slice(0, 28) || "search query…"}
            </span>
          </div>
        </div>

        {/* Search result */}
        <div className="px-5 py-5">
          {/* Favicon + URL breadcrumb */}
          <div className="flex items-center gap-2.5 mb-1.5">
            <div
              className="w-5 h-5 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
              style={{ background: "linear-gradient(135deg, #4285F4, #1a73e8)" }}
            >
              {(data.siteName || displayUrl).charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="text-xs font-medium" style={{ color: "#202124" }}>
                {data.siteName || displayUrl}
              </p>
              <p className="text-xs" style={{ color: "#3c8b3c" }}>
                {displayUrl}
              </p>
            </div>
          </div>

          {/* Title */}
          <h3
            className="text-lg font-normal leading-snug mb-1.5 hover:underline cursor-pointer"
            style={{ color: "#1a0dab", fontFamily: "arial, sans-serif" }}
            id="google-preview-title"
          >
            {titleResult.text}
          </h3>

          {/* Description */}
          <p
            className="text-sm leading-relaxed"
            style={{ color: "#4d5156", maxWidth: "600px", fontFamily: "arial, sans-serif" }}
            id="google-preview-desc"
          >
            {descResult.text || (
              <span style={{ color: "#70757a" }}>No description provided.</span>
            )}
          </p>
        </div>
      </div>

      {/* Warnings / success */}
      {warnings.map((w, i) => <WarnBadge key={i} message={w} />)}

      {warnings.length === 0 && title && description && (
        <div
          className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl"
          style={{
            background: "rgba(111,163,122,0.08)",
            border: "1px solid rgba(111,163,122,0.22)",
            borderLeft: "3px solid rgba(111,163,122,0.60)",
          }}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--moss-500)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          <p className="text-xs" style={{ color: "var(--moss-400)", fontFamily: "'Inter', sans-serif" }}>
            Looks great! Title and description are within optimal ranges.
          </p>
        </div>
      )}
    </div>
  );
}
