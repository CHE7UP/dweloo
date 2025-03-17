// import CardOnBackround from "./components/CardOnBackround";
import CardSection from "./components/CardSection";
import FaQuestionsSection from "./components/FaQuestionsSection";
import DwelooFeatures from "./components/Features";
import HeroSection from "./components/HeroSection";
// import IconSectionGradient from "./components/IconSectionGradient";
import ProcessInfographic from "./components/ProcessInfographic";
import SingleImageFeature from "./components/SingleImageFeature";
// import VerticalTabs from "./components/VerticalTabs";

export default function Home() {
  return (
    <div >
      <HeroSection/>
      <CardSection/>
      <ProcessInfographic/> 
      <SingleImageFeature/>
      <DwelooFeatures />
      {/* <VerticalTabs/> */}
      {/* Uncomment the line below to include the IconSectionGradient component */}

      {/* <IconSectionGradient/> */}
   
       {/* <CardOnBackround  /> */}
      {/* <FaqSection/> */}
      <FaQuestionsSection/>
    </div>
  );
}
