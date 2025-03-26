// src/app/about/page.tsx
import Image from 'next/image';
import Link from 'next/link';
import { Clock, Eye, Award, Lightbulb } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative h-64 md:h-96 overflow-hidden">
        <Image
          src="/assets/images/dweloo-about-hero-tools.webp" 
          alt="Home improvement tools arranged neatly"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[#1273EB]/20" />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white drop-shadow-lg">Our Story</h1>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="max-w-5xl mx-auto px-4 py-16 md:py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">Simplifying Home Improvements</h2>
          <div className="w-24 h-1 bg-[#1273EB] mx-auto mb-8" />
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We&apos;re a team of industry professionals who saw a broken system and decided to fix it.
            Home improvements shouldn&apos;t be complicated—they should be exciting.
          </p>
        </div>
      </section>
      
      {/* Origin Story */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">Where It All Started</h2>
              <div className="w-16 h-1 bg-[#1273EB] mb-8" />
              <p className="text-gray-600 mb-6">
                It began with a simple question: why is home improvement so frustrating? As industry veterans, we&apos;d seen homeowners struggle with the same issues time and again—confusing quotes, unreliable contractors, and unexpected costs.
              </p>
              <p className="text-gray-600">
                In 2024, over coffee and blueprints, we sketched the first version of our platform. The mission was clear: create a transparent, streamlined process that puts homeowners back in control.
              </p>
            </div>
            <div className="relative h-64 md:h-96 rounded-lg overflow-hidden shadow-xl">
              <Image
                src="/assets/images/dweloo-coworkers-startup-lunch.webp" 
                alt="Founders sketching ideas"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

 {/* Values */}
<section className="max-w-5xl mx-auto px-4 py-16 md:py-24">
  <h2 className="text-2xl md:text-3xl font-bold text-gray-800 text-center mb-6">Our Values</h2>
  <div className="w-16 h-1 bg-[#1273EB] mx-auto mb-12" />
  
  <div className="grid md:grid-cols-3 gap-8">
    {[
      {
        title: "Transparency",
        icon: <Eye size={24} />,
        description: "No hidden fees or confusing jargon. Just clear communication and honest pricing."
      },
      {
        title: "Quality",
        icon: <Award size={24} />,
        description: "We partner with professionals who take pride in their craft and deliver exceptional results."
      },
      {
        title: "Simplicity",
        icon: <Lightbulb size={24} />,
        description: "Complex problems, simple solutions. That's our approach to everything we do."
      }
    ].map((value, index) => (
      <div key={index} className="bg-white p-8 rounded-lg shadow-lg border border-gray-100 hover:border-[#1273EB] hover:shadow-xl transition-all duration-300 group">
        <div className="w-16 h-16 bg-[#1273EB]/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-[#1273EB] group-hover:text-white transition-colors duration-300">
          <span className="text-[#1273EB] group-hover:text-white transition-colors duration-300">
            {value.icon}
          </span>
        </div>
        <h3 className="text-xl font-bold text-gray-800 mb-4">{value.title}</h3>
        <p className="text-gray-600">{value.description}</p>
      </div>
    ))}
  </div>
</section>

      {/* Call to Action */}
      <section className="bg-[#1273EB] py-16">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">Ready to transform your home?</h2>
          <p className="text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of homeowners who have simplified their renovation journey with us.
          </p>
          <button className="bg-white text-gray-600 font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors">
          <Link href="/instant-flooring-quote" >
            Get Quoted Today
            </Link>
          </button>
          <div className="flex items-center justify-center mt-4">
          <div className="flex items-center text-sm text-gray-100">
            <Clock className="w-4 h-4 mr-1" />
            <span>Takes only 2 minutes</span>
        </div>
          {/* <p className="text-white/70 text-sm mt-4">Takes only 2 min</p> */}
        </div>
        </div>
      </section>
    </div>
  );
}