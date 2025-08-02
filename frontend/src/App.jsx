import {   Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import CustomerReviewPanel from './components/CustomerReviewsPanel';
import Features from './components/Features';
import About from './components/About';
function App() {

  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/features' element={<Features />} />
        <Route path='/about' element={<About />} />
        <Route path="/reviews" element={<CustomerReviewPanel />} />
      </Routes>
  );
}

export default App;
