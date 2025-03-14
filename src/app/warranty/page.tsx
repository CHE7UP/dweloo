
'use client';

import React from 'react';
import Head from 'next/head';

import { warrantyData } from './data';
import WarrantyForm from '../components/WarranyForm';

const Warranty = () => {
  const { 
    companyInfo, pageTitle, pageDescription, intro, legalInfo, 
    coverageDetails, serviceWarranties, terms, claimProcess, faq 
  } = warrantyData;

  return (
    <div className="bg-white">
      <Head>
        <title>Lifetime Warranty | {companyInfo.name}</title>
        <meta name="description" content={pageDescription} />
      </Head>

      <main className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="flex flex-col items-center mb-8">
          <h1 className="text-4xl font-bold text-[#1976D2] text-center">{pageTitle}</h1>
        </div>

        <section className="mb-10">
          <div className="bg-[#1976D2]/10 p-6 rounded-lg border-l-4 border-[#1976D2] mb-6">
            <p className="text-lg text-gray-800">
              At <strong>{companyInfo.name}</strong>, we stand behind our work with confidence. 
              Our commitment to excellence means providing you with long-lasting quality that you can trust for years to come.
            </p>
          </div>

          <h2 className="text-2xl font-semibold text-[#1976D2] mb-4">{intro.headline}</h2>
          <p className="mb-4 text-gray-800">{intro.text}</p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-[#1976D2] mb-4">{legalInfo.headline}</h2>
          <p className="mb-4 text-gray-800">{legalInfo.text}</p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-[#1976D2] mb-4">Our Comprehensive Warranty Coverage</h2>

          {coverageDetails.map((detail, index) => (
            <div className="mb-6 bg-gray-50 p-5 rounded-lg shadow-sm border border-gray-100" key={index}>
              <h3 className="text-xl font-medium text-[#1976D2] mb-2">{detail.title}</h3>
              <p className="mb-2 text-gray-800">{detail.description}</p>
            </div>
          ))}
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-[#1976D2] mb-4">Service-Specific Warranty Coverage</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {serviceWarranties.map((service, index) => (
              <div className="bg-white shadow-md rounded-lg p-6 border-t-4 border-[#1976D2] hover:shadow-lg transition-shadow" key={index}>
                <h3 className="text-xl font-medium text-[#1976D2] mb-3">{service.service}</h3>
                <ul className="list-disc pl-5 space-y-2">
                  {service.items.map((item, idx) => (
                    <li key={idx} className="text-gray-800"><strong className="text-gray-900">{item.name}:</strong> {item.coverage}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-[#1976D2] mb-4">Warranty Terms & Conditions</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white shadow-md rounded-lg p-6 mb-6 md:mb-0 border-t-4 border-[#1976D2] col-span-1">
              <h3 className="text-xl font-medium text-[#1976D2] mb-3">What&apos;s Covered</h3>
              <ul className="list-disc pl-5 space-y-2">
                {terms.covered.map((item, index) => (
                  <li key={index} className="text-gray-800">{item}</li>
                ))}
              </ul>
            </div>
            
            <div className="bg-white shadow-md rounded-lg p-6 mb-6 md:mb-0 border-t-4 border-[#1976D2] col-span-1">
              <h3 className="text-xl font-medium text-[#1976D2] mb-3">What&apos;s Not Covered</h3>
              <ul className="list-disc pl-5 space-y-2">
                {terms.notCovered.map((item, index) => (
                  <li key={index} className="text-gray-800">{item}</li>
                ))}
              </ul>
            </div>
            
            <div className="bg-white shadow-md rounded-lg p-6 mb-6 md:mb-0 border-t-4 border-[#1976D2] col-span-1">
              <h3 className="text-xl font-medium text-[#1976D2] mb-3">Additional Terms</h3>
              <ul className="list-disc pl-5 space-y-2">
                {terms.additional.map((item, index) => (
                  <li key={index} className="text-gray-800">{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-[#1976D2] mb-4">How to Submit a Warranty Claim</h2>
          <div className="grid md:grid-cols-3 gap-6 mb-6">
            {claimProcess.map((step) => (
              <div className="bg-white shadow-md rounded-lg p-6 text-center border-t-4 border-[#1976D2] hover:shadow-lg transition-shadow" key={step.step}>
                <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 rounded-full bg-[#1976D2]/10 text-[#1976D2] font-bold text-2xl">{step.step}</div>
                <h3 className="text-lg font-medium mb-2 text-gray-900">{step.title}</h3>
                <p className="text-gray-800">{step.description}</p>
              </div>
            ))}
          </div>
          
          <div className="bg-[#1976D2]/10 p-4 rounded-lg border-l-4 border-[#1976D2]">
            <p className="text-gray-800">
              For emergency warranty issues such as active leaks or unsafe conditions, please call our 24/7 emergency 
              service line at <span className="font-medium">{companyInfo.emergencyPhone}</span> instead of using this form.
            </p>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-[#1976D2] mb-4">Frequently Asked Questions</h2>
          
          <div className="space-y-4">
            {faq.map((item, index) => (
              <div className="border border-gray-200 rounded-lg p-5 hover:border-[#1976D2]/30 transition-colors" key={index}>
                <h3 className="text-lg font-medium text-[#1976D2] mb-2">{item.question}</h3>
                <p className="text-gray-800">{item.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Warranty Claim Form */}
        <section id="warranty-claim-form" className="mb-10">
          <h2 className="text-2xl font-semibold text-[#1976D2] mb-4">Warranty Claim Form</h2>
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 shadow-sm">
            <WarrantyForm />
          </div>
        </section>
      </main>

      {/* Footer removed as requested */}
    </div>
  );
};

export default Warranty;