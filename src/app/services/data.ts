// Updated File structure:
// app/
// ├── services/
// │   ├── page.tsx                  // Main services listing page
// │   ├── [slug]/
// │   │   └── page.tsx              // Dynamic service detail page
// │   └── data.ts                   // Services data with proper slugs

// app/services/data.ts
export interface Service {
    id: string;
    slug: string;
    title: string;
    shortDescription: string;
    description: string;
    imageUrl: string;
  }
  
  export const services: Service[] = [
    {
      id: "1",
      slug: "flooring",  // Ensure slug is kebab-case and matches URL exactly
      title: "Flooring",
      shortDescription: "Professional flooring installation and repair services",
      description: "Our expert team provides comprehensive flooring solutions including hardwood, laminate, tile, and vinyl installation. We also offer refinishing, repair, and maintenance services to keep your floors looking their best.",
      imageUrl: "/assets/img/demo-previews/img16.jpg",
    },
    {
      id: "2",
      slug: "painting",
      title: "Painting",
      shortDescription: "Interior and exterior painting services",
      description: "Transform your space with our professional painting services. We offer interior and exterior painting for residential and commercial properties, using premium materials and techniques for a flawless finish that lasts.",
      imageUrl: "/assets/img/demo-previews/img16.jpg",
    },
    {
      id: "3",
      slug: "kitchen-and-bath",  // Using kebab-case for consistent URL structure
      title: "Kitchen and Bath",
      shortDescription: "Custom kitchen and bathroom remodeling",
      description: "Elevate your home with our custom kitchen and bathroom remodeling services. From concept to completion, we handle every aspect of your renovation including design, demolition, construction, fixture installation, and finishing touches.",
      imageUrl: "/assets/img/demo-previews/img16.jpg",
    },
    {
      id: "4",
      slug: "masonry",
      title: "Masonry",
      shortDescription: "Expert masonry construction and repair",
      description: "Our skilled masons provide top-quality brick, stone, and concrete work. Services include new construction, restoration, repairs, and decorative elements like patios, walkways, retaining walls, and fireplaces.",
      imageUrl: "/assets/img/demo-previews/img16.jpg",
    },
  ];
  
  // Ensure slug matching is consistent
  export function getServiceBySlug(slug: string): Service | undefined {
    return services.find((service) => service.slug === slug.toLowerCase());
  }
  
  export function getAllServiceSlugs(): string[] {
    return services.map((service) => service.slug);
  }