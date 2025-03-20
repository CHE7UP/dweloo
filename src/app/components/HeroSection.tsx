"use client";
import React, { useState } from 'react';
import IpadMockup from './IpadMockup';
import FloorPlan from './FloorPlan';
import AnimatedHeroText from './AnimatedHeroText';
import GetQuoteModal from './GetQuoteModal';

const HeroSection: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const openModal = () => {
    setIsModalOpen(true);
  };
  
  return (
    <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8">
      {/* Grid */}
      <div className="grid md:grid-cols-2 gap-4 md:gap-8 xl:gap-20 md:items-center">
        <div>
          <AnimatedHeroText />
          <div className="mt-4 grid gap-3 w-full sm:inline-flex">
             <button
                className="py-3 px-4 inline-flex justify-center items-center gap-x-2 text-md font-bold rounded-lg bg-[#1976D2] text-white hover:bg-[#1565C0] active:bg-[#0D47A1] active:scale-95 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
                onClick={openModal}
              >
              <svg 
                viewBox="0 0 384 512" 
                className="shrink-0 w-6 h-6"
                width="30"
                height="30"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  d="M336 0H48C22.38 0 0 22.38 0 48v416c0 25.6 22.38 48 48 48h288c25.62 0 48-22.38 48-48V48c0-25.62-22.4-48-48-48zM64 208c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16v-32zm0 96c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16v-32zm160 128c0 8.801-7.199 16-16 16H80c-8.8 0-16-7.2-16-16v-32c0-8.8 7.2-16 16-16h128c8.801 0 16 7.199 16 16v32zm0-96c0 8.801-7.199 16-16 16h-32c-8.8 0-16-7.2-16-16v-32c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v32zm0-96c0 8.8-7.2 16-16 16h-32c-8.8 0-16-7.2-16-16v-32c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v32zm96 192c0 8.801-7.199 16-16 16h-32c-8.799 0-16-7.199-16-16v-32c0-8.801 7.201-16 16-16h32c8.801 0 16 7.199 16 16v32zm0-96c0 8.801-7.199 16-16 16h-32c-8.799 0-16-7.199-16-16v-32c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v32zm0-96c0 8.8-7.2 16-16 16h-32c-8.8 0-16-7.2-16-16v-32c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v32zm0-96c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V80c0-8.8 7.2-16 16-16h224c8.8 0 16 7.2 16 16v64z" 
                  fill="#ffffff" 
                />
              </svg>
              Calculate My Project
            </button>
          </div>
          <div className="mt-1 lg:mt-10 grid grid-cols-2 gap-x-5">
            {/* Review */}
            <div className="py-1">
              <div className="flex gap-x-1">
              </div>
              <div className="mt-1">
              </div>
            </div>
            <div className="py-1">
              <div className="flex gap-x-1">
              </div>
              <div className="mt-5">
              </div>
            </div>
          </div>
        </div>
        <div className="relative ms-4">
          <IpadMockup>
            <FloorPlan />
          </IpadMockup>
        </div>
      </div>
      
      {/* Modal component */}
      <GetQuoteModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default HeroSection;