import React from 'react';
import { CheckCircle } from 'lucide-react';
import Image from 'next/image';

const DwelooCraftsmenQuality = () => {
  const qualities = [
    "Each craftsman is licensed, insured, & bonded",
    "Each craftsman is strictly vetted & tested to ensure they meet dweloo standards",
    "Each craftsman has strict guidelines to be professional, tidy, and kind"
  ];

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center">
          {/* Content side */}
          <div className="w-full lg:w-1/2 lg:order-1 order-2">
            <div className="lg:pr-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center lg:text-left">Only the best craftsmen in your home</h2>
              <ul className="space-y-4">
                {qualities.map((quality, index) => (
                  <li key={index} className="flex items-start my-22">
                    <div className="flex-shrink-0 mt-1 px-4 my12">
                      <CheckCircle size={24} color="#0056B3" />
                    </div>
                    <p className="ml-9 text-lg text-gray-600 ">{quality}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          {/* Image side */}
          <div className="w-full lg:w-1/2 mb-8 lg:mb-0 lg:order-2 order-1">
            <div className="relative aspect-[4/3] w-full">
              <Image 
                src="/assets/img/landing-page-assets/dweloo-craftsman.png"
                alt="Dweloo Professional Craftsman"
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DwelooCraftsmenQuality;