import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getBlogPostBySlug, getAllBlogSlugs } from '../data';

type BlogPostPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

// Generate metadata for each blog post page
export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  
  if (!post) {
    return {
      title: 'Post Not Found',
      description: 'The requested blog post could not be found',
    };
  }

  return {
    title: `${post.title} | Dweloo Home Improvement Blog`,
    description: post.shortDescription,
  };
}

// Generate static params for all blog post slugs
export async function generateStaticParams() {
  const slugs = getAllBlogSlugs();
  return slugs.map(slug => ({ slug }));
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  // Handle non-existent blog post slugs
  if (!post) {
    notFound();
  }

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="mb-6">
        <Link 
          href="/blog" 
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
          Back to All Posts
        </Link>
      </div>

      <article className="bg-white rounded-lg shadow-xl overflow-hidden max-w-4xl mx-auto">
        <div className="relative h-96 w-full">
          <div className="absolute inset-0 bg-gray-200">
            <Image
              src={post.imageUrl || `/assets/img/demo-previews/img16.jpg/800/600`}
              alt={post.title}
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
          </div>
        </div>
        
        <div className="p-8">
          <div className="text-gray-500 mb-2">{post.date}</div>
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
          
          <div className="prose prose-lg max-w-none">
            {post.content.split('\n\n').map((paragraph, index) => (
              <p key={index} className="mb-4">{paragraph}</p>
            ))}
          </div>
          
          <div className="mt-8 border-t pt-6">
            <h3 className="text-xl font-semibold mb-4">Ready to start your project?</h3>
            <Link 
              href="/contact" 
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors mr-4"
            >
              Request a Free Quote
            </Link>
            <Link 
              href="/services" 
              className="inline-block bg-white border border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              Explore Our Services
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}