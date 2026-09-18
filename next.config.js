/** @type {import('next').NextConfig} */
const nextConfig = {
    // Static export for GitHub Pages: everything must render at build time.
    output: "export",
    images: {
        unoptimized: true,
    },
}

module.exports = nextConfig
