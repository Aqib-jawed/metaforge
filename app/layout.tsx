import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MetaForge — Premium Meta Tag Generator & Live Preview",
  description:
    "Generate perfect HTML meta tags, Open Graph tags, and Twitter Card tags with live previews for Google, Twitter/X, and Facebook/LinkedIn. Free tool for developers and marketers who care about SEO.",
  keywords: ["meta tags", "SEO", "open graph", "twitter card", "meta tag generator", "seo tool"],
  authors: [{ name: "MetaForge" }],
  openGraph: {
    title: "MetaForge — Premium Meta Tag Generator & Live Preview",
    description:
      "Generate perfect HTML meta tags with live previews for Google, Twitter/X, and Facebook/LinkedIn.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Theme init — prevents flash of unstyled content */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const h = document.documentElement;
                const stored = localStorage.getItem('metaforge-theme');
                const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                if (stored === 'light') {
                  h.classList.add('light'); h.classList.remove('dark');
                } else {
                  h.classList.remove('light');
                }
              } catch(e) {}
            `,
          }}
        />
      </head>
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
