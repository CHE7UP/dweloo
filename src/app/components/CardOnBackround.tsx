
'use client'
import React, { useState } from 'react';

// Define proper TypeScript interfaces for props
interface VideoModalProps {
  videoId: string;
  isOpen: boolean;
  onClose: () => void;
}

// Separate Video Modal Component with TypeScript types
const VideoModal: React.FC<VideoModalProps> = ({ videoId, isOpen, onClose }) => {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="flex items-center justify-center min-h-screen px-4 text-center">
        {/* Fully transparent backdrop that only handles clicks */}
        <div className="fixed inset-0 backdrop-blur-sm transition-opacity" onClick={onClose}></div>
        
        <div className="inline-block w-full max-w-3xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-transparent rounded-lg relative z-10">
          <div className="flex justify-end mb-2">
            <button 
              className="text-white hover:text-gray-300 focus:outline-none bg-gray-800 bg-opacity-50 rounded-full p-2"
              onClick={onClose}
              aria-label="Close video"
              title="Close video"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="relative pb-9/16 h-0" style={{ paddingBottom: '56.25%' }}>
            <iframe 
              className="absolute top-0 left-0 w-full h-full rounded-lg shadow-lg"
              src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1`}
              title="YouTube video player" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

const CardOnBackground: React.FC = () => {
  const [showVideo, setShowVideo] = useState<boolean>(false);
  
  const handleWatchVideo = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    setShowVideo(true);
  };
  
  const handleCloseVideo = (): void => {
    setShowVideo(false);
  };

  return (
    <>
      {/* Features */}
      <div className="max-w-6xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
        <div className="min-h-[35vh] md:min-h-[75vh] bg-[url('/assets/img/landing-page-assets/dweloo-finished-home.webp')] bg-center bg-cover bg-no-repeat relative rounded-xl">
          <div className="absolute bottom-0 start-0 end-0 max-w-xs text-center mx-auto p-6 md:start-auto md:text-start md:mx-0">
            {/* Card */}
            <div className="px-5 py-4 inline-block bg-white rounded-lg md:p-7">
              <div className="hidden md:block">
                <h3 className="text-lg font-bold text-gray-800 sm:text-2xl">
                  How does Dweloo work?
                </h3>
                <p className="mt-2 text-gray-800">Learn more about Dweloo.</p>
              </div>
              <div className="md:mt-16">
                <button
                  className="flex items-center gap-2 text-sm font-medium text-gray-800 hover:text-gray-500 focus:outline-none focus:text-gray-500 cursor-pointer"
                  onClick={handleWatchVideo}
                  aria-label="See Dweloo in action"
                >
                  <svg
                    className="shrink-0 size-4"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                  Meet Dweloo
                </button>
              </div>
            </div>
            {/* End Card */}
          </div>
        </div>
      </div>
      {/* End Features */}

      {/* Video Modal Component */}
      <VideoModal 
        videoId="RUWl2GTfI54" 
        isOpen={showVideo} 
        onClose={handleCloseVideo} 
      />
    </>
  );
};

export default CardOnBackground;