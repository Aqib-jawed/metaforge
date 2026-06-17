"use client";

import { useState } from "react";
import type { MetaData } from "@/lib/types";
import GooglePreview from "./GooglePreview";
import TwitterPreview from "./TwitterPreview";
import OGPreview from "./OGPreview";

interface PreviewTabsProps {
  data: MetaData;
}

type Tab = "google" | "twitter" | "og";

const TABS: { id: Tab; label: string; icon: React.ReactNode }[] = [
  {
    id: "google",
    label: "Google",
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
      </svg>
    ),
  },
  {
    id: "twitter",
    label: "Twitter / X",
    icon: (
      <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.738l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.91-5.622Zm-1.161 17.52h1.833L7.084 4.126H5.117Z" />
      </svg>
    ),
  },
  {
    id: "og",
    label: "Facebook / LinkedIn",
    icon: (
      <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
];

export default function PreviewTabs({ data }: PreviewTabsProps) {
  const [active, setActive] = useState<Tab>("google");

  return (
    <div className="flex flex-col gap-4 h-full">
      {/* Tab bar */}
      <div
        className="flex items-center gap-1 p-1 rounded-xl"
        style={{
          background: "rgba(111,163,122,0.06)",
          border: "1px solid rgba(111,163,122,0.14)",
        }}
        role="tablist"
        aria-label="Preview platform tabs"
      >
        {TABS.map((tab) => {
          const isActive = active === tab.id;
          return (
            <button
              key={tab.id}
              id={`tab-${tab.id}`}
              role="tab"
              aria-selected={isActive}
              aria-controls={`tabpanel-${tab.id}`}
              onClick={() => setActive(tab.id)}
              className={`tab-btn flex-1 ${isActive ? "active" : ""}`}
            >
              {/* Live dot — only on active */}
              <span
                className={`live-dot shrink-0 ${isActive ? "" : "opacity-0"}`}
                aria-hidden="true"
              />
              <span className="shrink-0">{tab.icon}</span>
              <span className="hidden sm:inline truncate">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab panels */}
      <div className="flex-1 overflow-y-auto animate-slide-up" key={active}>
        {active === "google" && (
          <div id="tabpanel-google" role="tabpanel" aria-labelledby="tab-google">
            <GooglePreview data={data} />
          </div>
        )}
        {active === "twitter" && (
          <div id="tabpanel-twitter" role="tabpanel" aria-labelledby="tab-twitter">
            <TwitterPreview data={data} />
          </div>
        )}
        {active === "og" && (
          <div id="tabpanel-og" role="tabpanel" aria-labelledby="tab-og">
            <OGPreview data={data} />
          </div>
        )}
      </div>
    </div>
  );
}
