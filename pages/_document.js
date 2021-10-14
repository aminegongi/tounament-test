import React from 'react'
import Document, { Head, Main, NextScript, Html } from 'next/document'
import { Manifest } from 'next-manifest'

export default class extends Document {
  //   static getInitialProps({renderPage}) {
  //     return {
  //       ...renderPage(),
  //       styles: flush()
  //     }
  //   }

  render() {
    return (
      <Html lang="en">
        <Head>
          <link
            className="document__light-favicon"
            rel="icon"
            href="icon/favicone.png"
          />

          <link href="https://rsms.me/inter/inter.css" rel="stylesheet" />
          <link
            href="https://cdnjs.cloudflare.com/ajax/libs/antd/3.26.15/antd.min.css"
            rel="stylesheet"
          />
          <Manifest href="/manifest.json" themeColor="#F0F0F0" />
          <meta
            name="google-site-verification"
            content="SmKuXG_ogrnKatGF5G46Au9BwdldAcL8wusBFFM9_ms"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
