# Basilin Joe Website

This repository contains the source code for [basilinjoe.github.io](https://basilinjoe.github.io), a personal website and blog built with **Next.js** and **TypeScript**. The site is statically exported and hosted on GitHub Pages.

## Features

- MDX blog posts under `content/blog` (frontmatter via gray-matter, rendered with `next-mdx-remote/rsc`)
- Custom React components can be imported and used directly inside `.mdx` posts
- Syntax-highlighted code blocks via `rehype-highlight`
- RSS feed at `/feed.xml` and per-tag archive pages at `/blog/tag/[tag]`
- Tailwind CSS styling with shadcn/ui components
- Deploys to GitHub Pages using the `predeploy` and `deploy` scripts
- Type-safe configuration in `config/site.ts`

## Local Development

Install dependencies using your preferred package manager and start the development server:

```bash
pnpm install  # or npm install
pnpm dev      # starts Next.js on http://localhost:3000
```

Lint the project with:

```bash
pnpm run lint
```

## Building and Deployment

To create a static build suitable for GitHub Pages:

```bash
pnpm run predeploy
```

The site will be generated in the `out` directory. Deploy it to GitHub Pages with:

```bash
pnpm run deploy
```

Set the `DEPLOY_TARGET=gh-pages` environment variable if you are building directly using `next build`.

## Adding Blog Posts

Create new MDX files (`.mdx`) inside `content/blog`. Frontmatter fields: `title`, `date`, `excerpt`, optional `modified`, `tags`, `coverImage`, and `draft: true` to hide from the build. Drafts are shown locally when `INCLUDE_DRAFTS=true` is set. `.md` files are still loaded for backwards compatibility, but new posts should use `.mdx` so they can embed React components.

---

Feel free to open issues or pull requests if you notice problems or want to contribute improvements.
