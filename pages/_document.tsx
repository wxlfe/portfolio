import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import { CssBaseline } from '@nextui-org/react';
import { Header, Footer } from '../components';

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
        <Head>{CssBaseline.flush()}</Head>
        <body>
          <Header />
          <Main />
          <NextScript />
          <Footer />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
