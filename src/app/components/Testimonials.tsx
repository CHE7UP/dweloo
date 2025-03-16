import React from 'react';
import Image from 'next/image';

const testimonials = [
  {
    quote: "Dweloo made our home renovation stress-free! The team was professional, and the results exceeded our expectations.",
    name: "Sarah Mitchell",
    title: "Homeowner | Seattle, WA",
    image: "/assets/img/demo-previews-dark/img21.jpg",
  },
  {
    quote: "The remodeling process was seamless from start to finish. Thanks to Dweloo, our kitchen is now the heart of our home!",
    name: "Mark & Julia Thompson",
    title: "Homeowners | Redmond, WA",
    image: "/assets/img/demo-previews-dark/img21.jpg",
  },
  {
    quote: "Finding reliable contractors was tough until we discovered Dweloo. The quality of work and attention to detail were outstanding.",
    name: "James Carter",
    title: "Real Estate Investor | Bellevue, WA",
    image: "/assets/img/demo-previews-dark/img21.jpg",
  },
];

const Testimonials = () => {
  return (
    <div className="overflow-hidden bg-gray-800">
      {/* Container */}
      <div className="relative max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
        
        {/* Title */}
        <div className="max-w-2xl w-3/4 lg:w-1/2 mb-6 sm:mb-10 md:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl text-white font-semibold">
            Trusted by Homeowners and Professionals Across Canada
          </h2>
        </div>

        {/* Testimonials Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="flex h-auto">
              <div className="flex flex-col bg-white rounded-xl">
                <div className="flex-auto p-4 md:p-6">
                  <p className="text-base italic md:text-lg text-gray-800">
                    &quot;{testimonial.quote}&quot;
                  </p>
                </div>

                <div className="p-4 bg-gray-100 rounded-b-xl md:px-7">
                  <div className="flex items-center gap-x-3">
                    <div className="shrink-0">
                      <Image
                        className="max-w-full rounded-[1.25rem] h-auto"
                        src={testimonial.image}
                        alt={testimonial.name}
                        width={375}
                        height={812}
                      />
                    </div>

                    <div className="grow">
                      <p className="text-sm sm:text-base font-semibold text-gray-800">
                        {testimonial.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {testimonial.title}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Grid */}
        <div className="mt-20 grid gap-6 grid-cols-2 sm:gap-12 lg:grid-cols-3 lg:gap-8">
          <div>
            <h4 className="text-lg sm:text-xl font-semibold text-white">Project Completion Rate</h4>
            <p className="mt-2 sm:mt-3 text-4xl sm:text-6xl font-bold text-blue-500">98%</p>
            <p className="mt-1 text-gray-400">on time and within budget</p>
          </div>

          <div>
            <h4 className="text-lg sm:text-xl font-semibold text-white">Happy Homeowners</h4>
            <p className="mt-2 sm:mt-3 text-4xl sm:text-6xl font-bold text-blue-500">5,000+</p>
            <p className="mt-1 text-gray-400">renovation projects completed</p>
          </div>

          <div>
            <h4 className="text-lg sm:text-xl font-semibold text-white">Satisfaction Rate</h4>
            <p className="mt-2 sm:mt-3 text-4xl sm:text-6xl font-bold text-blue-500">99%</p>
            <p className="mt-1 text-gray-400">based on customer reviews</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;