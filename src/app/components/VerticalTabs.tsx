'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Users, Award, Clock, CreditCard } from 'lucide-react';

const ValuePropositionCards = () => {
  // Store all value proposition data in an array of objects
  const valuePropositions = [
    {
      id: 1,
      title: "Local Craftsmen",
      description: "Our team consists of local, licensed, bonded, and insured craftsmen who take pride in their work.",
      imageSrc: "/assets/img/local-craftsmen.jpg",
      imageAlt: "Local craftsmen at work",
      imageCaption: "Skilled Local Professionals",
      imageDescription: "Each craftsman undergoes rigorous vetting and training",
      icon: (isHovered: boolean) => (
        <Users 
          className={`flex-shrink-0 mt-1 transition-colors duration-300 ${isHovered ? 'text-[#0056B3]' : 'text-gray-800'}`} 
          size={24} 
        />
      ),
    },
    {
      id: 2,
      title: "Lifetime Warranty",
      description: "We stand behind our work with a lifetime warranty, giving you peace of mind for years to come.",
      imageSrc: "/assets/img/warranty.jpg",
      imageAlt: "Lifetime warranty certificate",
      imageCaption: "Lifetime Peace of Mind",
      imageDescription: "Our warranty protects your investment for years to come",
      icon: (isHovered: boolean) => (
        <Award 
          className={`flex-shrink-0 mt-1 transition-colors duration-300 ${isHovered ? 'text-[#0056B3]' : 'text-gray-800'}`} 
          size={24} 
        />
      ),
    },
    {
      id: 3,
      title: "10-Day Installation",
      description: "We simplify your schedule—most projects start within 10 days of booking, delivering fast results without the wait.",
      imageSrc: "/assets/img/installation.jpg",
      imageAlt: "Fast installation timeline",
      imageCaption: "Quick Turnaround",
      imageDescription: "Most projects start within 10 days of booking",
      icon: (isHovered: boolean) => (
        <Clock 
          className={`flex-shrink-0 mt-1 transition-colors duration-300 ${isHovered ? 'text-[#0056B3]' : 'text-gray-800'}`} 
          size={24} 
        />
      ),
    },
    {
      id: 4,
      title: "Financing Options",
      description: "Make your project affordable and stress-free with flexible monthly installments, deferred payments, and more, tailored to your budget.",
      imageSrc: "/assets/img/materials.jpg",
      imageAlt: "Financing options",
      imageCaption: "Flexible Payment Solutions",
      imageDescription: "Multiple financing options to fit your budget",
      icon: (isHovered: boolean) => (
        <CreditCard 
          className={`flex-shrink-0 mt-1 transition-colors duration-300 ${isHovered ? 'text-[#0056B3]' : 'text-gray-800'}`} 
          size={24} 
        />
      ),
    },
  ];

  // State to track currently hovered card
  const [hoveredCardId, setHoveredCardId] = useState<number | null>(null);

  return (
    <section className="max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16 mx-auto" aria-labelledby="value-proposition-heading">
      {/* Features Section */}
      <div className="relative p-6 md:p-16">
        {/* Grid Layout */}
        <div className="relative z-10 lg:grid lg:grid-cols-12 lg:gap-16 lg:items-center">
          <div className="mb-10 lg:mb-0 lg:col-span-6 lg:col-start-8 lg:order-2">
            <h2 id="value-proposition-heading" className="text-2xl text-gray-800 font-bold sm:text-3xl mb-4">
              Dweloo is Your Easy Home Improvement Solution
            </h2>
            <p className="text-gray-600 mb-8">We combine skilled craftsmanship with exceptional service to transform your home with quality you can trust.</p>

            {/* Value Proposition Cards */}
            <div className="space-y-5">
              {valuePropositions.map((prop) => (
                <div 
                  key={prop.id}
                  className="group relative rounded-xl overflow-hidden transition-all duration-300 hover:bg-white hover:shadow-lg border border-transparent hover:border-gray-200"
                  onMouseEnter={() => setHoveredCardId(prop.id)}
                  onMouseLeave={() => setHoveredCardId(null)}
                >
                  <div className="p-5">
                    <div className="flex gap-x-4">
                      {prop.icon(hoveredCardId === prop.id)}
                      <div className="grow">
                        <h3 className="text-lg font-semibold text-gray-800 group-hover:text-[#0056B3] transition-colors duration-300">
                          {prop.title}
                        </h3>
                        <p className="mt-2 text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                          {prop.description}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Hover overlay with image - Only visible on larger screens */}
                  <div 
                    className={`hidden lg:block absolute -right-64 top-0 h-full w-64 pointer-events-none transition-opacity duration-300 ${hoveredCardId === prop.id ? 'opacity-100' : 'opacity-0'}`}
                  >
                    <div className="relative h-full rounded-l-xl overflow-hidden shadow-lg">
                      <div className="h-full bg-gray-200 flex items-center justify-center">
                        {/* Placeholder for actual images */}
                        <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                          <p className="text-gray-500 text-sm px-4 italic">Image preview</p>
                        </div>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                        <p className="text-white font-semibold text-sm">{prop.imageCaption}</p>
                        <p className="text-white text-xs mt-1">{prop.imageDescription}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* End Col */}

          <div className="lg:col-span-6">
            <div className="relative">
              {/* Main Image */}
              <div className="relative rounded-xl overflow-hidden shadow-xl">
                <Image
                  className="w-full h-auto object-cover"
                  src="/assets/img/landing-page-assets/flooring-dweloo.webp"
                  alt="Quality flooring installation by Dweloo"
                  width={600}
                  height={500}
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent">
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-white font-semibold text-2xl">Quality You Can Trust</h3>
                    <p className="text-white/90 text-base mt-2">Every project backed by our commitment to excellence</p>
                  </div>
                </div>
              </div>
              
              {/* Decorative Elements */}
              <div className="hidden md:block absolute -top-8 -right-8 z-[-1]">
                <svg
                  className="w-20 h-20 text-yellow-400 opacity-70"
                  viewBox="0 0 121 135"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5 16.4754C11.7688 27.4499 21.2452 57.3224 5 89.0164"
                    stroke="currentColor"
                    strokeWidth="10"
                    strokeLinecap="round"
                  />
                  <path
                    d="M33.6761 112.104C44.6984 98.1239 74.2618 57.6776 83.4821 5"
                    stroke="currentColor"
                    strokeWidth="10"
                    strokeLinecap="round"
                  />
                  <path
                    d="M50.5525 130C68.2064 127.495 110.731 117.541 116 78.0874"
                    stroke="currentColor"
                    strokeWidth="10"
                    strokeLinecap="round"
                  />
                </svg>
              </div>

              {/* Accent Circle */}
              <div className="hidden md:block absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-blue-600/10 z-[-1]"></div>
            </div>
          </div>
          {/* End Col */}
        </div>
        {/* End Grid */}

        {/* Background Color */}
        <div className="absolute inset-0 grid grid-cols-12 w-full h-full">
          <div className="col-span-full lg:col-span-7 lg:col-start-6 bg-gray-50 w-full h-5/6 rounded-xl sm:h-3/4 lg:h-full"></div>
        </div>
        {/* End Background Color */}
      </div>
    </section>
  );
};

export default ValuePropositionCards;