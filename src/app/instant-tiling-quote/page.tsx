import React from 'react';
import TilesQuestionnaireForm from '../components/forms/calculator/TilesQuestionaireForm';
import { NextPage } from 'next';
import {Clock, DollarSign, Shield, Users} from "lucide-react";

export const metadata = {
  title: 'Instant Tiling Quote | Seattle Tile Installation Pricing',
  description: 'Calculate Seattle bathroom, kitchen, and floor tiling costs in minutes. Free online calculator for all tile types with transparent pricing.',
  keywords: [
    'tile installation cost',
    'Seattle bathroom tiling quote', 
    'kitchen backsplash pricing',
    'floor tiling estimate',
    'shower tile installation',
    'porcelain tile calculator',
    'ceramic tile quote',
    'Seattle tile contractor',
  ],
  openGraph: {
    title: 'Seattle Tile Installation Cost Calculator | Free Instant Quote',
    description: 'Get precise tiling costs for your Seattle home in minutes. Bathroom, kitchen, backsplash, and floor tiling with expert 10-day installation.',
    images: [
      {
        url: 'https://dweloo.com/dweloo-og.webp',
        width: 1200,
        height: 630,
        alt: 'Seattle Tile Installation Calculator',
      },
    ],
  },
};



const TilingQuotePage: NextPage = () => {


  const tilingCalculatorSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Seattle Tile Installation Calculator",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "ratingCount": "129"
    },
    "author": {
      "@type": "Organization",
      "name": "Dweloo Seattle Home Renovation"
    },
    "potentialAction": {
      "@type": "UseAction",
      "target": "https://dweloo.com/instant-tiling-quote"
    }
  };


  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(tilingCalculatorSchema) }}
      />
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
      <header className="mb-1 text-center">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Price Calculator Tiling Project</h1>
      </header>

          <TilesQuestionnaireForm />
        </div>
        <div className="mt-12 bg-white rounded-lg p-6 md:p-8">
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-6">Why Customers Choose Dweloo</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-start">
              <div className="mr-4 mt-1 text-blue-600">
                <Shield size={24} />
              </div>
              <div>
                <h4 className="font-medium text-gray-800 mb-1">Lifetime Warranty Protection</h4>
                <p className="text-gray-600 text-sm">Enjoy peace of mind with our industry-leading lifetime warranty on all workmanship.</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="mr-4 mt-1 text-blue-600">
                <Users size={24} />
              </div>
              <div>
                <h4 className="font-medium text-gray-800 mb-1">Expert Local Craftsmen</h4>
                <p className="text-gray-600 text-sm">Our skilled installers live in your community and take pride in beautifying local homes.</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="mr-4 mt-1 text-blue-600">
                <Clock size={24} />
              </div>
              <div>
                <h4 className="font-medium text-gray-800 mb-1">Efficient Project Completion</h4>
                <p className="text-gray-600 text-sm">We respect your time with streamlined workflows that deliver stunning results on schedule.</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="mr-4 mt-1 text-blue-600">
                <DollarSign size={24} />
              </div>
              <div>
                <h4 className="font-medium text-gray-800 mb-1">Crystal-Clear Pricing</h4>
                <p className="text-gray-600 text-sm">No surprises or hidden fees—just honest, upfront quotes you can trust from start to finish.</p>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </>
  );
};

export default TilingQuotePage;