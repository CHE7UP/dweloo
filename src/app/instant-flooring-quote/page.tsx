import React from 'react';
import FlooringCalculatorForm from '../components/forms/calculator/FlooringCalculatorForm';
import { NextPage } from 'next';

const FloringQuotePage: NextPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Get Instant Flooring Quote</h1>
          <p className="text-xl text-gray-600">Get an instant estimate for your flooring project</p>
        </header>

        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
          <FlooringCalculatorForm />
        </div>

        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow text-center">
            <div className="text-blue-600 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold mb-2">Expert Installation</h2>
            <p className="text-gray-600">Our team of professionals ensures flawless installation with attention to every detail.</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow text-center">
            <div className="text-blue-600 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold mb-2">Quick Turnaround</h2>
            <p className="text-gray-600">We work efficiently to complete your project with minimal disruption to your daily life.</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow text-center">
            <div className="text-blue-600 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h2 className="text-xl font-bold mb-2">Premium Materials</h2>
            <p className="text-gray-600">We only use high-quality materials that ensure durability and long-lasting beauty.</p>
          </div>
        </div>

        <div className="mt-12 bg-white rounded-lg shadow-lg p-6 md:p-8">
          <h2 className="text-2xl font-bold mb-4 text-center">Why Choose Us?</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-3">Our Process</h3>
              <ol className="list-decimal pl-5 space-y-2">
                <li className="text-gray-700">Free in-home consultation with our flooring experts</li>
                <li className="text-gray-700">Personalized recommendations based on your needs</li>
                <li className="text-gray-700">Transparent pricing with no hidden fees</li>
                <li className="text-gray-700">Professional installation by certified technicians</li>
                <li className="text-gray-700">Final walkthrough to ensure your complete satisfaction</li>
              </ol>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-3">Our Guarantee</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li className="text-gray-700">5-year installation warranty</li>
                <li className="text-gray-700">Manufacturer&apos;s warranty on all materials</li>
                <li className="text-gray-700">100% satisfaction guarantee</li>
                <li className="text-gray-700">Clean-up and removal of all debris</li>
                <li className="text-gray-700">Flexible financing options available</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 bg-blue-600 rounded-lg shadow-lg p-6 md:p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-3">Ready to Transform Your Space?</h2>
          <p className="text-lg mb-6">Complete the form above to get your instant quote or call us directly!</p>
          <div className="inline-block bg-white text-blue-600 font-bold py-3 px-6 rounded-lg text-xl hover:bg-gray-100 transition duration-300">
            Call Now: (555) 123-4567
          </div>
        </div>

        <footer className="mt-12 text-center text-gray-600 pb-8">
          <p>© {new Date().getFullYear()} Premium Flooring Solutions. All rights reserved.</p>
          <p className="mt-2">Licensed and Insured • Serving [Your Service Area]</p>
        </footer>
      </div>
    </div>
  );
};

export default FloringQuotePage;