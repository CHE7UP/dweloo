import "./globals.css";
import type { Metadata } from "next";
import { Geist } from "next/font/google";
import PrelineScript from "./components/PrelineScript";
import Navbar from "./components/Navbar";
import FooterComponent from "./components/FooterComponent";
import FootBar from "./components/FootBar";
import Script from "next/script";

// Configure Geist font with display strategy
const geistSans = Geist({
  subsets: ["latin"],
  display: "swap", // Add display strategy
  adjustFontFallback: false, // Disable automatic fallback adjustment
  preload: true, // Ensure proper preloading
});

export const metadata: Metadata = {
  title: "Dweloo",
  description: "Home Improvement and Renovation Services",
  icons: {
    icon: [
      { rel: "icon", url: "/favicons/favicon.ico", sizes: "any" },
      { rel: "icon", url: "/favicons/favicon-32x32.png", type: "image/png" },
      { rel: "icon", url: "/favicons/favicon-96x96.png", type: "image/png" },
      { rel: "icon", url: "/favicons/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/favicons/apple-icon.png",
    shortcut: "/favicons/favicon-32x32.png",
  },
  manifest: "/favicons/manifest.json",
  other: {
    "apple-mobile-web-app-title": "Dweloo",
    "application-name": "Dweloo",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={geistSans.className}>
      <body className="antialiased">
        <Navbar />
        {children}
        <FootBar />
        <FooterComponent />
        <PrelineScript />
        {/* Inject Tawk.to Script */}
        <Script
          id="tawkto-widget"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
              (function(){
              var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
              s1.async=true;
              s1.src='https://embed.tawk.to/67e45071616e66190ea8dc97/default';
              s1.charset='UTF-8';
              s1.setAttribute('crossorigin','*');
              s0.parentNode.insertBefore(s1,s0);
              })();
            `,
          }}
        />
      </body>
    </html>
  );
}