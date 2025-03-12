// app/services/[slug]/page.tsx
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getServiceBySlug, getAllServiceSlugs } from '../data';

type ServicePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

// Generate metadata for each service page
export async function generateMetadata({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  
  if (!service) {
    return {
      title: 'Service Not Found',
      description: 'The requested service could not be found',
    };
  }

  return {
    title: `${service.title} | Our Services`,
    description: service.shortDescription,
  };
}

// Generate static params for all service slugs
export async function generateStaticParams() {
  const slugs = getAllServiceSlugs();
  return slugs.map(slug => ({ slug }));
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  // Using object destructuring with await to properly handle the async nature of params
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  // Handle non-existent service slugs
  if (!service) {
    notFound();
  }

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="mb-6">
        <Link 
          href="/services" 
          className="text-blue-600 hover:text-blue-800 flex items-center"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-5 w-5 mr-1" 
            viewBox="0 0 20 20" 
            fill="currentColor"
          >
            <path 
              fillRule="evenodd" 
              d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" 
              clipRule="evenodd" 
            />
          </svg>
          Back to All Services
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="relative h-96 w-full">
          <div className="absolute inset-0 bg-gray-200">
            <Image
              src={service.imageUrl || `/api/placeholder/800/600`}
              alt={service.title}
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
          </div>
        </div>
        
        <div className="p-8">
          <h1 className="text-4xl font-bold mb-4">{service.title}</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-gray-700 mb-6">{service.shortDescription}</p>
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Our Approach</h2>
              <p className="mb-4">{service.description}</p>
            </div>
            
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Why Choose Us</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Professional, experienced team</li>
                <li>High-quality materials and craftsmanship</li>
                <li>On-time project completion</li>
                <li>Competitive pricing with no hidden fees</li>
                <li>Satisfaction guaranteed</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8">
            <Link 
              href="/contact" 
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              Request a Free Quote
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}