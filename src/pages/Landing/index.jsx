import Navbar from "@/components/layout/Navbar";
import HeroContent from "./Partials/HeroContent";

import Footer from "@/components/layout/Footer";
import About from "./Partials/About";
import FAQ from "./Partials/FAQ";
import Features from "./Partials/Features";
import HowItWorks from "./Partials/HowItWorks";

const Landing = () => {
  return (
    <>
      <HeroContent />
      <About />
      <Features />
      <HowItWorks />
      <FAQ />
    </>
  );
};

export default Landing;
