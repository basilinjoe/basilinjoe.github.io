import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { siteConfig } from "@/config/site"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Turns a repo-relative path like "/blog/cover.webp" into an absolute URL.
// Pass-through for values that are already absolute (http/https/protocol-relative).
export function resolveAssetUrl(pathOrUrl: string): string {
  if (/^(https?:)?\/\//i.test(pathOrUrl)) return pathOrUrl
  const suffix = pathOrUrl.startsWith("/") ? pathOrUrl : `/${pathOrUrl}`
  return `${siteConfig.url}${suffix}`
}
