import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from './components/layout/MainLayout';
import { Dashboard } from './pages/Dashboard/Dashboard';
import { ApartmentFinder } from './pages/ApartmentFinder/ApartmentFinder';
import { RoutinePlanner } from './pages/RoutinePlanner/RoutinePlanner';
import { FitnessTracker } from './pages/FitnessTracker/FitnessTracker';
import { RelaxationHub } from './pages/RelaxationHub/RelaxationHub';
import { Login } from './pages/Auth/Login';
import { Register } from './pages/Auth/Register';
import { Assessment } from './pages/Assessment/Assessment';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = !!localStorage.getItem('accessToken');
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  return <>{children}</>;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <MainLayout>
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/apartments" element={<ApartmentFinder />} />
                  <Route path="/routine" element={<RoutinePlanner />} />
                  <Route path="/fitness" element={<FitnessTracker />} />
                  <Route path="/relaxation" element={<RelaxationHub />} />
                  <Route path="/assessment" element={<Assessment />} />
                </Routes>
              </MainLayout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;