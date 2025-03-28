'use client';

import Link from 'next/link';
import React, { useState } from 'react';
import LogoWithText from './icons/LogoWIthText';
import { FlooringIcon, PaintingIcon, TilingIcon, TrimsIcon, CustomProjectIcon } from './icons/ServiceIcons';

// Navigation links data structure
const navigationLinks = {
  mainServices: [
    { name: 'Flooring', path: '/instant-flooring-quote', icon: (<FlooringIcon />) },
    { name: 'Painting', path: '/instant-painting-quote', icon: (<PaintingIcon />) },
    { name: 'Tiles', path: '/instant-tiling-quote', icon: (<TilingIcon />) },
    { name: 'Trims', path: '/instant-trims-quote', icon: (<TrimsIcon />) },
    { name: 'Custom Projects', path: '/custom-projects-quote', icon: (<CustomProjectIcon />) },
  ],
  otherPages: [
    { name: 'Services', path: '/services' },
    { name: 'Past Projects', path: '/past-projects' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ]
};

interface NavbarProps {
  href?: string;
  ariaLabel?: string;
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;

}


const Navbar: React.FC<NavbarProps> = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  // Generate a stable ID for the SVG mask

  // Function to determine if link is active
  const isActive = (path: string) => {
    // In a real Next.js app, use router to determine active path
    return path === '/projects'; // Example, replace with actual logic
  };

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Toggle dropdown
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <header className="flex flex-wrap lg:justify-start lg:flex-nowrap z-50 w-full py-4 bg-white shadow-sm mb-20">
      <nav className="relative max-w-7xl w-full flex flex-wrap lg:grid lg:grid-cols-12 basis-full items-center px-4 md:px-6 lg:px-8 mx-auto">
        <div className="lg:col-span-3 flex items-center">
          {/* Logo with Text */}
          <Link className="flex items-center focus:outline-none focus:opacity-80" href="/" aria-label="Dweloo">
            <LogoWithText
              color="#1273EB"
              width="w-26"
              height="h-auto"
              fillColor="#1273EB"
            />
          </Link>
        </div>
    
        {/* Button Group */}
        <div className="flex items-center gap-x-2 ml-auto py-1 lg:pl-6 lg:order-3 lg:col-span-3">
          <a
            href="tel:2066191091" 
            type="button" 
            className="hidden lg:inline-flex py-2.5 px-4 items-center gap-x-2 text-md font-bold rounded-full border-2 border-[#1273EB] text-[#1273EB] bg-transparent hover:bg-[#1976D2] hover:text-white transition-all duration-300 ease-in-out"
          >
            (206) 619-1091
          </a>
          
          {/* Mobile menu button with improved styling */}
          <button 
            className="lg:hidden inline-flex p-2 text-[#1273EB] hover:text-[#1976D2]/120 focus:outline-none cursor-pointer"
            onClick={toggleMobileMenu}
            aria-label="Toggle navigation menu"
          >
            <div className="relative w-6 h-5">
              <span className={`absolute block w-full h-[5px] bg-current transform transition-all duration-300 ease-in-out ${mobileMenuOpen ? 'top-2 rotate-45' : 'top-0'}`}></span>
              <span className={`absolute block w-full h-[5px] bg-current top-2 transition-all duration-300 ease-in-out group-hover:translate-x-1 group-hover:w-4/5 ${mobileMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
              <span className={`absolute block w-full h-[5px] bg-current transform transition-all duration-300 ease-in-out ${mobileMenuOpen ? 'top-2 -rotate-45' : 'top-4'}`}></span>
            </div>
          </button>
        </div>
        {/* End Button Group */}
    
        {/* Navigation Menu */}
        <div 
          className={`w-full basis-full grow lg:w-auto lg:basis-auto lg:order-2 lg:col-span-6 lg:block ${mobileMenuOpen ? 'block' : 'hidden'}`}
        >
          
          <div className="flex flex-col gap-y-4 gap-x-0 mt-5 lg:flex-row lg:justify-center lg:items-center lg:gap-y-0 lg:gap-x-7 lg:mt-0">
            {/* Main navigation items */}
            
            {navigationLinks.otherPages.map((link) => (
              <div key={link.path}>
                <Link
                  onClick={toggleMobileMenu} 
                  href={link.path} 
                  className={`${
                    isActive(link.path) 
                      ? "relative inline-block text-[#1273EB] font-medium focus:outline-none before:absolute before:bottom-0 before:left-0 before:w-full before:h-0.5 before:bg-[#1976D2]" 
                      : "inline-block text-gray-800 hover:text-[#1273EB] focus:outline-none transition-colors duration-300"
                  }`}
                  aria-current={isActive(link.path) ? "page" : undefined}
                >
                  {link.name}
                </Link>
              </div>
            ))}
            
            {/* Services dropdown */}
            <div className="relative iflex flex-col">
              <button 
                type="button" 
                className="inline-flex items-center gap-x-1 text-gray-800 hover:text-[#1976D2] focus:outline-none cursor-pointer transition-colors duration-300"
                onClick={toggleDropdown}
                aria-expanded={dropdownOpen}
              >
                Price Calculator
                <svg 
                  className={`w-4 h-4 transition-transform duration-300 text-blue-600 ${dropdownOpen ? 'rotate-180' : ''}`}
                  xmlns="http://www.w3.org/2000/svg" 
                  width="24" height="24" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="3" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <path d="m6 9 6 6 6-6"/>
                </svg>
              </button>
              
              {/* Dropdown menu */}
              <div 
                className={`${
                  dropdownOpen ? 'block' : 'hidden'
                } lg:absolute lg:top-full lg:right-0 lg:mt-2 lg:min-w-48 lg:bg-white lg:shadow-md lg:rounded-lg lg:p-2 lg:z-300
                w-full bg-white py-2 lg:py-1 space-y-1 lg:space-y-0`}
              >
                <div className="py-1">
                  {navigationLinks.mainServices.map((service) => (
                    <Link
                      onClick={toggleMobileMenu} 
                      key={service.path}
                      href={service.path}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#1976D2] rounded-md focus:bg-gray-100 focus:outline-none"
                    >
                      <div className="flex items-center">
                        {service.icon && <span className="mr-2">{service.icon}</span>}
                        <span>{service.name}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* End Navigation Menu */}
      </nav>
    </header>
  );
};

export default Navbar;