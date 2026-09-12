import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

import Home from './pages/Home';
import About from './pages/About';
import OurWater from './pages/OurWater';
import WhyReal from './pages/WhyReal';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

export default function App() {
  // Per-route document titles (light-weight; no react-helmet needed)
  useEffect(() => {
    // handled per page via `useDocumentTitle` on each page
  }, []);

  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/our-water" element={<OurWater />} />
          <Route path="/why-real" element={<WhyReal />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
