/* eslint-disable react/jsx-filename-extension */
import React from 'react'
import Document, { Head, Main, NextScript, Html } from 'next/document'
import { Manifest } from 'next-manifest'
import { FB_PIXEL_ID } from '../shared/constants'

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
          <link rel="icon" href="icon/logoindexpage.png" />
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
          <script
            dangerouslySetInnerHTML={{
              __html: `
                !function(f,b,e,v,n,t,s)
                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)}(window, document,'script',
                'https://connect.facebook.net/en_US/fbevents.js');
                fbq('init', ${FB_PIXEL_ID});
                
              `,
            }}
          />
          <noscript>
            <img
              height="1"
              width="1"
              style={{ display: 'none' }}
              src={`https://www.facebook.com/tr?id=${FB_PIXEL_ID}&ev=PageView&noscript=1`}
            />
          </noscript>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
