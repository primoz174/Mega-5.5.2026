import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Services from './components/Services';

function App() {
  return (
    <Router>
      <main className="w-full min-h-[100svh] bg-[#f5f5f7] text-[#1d1d1f]">
        <Routes>
          <Route path="/:categoryId?/:methodId?" element={<Services />} />
        </Routes>
        
        {/* Fallback/SEO Content Section (Hidden from view in the hero, but good for structure) */}
        <section className="sr-only">
          <h1>Megama NDT in Inženiring</h1>
          <h2>Storitve</h2>
          <ul>
            <li>NDT preiskave in kontrola (Vizualna, Penetrantska, Magnetna, Ultrazvočna...)</li>
            <li>Nadzori (Varilni nadzor, Prevzemi, Tretja stranka...)</li>
            <li>Kontrola in zagotavljanje kakovosti</li>
            <li>Svetovanje (Tehnologija varjenja, Atestiranje...)</li>
          </ul>
        </section>
      </main>
    </Router>
  );
}

export default App;
