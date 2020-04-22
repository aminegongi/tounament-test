// next.config.js
const withSass = require('@zeit/next-sass')
const withImages = require('next-images')
const withOffline = require('next-offline')
const withManifest = require('next-manifest');
const antdLessLoader = require("next-antd-aza-less")
if (typeof require !== 'undefined') {
  require.extensions['.less'] = (file) => {}
}

module.exports = antdLessLoader(withSass(withImages({
  cssModules: true,
  cssLoaderOptions: {
    importLoaders: 1,
    localIdentName: "[local]___[hash:base64:5]",
  },
  lessLoaderOptions: {
    javascriptEnabled: true,
  },
  webpack(config, options) {
    return config
  },
})
))