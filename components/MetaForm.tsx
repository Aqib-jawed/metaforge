"use client";

import type { MetaData } from "@/lib/types";

interface MetaFormProps {
  data: MetaData;
  onChange: (data: MetaData) => void;
}

/* ── Character Count Bar ──────────────────────────────────────── */
function CharCount({ current, max, warnAt }: { current: number; max: number; warnAt: number }) {
  const pct = Math.min((current / max) * 100, 100);
  const isOver = current > max;
  const isWarn = current >= warnAt && !isOver;

  const barColor = isOver
    ? "rgba(239,68,68,0.85)"
    : isWarn
    ? "rgba(205,138,75,0.85)"
    : "var(--moss-500)";

  const textColor = isOver
    ? "rgba(239,68,68,0.85)"
    : isWarn
    ? "rgba(205,138,75,0.85)"
    : "var(--text-tertiary)";

  return (
    <div className="mt-2 flex items-center gap-2.5">
      <div className="flex-1 h-px rounded-full overflow-hidden" style={{ background: "rgba(111,163,122,0.10)" }}>
        <div
          className="h-full rounded-full transition-all duration-300"
          style={{ width: `${pct}%`, background: barColor }}
        />
      </div>
      <span
        className="mono tabular-nums shrink-0 transition-colors duration-200"
        style={{ fontSize: "10px", letterSpacing: "0.04em", color: textColor }}
      >
        {current}/{max}
      </span>
    </div>
  );
}

/* ── Toggle Switch ────────────────────────────────────────────── */
function Toggle({
  checked, onChange, labelOn, labelOff,
}: {
  checked: boolean; onChange: (v: boolean) => void; labelOn: string; labelOff: string;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className="flex items-center gap-2.5 group"
      aria-pressed={checked}
    >
      <div
        className="relative inline-flex items-center w-10 h-5 rounded-full cursor-pointer transition-all duration-250"
        style={{
          background: checked
            ? "linear-gradient(135deg, var(--moss-600), var(--moss-500))"
            : "rgba(111,163,122,0.12)",
          border: checked ? "1px solid rgba(111,163,122,0.40)" : "1px solid rgba(111,163,122,0.18)",
          boxShadow: checked ? "0 0 12px rgba(111,163,122,0.25)" : "none",
        }}
      >
        <div
          className="absolute w-3.5 h-3.5 rounded-full bg-white shadow-sm transition-transform duration-200"
          style={{ transform: checked ? "translateX(22px)" : "translateX(2px)" }}
        />
      </div>
      <span
        className="text-xs font-semibold transition-colors duration-200"
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          letterSpacing: "0.06em",
          color: checked ? "var(--moss-400)" : "var(--text-tertiary)",
        }}
      >
        {checked ? labelOn : labelOff}
      </span>
    </button>
  );
}

/* ── Field wrapper ────────────────────────────────────────────── */
function Field({ children }: { children: React.ReactNode }) {
  return <div className="space-y-0">{children}</div>;
}

/* ── Main Form ────────────────────────────────────────────────── */
export default function MetaForm({ data, onChange }: MetaFormProps) {
  const set = <K extends keyof MetaData>(key: K, value: MetaData[K]) => {
    onChange({ ...data, [key]: value });
  };

  return (
    <div className="space-y-5">

      {/* Page Title */}
      <Field>
        <label className="meta-label" htmlFor="mf-title">Page Title</label>
        <input
          id="mf-title"
          type="text"
          className="meta-input"
          placeholder="My Amazing Page Title"
          value={data.title}
          onChange={(e) => set("title", e.target.value)}
          maxLength={80}
        />
        <CharCount current={data.title.trimEnd().length} max={60} warnAt={50} />
      </Field>

      {/* Divider */}
      <div className="moss-rule" />

      {/* Meta Description */}
      <Field>
        <label className="meta-label" htmlFor="mf-desc">Meta Description</label>
        <textarea
          id="mf-desc"
          className="meta-input resize-none"
          placeholder="A concise, compelling description of your page content for search engines."
          value={data.description}
          onChange={(e) => set("description", e.target.value)}
          rows={3}
          maxLength={200}
        />
        <CharCount current={data.description.trimEnd().length} max={160} warnAt={140} />
      </Field>

      <div className="moss-rule" />

      {/* Page URL */}
      <Field>
        <label className="meta-label" htmlFor="mf-url">Page URL</label>
        <input
          id="mf-url"
          type="url"
          className="meta-input"
          placeholder="https://example.com/my-page"
          value={data.url}
          onChange={(e) => set("url", e.target.value)}
        />
      </Field>

      {/* Site Name */}
      <Field>
        <label className="meta-label" htmlFor="mf-sitename">Site Name</label>
        <input
          id="mf-sitename"
          type="text"
          className="meta-input"
          placeholder="My Website"
          value={data.siteName}
          onChange={(e) => set("siteName", e.target.value)}
        />
      </Field>

      <div className="moss-rule" />

      {/* OG Image */}
      <Field>
        <label className="meta-label" htmlFor="mf-image">
          OG Image URL
          <span className="normal-case font-normal tracking-normal ml-1" style={{ color: "var(--text-tertiary)", fontFamily: "'Inter', sans-serif", letterSpacing: "normal", fontSize: "10px" }}>
            — optional
          </span>
        </label>
        <input
          id="mf-image"
          type="url"
          className="meta-input"
          placeholder="https://example.com/og-image.png"
          value={data.ogImage}
          onChange={(e) => set("ogImage", e.target.value)}
        />
        <p className="mt-1.5 mono" style={{ fontSize: "10px", color: "var(--text-tertiary)" }}>
          Recommended: 1200×630px · Falls back to placeholder if empty.
        </p>
      </Field>

      {/* Twitter Handle */}
      <Field>
        <label className="meta-label" htmlFor="mf-twitter">
          Twitter / X Handle
          <span className="normal-case font-normal tracking-normal ml-1" style={{ color: "var(--text-tertiary)", fontFamily: "'Inter', sans-serif", letterSpacing: "normal", fontSize: "10px" }}>
            — optional
          </span>
        </label>
        <input
          id="mf-twitter"
          type="text"
          className="meta-input"
          placeholder="@yourhandle"
          value={data.twitterHandle}
          onChange={(e) => set("twitterHandle", e.target.value)}
        />
      </Field>

      <div className="moss-rule" />

      {/* Page Type */}
      <Field>
        <label className="meta-label" htmlFor="mf-type">Page Type</label>
        <select
          id="mf-type"
          className="meta-input"
          value={data.pageType}
          onChange={(e) => set("pageType", e.target.value as MetaData["pageType"])}
        >
          <option value="website">Website</option>
          <option value="article">Article</option>
          <option value="product">Product</option>
        </select>
      </Field>

      <div className="moss-rule" />

      {/* Robots Directives */}
      <div
        className="rounded-xl p-4 space-y-3.5"
        style={{
          background: "rgba(111,163,122,0.05)",
          border: "1px solid rgba(111,163,122,0.14)",
        }}
      >
        <p
          className="meta-label mb-0"
          style={{ color: "var(--moss-500)", letterSpacing: "0.16em" }}
        >
          Robots Directives
        </p>
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-xs" style={{ color: "var(--text-secondary)", fontFamily: "'Inter', sans-serif" }}>
              Index this page?
            </span>
            <Toggle
              checked={data.index}
              onChange={(v) => set("index", v)}
              labelOn="INDEX"
              labelOff="NOINDEX"
            />
          </div>
          <div className="h-px" style={{ background: "rgba(111,163,122,0.10)" }} />
          <div className="flex items-center justify-between">
            <span className="text-xs" style={{ color: "var(--text-secondary)", fontFamily: "'Inter', sans-serif" }}>
              Follow links?
            </span>
            <Toggle
              checked={data.follow}
              onChange={(v) => set("follow", v)}
              labelOn="FOLLOW"
              labelOff="NOFOLLOW"
            />
          </div>
        </div>
      </div>

    </div>
  );
}
