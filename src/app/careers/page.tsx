'use client';

import React from 'react';
import CareersForm from '../components/forms/CarreersForm';
import { TrendingUp, Award, Briefcase } from 'lucide-react';

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-[#0056B3] text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold">Build Your Career With Us</h1>
          <p className="mt-2 text-lg opacity-90 max-w-2xl">
            Join our team of dedicated professionals creating beautiful, functional spaces for our customers.
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Career Information */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Why Join Our Team</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-6 shadow-sm hover:shadow-md transition-shadow rounded-lg bg-white">
                <div className="flex items-center mb-3">
                  <div className="w-14 h-14 border-2 border-[#0056B3] rounded-[8px] bg-opacity-10 flex items-center justify-center mr-3">
                    <TrendingUp className="h-9 w-9 text-[#0056B3]" />
                  </div>
                  <h3 className="font-semibold text-lg">Stable Growth</h3>
                </div>
                <p className="text-gray-600">Join a company with consistent growth and opportunities for advancement.</p>
              </div>
              
              <div className="p-6 shadow-sm hover:shadow-md transition-shadow rounded-lg bg-white">
                <div className="flex items-center mb-3">
                <div className="w-14 h-14 border-2 border-[#0056B3] rounded-[8px] bg-opacity-10 flex items-center justify-center mr-3">
                <Award className="h-9 w-9 text-[#0056B3]" />
                  </div>
                  <h3 className="font-semibold text-lg">Skilled Team</h3>
                </div>
                <p className="text-gray-600">Work alongside experienced craftsmen and industry professionals.</p>
              </div>
              
              <div className="p-6 shadow-sm hover:shadow-md transition-shadow rounded-lg bg-white">
                <div className="flex items-center mb-3">
                <div className="w-14 h-14 border-2 border-[#0056B3] rounded-[8px] bg-opacity-10 flex items-center justify-center mr-3">
                <Briefcase className="h-9 w-9  text-[#0056B3]" />
                  </div>
                  <h3 className="font-semibold text-lg">Competitive Pay</h3>
                </div>
                <p className="text-gray-600">Enjoy fair compensation, benefits, and recognition for quality work.</p>
              </div>
            </div>
          </div>
          
          {/* Job Categories Section */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">We&apos;re Looking For</h2>
            <div className="space-y-4">
              <div className="p-6 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <h3 className="font-semibold text-lg text-[#0056B3]">Project Managers</h3>
                <p className="text-gray-600 mt-2">Coordinate home improvement projects from planning through completion. Ideal candidates have experience managing renovation teams and excellent client communication skills.</p>
              </div>
              
              <div className="p-6 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <h3 className="font-semibold text-lg text-[#0056B3]">Skilled Craftsmen</h3>
                <p className="text-gray-600 mt-2">Carpenters, electricians, plumbers, tile installers, painters, and other trade professionals who take pride in their work and maintain high quality standards.</p>
              </div>
              
              <div className="p-6 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <h3 className="font-semibold text-lg text-[#0056B3]">Customer Service Representatives</h3>
                <p className="text-gray-600 mt-2">Be the voice of our company, helping homeowners schedule services, answer questions about ongoing projects, and ensure customer satisfaction throughout the process.</p>
              </div>
            </div>
          </div>
          
          {/* Application Form */}
          <div id="apply">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Submit Your Interest</h2>
            <p className="text-gray-600 mb-8">
              Whether you&apos;re an experienced professional or looking to build your skills in the home improvement industry, 
              we&apos;d like to hear from you. Submit your information below and tell us about your background and interests.
              Our team will reach out if there&apos;s a potential fit with our current needs.
            </p>
            <CareersForm />
          </div>
        </div>
      </main>
    </div>
  );
}