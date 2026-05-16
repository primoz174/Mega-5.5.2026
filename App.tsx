import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Industries from './pages/Industries';
import Equipment from './pages/Equipment';
import Blog from './pages/Blog';
import SmoothScroll from './components/SmoothScroll';
import { LanguageProvider } from './context/LanguageContext';
import { ThemeProvider } from './context/ThemeContext';


const App: React.FC = () => {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <LanguageProvider>
          <BrowserRouter>
            <SmoothScroll>
              <div className="min-h-screen bg-black text-[#f5f5f7] font-sans selection:bg-apple-blue selection:text-white transition-colors duration-300">
                <Navbar />
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/panoge" element={<Industries />} />
                  <Route path="/oprema" element={<Equipment />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="*" element={<Home />} />
                </Routes>
                <Footer />
              </div>
            </SmoothScroll>
          </BrowserRouter>
        </LanguageProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
};

export default App;
