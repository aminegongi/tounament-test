// next.config.js
const withSass = require('@zeit/next-sass')
const withImages = require('next-images')
const withOffline = require('next-offline')
const withManifest = require('next-manifest')
const withCss = require('@zeit/next-css')

if (typeof require !== 'undefined') {
  require.extensions['.less'] = (file) => {}
}

module.exports = withCss(
  withSass(
    withImages({
      publicRuntimeConfig: {
        DEV_API_URL: process.env.DEV_API_URL,
        TEST_API_URL: process.env.TEST_API_URL,
        PROD_API_URL: process.env.PROD_API_URL,
        LOGIN_REDIRECT_URL: process.env.LOGIN_REDIRECT_URL,
      },

      // cssModules: true,
      // cssLoaderOptions: {
      //   importLoaders: 1,
      //   localIdentName: "[local]___[hash:base64:5]",
      // },
      lessLoaderOptions: {
        // javascriptEnabled: true
      },
      webpack(config, options) {
        return config
      },
      // async redirects() {
      //   return [
      //     {
      //       source: '/',
      //       destination: '/coaches',
      //       permanent: false,
      //     },
      //   ]
      // },
    }),
  ),
)
