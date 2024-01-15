const ghPages = process.env.DEPLOY_TARGET === 'gh-pages';
/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "export",
    basePath: ghPages? "/basilinjoe.github.io" : "",
    assetPrefix: ghPages ? "/basilinjoe.github.io/": ""
}

module.exports = nextConfig
