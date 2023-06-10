!process.env.SKIP_ENV_VALIDATION && (await import('./env/server.mjs'));

/** @type {import("next").NextConfig} */
const config = {
  async rewrites() {
    return [
      {
        source: '/sa/latest.js',
        destination: 'https://sa.crocoder.dev/latest.js',
      },
      {
        source: '/sa/noscript.gif',
        destination: 'https://sa.crocoder.dev/noscript.gif',
      },
    ];
  },
  reactStrictMode: true,
  swcMinify: true,
  transpilePackages: ['@crocoder-dev/db'],
  experimental: {
    appDir: true,
    esmExternals: 'loose',
    serverActions: true
  },
  // We already do linting on GH actions
  eslint: {
    ignoreDuringBuilds: !!process.env.CI,
  },
};

export default config;
