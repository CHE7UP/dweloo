// import CardOnBackround from "./components/CardOnBackround";
import CardSection from "./components/CardSection";
import DwelooCraftsmenQuality from "./components/DwelooCraftsmenQuality";
import FaQuestionsSection from "./components/FaQuestionsSection";
import DwelooFeatures from "./components/Features";
import HeroSection from "./components/HeroSection";
// import IconSectionGradient from "./components/IconSectionGradient";
import ProcessInfographic from "./components/ProcessInfographic";
import SingleImageFeature from "./components/SingleImageFeature";
import CardOnBackround from "./components/CardOnBackround";
import WhyDweloo from "./components/WhyDweloo";
// import VerticalTabs from "./components/VerticalTabs";

// export default function Home() {
//   return (
//     <div >
//       <HeroSection/>
//       <CardSection/>
//       <ProcessInfographic/> 
//       <SingleImageFeature/>
//       <DwelooFeatures />
//       <DwelooCraftsmenQuality/>
//       {/* <VerticalTabs/> */}
//       {/* Uncomment the line below to include the IconSectionGradient component */}

//       {/* <IconSectionGradient/> */}
   
//        <CardOnBackround  />
//        <WhyDweloo />
//       {/* <FaqSection/> */}
//       <FaQuestionsSection/>
//     </div>
//   );
// }

import Script from "next/script";

export default function Home() {
  // Business Structured Data - Updated with actual details from your content
  const businessStructuredData = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    name: "Dweloo",
    url: "https://dweloo.com",
    logo: "https://dweloo.com/favicons/icon.svg", // Updated to use your favicon path
    description: "Dweloo delivers hassle-free home improvement and renovation services in Seattle. From flooring and painting to custom renovations, we provide transparent pricing, vetted craftsmen, and fast 10-day installations.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "", // Add your street address
      addressLocality: "Seattle",
      addressRegion: "WA",
      postalCode: "98115",
      addressCountry: "US",
    },
    telephone: "+12066191091", // Updated with your actual phone number
    priceRange: "$$",
    sameAs: [
      // Add your social media profiles if available
      "https://twitter.com/dweloo",
      // Add other social profiles here
    ],
    areaServed: {
      "@type": "City",
      name: "Seattle"
    },
    openingHours: "Mo-Fr 09:00-18:00", // Add your business hours
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
      name: "Home Improvement Services",
      itemListElement: [
        {
          "@type": "OfferCatalog",
          name: "Flooring",
          description: "Premium installation of hardwood, vinyl, and laminate flooring with expert craftsmanship for lasting beauty and durability in any space."
        },
        {
          "@type": "OfferCatalog",
          name: "Painting",
          description: "Flawless interior and exterior painting services using premium materials, delivering vibrant colors with clean edges and superior finish."
        },
        {
          "@type": "OfferCatalog",
          name: "Tiling",
          description: "Professional tile installation for floors, walls, backsplashes, and showers, creating beautiful and durable surfaces with precise alignment and clean grout lines."
        },
        {
          "@type": "OfferCatalog",
          name: "Trims",
          description: "Expert installation of baseboards, crown molding, and decorative trim with precise cuts and seamless joints for a polished, elegant finish in any room."
        },
        {
          "@type": "OfferCatalog",
          name: "Custom Renovations",
          description: "Personal consultation and quotes for your custom home improvement project. Tell us your vision, and our craftsmen we'll bring it to life."
        }
      ]
    }
  };

  // FAQ Structured Data - Updated with actual content from your page
  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How do I schedule a free consultation?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "You can schedule your virtual or in-person consultation for the date and time that works best for you. Book your free consultation or call us at (206) 619-2804."
        },
      },
      {
        "@type": "Question",
        name: "How much will my project cost?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Every home is unique, and we provide personalized quotes based on your specific needs and preferences. Get an instant quote or schedule a detailed consultation for a comprehensive estimate."
        },
      },
      {
        "@type": "Question",
        name: "What kind of services does Dweloo provide?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Dweloo provides a wide range of home improvement services including flooring installation, painting, tiling, trims, and custom renovations tailored to your specific needs."
        },
      },
      {
        "@type": "Question",
        name: "Do you offer financing?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, Dweloo offers flexible financing options with easy monthly installments to make your home improvement dreams affordable."
        },
      },
      {
        "@type": "Question",
        name: "Who are your craftsmen?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Our craftsmen are experienced professionals who are fully licensed, bonded, and insured. Each specializes in their respective field and is strictly vetted to ensure they meet Dweloo's high standards."
        },
      },
      {
        "@type": "Question",
        name: "What happens if I'm not satisfied with your work?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "At Dweloo, customer satisfaction is our priority. We back our work with a lifetime craftsmanship guarantee and a commitment to resolving any issues for your complete satisfaction."
        },
      },
    ],
  };

  // LocalBusiness Structured Data - Additional schema for local SEO
  const localBusinessData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Dweloo",
    image: "https://dweloo.com/dweloo-og.webp",
    "@id": "https://dweloo.com",
    url: "https://dweloo.com",
    telephone: "+12066191091",
    address: {
      "@type": "PostalAddress",
      streetAddress: "1037 NE 65th St", // Add your street address
      addressLocality: "Seattle",
      addressRegion: "WA",
      postalCode: "98115",
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "", // Add your latitude
      longitude: "" // Add your longitude
    },
    openingHoursSpecification: {
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
    },
    priceRange: "$$"
  };
  
  // Service Structured Data - For improved service visibility
  const serviceStructuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Home Renovation Services",
    provider: {
      "@type": "LocalBusiness",
      name: "Dweloo"
    },
    areaServed: {
      "@type": "City",
      name: "Seattle"
    },
    description: "Hassle-free home improvement services including flooring, painting, tiling, trims, and custom renovations with transparent pricing and 10-day installations.",
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
      </div>
    </>
  );
}