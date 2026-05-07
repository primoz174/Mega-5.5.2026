import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Personnel from './pages/Personnel';
import About from './pages/About';
import Certificates from './pages/Certificates';
import Industries from './pages/Industries';
import Equipment from './pages/Equipment';
import Blog from './pages/Blog';
import SmoothScroll from './components/SmoothScroll';
import { LanguageProvider } from './context/LanguageContext';
import { ThemeProvider } from './context/ThemeContext';

import ServicesPage from './pages/ServicesPage';

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <HashRouter>
          <SmoothScroll>
            <div className="min-h-screen bg-black text-[#f5f5f7] font-sans selection:bg-apple-blue selection:text-white transition-colors duration-300">
              <Navbar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/storitve" element={<ServicesPage />} />
                <Route path="/personnel" element={<Personnel />} />
                <Route path="/about" element={<About />} />
                <Route path="/certifikati" element={<Certificates />} />
                <Route path="/panoge" element={<Industries />} />
                <Route path="/oprema" element={<Equipment />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="*" element={<Home />} />
              </Routes>
              <Footer />
            </div>
          </SmoothScroll>
        </HashRouter>
      </LanguageProvider>
    </ThemeProvider>
  );
};

export default App;