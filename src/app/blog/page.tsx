import Link from 'next/link';
import Image from 'next/image';
import { blogPosts } from '@/app/blog/data';

export const metadata = {
  title: 'Dweloo Home Improvement Blog',
  description: 'Expert advice and inspiration for your next home improvement project',
};

export default function BlogPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-8 text-center">Our Blog</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.map((post) => (
          <Link 
            href={`/blog/${post.slug}`} 
            key={post.id}
            className="group block bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105"
          >
            <div className="relative h-64 w-full">
              <div className="absolute inset-0 bg-gray-200">
                <Image
                  src={typeof post.imageUrl === 'string' ? post.imageUrl : `/assets/img/demo-previews/img16.jpg/400/320`}
                  alt={post.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            </div>
            <div className="p-6">
              <div className="text-gray-500 text-sm mb-2">{post.date}</div>
              <h2 className="text-2xl font-semibold mb-2 group-hover:text-blue-600 transition-colors">
                {post.title}
              </h2>
              <p className="text-gray-600">{post.shortDescription}</p>
              <div className="mt-4 text-blue-600 font-medium flex items-center">
                Read more
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