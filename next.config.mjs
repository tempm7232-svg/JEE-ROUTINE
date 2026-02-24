const nextConfig = {
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
  compress: true,
  productionBrowserSourceMaps: false,
  poweredByHeader: false,
  swcMinify: true,
};

export default nextConfig;
