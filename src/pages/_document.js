import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }


  // TODO: SEO!

  render() {
    return (
      <Html lang='fr'>
        <Head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width" />

          <title>pavillonnaire.zone</title>

          {/* <link rel="stylesheet" href="/assets/css/styles.css" />
          <link rel="stylesheet" href="/assets/css/print.css" media="print" /> */}

          <meta name="description" content="Une Map pour l'épanouissement d'une culture pavillonnaire 🏡" />
          <meta property="og:title" content="pavillonnaire.zone" />
          <meta property="og:description" content="Une Map pour l'épanouissement d'une culture pavillonnaire 🏡" />
          <meta property="og:image" content="https://www.mywebsite.com/image.jpg" />
          <meta property="og:image:alt" content="Image description" />
          <meta property="og:locale" content="fr_FR" />
          <meta property="og:type" content="website" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta property="og:url" content="https://www.mywebsite.com/page" />
          <link rel="canonical" href="https://www.mywebsite.com/page" />

          <link rel="icon" href="/favicon.ico" />
          <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
          <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
          <link rel="manifest" href="/my.webmanifest" />
          <meta name="theme-color" content="#FF00FF" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
