

import React from "react";
import Image from "next/image";
import Link from "next/link";

const services = [
  {
    id: 1,
    title: "Flooring",
    description:
      "Premium installation of hardwood, vinyl, and laminate flooring with expert craftsmanship for lasting beauty and durability in any space.",
    image: "/assets/img/landing-page-assets/dweloo-finished-home.webp",
    cta: "Explore Options",
    link: "/services/flooring",
  },
  {
    id: 2,
    title: "Painting",
    description:
      "Flawless interior and exterior painting services using premium materials, delivering vibrant colors with clean edges and superior finish.",
    image: "https://firebasestorage.googleapis.com/v0/b/fast-ai-solutions.appspot.com/o/dweloo%2Fassets%2Fdweloo-painting-service-card.webp?alt=media&token=673557fd-8332-4ed3-b146-f936c05d8c40",
    cta: "Get a Free Quote",
    link: "/services/painting",
  },
  {
    id: 3,
    title: "Trims",
    description:
      "Expert installation of baseboards, crown molding, and decorative trim with precise cuts and seamless joints for a polished, elegant finish in any room.",
    image: "https://firebasestorage.googleapis.com/v0/b/fast-ai-solutions.appspot.com/o/dweloo%2Fassets%2Fdweloo-kitchen-bath-service-card.webp?alt=media&token=e6d40c8b-6977-4817-8e3a-4b7e1ab084b9",
    cta: "View Our Work",
    link: "/services/trim",
  },
  {
    id: 4,
    title: "Tiling",
    description:
      "Professional tile installation for floors, walls, backsplashes, and showers, creating beautiful and durable surfaces with precise alignment and clean grout lines.",
    image: "https://firebasestorage.googleapis.com/v0/b/fast-ai-solutions.appspot.com/o/dweloo%2Fassets%2Fdweloo-masonry-service-card.webp?alt=media&token=e690b7fe-fec5-45da-af75-a8934d9c9bbb",
    cta: "Learn More",
    link: "/services/tiling",
  },
  {
    id: 5,
    title: "Custom Projects",
    description:
      "Personalized consultation and quotes for unique home improvement projects beyond our standard services. Tell us your vision, and we'll bring it to life with quality craftsmanship.",
    image: "https://firebasestorage.googleapis.com/v0/b/fast-ai-solutions.appspot.com/o/dweloo%2Fassets%2Fdweloo-masonry-service-card.webp?alt=media&token=e690b7fe-fec5-45da-af75-a8934d9c9bbb",
    cta: "Request a Quote",
    link: "/services/custom",
    isWide: true,
  },
];

const ServicesSection = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12 lg:py-16">
      {/* Section Title and Subtitle */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900 mb-3">
          Our Services
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Transform your space. We handle the details, you enjoy the results.
        </p>
      </div>
      
      {/* Grid Layout: Responsive for mobile and custom for desktop */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service) => (
          <div
            key={service.id}
            className={`group relative bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md hover:translate-y-1 hover:border-blue-100 ${
              service.isWide ? "md:col-span-2 lg:col-span-2" : ""
            } ${
              service.id === 5 ? "md:order-last lg:order-last" : ""
            }`}
          >
            {/* Service Image */}
            <div className={`relative w-full ${service.isWide ? "h-72" : "h-64"}`}>
              <Image
                src={service.image}
                alt={service.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-70"></div>
              
              {/* Button on Image */}
              <div className="absolute bottom-4 right-4">
                <Link href={service.link}
                  className="inline-flex items-center px-4 py-2 bg-white bg-opacity-95 text-sm font-medium text-[#1976D2] rounded-md shadow-sm hover:bg-blue-50 transition-all duration-300 ease-in-out border border-blue-100 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0"
                >
                  {service.cta}
                </Link>
              </div>
            </div>
            
            {/* Content Section */}
            <div className="p-6">
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                {service.title}
              </h3>
              <div className="w-12 h-0.5 bg-[#1976D2] mb-4"></div>
              <p className="text-gray-600">{service.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicesSection;