import DepthBackground from "./components/depth/DepthBackground";
import CustomCursor from "./components/CustomCursor";
import Navigation from "./components/Navigation";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ScrollProgressBar from "./components/animations/ScrollProgressBar";
import SectionDivider from "./components/animations/SectionDivider";

export default function App() {
  return (
    <div className="relative min-h-screen">
      <ScrollProgressBar />
      <div className="noise-overlay fixed inset-0 z-[1]" aria-hidden />
      <DepthBackground />
      <CustomCursor />
      <Navigation />

      <main className="relative z-10">
        <Hero />
        <SectionDivider />
        <About />
        <SectionDivider />
        <Skills />
        <SectionDivider />
        <Projects />
        <SectionDivider />
        <Experience />
        <SectionDivider />
        <Contact />
      </main>

      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
}
