import React from 'react';
import { NextPage } from 'next';
import PaintingQuestionnaireForm from '../components/forms/calculator/PaintingQuestionaireForm';

const PaintingQuotePage: NextPage = () => {
  return (
    <div className="min-h-screen bg-white py-8">
      <div className="container mx-auto px-4">
        <header className="mb-1 text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Instant Painting Quote</h1>
          <p className="text-xl text-gray-600">Get an instant estimate for your painting project with Dweloo</p>
        </header>

          <PaintingQuestionnaireForm />
        </div>



        <div className="mt-12 bg-white rounded-lg shadow-lg p-6 md:p-8">
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <ol className="list-decimal pl-5 space-y-2">
                <li className="text-gray-700">Simple and easy-to-use online form</li>
                <li className="text-gray-700">Free in-home consultation with our flooring experts</li>
                <li className="text-gray-700">Personalized recommendations based on your needs</li>
                <li className="text-gray-700">Transparent pricing with no hidden fees</li>
                <li className="text-gray-700">Professional installation by certified technicians</li>
                <li className="text-gray-700">Final walkthrough to ensure your complete satisfaction</li>
              </ol>
            </div>
            
            {/* <div>
              <h3 className="text-xl font-semibold mb-3">Our Guarantee</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li className="text-gray-700">5-year installation warranty</li>
                <li className="text-gray-700">Manufacturer&apos;s warranty on all materials</li>
                <li className="text-gray-700">100% satisfaction guarantee</li>
                <li className="text-gray-700">Clean-up and removal of all debris</li>
                <li className="text-gray-700">Flexible financing options available</li>
              </ul>
            </div> */}
          </div>
        </div>

        {/* <div className="mt-12 bg-blue-600 rounded-lg shadow-lg p-6 md:p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-3">Ready to Transform Your Space?</h2>
          <p className="text-lg mb-6">Complete the form above to get your instant quote or call us directly!</p>
          <div className="inline-block bg-white text-blue-600 font-bold py-3 px-6 rounded-lg text-xl hover:bg-gray-100 transition duration-300">
            Call Now: (555) 123-4567
          </div>
        </div> */}
      </div>
  );
};

export default PaintingQuotePage;