import Layout from "./components/layout/Layout";
import About from "./components/sections/About";
import Contact from "./components/sections/Contact";
import Hero from "./components/sections/Hero";
import Projects from "./components/sections/Projects";
import TryApi from "./components/sections/TryApi";

export default function App() {
  return (
    <Layout>
      <Hero />
      <Projects />
      <TryApi />
      <About />
      <Contact />
    </Layout>
  );
}
