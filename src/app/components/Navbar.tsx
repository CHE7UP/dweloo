import Link from 'next/link';
import React from 'react';
import LogoWithText from './icons/LogoWIthText';
// Navigation links data structure
const navigationLinks = {
  mainServices: [
    { name: 'Flooring', path: '/services/flooring' },
    { name: 'Painting', path: '/services/painting' },
    { name: 'Kitchen & Bath', path: '/services/kitchen-bath' },
    { name: 'Masonry', path: '/services/masonry' },
  ],
  otherPages: [
    { name: 'Services', path: '/services' },
    { name: 'Projects', path: '/projects' },
    { name: 'About', path: '/about' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' },
  ]
};

const Navbar: React.FC = () => {
  // Function to determine if link is active
  const isActive = (path: string) => {
    // In a real Next.js app, use router to determine active path
    return path === '/projects'; // Example, replace with actual logic
  };

  return (
    // <!-- ========== HEADER ========== -->
    <header className="flex flex-wrap lg:justify-start lg:flex-nowrap z-50 w-full py-4">
      <nav className="relative max-w-7xl w-full flex flex-wrap lg:grid lg:grid-cols-12 basis-full items-center px-4 md:px-6 lg:px-8 mx-auto">
        <div className="lg:col-span-3 flex items-center">
          {/* <!-- Logo with Text --> */}
          <Link className="flex items-center focus:outline-hidden focus:opacity-80" href="/" aria-label="Dweloo">
            <LogoWithText
              color='#1976D2'
              width="w-26"
              height="h-auto"
              fillColor="#1976D2"
            />
          </Link>
        </div>
    
        {/* <!-- Button Group --> */}
        <div className="flex items-center gap-x-1 lg:gap-x-2 ms-auto py-1 lg:ps-6 lg:order-3 lg:col-span-3">
        <div className="flex items-center gap-x-1 lg:gap-x-2 ms-auto py-1 lg:ps-6 lg:order-3 lg:col-span-3">
  <button 
    type="button" 
    className="hidden lg:inline-flex relative py-2 px-3 items-center gap-x-2 text-sm font-medium text-nowrap rounded-xl border-2 border-[#0056B3] text-[#000000] bg-transparent hover:bg-[#B4D330] hover:text-black focus:outline-none focus:ring-2 focus:ring-[#B4D330] transition-all duration-300 ease-in-out before:absolute before:inset-0 before:rounded-xl before:border-2 before:border-[#B4D330] before:opacity-0 before:transition-opacity before:duration-300 hover:before:opacity-100"
  >
    (206) 619-1091
  </button>
</div>
    
          <div className="lg:hidden">
            <button type="button" className="hs-collapse-toggle size-9.5 flex justify-center items-center text-sm font-semibold rounded-xl border border-gray-200 text-black hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none" id="hs-navbar-hcail-collapse" aria-expanded="false" aria-controls="hs-navbar-hcail" aria-label="Toggle navigation" data-hs-collapse="#hs-navbar-hcail">
              <svg className="hs-collapse-open:hidden shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" x2="21" y1="6" y2="6"/><line x1="3" x2="21" y1="12" y2="12"/><line x1="3" x2="21" y1="18" y2="18"/></svg>
              <svg className="hs-collapse-open:block hidden shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            </button>
          </div>
        </div>
        {/* <!-- End Button Group --> */}
    
        {/* <!-- Collapse --> */}
        <div id="hs-navbar-hcail" className="hs-collapse hidden overflow-hidden transition-all duration-300 basis-full grow lg:block lg:w-auto lg:basis-auto lg:order-2 lg:col-span-6" aria-labelledby="hs-navbar-hcail-collapse">
          <div className="flex flex-col gap-y-4 gap-x-0 mt-5 lg:flex-row lg:justify-center lg:items-center lg:gap-y-0 lg:gap-x-7 lg:mt-0">
            {/* Main navigation items */}
            {navigationLinks.otherPages.map((link) => (
              <div key={link.path}>
                <Link 
                  href={link.path} 
                  className={`${
                    isActive(link.path) 
                      ? "relative inline-block text-black focus:outline-hidden before:absolute before:bottom-0.5 before:start-0 before:-z-1 before:w-full before:h-1 before:bg-lime-400" 
                      : "inline-block text-black hover:text-gray-600 focus:outline-hidden focus:text-gray-600"
                  }`}
                  aria-current={isActive(link.path) ? "page" : undefined}
                >
                  {link.name}
                </Link>
              </div>
            ))}
            
            {/* Services dropdown - could be implemented with additional JS */}
            <div className="hs-dropdown relative inline-flex [--placement:bottom-right]">
              <button 
                id="hs-dropdown-default" 
                type="button" 
                className="inline-flex items-center gap-x-1 text-black hover:text-gray-600 focus:outline-hidden focus:text-gray-600"
                >
                Get Quote
                <svg 
                className="size-4" 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="24" height="24" viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round">
                  <path d="m6 9 6 6 6-6"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
        {/* <!-- End Collapse --> */}
      </nav>
    </header>
    // <!-- ========== END HEADER ========== -->
  );
};

export default Navbar;