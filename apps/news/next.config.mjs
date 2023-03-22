!process.env.SKIP_ENV_VALIDATION && (await import("./env/server.mjs"));

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    appDir: true,
    // Enables hot-reload and easy integration for local packages
    transpilePackages: [
    ],
  },
  // We already do linting on GH actions
  eslint: {
    ignoreDuringBuilds: !!process.env.CI,
  },
};

export default config;