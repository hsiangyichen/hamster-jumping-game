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
      </head>
      <body>
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
