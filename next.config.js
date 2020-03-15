// next.config.js
const withSass = require('@zeit/next-sass')
const withImages = require('next-images')
const withOffline = require('next-offline')
const withManifest = require('next-manifest');

module.exports = withSass(withImages({
  cssModules: true,
  cssLoaderOptions: {
    importLoaders: 1,
    localIdentName: "[local]___[hash:base64:5]",
  },
  webpack(config, options) {
    return config
  },
})
)