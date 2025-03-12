export interface BlogPost {
    id: string;
    slug: string;
    title: string;
    shortDescription: string;
    content: string;
    imageUrl: string;
    date: string;
  }
  
  export const blogPosts: BlogPost[] = [
    {
      id: "1",
      slug: "kitchen-renovation-trends",
      title: "Kitchen Renovation Trends for 2025",
      shortDescription: "Discover the latest kitchen design trends for your next remodel",
      content: "The kitchen remains the heart of the home, and 2025 brings exciting new trends to consider for your renovation. Sustainable materials are taking center stage, with reclaimed wood, recycled glass countertops, and energy-efficient appliances becoming standard choices. Homeowners are embracing earthy tones paired with bold accent colors to create spaces that feel both grounded and vibrant.\n\nSmart technology integration continues to evolve beyond basic appliances. Touch-free faucets, smart refrigerators with inventory management, and lighting systems that adjust based on time of day are becoming increasingly popular. At Dweloo Home Improvement, we've seen growing demand for custom storage solutions that maximize functionality while maintaining clean, minimalist aesthetics that make even smaller kitchens feel spacious and organized.",
      imageUrl: "/assets/img/demo-previews/img16.jpg",
      date: "March 5, 2025"
    },
    {
      id: "2",
      slug: "bathroom-remodeling-guide",
      title: "Complete Bathroom Remodeling Guide",
      shortDescription: "Essential steps for a successful bathroom renovation project",
      content: "A bathroom remodel can significantly increase your home's value while creating a personal sanctuary. Before beginning your project, establish a realistic budget that includes a 15-20% contingency for unexpected issues, particularly in older homes where plumbing or structural surprises may lurk behind walls. Consider your household's specific needs—families might prioritize durable, easy-clean surfaces, while empty-nesters might focus on aging-in-place features like curbless showers and comfort-height toilets.\n\nWhen selecting materials, balance aesthetics with practicality. Porcelain tiles offer durability and water resistance with endless design options, while natural stone requires more maintenance but delivers unmatched elegance. Don't overlook ventilation upgrades; a properly sized exhaust fan prevents mold issues and extends the life of your beautiful new surfaces. Our Dweloo design team specializes in creating bathrooms that combine functionality with luxury details that make everyday routines feel special.",
      imageUrl: "/assets/img/demo-previews/img16.jpg",
      date: "February 18, 2025"
    },
    {
      id: "3",
      slug: "flooring-selection-tips",
      title: "How to Choose the Perfect Flooring for Each Room",
      shortDescription: "Expert advice on selecting the right flooring materials for your home",
      content: "Selecting the right flooring for each space requires balancing practical considerations with design goals. For kitchens and bathrooms, water resistance is paramount—porcelain tile, luxury vinyl, and properly sealed natural stone all excel in these environments while offering various aesthetic options. Engineered hardwood provides the warmth of real wood with greater dimensional stability in areas with fluctuating humidity, making it ideal for basements and over radiant heating systems.\n\nConsider your lifestyle when making selections. Homes with pets and children benefit from scratch-resistant laminates or luxury vinyl planks that won't show wear paths as quickly as softer woods. For bedrooms, comfort underfoot might lead you toward carpet or cork, both of which provide sound dampening qualities. At Dweloo Home Improvement, we help clients consider these factors alongside their design vision, often creating transitions between flooring types that maintain visual flow throughout the home while addressing the practical needs of each space.",
      imageUrl: "/assets/img/demo-previews/img16.jpg",
      date: "February 2, 2025"
    },
    {
      id: "4",
      slug: "outdoor-living-spaces",
      title: "Creating Functional Outdoor Living Spaces",
      shortDescription: "Transform your yard into an extension of your home",
      content: "Outdoor living spaces have evolved from simple patios to fully-equipped extensions of the indoor environment. When planning your outdoor renovation, consider creating distinct zones for cooking, dining, conversation, and relaxation. A well-designed outdoor kitchen with adequate counter space, storage, and appropriate appliances makes entertaining seamless, while a pergola or pavilion extends the usability of your space by providing protection from sun and light rain.\n\nMaterial selection is crucial for longevity in outdoor applications. Our Dweloo masonry team specializes in creating stunning hardscapes using materials that withstand local weather conditions while complementing your home's architecture. Composite decking offers the look of wood with minimal maintenance requirements, while porcelain pavers provide unlimited design possibilities with superior durability. Incorporate lighting for both safety and ambiance—solar path lights, LED strip lighting under seating, and strategically placed downlights create layers of illumination that extend your enjoyment well into the evening.",
      imageUrl: "/assets/img/demo-previews/img16.jpg",
      date: "January 15, 2025"
    }
  ];
  
  // Helper functions
  export function getBlogPostBySlug(slug: string): BlogPost | undefined {
    return blogPosts.find((post) => post.slug === slug.toLowerCase());
  }
  
  export function getAllBlogSlugs(): string[] {
    return blogPosts.map((post) => post.slug);
  }