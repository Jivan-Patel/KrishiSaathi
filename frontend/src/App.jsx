import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './pages/Dashboard';
import CropLibrary from './pages/CropLibrary';
import CropDetail from './pages/CropDetail';
import Recommendation from './pages/Recommendation';
import MandiRates from './pages/MandiRates';
import Community from './pages/Community';
import SellMyCrop from './pages/SellMyCrop';
import TransportRequest from './pages/TransportRequest';
import FertilizerListing from './pages/FertilizerListing';
import Login from './pages/Login';
import Signup from './pages/Signup';
import BuyerDashboard from './pages/dashboards/BuyerDashboard';
import SellerDashboard from './pages/dashboards/SellerDashboard';
import TransporterDashboard from './pages/dashboards/TransporterDashboard';
import Navbar from './components/Navbar';

function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-surface-100 font-outfit">
            <Navbar />
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<Dashboard />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/crops" element={<CropLibrary />} />
              <Route path="/crops/:id" element={<CropDetail />} />
              <Route path="/recommendation" element={<Recommendation />} />
              <Route path="/mandi-rates" element={<MandiRates />} />
              <Route path="/community" element={<Community />} />
              <Route path="/sell" element={<SellMyCrop />} />
              <Route path="/transport" element={<TransportRequest />} />
              <Route path="/fertilizers" element={<FertilizerListing />} />

              {/* Protected role-based dashboard routes */}
              <Route path="/dashboard/buyer" element={
                <ProtectedRoute allowedRole="buyer">
                  <BuyerDashboard />
                </ProtectedRoute>
              } />
              <Route path="/dashboard/seller" element={
                <ProtectedRoute allowedRole="seller">
                  <SellerDashboard />
                </ProtectedRoute>
              } />
              <Route path="/dashboard/transporter" element={
                <ProtectedRoute allowedRole="transporter">
                  <TransporterDashboard />
                </ProtectedRoute>
              } />
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;
