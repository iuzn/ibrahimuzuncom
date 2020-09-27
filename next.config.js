const path = require('path')

const withPlugins = require("next-compose-plugins");

const withSvgr = (nextConfig = {}, nextComposePlugins = {}) => {
  return Object.assign({}, nextConfig, {
    webpack(config, options) {
      config.module.rules.push({
        test: /\.svg$/,
        use: ["@svgr/webpack"],
      });

      if (typeof nextConfig.webpack === "function") {
        return nextConfig.webpack(config, options);
      }

      return config;
    },
  });
};

module.exports = withPlugins([withSvgr], {
   async rewrites() {
    return [
      {
        source: '/blog/:slug',
        destination: 'https://notion-api.elementlab.net/v1/page/:slug', // Matched parameters can be used in the destination
      },
    ]
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')]
  }
});
