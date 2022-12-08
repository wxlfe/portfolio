import { AppProps } from 'next/app';
import { ApolloProvider } from '@apollo/client';
import { useApollo } from '../lib/apollo';
import { createTheme, NextUIProvider } from '@nextui-org/react';

export default function App({ Component, pageProps }: AppProps) {
  const theme = createTheme({
    type: 'light',
    theme: {
      colors: {
        primaryLight: '#d1ad54',
        primaryLightHover: '#d1ad54',
        primaryLightActive: '#d1ad54',
        primaryLightContrast: '#d1ad54',
        primary: '#d1ad54',
        primaryBorder: '#d1ad54',
        primaryBorderHover: '#d1ad54',
        primarySolidHover: '#d1ad54',
        primarySolidContrast: '$white',
        primaryShadow: '#d1ad54',

        gradient:
          'linear-gradient(112deg, $blue100 -25%, $pink500 -10%, $purple500 80%)',
        link: '#d1ad54',

        myColor: '#ff4ecd',
        background: 'white',
        text: '#282828',
      },
      space: {},
      fonts: {
        sans: "'Helvetica Neue', Helvetica, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', sans-serif",
        mono: "Menlo, Monaco, 'Lucida Console', 'Liberation Mono', 'DejaVu Sans Mono', 'Bitstream Vera Sans Mono'",
      },
    },
  });

  return (
    <NextUIProvider theme={theme}>
      <Component {...pageProps} />
    </NextUIProvider>
  );
}
