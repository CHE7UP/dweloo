'use client'

import React, { useState } from 'react';
import { ChevronDown, ChevronRight, MessageCircle } from "lucide-react";
import CtaLink from './ui/CTALink';
import ChatButton from './ChatButton';

// Define the FAQ item type
interface FaqItem {
  question: string;
  answer: React.ReactNode;
}

// Type for the CustomAccordion props
interface CustomAccordionProps {
  items: FaqItem[];
}

// Type for the CustomCard props
interface CustomCardProps {
  question: string;
  answer: React.ReactNode;
}

// Custom accordion component
const CustomAccordion: React.FC<CustomAccordionProps> = ({ items }) => {
  const [openItem, setOpenItem] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    if (openItem === index) {
      setOpenItem(null);
    } else {
      setOpenItem(index);
    }
  };

  return (
    <div className="w-full">
      {items.map((item, index) => (
        <div key={`accordion-${index}`} className="border-b border-gray-200 cursor-pointer">
          <button
            onClick={() => toggleItem(index)}
            className="w-full text-left py-4 px-1 flex justify-between items-center hover:text-[#1976D2] transition-colors"
          >
            <span className="text-lg font-medium text-gray-600 hover:text-[#1273EB] cursor-pointer">{item.question}</span>
            <ChevronDown 
              size={20} 
              className={`transition-transform duration-300 text-[#1273EB] ${openItem === index ? 'transform rotate-180' : ''}`} 
            />
          </button>
          <div 
            className={`overflow-hidden transition-all duration-300 ${
              openItem === index ? 'max-h-96 opacity-100 pb-4' : 'max-h-0 opacity-0'
            }`}
          >
            <div className="px-1 text-gray-700">
              {item.answer}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

// Custom Card component
const CustomCard: React.FC<CustomCardProps> = ({ question, answer }) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow hover:border-[#1273EB] cursor-pointer">
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-start">
          <div className="mr-2 text-[#1273EB] mt-1">
            <ChevronRight 
              className="text-[#1273EB] transition-transform duration-300"
            size={18} />
          </div>
          <h3 className="text-lg font-medium text-gray-900 cursor-pointer">{question}</h3>
        </div>
      </div>
      <div className="p-4 text-gray-700">
        {answer}
      </div>
    </div>
  );
};



const FaQuestionsSection: React.FC = () => {
  const faqItems: FaqItem[] = [
    {
      question: "How do I schedule a free consultation?",
      answer: (
        <div>
          <p>You can schedule your virtual or in-person consultation for the date and time that works best for you.</p>
          <p className="mt-2">
            <CtaLink href="/schedule-consultation-seattle">Book your free consultation</CtaLink> or call us at (206) 619-2804.
          </p>
        </div>
      )
    },
    {
      question: "How much will my project cost?",
      answer: (
        <div>
          <p>Every home is unique, and we provide personalized quotes based on your specific needs and preferences.</p>
          <p className="mt-2">
            <CtaLink href="/instant-flooring-quote">Get an instant quote</CtaLink> or schedule a <CtaLink href="/schedule-consultation-seattle">detailed consultation</CtaLink> for a comprehensive estimate.
          </p>
        </div>
      )
    },
    {
      question: "What kind of services does Dweloo provide?",
      answer: (
        <div>
          <p>Dweloo provides a wide range of home improvement services including flooring installation, kitchen remodeling, bathroom renovations, and more.</p>
          <p className="mt-2">
            <CtaLink href="/services">Explore our services</CtaLink> or <CtaLink href="/schedule-consultation-seattle">book a consultation</CtaLink> to discuss your specific project needs.
          </p>
        </div>
      )
    },
    {
      question: "Do you offer financing?",
      answer: (
        <div>
          <p>Yes, Dweloo offers flexible financing options to make your home improvement dreams affordable.</p>
          <p className="mt-2">
            <CtaLink href="/financing">Check your financing options</CtaLink> or speak with one of our representatives during your consultation.
          </p>
        </div>
      )
    },
    {
      question: "Who are your craftsmen?",
      answer: (
        <div>
          <p>Our craftsmen are experienced professionals who undergo rigorous training and background checks. Each specializes in their respective field to ensure the highest quality work.</p>
          <p className="mt-2">
            <CtaLink href="/about">Learn about our expert team</CtaLink> or <CtaLink href="/past-projects">view our portfolio</CtaLink> to see the quality of our work.
          </p>
        </div>
      )
    },
    {
      question: "What happens if I'm not satisfied with your work?",
      answer: (
        <div>
          <p>At Dweloo, customer satisfaction is our priority. If you&apos;re not completely satisfied with our work, we&apos;ll make it right according to our satisfaction guarantee.</p>
          <p className="mt-2">
            <CtaLink href="/satisfaction-guarantee">Read our satisfaction guarantee</CtaLink> or <CtaLink href="/contact">contact us</CtaLink> if you have any concerns about your project.
          </p>
        </div>
      )
    }
  ];

  return (
    <div className="bg-white w-full">
      <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-2 text-gray-600">FREQUENTLY ASKED QUESTIONS</h2>
          <p className="text-lg text-[#1273EB]">Have questions? We got answers!</p>
        </div>

        {/* Mobile view - Accordion */}
        <div className="md:hidden">
          <CustomAccordion items={faqItems} />
        </div>

        {/* Desktop view - Cards */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {faqItems.map((item, index) => (
            <CustomCard 
              key={`card-${index}`} 
              question={item.question} 
              answer={item.answer} 
            />
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-12 text-center">
          <div className="bg-gray-50 border border-gray-200 rounded-lg max-w-md mx-auto">
            <div className="p-6">
              <div className="flex justify-center mb-4">
                <div className="p-2 rounded-full bg-[#1273EB]/10">
                  <MessageCircle size={24} className="text-[#1273EB]" />
                </div>
              </div>
              <h3 className="text-xl text-gray-500 font-bold mb-2">Still have questions?</h3>
              <p className="text-gray-600 mb-4">Can&apos;t find the answer you&apos;re looking for? Please chat to our friendly team.</p>
              <ChatButton 
                buttonText="Start Live Chat" 
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FaQuestionsSection;