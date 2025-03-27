'use client';


import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  thumbnail: string;
}

const ProjectSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  // Sample project data - replace with your actual projects
  const projects: Project[] = [
    {
      id: 1,
      title: 'Modern Kitchen Renovation',
      description: 'Complete kitchen remodel with custom cabinets',
      image: '/assets/images/past-projects/dweloo-kitchen-project.webp',
      thumbnail: '/assets/images/past-projects/dweloo-kitchen-project.webp'
    },
    {
      id: 2,
      title: 'Hardwood Flooring New Home',
      description: 'New construction with premium hardwood flooring',
      image: '/assets/images/past-projects/dweloo-flooring-completed-project.webp',
      thumbnail: '/assets/images/past-projects/dweloo-flooring-completed-project.webp'
    },
    {
      id: 3,
      title: 'Hardwood Flooring Installation',
      description: 'Premium hardwood flooring throughout the main level',
      image: '/assets/images/past-projects/dweloo-flooring-project.webp',
      thumbnail: '/assets/images/past-projects/dweloo-flooring-project.webp'
    },
    {
      id: 4,
      title: 'Exterior House Painting',
      description: 'Complete exterior painting with premium weather-resistant paint',
      image: '/assets/images/past-projects/dweloo-painted-house-4.webp',
      thumbnail: '/assets/images/past-projects/dweloo-painted-house-4.webp'
    },
    {
      id: 5,
      title: 'Exterior House Painting',
      description: 'Complete exterior Painting with premium weather-resistant paint',
      image: '/assets/images/past-projects/dweloo-painted-house.webp',
      thumbnail: '/assets/images/past-projects/dweloo-painted-house.webp'
    }
  ];

  const nextSlide = (): void => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentIndex((prevIndex) => (prevIndex + 1) % projects.length);
      setTimeout(() => setIsAnimating(false), 500);
    }
  };

  const prevSlide = (): void => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentIndex((prevIndex) => (prevIndex - 1 + projects.length) % projects.length);
      setTimeout(() => setIsAnimating(false), 500);
    }
  };

  const goToSlide = (index: number): void => {
    if (!isAnimating && index !== currentIndex) {
      setIsAnimating(true);
      setCurrentIndex(index);
      setTimeout(() => setIsAnimating(false), 500);
    }
  };

  // Auto-advance every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    
    return () => clearInterval(interval);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-0">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-700 mb-8 text-center">
        Our Recent Transformations
      </h2>
      
      {/* Main slider */}
      <div className="relative overflow-hidden rounded-lg shadow-lg mb-8 bg-white">
        <div 
          className="flex transition-transform duration-500 ease-out h-[400px] md:h-[500px]"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {projects.map((project) => (
            <div key={project.id} className="w-full flex-shrink-0">
              <div className="relative h-full">
                <Image 
                  src={project.image} 
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 1200px"
                  priority={currentIndex === projects.indexOf(project)}
                  className="object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6 z-10">
                  <h3 className="text-2xl font-bold text-white">{project.title}</h3>
                  <p className="text-white/90 mt-2">{project.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Navigation arrows */}
        <button 
          onClick={prevSlide}
          className="absolute top-1/2 left-4 -translate-y-1/2 bg-white/30 hover:bg-white/50 rounded-full p-2 backdrop-blur-sm transition-colors z-20"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
        
        <button 
          onClick={nextSlide}
          className="absolute top-1/2 right-4 -translate-y-1/2 bg-white/30 hover:bg-white/50 rounded-full p-2 backdrop-blur-sm transition-colors z-20"
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>
      </div>
      
      {/* Thumbnails */}
      <div className="flex justify-center space-x-3 overflow-x-auto py-2">
        {projects.map((project, index) => (
          <button
            key={project.id}
            onClick={() => goToSlide(index)}
            className={`relative flex-shrink-0 transition-all duration-300 ${
              index === currentIndex 
                ? 'ring-2 ring-[#1273EB] ring-offset-2 scale-105' 
                : 'opacity-60 hover:opacity-90'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          >
            <div className="relative w-20 h-16 md:w-24 md:h-20">
              <Image 
                src={project.thumbnail} 
                alt={`Thumbnail for ${project.title}`}
                fill
                sizes="(max-width: 768px) 80px, 96px"
                className="object-cover rounded-md"
              />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProjectSlider;