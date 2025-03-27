// app/services/page.tsx
// import Link from 'next/link';
// import Image from 'next/image';
// import CardSection from '../components/CardSection';
import FaQuestionsSection from '../components/FaQuestionsSection';
import WhyDweloo from '../components/WhyDweloo';
import Slider from '../components/Slider';

export const metadata = {
  title: 'Our Services',
  description: 'Professional construction and home improvement services',
};

export default function PastProjectsPage() {
  return (
    <div className="container mx-auto py-12 px-4">
        <Slider />
      <WhyDweloo />
      <FaQuestionsSection />
    </div>
  );
}