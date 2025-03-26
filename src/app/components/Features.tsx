import React from 'react';
import { MapPin, Video, Clock, CreditCard } from 'lucide-react';

const DwelooFeatures = () => {
  const features = [
    {
      icon: <MapPin size={28} color="white" />,
      title: "Local Craftsmen",
      description: "Licensed, bonded, and insured local professionals who take pride in quality workmanship."
    },
    {
      icon: <Video size={28} color="white" />,
      title: "Free Consultations",
      description: "Choose between convenient virtual meetings or thorough in-person assessments for your project."
    },
    {
      icon: <Clock size={28} color="white" />,
      title: "10-Day Installation",
      description: "Quick turnaround with most projects starting within 10 days of your confirmation."
    },
    {
      icon: <CreditCard size={28} color="white" />,
      title: "Flexible Financing",
      description: "Easy monthly installments and payment options tailored to fit your budget."
    }
  ];

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center text-center p-6 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="mb-5 bg-[#1273EB] p-4 rounded-full flex items-center justify-center w-16 h-16">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DwelooFeatures;