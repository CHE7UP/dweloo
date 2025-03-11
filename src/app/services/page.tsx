// app/services/page.tsx
import Link from 'next/link';
import Image from 'next/image';
import { services } from '@/app/services/data';

export const metadata = {
  title: 'Our Services',
  description: 'Professional construction and home improvement services',
};

export default function ServicesPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-8 text-center">Our Services</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {services.map((service: {slug: string; id: string; title: string; imageUrl: string; shortDescription: string | number}) => (
          <Link 
            href={`/services/${service.slug}`} 
            key={service.id}
            className="group block bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105"
          >
            <div className="relative h-64 w-full">
              {/* Use a placeholder if image is not available during development */}
              <div className="absolute inset-0 bg-gray-200">
                <Image
                  src={typeof service.imageUrl === 'string' ? service.imageUrl : `/api/placeholder/400/320`}
                  alt={service.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
              </div>
            </div>
            <div className="p-6">
              <h2 className="text-2xl font-semibold mb-2 group-hover:text-blue-600 transition-colors">
                {service.title}
              </h2>
              <p className="text-gray-600">{service.shortDescription}</p>
              <div className="mt-4 text-blue-600 font-medium flex items-center">
                Learn more
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5 ml-1" 
                  viewBox="0 0 20 20" 
                  fill="currentColor"
                >
                  <path 
                    fillRule="evenodd" 
                    d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" 
                    clipRule="evenodd" 
                  />
                </svg>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}