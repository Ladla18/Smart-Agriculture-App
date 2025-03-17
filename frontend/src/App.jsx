import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/Card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./components/ui/Tabs";
import { Footer } from "./components/Footer";
import { FarmerDashboard } from "./pages/FarmerDashboard";
import { BuyerDashboard } from "./pages/BuyerDashboard";
import { Login } from "./components/Login";
import { Signup } from "./components/Signup";
import { Header } from "./components/Header";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { CropDiseaseDetection } from './components/CropDiseaseDetection';

const DashboardLayout = ({ userType, onLogout }) => {
  return (
    <div className="min-h-screen bg_image_farmer">
      <Header userType={userType} onLogout={onLogout} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList>
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>
          <TabsContent value="dashboard">
            {userType === "farmer" ? <FarmerDashboard /> : <BuyerDashboard />}
          </TabsContent>
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Your Profile</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Manage your account settings and preferences here.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
};

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState(null);

  const handleLogin = (type) => {
    setIsLoggedIn(true);
    setUserType(type);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserType(null);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route 
          path="/" 
          element={
            isLoggedIn ? (
              <Navigate to={`/${userType}`} replace />
            ) : (
              <Navigate to="/login" replace />
            )
          } 
        />
        <Route 
          path="/login" 
          element={
            isLoggedIn ? (
              <Navigate to={`/${userType}`} replace />
            ) : (
              <Login onLogin={handleLogin} />
            )
          } 
        />
        <Route 
          path="/signup" 
          element={
            isLoggedIn ? (
              <Navigate to={`/${userType}`} replace />
            ) : (
              <Signup />
            )
          } 
        />
        <Route
          path="/farmer/*"
          element={
            isLoggedIn && userType === "farmer" ? (
              <DashboardLayout userType={userType} onLogout={handleLogout} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/buyer/*"
          element={
            isLoggedIn && userType === "buyer" ? (
              <DashboardLayout userType={userType} onLogout={handleLogout} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/farmer/disease-detection"
          element={
            isLoggedIn && userType === "farmer" ? (
              <CropDiseaseDetection />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
