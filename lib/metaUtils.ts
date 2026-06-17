import type { MetaData } from "./types";

/**
 * Builds the robots meta content string from index/follow toggles.
 */
export function buildRobots(index: boolean, follow: boolean): string {
  const parts: string[] = [];
  parts.push(index ? "index" : "noindex");
  parts.push(follow ? "follow" : "nofollow");
  return parts.join(", ");
}

/**
 * Normalises a Twitter handle — ensures it starts with @.
 */
export function normaliseHandle(handle: string): string {
  const trimmed = handle.trim();
  if (!trimmed) return "";
  return trimmed.startsWith("@") ? trimmed : `@${trimmed}`;
}

/**
 * Returns the domain from a URL string, e.g. "https://example.com/page" → "example.com".
 * Falls back to the raw string if the URL is invalid.
 */
export function getDomain(url: string): string {
  try {
    return new URL(url).hostname;
  } catch {
    return url;
  }
}

/**
 * Pure function — generates the complete meta tag code block from MetaData.
 */
export function generateMetaTags(data: MetaData): string {
  const {
    title,
    description,
    url,
    siteName,
    ogImage,
    twitterHandle,
    pageType,
    index,
    follow,
  } = data;

  const robots = buildRobots(index, follow);
  const handle = normaliseHandle(twitterHandle);
  const imageUrl = ogImage || "https://metaforge.dev/og-default.png";

  const lines: string[] = [
    "<!-- Primary Meta Tags -->",
    `<title>${title}</title>`,
    `<meta name="description" content="${description}" />`,
    `<meta name="robots" content="${robots}" />`,
    `<link rel="canonical" href="${url}" />`,
    "",
    "<!-- Open Graph / Facebook / LinkedIn -->",
    `<meta property="og:type" content="${pageType}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:title" content="${title}" />`,
    `<meta property="og:description" content="${description}" />`,
    `<meta property="og:image" content="${imageUrl}" />`,
    ...(siteName ? [`<meta property="og:site_name" content="${siteName}" />`] : []),
    "",
    "<!-- Twitter / X Card -->",
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:url" content="${url}" />`,
    `<meta name="twitter:title" content="${title}" />`,
    `<meta name="twitter:description" content="${description}" />`,
    `<meta name="twitter:image" content="${imageUrl}" />`,
    ...(handle ? [`<meta name="twitter:site" content="${handle}" />`] : []),
  ];

  return lines.join("\n");
}
