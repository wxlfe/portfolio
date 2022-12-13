const withOffline = require('next-offline');
/** @type {import('next').NextConfig} */
module.exports = withOffline({
  webpack(config, options) {
    config.module.rules.push({
      test: /\.ya?ml$/,
      type: 'json',
      use: 'yaml-loader',
    });

    return config;
  },
});
