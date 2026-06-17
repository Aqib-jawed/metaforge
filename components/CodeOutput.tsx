"use client";

import { useState } from "react";

interface CodeOutputProps {
  code: string;
}

export default function CodeOutput({ code }: CodeOutputProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const el = document.createElement("textarea");
      el.value = code;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Syntax highlight — moss/amber/cream palette
  const highlighted = code
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/(\/\*[\s\S]*?\*\/|<!--[\s\S]*?-->)/g, '<span class="token-comment">$1</span>')
    .replace(/(&lt;\/?)([\w:]+)/g, '$1<span class="token-tag">$2</span>')
    .replace(/([\w-]+)=(&quot;|")/g, '<span class="token-attr">$1</span>=$2')
    .replace(/"([^"]*?)"/g, '"<span class="token-value">$1</span>"');

  return (
    <div
      className="panel overflow-hidden"
      style={{ borderTopLeftRadius: 0, borderTopRightRadius: 0, borderTop: "none" }}
    >
      {/* Copy button strip */}
      <div
        className="flex items-center justify-between px-4 py-3"
        style={{ borderBottom: "1px solid rgba(111,163,122,0.14)" }}
      >
        <div className="flex items-center gap-2">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--moss-500)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
          </svg>
          <span className="mono" style={{ fontSize: "10px", color: "var(--moss-500)", letterSpacing: "0.06em" }}>
            HTML META TAGS
          </span>
        </div>

        <button
          id="copy-all-btn"
          onClick={handleCopy}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 hover:scale-105 active:scale-95"
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            letterSpacing: "0.06em",
            ...(copied
              ? {
                  background: "rgba(111,163,122,0.15)",
                  border: "1px solid rgba(111,163,122,0.35)",
                  color: "var(--moss-400)",
                  boxShadow: "0 0 12px rgba(111,163,122,0.20)",
                }
              : {
                  background: "rgba(205,138,75,0.10)",
                  border: "1px solid rgba(205,138,75,0.25)",
                  color: "var(--amber-500)",
                }),
          }}
          aria-label="Copy all meta tags"
        >
          {copied ? (
            <>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              COPIED!
            </>
          ) : (
            <>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
              COPY ALL
            </>
          )}
        </button>
      </div>

      {/* Code block */}
      <div className="overflow-y-auto" style={{ maxHeight: "400px" }}>
        <pre
          className="code-block m-0 rounded-none whitespace-pre-wrap break-words"
          aria-label="Generated meta tags code"
          dangerouslySetInnerHTML={{ __html: highlighted }}
        />
      </div>
    </div>
  );
}
