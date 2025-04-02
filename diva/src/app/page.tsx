import { TeamShowcase } from "@/components/aboutcomponent";
import { FeaturesGrid } from "@/components/featuresGrid";
import { HeroSection } from "@/components/Homehero";


export default function Home (){
  return(
    <div>
     <HeroSection/>
     <FeaturesGrid/>
     <TeamShowcase/>
    </div>
  )
}