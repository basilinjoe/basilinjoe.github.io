# Basilin Joe Website

This repository contains the source code for [basilinjoe.github.io](https://basilinjoe.github.io), a personal website and blog built with **Next.js** and **TypeScript**. The site is statically exported and hosted on GitHub Pages.

## Features

- MDX powered blog posts stored under `content/blog`
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

Create new Markdown or MDX files inside `content/blog`. Each file should contain front matter with a `title`, `date`, and `excerpt`.

---

Feel free to open issues or pull requests if you notice problems or want to contribute improvements.
