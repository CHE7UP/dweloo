"use client";
import React from 'react';
import Link from "next/link";
import { MapPin, Check, Calculator, Calendar, Clock } from 'lucide-react';

const LocalSeoSection: React.FC = () => {
  return (
    <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center md:text-left">Seattle&apos;s Trusted Home Renovation Experts</h2>
      
      <div className="grid md:grid-cols-2 gap-8 xl:gap-16">
        <div>
          <p className="mb-6 text-gray-600">
            Looking for professional home renovation in Seattle? Dweloo delivers hassle-free home improvements with transparent pricing and fast 10-day installations. Our team of expert Seattle craftsmen specializes in flooring, painting, tiling, trims, and custom renovations.
          </p>
          <p className="mb-6 text-gray-600">
            We serve homeowners throughout Seattle including Capitol Hill, Ballard, Fremont, Queen Anne, Green Lake, and surrounding areas. Our commitment to quality craftsmanship and customer satisfaction has made us one of the most trusted home improvement companies in the Seattle area.
          </p>
          
          <div className="mt-8 p-6 bg-gray-50 rounded-xl shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg text-gray-800 font-semibold">Seattle Neighborhoods We Serve:</h3>
            </div>
            <ul className="grid grid-cols-2 gap-y-3 gap-x-6 text-gray-700">
              <li className="flex items-center">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mr-2"></div>
                Capitol Hill
              </li>
              <li className="flex items-center">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mr-2"></div>
                Ballard
              </li>
              <li className="flex items-center">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mr-2"></div>
                Fremont
              </li>
              <li className="flex items-center">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mr-2"></div>
                Queen Anne
              </li>
              <li className="flex items-center">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mr-2"></div>
                Green Lake
              </li>
              <li className="flex items-center">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mr-2"></div>
                Wallingford
              </li>
              <li className="flex items-center">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mr-2"></div>
                University District
              </li>
              <li className="flex items-center">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mr-2"></div>
                Magnolia
              </li>
              <li className="flex items-center">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mr-2"></div>
                West Seattle
              </li>
              <li className="flex items-center">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mr-2"></div>
                Bellevue
              </li>
            </ul>
          </div>
        </div>
        
        <div>
          <div className="p-6 bg-gray-50 rounded-xl shadow-sm mb-8">
            <h3 className="text-lg text-gray-600 font-semibold mb-4">Our Seattle Home Improvement Services:</h3>
            <ul className="space-y-4">
              <li className="flex">
                <Check className="mt-1 mr-3 text-blue-600 flex-shrink-0" />
                <div>
                  <strong className="text-gray-800">Flooring Installation:</strong>
                  <p className="text-gray-600">Hardwood, vinyl, laminate, and tile flooring for Seattle homes</p>
                </div>
              </li>
              <li className="flex">
                <Check className="mt-1 mr-3 text-blue-600 flex-shrink-0" />
                <div>
                  <strong className="text-gray-800">Interior & Exterior Painting:</strong>
                  <p className="text-gray-600">Premium painting services with flawless finishes</p>
                </div>
              </li>
              <li className="flex">
                <Check className="mt-1 mr-3 text-blue-600 flex-shrink-0" />
                <div>
                  <strong className="text-gray-800">Tile Installation:</strong>
                  <p className="text-gray-600">Bathroom, kitchen, and backsplash tiling by Seattle experts</p>
                </div>
              </li>
              <li className="flex">
                <Check className="mt-1 mr-3 text-blue-600 flex-shrink-0" />
                <div>
                  <strong className="text-gray-800">Trim & Molding:</strong>
                  <p className="text-gray-600">Custom baseboards, crown molding, and decorative trim work</p>
                </div>
              </li>
              <li className="flex">
                <Check className="mt-1 mr-3 text-blue-600 flex-shrink-0" />
                <div>
                  <strong className="text-gray-800">Custom Renovations:</strong>
                  <p className="text-gray-600">Personalized home improvement projects tailored to your Seattle home</p>
                </div>
              </li>
            </ul>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start items-center">
            <div className="flex flex-col items-center">
              <Link 
                href="/schedule-consultation-seattle" 
                className="inline-flex items-center justify-center gap-2 px-6 py-3 font-semibold text-white transition-all bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
              >
                <Calendar className="w-5 h-5" />
                Schedule a Consultation
              </Link>
              <div className="flex items-center text-sm text-gray-500 mt-2">
                <span>Free in-person assessment</span>
              </div>
            </div>
            
            <div className="flex items-center text-gray-500 font-medium">
              OR
            </div>
            
            <div className="flex flex-col items-center">
              <Link 
                href="/instant-flooring-quote" 
                className="inline-flex items-center justify-center gap-2 px-6 py-3 font-semibold text-blue-600 transition-all border border-blue-600 rounded-md hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
              >
                <Calculator className="w-5 h-5" />
                Get an Instant Quote
              </Link>
              <div className="flex items-center text-sm text-gray-500 mt-2">
            <Clock className="w-4 h-4 mr-1" />
            <span>Takes about 2 minutes</span>
        </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocalSeoSection;