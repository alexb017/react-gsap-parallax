import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { useGSAP } from '@gsap/react';

import Layers from './components/layers';
import Header from './components/header';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, useGSAP);

function App() {
  return (
    <BrowserRouter>
      <main>
        <Header />
        <Routes>
          <Route path="/" element={<h1>...</h1>} />
          <Route path="/layers" element={<Layers />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
