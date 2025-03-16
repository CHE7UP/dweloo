import React from "react";
import Image from "next/image";

const services = [
  {
    id: 1,
    title: "Flooring",
    description:
      "Expert installation of hardwood, vinyl, tile, and laminate flooring for a durable and stylish finish.",
    image: "https://firebasestorage.googleapis.com/v0/b/fast-ai-solutions.appspot.com/o/dweloo%2Fassets%2Fdweloo-flooring-service-card.webp?alt=media&token=c94430dd-ca16-43cb-acc0-aed46811f771", // Replace with actual image path
    cta: "Explore Options",
  },
  {
    id: 2,
    title: "Painting",
    description:
      "Professional interior and exterior painting services with premium finishes and long-lasting results.",
    image: "https://firebasestorage.googleapis.com/v0/b/fast-ai-solutions.appspot.com/o/dweloo%2Fassets%2Fdweloo-painting-service-card.webp?alt=media&token=673557fd-8332-4ed3-b146-f936c05d8c40", // Replace with actual image path
    cta: "Get a Free Quote",
  },
  {
    id: 3,
    title: "Kitchen & Bath",
    description:
      "Transform your kitchen and bathroom with expert remodeling, modern fixtures, and custom cabinetry.",
    image: "https://firebasestorage.googleapis.com/v0/b/fast-ai-solutions.appspot.com/o/dweloo%2Fassets%2Fdweloo-kitchen-bath-service-card.webp?alt=media&token=e6d40c8b-6977-4817-8e3a-4b7e1ab084b9", // Replace with actual image path
    cta: "View Our Work",
  },
  {
    id: 4,
    title: "Masonry",
    description:
      "High-quality masonry work, including brick, stone, and concrete solutions for durability and aesthetics.",
    image: "https://firebasestorage.googleapis.com/v0/b/fast-ai-solutions.appspot.com/o/dweloo%2Fassets%2Fdweloo-masonry-service-card.webp?alt=media&token=e690b7fe-fec5-45da-af75-a8934d9c9bbb", // Replace with actual image path
    cta: "Learn More",
  },
];

const ServicesSection: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12 lg:py-16">
      {/* Section Title */}
      <h2 className="text-4xl font-bold text-gray-900 text-center mb-12">
        Our Services
      </h2>

      {/* Grid Layout */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {services.map((service) => (
          <div
            key={service.id}
            className="flex flex-col bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow"
          >
            {/* Service Image (Fixed for Next.js 13+) */}
            <div className="relative w-full h-48">
              <Image
                src={service.image}
                alt={service.title}
                fill
                className="object-cover"
              />
            </div>

            {/* Content */}
            <div className="p-6 flex flex-col flex-grow">
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                {service.title}
              </h3>
              <p className="text-gray-600 flex-grow">{service.description}</p>
            </div>

            {/* Call to Action */}
            <div className="p-4 text-center">
              <a
                href="#"
                className="inline-block px-6 py-3 text-sm font-medium text-gray-600 rounded-full hover:scale-105 transition-all duration-300 ease-in-out shadow-md"
              >
                {service.cta}
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicesSection;