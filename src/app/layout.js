import "./globals.css";
import "./styles/fonts.css";
import ReduxProvider from "./redux/ReduxProvider";

export const metadata = {
  title: "Hamster Jumping Game",
  description: "Hamster Jumping Game",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="preload"
          href="/fonts/HuiFont.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />
        <link rel="preload" href="/images/hamster-1.png" as="image" />
        <link rel="preload" href="/images/hamster-2.png" as="image" />
        <link rel="preload" href="/images/hamster-3.png" as="image" />
        <link rel="preload" href="/images/cat.png" as="image" />
        <link rel="preload" href="/images/seed.png" as="image" />
        <link rel="preload" href="/images/wheel.png" as="image" />
      </head>
      <body>
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
