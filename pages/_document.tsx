import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import { CssBaseline } from '@nextui-org/react';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return {
      ...initialProps,
      styles: React.Children.toArray([initialProps.styles]),
    };
  }

  render() {
    return (
      <Html lang='en'>
        <Head>
          <script
            defer
            data-domain='wxlfe.dev'
            src='https://plausible.io/js/script.js'
          ></script>
          <link rel='manifest' href='/manifest.json' />
          <meta name='apple-mobile-web-app-status-bar' content='#d1ad54' />
          <link
            rel='apple-touch-icon'
            sizes='180x180'
            href='/apple-touch-icon.png'
          />
          <link
            rel='icon'
            type='image/png'
            sizes='32x32'
            href='/favicon-32x32.png'
          />
          <link
            rel='icon'
            type='image/png'
            sizes='16x16'
            href='/favicon-16x16.png'
          />
          <link rel='mask-icon' href='/safari-pinned-tab.svg' color='#282828' />
          <meta name='msapplication-TileColor' content='#282828' />
          <meta name='theme-color' content='#282828' />

          {CssBaseline.flush()}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
