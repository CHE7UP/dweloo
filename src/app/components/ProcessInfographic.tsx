import React from 'react';
import Image from 'next/image';
import { ArrowDown, ArrowRight } from 'lucide-react';

const ProcessInfographic = () => {
  const steps = [
    {
      image: "/assets/img/graphics/dweloo_instant_quote_icon.svg",
      text: "Get an online instant quote"
    },
    {
      image: "/assets/img/graphics/dweloo_consultation_icon.svg",
      text: "Schedule a consultation"
    },
    {
      image: "/assets/img/graphics/dweloo-relax-icon.svg",
      text: "Relax, we handle it from here"
    }
  ];

  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">How It Works</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Our simple three-step process</p>
        </div>

        <div className="flex flex-col md:flex-row justify-center items-center">
          {steps.map((step, index) => (
            <React.Fragment key={index}>
              <div className="flex flex-col items-center text-center mb-8 md:mb-0">
                <div className="w-48 h-48 mb-4 flex items-center justify-center relative">
                  <Image 
                    src={step.image} 
                    alt={step.text} 
                    fill
                    style={{ objectFit: 'contain' }}
                    priority={index === 0}
                  />
                </div>
                <p className="text-lg font-medium text-gray-800">{step.text}</p>
              </div>
              
              {index < steps.length - 1 && (
                <>
                {/* Mobile arrow (down) */}
                <div className="block md:hidden text-blue-500 mb-12 mt-4">
                  <ArrowDown size={40} strokeWidth={2.5} />
                </div>
                
                {/* Desktop arrow (right) */}
                <div className="hidden md:block text-blue-500 mx-16">
                  <ArrowRight size={40} strokeWidth={2.5} />
                </div>
              </>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessInfographic;