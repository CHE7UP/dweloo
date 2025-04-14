import "./globals.css";
import type { Metadata } from "next";
import { Geist } from "next/font/google";
import PrelineScript from "./components/PrelineScript";
import Navbar from "./components/Navbar";
import FooterComponent from "./components/FooterComponent";
import FootBar from "./components/FootBar";
import Script from "next/script";
import Image from "next/image";

// Configure Geist font with display strategy
const geistSans = Geist({
  subsets: ["latin"],
  display: "swap",
  adjustFontFallback: false,
  preload: true,
});

export const metadata: Metadata = {
  title: {
    default: "Dweloo | Expert Home Improvement Services in Seattle",
    template: "%s | Dweloo Seattle Home Renovation",
  },
  description:
    "Seattle's trusted home renovation experts. Dweloo delivers hassle-free flooring, painting, trims, tiling, and custom renovations with transparent pricing and 10-day installations.",
  keywords: [
    "Seattle home renovation",
    "home improvement Seattle",
    "Seattle renovation services",
    "flooring installation Seattle",
    "Seattle interior painting",
    "Seattle trims and molding",
    "tiling services Seattle",
    "custom home renovation Seattle",
    "licensed contractors Seattle",
    "quick home renovation Seattle",
    "home improvement services Seattle",
    "Seattle siding installation",
    "Seattle home remodeling",
    "Seattle kitchen renovation",
    "bathroom remodel Seattle",
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
    title: "Dweloo | Seattle's Trusted Home Renovation Experts",
    description:
      "Expert home improvements in Seattle made easy. Transparent pricing, licensed craftsmen, and flawless results in just 10 days. Get your free quote today.",
    url: "https://www.dweloo.com",
    siteName: "Dweloo Seattle Home Renovation",
    images: [
      {
        url: "https://dweloo.com/dweloo-og.webp",
        width: 1200,
        height: 630,
        alt: "Dweloo - Seattle Home Renovation Made Easy",
      },
    ],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dweloo | Seattle Home Improvement Made Easy",
    description:
      "Stress-free home renovations in Seattle with fast 10-day installs and guaranteed pricing. Calculate your project in minutes.",
    images: ["https://dweloo.com/dweloo-og.webp"],
    creator: "@dweloo",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    }
  },
  alternates: {
    canonical: "https://www.dweloo.com",
  },
  other: {
    "apple-mobile-web-app-title": "Dweloo",
    "application-name": "Dweloo Seattle Home Renovation",
    "theme-color": "#ffffff",
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
      <head>
        <link rel="canonical" href="https://www.dweloo.com" />
      </head>
      <body className="antialiased">
        {/* Facebook Pixel - Fixed Implementation */}
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
        
        {/* Google Tag Manager Script */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=AW-17005771269"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-17005771269');
          `}
        </Script>
        
        {/* Facebook Pixel NoScript - Using div instead of img since Next.js Image doesn't work in noscript */}
        <noscript>
          <div 
            style={{ 
              position: 'absolute',
              height: '1px',
              width: '1px',
              overflow: 'hidden' 
            }}
          >
            {/* This approach avoids using the img tag while still maintaining the Facebook pixel tracking */}
            <Image 
              src="https://www.facebook.com/tr?id=3034851043359739&ev=PageView&noscript=1"
              alt=""
              width={1}
              height={1}
              style={{ display: 'none' }}
              unoptimized
            />
          </div>
        </noscript>
        
        {/* Google Tag Manager NoScript */}
        <noscript>
          <iframe 
            src="https://www.googletagmanager.com/ns.html?id=GTM-XXXXXXX"
            height="0" 
            width="0" 
            style={{ display: 'none', visibility: 'hidden' }}>
          </iframe>
        </noscript>
        
        <Navbar />
        <main itemScope itemType="https://schema.org/WebPage">
          {children}
        </main>
        <FootBar />
        <FooterComponent />
        <PrelineScript />
      </body>
    </html>
  );
}