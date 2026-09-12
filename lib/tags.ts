// Client-safe tag helpers. Kept separate from lib/blog.ts because that module
// imports 'fs' and cannot be pulled into the client bundle.

export function tagToSlug(tag: string): string {
  return tag
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
}
