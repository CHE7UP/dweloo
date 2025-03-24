// /book-consultation/page.tsx
'use client'


import React from 'react';

export default function BookConsultation() {
  return (
    <div className="flex flex-col items-center w-full max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-2">
          Book a Consultation
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Schedule a time to discuss your home improvement project with one of our experts.
        </p>
        <div className="mt-4 w-24 h-1 bg-[#1976D2] mx-auto rounded"></div>
      </div>
      <div className="w-full bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="border-b border-gray-200 bg-[#1976D2] text-white py-3 px-4">
          <h2 className="text-lg font-medium">Select a Time</h2>
        </div>
        <div className="calendar-container w-full">
          <iframe 
            src="https://cal.com/dweloo/consultation" 
            width="100%" 
            height="700"
            className="min-h-[700px] border-0"
            title="Dweloo Home Improvement Consultation Booking Calendar"
            aria-label="Schedule a consultation appointment"  
          ></iframe>
        </div>
      </div>
      <div className="mt-10 text-center max-w-2xl mx-auto">
        <h3 className="text-xl font-medium text-gray-900 mb-3">
          What to Expect
        </h3>
        <p className="text-gray-600 mb-4">
          During your consultation, we&apos;ll discuss your project goals, timeline, and budget. Our experts will provide insights and recommendations tailored to your specific needs.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
          <div className="flex items-center justify-center p-4 bg-[#1976D2]/10 rounded-lg">
            <span className="font-medium text-[#1976D2]">1 Hour Session</span>
          </div>
          <div className="flex items-center justify-center p-4 bg-[#1976D2]/10 rounded-lg">
            <span className="font-medium text-[#1976D2]">No Obligation</span>
          </div>
          <div className="flex items-center justify-center p-4 bg-[#1976D2]/10 rounded-lg">
            <span className="font-medium text-[#1976D2]">Expert Advice</span>
          </div>
        </div>
      </div>
    </div>
  );
}