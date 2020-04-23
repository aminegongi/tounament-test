import Document, {Head, Main, NextScript} from 'next/document'
import {Manifest} from 'next-manifest';


export default class extends Document {
//   static getInitialProps({renderPage}) {
//     return {
//       ...renderPage(),
//       styles: flush()
//     }
//   }

  render() {
    return (
      <html lang="en">
        <Head>
            <link href="https://rsms.me/inter/inter.css" rel="stylesheet" />
            {/* <Manifest href="/manifest.json" themeColor="#F0F0F0"/> */}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}