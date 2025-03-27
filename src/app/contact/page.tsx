import Image from 'next/image';
import Link from 'next/link';
import { Phone, Mail, Clock, MessageCircle, Car, Calendar, ArrowRight } from 'lucide-react';
import ChatButton from '../components/ChatButton';

export const metadata = {
  title: 'Contact Us | Dweloo Home Improvement',
  description: 'Get in touch for a free quote on your home improvement project',
};

export default function ContactPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative h-44 md:h-96 overflow-hidden">
        <Image
          src="/assets/images/dweloo-contact-page-hero.webp" 
          alt="Home renovation project in progress"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 " />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl md:text-6xl font-bold text-[#1273EB] drop-shadow-lg">Get in Touch</h1>
        </div>
      </section>

      {/* Contact Options */}
      <section className="max-w-6xl mx-auto py-16 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Phone */}
          <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 hover:border-[#1273EB] transition-all hover:shadow-xl group">
            <div className="w-16 h-16 bg-[#1273EB]/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-[#1273EB] transition-colors duration-300">
              <Phone className="h-8 w-8 text-[#1273EB] group-hover:text-white transition-colors duration-300" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-4">Call Us</h3>
            <p className="text-gray-600 mb-6">Speak directly with our renovation specialists</p>
            <a href="tel:2066192804" className="text-[#1273EB] font-semibold text-lg hover:underline inline-flex items-center">
              (206) 619-2804
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </div>
          
          {/* Email */}
          <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 hover:border-[#1273EB] transition-all hover:shadow-xl group">
            <div className="w-16 h-16 bg-[#1273EB]/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-[#1273EB] transition-colors duration-300">
              <Mail className="h-8 w-8 text-[#1273EB] group-hover:text-white transition-colors duration-300" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-4">Email Us</h3>
            <p className="text-gray-600 mb-6">Send us your questions or project details</p>
            <a href="mailto:info@dweloo-home.com" className="text-[#1273EB] font-semibold text-lg hover:underline inline-flex items-center">
              info@dweloo.com
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </div> 
            {/* Live Chat */}
            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 hover:border-[#1273EB] transition-all hover:shadow-xl group">
              <div className="w-16 h-16 bg-[#1273EB]/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-[#1273EB] transition-colors duration-300">
                <MessageCircle className="h-8 w-8 text-[#1273EB] group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Live Chat</h3>
              <p className="text-gray-600 mb-6">Get immediate answers to your questions from our specialists</p>
              <button 
                className="text-[#1273EB] font-semibold text-lg hover:underline inline-flex items-center"
                // onClick={() => {/* Add your chat functionality here */}}
              >
                Start Chatting Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </div>
        </div>
        
        {/* Map and Additional Info */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
          {/* Map */}
          <div className="lg:col-span-3 rounded-xl overflow-hidden shadow-lg h-[400px] relative">
            <Image
              src="/assets/images/dweloo-service-area.webp"
              alt="Map location"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 60vw"
            />
            <div className="absolute bottom-4 right-4">
              <a 
                href="https://maps.google.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white text-[#1273EB] py-2 px-4 rounded-lg shadow-md font-medium hover:bg-[#1273EB] hover:text-white transition-colors"
              >
                Serving Greater Seattle Area 
              </a>
            </div>
          </div>
          
          {/* Info */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-8 border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-8">Additional Information</h2>
            
            <div className="space-y-6">
              {/* Hours */}
              <div className="flex items-start">
                <Clock className="h-6 w-6 text-[#1273EB] mr-4 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-gray-600 text-lg mb-2">Business Hours</h3>
                  <p className="text-gray-600">
                    Monday - Friday: 8am - 6pm<br />
                    Saturday: 9am - 4pm<br />
                    Sunday: Closed
                  </p>
                </div>
              </div>
              
              {/* Service Area */}
              <div className="flex items-start">
                <Car className="h-6 w-6 text-[#1273EB] mr-4 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-gray-600 text-lg mb-2">Service Area</h3>
                  <p className="text-gray-600 font-medium ">
                    We proudly serve the greater Seattle Area.
                  </p>
                </div>
              </div>
              
              {/* Appointments */}
              <div className="flex items-start">
                <Calendar className="h-6 w-6 text-[#1273EB] mr-4 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-gray-600 text-lg mb-2">Appointments</h3>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link 
                      href="/schedule-consultation-seattle"
                      className="bg-[#1273EB] text-white font-bold py-3 px-6 rounded-lg hover:bg-[#0e5fc8] transition-colors"
                    >
                    Schedule a consultation with an expert.
                  </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Quote CTA */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">Ready to start your project?</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Get a personalized quote for your home improvement project in just a few minutes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/instant-flooring-quote"
              className="bg-[#1273EB] text-white font-bold py-3 px-8 rounded-lg hover:bg-[#0e5fc8] transition-colors"
            >
              Calculate Your Project
            </Link>
            <ChatButton
              className="bg-white text-[#1273EB] border border-[#1273EB] font-bold py-3 px-8 rounded-lg hover:bg-[#1273EB] hover:text-white transition-colors inline-flex items-center justify-center cursor-pointer"
              buttonText={
                <>
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Start Live Chat
                </>
              }             
              />
          </div>
        </div>
      </section>
    </div>
  );
}