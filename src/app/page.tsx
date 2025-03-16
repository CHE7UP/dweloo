import CardOnBackround from "./components/CardOnBackround";
import CardSection from "./components/CardSection";
import FaqSection from "./components/FaqSection";
import FaQuestionsSection from "./components/FaQuestionsSection";
import FeatureStats from "./components/FeatureStats";
import HeroSection from "./components/HeroSection";
import HorizontalTabs from "./components/HorizontalTabs";
import IconSectionGradient from "./components/IconSectionGradient";
import ProcessInfographic from "./components/ProcessInfographic";
import ServicesSection from "./components/ServicesSection";
import SingleImageFeature from "./components/SingleImageFeature";
import Testimonials from "./components/Testimonials";
import VerticalTabs from "./components/VerticalTabs";

export default function Home() {
  return (
    <div >
      <HeroSection/>
      <CardSection/>
      <ProcessInfographic/> 

      <ServicesSection/>
      <IconSectionGradient/>
      <VerticalTabs/>
      <Testimonials/>
   
      <HorizontalTabs/>
      <FeatureStats/>
       <CardOnBackround  />
      <SingleImageFeature/>
      <FaqSection/>
      <FaQuestionsSection/>
    </div>
  );
}
