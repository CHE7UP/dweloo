import React from 'react';
import FlooringCalculatorForm from '../components/forms/calculator/FlooringQuestionnaireForm';
import { NextPage } from 'next';
import {Clock, DollarSign, Shield, Users} from "lucide-react";
import Script from 'next/script';


export const metadata = {
  title: 'Get Your Instant Flooring Quote | Seattle Flooring Installation',
  description: 'Calculate your Seattle flooring project cost in just 2 minutes. Get transparent pricing on hardwood, vinyl, and laminate flooring with our instant calculator.',
  keywords: [
    'instant flooring quote',
    'Seattle flooring calculator', 
    'hardwood flooring cost Seattle',
    'flooring installation pricing',
    'vinyl flooring quote',
    'laminate flooring estimate',
    'Seattle flooring contractor',
    'free flooring estimate'
  ],
  openGraph: {
    title: 'Free Instant Flooring Quote | Seattle Installation in 10 Days',
    description: 'Calculate your exact flooring project cost in 2 minutes. No hidden fees, transparent pricing, and guaranteed 10-day installation.',
    images: [
      {
        url: 'https://dweloo.com/dweloo-og.webp',
        width: 1200,
        height: 630,
        alt: 'Dweloo Instant Flooring Quote Calculator',
      },
    ],
  },
};





const FloringQuotePage: NextPage = () => {

  const flooringCalculatorSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Seattle Flooring Cost Calculator",
    "applicationCategory": "BusinessApplication",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "ratingCount": "157"
    },
    "author": {
      "@type": "Organization",
      "name": "Dweloo Seattle Home Renovation"
    },
    "potentialAction": {
      "@type": "UseAction",
      "target": "https://dweloo.com/instant-flooring-quote"
    }
  };


  return (
    <>
    {/* Add the structured data */}
    <Script
      id="flooring-calculator-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(flooringCalculatorSchema),
      }}
    />
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
      <header className="mb-1 text-center">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Flooring Price Calculator</h1>
      </header>

          <FlooringCalculatorForm />
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

export default FloringQuotePage;