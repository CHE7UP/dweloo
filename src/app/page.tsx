import CardOnBackround from "./components/CardOnBackround";
import CardSection from "./components/CardSection";
import DwelooCraftsmenQuality from "./components/DwelooCraftsmenQuality";
import FaQuestionsSection from "./components/FaQuestionsSection";
import DwelooFeatures from "./components/Features";
import HeroSection from "./components/HeroSection";
import ProcessInfographic from "./components/ProcessInfographic";
import SingleImageFeature from "./components/SingleImageFeature";
import WhyDweloo from "./components/WhyDweloo";
import Script from "next/script";
import Link from "next/link";
import LocalSeoSection from "./components/LocalSectionSeo";

export default function Home() {
  // Business Structured Data - Enhanced for local SEO
  const businessStructuredData = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    name: "Dweloo Seattle Home Renovation",
    url: "https://dweloo.com",
    logo: "https://dweloo.com/favicons/icon.svg",
    description: "Seattle's trusted home renovation experts. Dweloo delivers hassle-free flooring, painting, trims, tiling, and custom renovations with transparent pricing and 10-day installations.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "1037 NE 65th St",
      addressLocality: "Seattle",
      addressRegion: "WA",
      postalCode: "98115",
      addressCountry: "US",
    },
    telephone: "+12066191091",
    email: "info@dweloo.com",
    priceRange: "$$",
    sameAs: [
      "https://twitter.com/dweloo",
      "https://www.facebook.com/dweloo",
      "https://www.instagram.com/dweloo",
      "https://www.linkedin.com/company/dweloo",
      "https://www.pinterest.com/dweloo"
    ],
    areaServed: [
      {
        "@type": "City",
        name: "Seattle"
      },
      {
        "@type": "City",
        name: "Bellevue"
      },
      {
        "@type": "City",
        name: "Kirkland"
      },
      {
        "@type": "City",
        name: "Redmond"
      }
    ],
    openingHours: "Mo-Fr 09:00-18:00",
    paymentAccepted: "Cash, Credit Card, Financing Available",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5",
      reviewCount: "1",
    },
    review: [
      {
        "@type": "Review",
        author: {
          "@type": "Person",
          name: "Customer Name",
        },
        datePublished: "2025-03-29",
        reviewBody: "Thanks for the review! Excellent service and flawless execution.",
        reviewRating: {
          "@type": "Rating",
          ratingValue: "5",
          bestRating: "5",
        },
      },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Seattle Home Improvement Services",
      itemListElement: [
        {
          "@type": "OfferCatalog",
          name: "Flooring Installation Seattle",
          description: "Premium installation of hardwood, vinyl, and laminate flooring with expert craftsmanship for lasting beauty and durability in Seattle homes."
        },
        {
          "@type": "OfferCatalog",
          name: "Seattle Painting Services",
          description: "Flawless interior and exterior painting services in Seattle using premium materials, delivering vibrant colors with clean edges and superior finish."
        },
        {
          "@type": "OfferCatalog",
          name: "Tile Installation Seattle",
          description: "Professional tile installation for floors, walls, backsplashes, and showers in Seattle homes, creating beautiful and durable surfaces with precise alignment."
        },
        {
          "@type": "OfferCatalog",
          name: "Trim Installation Seattle",
          description: "Expert installation of baseboards, crown molding, and decorative trim in Seattle homes with precise cuts and seamless joints for a polished, elegant finish."
        },
        {
          "@type": "OfferCatalog",
          name: "Custom Renovations Seattle",
          description: "Personal consultation and quotes for your custom home improvement project in Seattle. Tell us your vision, and our expert Seattle craftsmen will bring it to life."
        }
      ]
    }
  };

  // FAQ Structured Data - Enhanced with local terms
  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How do I schedule a free home renovation consultation in Seattle?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "You can schedule your virtual or in-person consultation in Seattle for the date and time that works best for you. Book your free consultation on our website or call us at (206) 619-2804."
        },
      },
      {
        "@type": "Question",
        name: "How much will my Seattle home improvement project cost?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Every Seattle home is unique, and we provide personalized quotes based on your specific needs and preferences. Get an instant quote on our website or schedule a detailed consultation for a comprehensive estimate tailored to your Seattle home."
        },
      },
      {
        "@type": "Question",
        name: "What kind of home renovation services does Dweloo provide in Seattle?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Dweloo provides a wide range of home improvement services in Seattle including flooring installation, interior and exterior painting, tiling, trims and moldings, and custom renovations tailored to your specific Seattle home needs."
        },
      },
      {
        "@type": "Question",
        name: "Do you offer financing for home improvements in Seattle?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, Dweloo offers flexible financing options for Seattle homeowners with easy monthly installments to make your home improvement dreams affordable. We work with several financing partners to find the best option for your budget."
        },
      },
      {
        "@type": "Question",
        name: "Who are your Seattle home renovation craftsmen?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Our Seattle craftsmen are experienced local professionals who are fully licensed, bonded, and insured in Washington state. Each specializes in their respective field and is strictly vetted to ensure they meet Dweloo's high standards for Seattle home renovations."
        },
      },
      {
        "@type": "Question",
        name: "What happens if I'm not satisfied with your Seattle home renovation work?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "At Dweloo, Seattle customer satisfaction is our priority. We back our work with a lifetime craftsmanship guarantee and a commitment to resolving any issues for your complete satisfaction. Our team will address any concerns within 48 hours."
        },
      },
      {
        "@type": "Question", 
        name: "Which Seattle neighborhoods do you serve?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Dweloo serves all Seattle neighborhoods including Capitol Hill, Ballard, Fremont, Queen Anne, Green Lake, Wallingford, University District, Magnolia, West Seattle, and surrounding areas like Bellevue, Kirkland, and Redmond."
        },
      },
      {
        "@type": "Question",
        name: "How long does a typical home renovation project take in Seattle?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Most of our Seattle home improvement projects are completed within 10 days from start to finish. Our efficient process allows us to deliver high-quality results faster than typical contractors while working around your schedule."
        },
      },
    ],
  };

  // LocalBusiness Structured Data - Enhanced for local SEO
  const localBusinessData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Dweloo Seattle Home Renovation",
    image: "https://dweloo.com/dweloo-og.webp",
    "@id": "https://dweloo.com",
    url: "https://dweloo.com",
    telephone: "+12066191091",
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: "1037 NE 65th St",
      addressLocality: "Seattle",
      addressRegion: "WA",
      postalCode: "98115",
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "47.675655",
      longitude: "-122.316512"
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday"
        ],
        opens: "09:00",
        closes: "18:00"
      }
    ],
    areaServed: [
      {
        "@type": "City",
        name: "Seattle"
      },
      {
        "@type": "City",
        name: "Bellevue"
      },
      {
        "@type": "City",
        name: "Kirkland"
      }
    ],
    department: [
      {
        "@type": "HomeAndConstructionBusiness",
        name: "Dweloo Flooring",
        description: "Expert flooring installation services in Seattle"
      },
      {
        "@type": "HomeAndConstructionBusiness",
        name: "Dweloo Painting",
        description: "Professional painting services for Seattle homes"
      },
      {
        "@type": "HomeAndConstructionBusiness",
        name: "Dweloo Tiling",
        description: "Premium tile installation services in Seattle"
      }
    ]
  };
  
  // Service Structured Data - Enhanced for better visibility
  const serviceStructuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Seattle Home Renovation Services",
    provider: {
      "@type": "LocalBusiness",
      name: "Dweloo Seattle"
    },
    areaServed: [
      {
        "@type": "City",
        name: "Seattle"
      },
      {
        "@type": "City",
        name: "Bellevue"
      },
      {
        "@type": "City",
        name: "Kirkland"
      }
    ],
    description: "Hassle-free home improvement services in Seattle including flooring, painting, tiling, trims, and custom renovations with transparent pricing and 10-day installations.",
    offers: {
      "@type": "Offer",
      price: "7250",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      validFrom: "2025-01-01",
      priceSpecification: {
        "@type": "PriceSpecification",
        valueAddedTaxIncluded: "true"
      }
    }
  };

  return (
    <>
      {/* Structured Data for Business */}
      <Script
        id="business-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(businessStructuredData),
        }}
      />
      
      {/* Structured Data for FAQ */}
      <Script
        id="faq-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqStructuredData),
        }}
      />
      
      {/* Structured Data for Local Business */}
      <Script
        id="local-business-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessData),
        }}
      />
      
      {/* Structured Data for Service */}
      <Script
        id="service-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceStructuredData),
        }}
      />
      
      {/* Main page content */}
      <div>
        <HeroSection />
        <CardSection />
        <ProcessInfographic />
        <SingleImageFeature />
        <DwelooFeatures />
        <DwelooCraftsmenQuality />
        <CardOnBackround />
        <WhyDweloo />
        <FaQuestionsSection />
        <LocalSeoSection />
 
      </div>
    </>
  );
}