const nextConfig = {
  // ...
  experimental: {
    // ...
    // Polling for file changes
    // Only required in some environments like Docker/VMs
    appDir: true,
    // @ts-expect-error: Custom webpack config for polling in Docker/VM environments
    webpack: (config, { isServer }) => {
      if (!isServer) {
        config.watchOptions = {
          poll: 300, // Check for changes every 1000ms
          aggregateTimeout: 300,
        };
      }
      return config;
    },
  },
};
module.exports = nextConfig;