import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "./components/ui/Card"; 
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "./components/ui/Tabs";
import { Footer } from "./components/Footer";
import { FarmerDashboard } from "./pages/FarmerDashboard";
import { BuyerDashboard } from "./pages/BuyerDashboard";
import { LoginPage } from "./components/Login";
import { Header } from "./components/Header";

// Main App Component
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

  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header userType={userType} onLogout={handleLogout} />
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

export default App;
