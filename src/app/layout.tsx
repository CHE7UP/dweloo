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
  title: {
    default: "Dweloo | Hassle-Free Home Renovation",
    template: "%s | Dweloo",
  },
  description:
    "Finally, an easy way to renovate your house. Dweloo delivers expert home improvements — flooring, painting, trims, tiling, siding, and custom projects — without the headaches. Transparent pricing, vetted craftsmen, and 10-day installs.",
  keywords: [
    "home renovation",
    "wall renovation",
    "Seattle renovation services",
    "flooring installation",
    "interior painting",
    "trims and molding",
    "tiling services",
    "custom home improvement",
    "licensed contractors Seattle",
    "quick home renovation",
    "home improvement services",
    "siding installation",
  ],
  applicationName: "Dweloo",
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
  openGraph: {
    title: "Dweloo | Finally, an Easy Way to Renovate Your House",
    description:
      "Expert home improvements in Seattle made easy. Transparent pricing, licensed craftsmen, and flawless results. Start with a 2-minute project calculator.",
    url: "https://www.dweloo.com/instant-flooring-quote", // Replace with your actual domain
    siteName: "Dweloo",
    images: [
      {
        url: "https://dweloo.com/dweloo-og.webp", // Replace with actual image
        width: 1200,
        height: 630,
        alt: "Dweloo - Home Renovation Made Easy",
      },
    ],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dweloo | Home Improvement Made Easy",
    description:
      "Stress-free home renovations in Seattle with fast 10-day installs and guaranteed pricing. Calculate your project in minutes.",
    images: ["https://dweloo.com/og-image.jpg"], // Replace with actual image
    creator: "@dweloo", // Optional if you have a Twitter handle
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
  },
  other: {
    "apple-mobile-web-app-title": "Dweloo",
    "application-name": "Dweloo",
    "theme-color": "#ffffff", // You can match this with your site background
    "msapplication-TileColor": "#ffffff",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={geistSans.className}>
            <Script id="facebook-pixel" strategy="afterInteractive">
        {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '3034851043359739');
          fbq('track', 'PageView');
        `}
      </Script>
      <Script id="facebook-pixel-noscript" strategy="afterInteractive">
        {`
          <noscript><img height="1" width="1" style="display:none"
          src="https://www.facebook.com/tr?id=3034851043359739&ev=PageView&noscript=1"
          /></noscript>
        `}
      </Script>
      <body className="antialiased">
        <Navbar />
        {children}
        <FootBar />
        <FooterComponent />
        <PrelineScript />
      </body>
    </html>
  );
}