!process.env.SKIP_ENV_VALIDATION && (await import("./env/server.mjs"));

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  swcMinify: true,
  transpilePackages: [
    "@crocoder-dev/db",
  ],
  experimental: {
    appDir: true,
    esmExternals: 'loose',
  },
  // We already do linting on GH actions
  eslint: {
    ignoreDuringBuilds: !!process.env.CI,
  },
};

export default config;