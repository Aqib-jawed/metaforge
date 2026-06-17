"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import MetaForm from "@/components/MetaForm";
import CodeOutput from "@/components/CodeOutput";
import PreviewTabs from "@/components/PreviewTabs";
import { defaultMetaData, type MetaData } from "@/lib/types";
import { generateMetaTags } from "@/lib/metaUtils";

/* ── Theme Toggle ─────────────────────────────────────────────── */
function ThemeToggle({ light, onToggle }: { light: boolean; onToggle: () => void }) {
  return (
    <button
      id="theme-toggle"
      onClick={onToggle}
      className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-200 hover:scale-105 active:scale-95"
      style={{
        background: "rgba(111,163,122,0.10)",
        border: "1px solid rgba(111,163,122,0.22)",
        color: "var(--moss-400)",
        fontFamily: "'Space Grotesk', sans-serif",
        letterSpacing: "0.04em",
      }}
      aria-label={light ? "Switch to dark mode" : "Switch to light mode"}
    >
      {light ? (
        <>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
          DARK
        </>
      ) : (
        <>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="5" />
            <line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" />
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
            <line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" />
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
          </svg>
          LIGHT
        </>
      )}
    </button>
  );
}

/* ── Ambient Orb (background decoration) ─────────────────────── */
function AmbientOrb({ size, top, left, right, bottom, delay, type = "amber" }: {
  size: number; top?: string; left?: string; right?: string; bottom?: string; delay?: number; type?: "amber" | "moss";
}) {
  return (
    <div
      aria-hidden="true"
      className={type === "amber" ? "drop-orb" : "drop-orb-moss"}
      style={{
        position: "absolute",
        width: size,
        height: size,
        top, left, right, bottom,
        animationDelay: `${delay ?? 0}s`,
        animation: `floatY ${7 + (delay ?? 0)}s ease-in-out infinite`,
        opacity: 0.75,
        pointerEvents: "none",
      }}
    />
  );
}

/* ── Scroll-reveal hook ───────────────────────────────────────── */
function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/* ── Main Page ────────────────────────────────────────────────── */
export default function Home() {
  const [metaData, setMetaData] = useState<MetaData>(defaultMetaData);
  const [code, setCode] = useState(() => generateMetaTags(defaultMetaData));
  const [isLight, setIsLight] = useState(false);

  useScrollReveal();

  useEffect(() => {
    const stored = localStorage.getItem("metaforge-theme");
    const light = stored === "light";
    setIsLight(light);
    if (light) {
      document.documentElement.classList.add("light");
    } else {
      document.documentElement.classList.remove("light");
    }
  }, []);

  const toggleTheme = () => {
    const next = !isLight;
    setIsLight(next);
    if (next) {
      document.documentElement.classList.add("light");
      localStorage.setItem("metaforge-theme", "light");
    } else {
      document.documentElement.classList.remove("light");
      localStorage.setItem("metaforge-theme", "dark");
    }
  };

  const handleChange = useCallback((newData: MetaData) => {
    setMetaData(newData);
    setCode(generateMetaTags(newData));
  }, []);

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "var(--bg)" }}>

      {/* ── HEADER ──────────────────────────────────────────────── */}
      <header
        className="sticky top-0 z-50"
        style={{
          background: "rgba(10,10,26,0.82)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(111,163,122,0.14)",
        }}
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">

          {/* Logo */}
          <div className="flex items-center gap-3">
            {/* 3D orb icon */}
            <div
              className="drop-orb-moss shrink-0"
              style={{ width: 28, height: 28, animationDuration: "5s" }}
              aria-hidden="true"
            />
            <span
              className="font-bold text-lg tracking-tight"
              style={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: "-0.03em" }}
            >
              <span style={{ color: "rgba(245,240,232,0.95)" }}>Meta</span>
              <span className="text-mossamber">Forge</span>
            </span>
            <span
              className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold"
              style={{
                background: "rgba(111,163,122,0.12)",
                border: "1px solid rgba(111,163,122,0.25)",
                color: "var(--moss-500)",
                fontFamily: "'JetBrains Mono', monospace",
                letterSpacing: "0.06em",
                fontSize: "9px",
              }}
            >
              v1.0
            </span>
          </div>

          {/* Right controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            <ThemeToggle light={isLight} onToggle={toggleTheme} />
            <a
              id="built-for-digital-heroes-btn"
              href="https://digitalheroesco.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs font-bold text-white transition-all duration-200 hover:scale-105 active:scale-95"
              style={{
                background: "linear-gradient(135deg, var(--moss-600) 0%, var(--moss-500) 50%, var(--amber-500) 100%)",
                boxShadow: "0 4px 20px rgba(111,163,122,0.28), 0 0 0 1px rgba(111,163,122,0.20)",
                fontFamily: "'Space Grotesk', sans-serif",
                letterSpacing: "0.04em",
              }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
              </svg>
              <span className="hidden sm:inline">Digital Heroes</span>
              <span className="sm:hidden">DH</span>
            </a>
          </div>
        </div>
      </header>

      {/* ── HERO SECTION ────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden"
        style={{
          borderBottom: "1px solid rgba(111,163,122,0.12)",
          background: isLight
            ? "linear-gradient(180deg, #f0ede8 0%, #f5f3ef 100%)"
            : undefined,
        }}
      >
        {/* Liquid background (dark only) */}
        {!isLight && (
          <div className="liquid-bg absolute inset-0 z-0" aria-hidden="true" />
        )}

        {/* Background orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0" aria-hidden="true">
          <AmbientOrb size={320} top="-80px" right="-60px" type="amber" delay={0} />
          <AmbientOrb size={160} top="60px" left="8%" type="moss" delay={2} />
          <AmbientOrb size={90} bottom="20px" right="25%" type="moss" delay={4} />
          {/* Large soft glow blobs */}
          <div style={{
            position: "absolute", width: 600, height: 600,
            top: -200, right: -100,
            background: "radial-gradient(circle, rgba(111,163,122,0.08) 0%, transparent 70%)",
            pointerEvents: "none",
          }} />
          <div style={{
            position: "absolute", width: 400, height: 400,
            bottom: -100, left: -50,
            background: "radial-gradient(circle, rgba(205,138,75,0.06) 0%, transparent 70%)",
            pointerEvents: "none",
          }} />
        </div>

        {/* Ghost wordmark */}
        <div
          aria-hidden="true"
          className="ghost-wordmark absolute right-0 top-1/2 -translate-y-1/2 pr-8 hidden xl:block z-0 select-none"
        >
          METAFORGE
        </div>

        {/* Hero content */}
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 py-12 sm:py-16 relative z-10">
          {/* Caption */}
          <div className="reveal rd-1 mb-5 flex items-center gap-3">
            <div className="stat-pill">
              <span className="live-dot" />
              LIVE PREVIEW
            </div>
            <div className="stat-pill">SEO · OG · TWITTER</div>
            <div className="stat-pill hidden sm:inline-flex">FREE TOOL</div>
          </div>

          <h1
            className="reveal rd-2 text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 max-w-2xl"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              letterSpacing: "-0.035em",
              color: isLight ? "var(--moss-900)" : "rgba(245,240,232,0.97)",
              lineHeight: 1.1,
            }}
          >
            Meta Tag Generator
            <br />
            <span className="text-mossamber">&amp; Live Previewer</span>
          </h1>

          <p
            className="reveal rd-3 text-sm sm:text-base max-w-xl mb-6"
            style={{ color: "var(--text-secondary)", lineHeight: 1.7 }}
          >
            Fill in the form and instantly see how your page looks on Google, Twitter/X, and
            Facebook. Copy the generated HTML meta tags with one click.
          </p>

          {/* Stat strip */}
          <div className="reveal rd-4 flex flex-wrap items-center gap-3">
            {[
              { value: "3", label: "Platforms" },
              { value: "100%", label: "Client-side" },
              { value: "0", label: "Setup required" },
            ].map(({ value, label }) => (
              <div key={label} className="flex items-center gap-2.5">
                <span
                  className="text-2xl font-bold"
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    letterSpacing: "-0.04em",
                    color: "var(--moss-500)",
                  }}
                >
                  {value}
                </span>
                <span className="text-xs" style={{ color: "var(--text-tertiary)", fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.05em" }}>
                  {label}
                </span>
                <div className="w-px h-4 ml-1" style={{ background: "rgba(111,163,122,0.2)" }} />
              </div>
            ))}
          </div>
        </div>

        {/* Moss gradient rule */}
        <div className="moss-rule" />
      </section>

      {/* ── MAIN LAYOUT ─────────────────────────────────────────── */}
      <main className="flex-1 max-w-[1440px] w-full mx-auto px-4 sm:px-6 py-8 sm:py-10">
        <div className="grid grid-cols-1 xl:grid-cols-[440px_1fr] gap-6 xl:gap-8 items-start">

          {/* ── Left: Form panel ─────────────────────────────────── */}
          <div
            className="panel reveal rd-1 p-5 sm:p-6 relative overflow-hidden"
            style={{ position: "sticky", top: "4.5rem" }}
          >
            {/* Inner glow top-right corner */}
            <div aria-hidden="true" style={{
              position: "absolute", top: -60, right: -60,
              width: 180, height: 180,
              background: "radial-gradient(circle, rgba(111,163,122,0.08) 0%, transparent 70%)",
              pointerEvents: "none",
            }} />

            {/* Panel header */}
            <div className="flex items-center gap-2.5 mb-5 relative">
              <div
                className="drop-orb-moss shrink-0"
                style={{ width: 18, height: 18 }}
                aria-hidden="true"
              />
              <h2
                className="text-xs font-bold uppercase tracking-widest"
                style={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: "0.18em", color: "var(--moss-500)" }}
              >
                Page Details
              </h2>
            </div>

            <div className="moss-rule mb-5" />

            <MetaForm data={metaData} onChange={handleChange} />
          </div>

          {/* ── Right: Preview + Code ─────────────────────────────── */}
          <div className="flex flex-col gap-6">

            {/* Preview tabs panel */}
            <div className="panel reveal rd-2 p-4 sm:p-5 relative overflow-hidden" style={{ minHeight: "460px" }}>
              {/* Inner corner glow */}
              <div aria-hidden="true" style={{
                position: "absolute", top: -40, right: -40,
                width: 160, height: 160,
                background: "radial-gradient(circle, rgba(205,138,75,0.07) 0%, transparent 70%)",
                pointerEvents: "none",
              }} />

              {/* Panel header */}
              <div className="flex items-center justify-between mb-4 relative">
                <div className="flex items-center gap-2.5">
                  <div
                    className="drop-orb shrink-0"
                    style={{ width: 18, height: 18 }}
                    aria-hidden="true"
                  />
                  <h2
                    className="text-xs font-bold uppercase tracking-widest"
                    style={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: "0.18em", color: "var(--amber-500)" }}
                  >
                    Live Preview
                  </h2>
                </div>
                {/* Live indicator */}
                <div className="flex items-center gap-1.5">
                  <span className="live-dot" />
                  <span className="caption" style={{ fontSize: "9px" }}>LIVE</span>
                </div>
              </div>

              <div className="moss-rule mb-4" />

              <PreviewTabs data={metaData} />
            </div>

            {/* Generated code panel */}
            <div className="reveal rd-3 relative">
              {/* Panel header (outside the code block for visual separation) */}
              <div
                className="panel flex items-center justify-between px-4 py-3 rounded-b-none"
                style={{ borderBottomLeftRadius: 0, borderBottomRightRadius: 0, borderBottom: "1px solid rgba(111,163,122,0.14)" }}
              >
                <div className="flex items-center gap-2.5">
                  {/* macOS-style dots */}
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#FF5F57" }} />
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#FFBD2E" }} />
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#28C840" }} />
                  </div>
                  <span className="mono text-xs" style={{ color: "var(--moss-500)", fontSize: "11px" }}>
                    meta-tags.html
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div
                    className="drop-orb-moss"
                    style={{ width: 14, height: 14 }}
                    aria-hidden="true"
                  />
                  <h2
                    className="text-xs font-bold uppercase tracking-widest"
                    style={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: "0.18em", color: "var(--moss-500)" }}
                  >
                    Generated Code
                  </h2>
                </div>
              </div>
              <CodeOutput code={code} />
            </div>

          </div>
        </div>
      </main>

      {/* ── FOOTER ──────────────────────────────────────────────── */}
      <footer style={{ borderTop: "1px solid rgba(111,163,122,0.12)" }}>
        {/* Amber gradient rule */}
        <div className="amber-rule" />

        <div
          className="max-w-[1440px] mx-auto px-4 sm:px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-5"
          style={{ background: "rgba(10,10,18,0.60)", backdropFilter: "blur(12px)" }}
        >
          {/* Left: branding */}
          <div className="flex items-center gap-2">
            <div className="drop-orb-moss" style={{ width: 20, height: 20 }} aria-hidden="true" />
            <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "0.9rem", letterSpacing: "-0.02em" }}>
              <span style={{ color: "rgba(245,240,232,0.90)" }}>Meta</span>
              <span className="text-mossamber">Forge</span>
            </span>
            <span className="caption ml-2" style={{ fontSize: "9px" }}>
              Built with ♥ for Digital Heroes
            </span>
          </div>

          {/* Centre: author */}
          <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-3">
            <span
              id="footer-author-name"
              style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: "0.8rem", color: "rgba(245,240,232,0.75)" }}
            >
              Aqib Jawed
            </span>
            <span style={{ color: "rgba(111,163,122,0.3)" }} className="hidden sm:inline">·</span>
            <a
              id="footer-author-email"
              href="mailto:akkiajwed567@gmail.com"
              className="transition-colors hover:underline"
              style={{ color: "var(--moss-500)", fontSize: "0.78rem", fontFamily: "'JetBrains Mono', monospace" }}
            >
              akkiajwed567@gmail.com
            </a>
          </div>

          {/* Right: DH link */}
          <a
            href="https://digitalheroesco.com"
            target="_blank"
            rel="noopener noreferrer"
            className="caption hover:underline transition-colors"
            style={{ color: "var(--moss-500)", fontSize: "10px" }}
          >
            digitalheroesco.com ↗
          </a>
        </div>
      </footer>
    </div>
  );
}
