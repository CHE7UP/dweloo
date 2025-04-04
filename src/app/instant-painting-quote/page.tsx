import React from 'react';
import PaintingQuestionnaireForm from '../components/forms/calculator/PaintingQuestionaireForm';
import { NextPage } from 'next';
import {Clock, DollarSign, Shield, Users} from "lucide-react";


export const metadata = {
  title: 'Instant Painting Quote | Seattle Interior & Exterior Painting Costs',
  description: 'Calculate your Seattle home painting costs instantly. Get exact pricing for interior and exterior painting with our free online quote calculator.',
  keywords: [
    'painting cost calculator',
    'Seattle house painting quote', 
    'interior painting prices',
    'exterior painting estimate',
    'Seattle painting contractor',
    'home painting calculator',
    'instant painting quote',
    'free painting estimate',
  ],
  openGraph: {
    title: 'Calculate Your Seattle Home Painting Cost | Free Quote Tool',
    description: 'Get transparent pricing for your Seattle home painting project in minutes. Interior, exterior, and accent wall painting with 10-day completion.',
    images: [
      {
        url: 'https://dweloo.com/dweloo-og.webp',
        width: 1200,
        height: 630,
        alt: 'Seattle Painting Cost Calculator',
      },
    ],
  },
};


const PaintingQuotePage: NextPage = () => {

  const paintingCalculatorSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Seattle Home Painting Calculator",
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
      "ratingCount": "143"
    },
    "author": {
      "@type": "Organization",
      "name": "Dweloo Seattle Home Renovation"
    },
    "potentialAction": {
      "@type": "UseAction",
      "target": "https://dweloo.com/instant-painting-quote"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(paintingCalculatorSchema) }}
      />
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
      <header className="mb-1 text-center">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Instant Painting Quote</h1>
       </header>

          <PaintingQuestionnaireForm />
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

export default PaintingQuotePage;