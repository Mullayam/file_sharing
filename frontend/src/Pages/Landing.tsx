import Achievements from "@/components/LandingPage/Achievement";
import Features from "@/components/LandingPage/Features";
import LandingSection from "@/components/LandingPage/LandingSection";
import SneakPeeks from "@/components/LandingPage/SneakPeek";
import Suggestions from "@/components/LandingPage/Suggestion";

const Landing = () => {
  document.title = "inShare | Homepage";
  return (
    <>
      <LandingSection />
      <Achievements />
      <Features />
      <SneakPeeks />
      <Suggestions />
      {/* <Review /> */}
    </>
  );
};

export default Landing;
