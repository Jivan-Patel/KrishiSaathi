import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import Dashboard from './pages/Dashboard';
import CropLibrary from './pages/CropLibrary';
import CropDetail from './pages/CropDetail';
import Recommendation from './pages/Recommendation';
import MandiRates from './pages/MandiRates';
import Community from './pages/Community';
import SellMyCrop from './pages/SellMyCrop';
import TransportRequest from './pages/TransportRequest';
import FertilizerListing from './pages/FertilizerListing';
import Navbar from './components/Navbar';

function App() {
  return (
    <LanguageProvider>
      <Router>
        <div className="min-h-screen bg-surface-100 font-outfit">
          <Navbar />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/crops" element={<CropLibrary />} />
            <Route path="/crops/:id" element={<CropDetail />} />
            <Route path="/recommendation" element={<Recommendation />} />
            <Route path="/mandi-rates" element={<MandiRates />} />
            <Route path="/community" element={<Community />} />
            <Route path="/sell" element={<SellMyCrop />} />
            <Route path="/transport" element={<TransportRequest />} />
            <Route path="/fertilizers" element={<FertilizerListing />} />
          </Routes>
        </div>
      </Router>
    </LanguageProvider>
  );
}

export default App;
