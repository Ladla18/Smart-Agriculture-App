// Login and Signup Page Component
import React, { useState } from "react";
import { User, Lock, Mail, Phone } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { useToast } from "../components/ui/use-toast";
import axios from "axios";

export const LoginPage = ({ onLogin, onSignup }) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [userType, setUserType] = useState("farmer");
  const [signupType, setSignupType] = useState("farmer");
  
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
    userType: userType
  });

  const [signupData, setSignupData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    userType: signupType
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post("http://localhost:3000/api/user/login", loginData);
      toast({
        title: "Success!",
        description: "Login successful",
      });
      onLogin(response.data);
    } catch (error) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Login failed",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post("http://localhost:3000/api/user/signup", {
        ...signupData,
        userType: signupType
      });
      toast({
        title: "Success!",
        description: "Account created successfully",
      });
      setSignupData({
        fullName: "",
        email: "",
        phoneNumber: "",
        password: "",
        userType: signupType
      });
      onSignup(response.data);
    } catch (error) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Signup failed",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoginInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData(prev => ({
      ...prev,
      [name]: value,
      userType
    }));
  };

  const handleSignupInputChange = (e) => {
    const { name, value } = e.target;
    setSignupData(prev => ({
      ...prev,
      [name]: value,
      userType: signupType
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
      <div className="flex w-full justify-between max-w-6xl space-x-8">
        {/* Login Section */}
        <Card className="w-1/3 bg-black text-white">
          <CardHeader>
            <CardTitle className="text-2xl text-center text-white">
              FarmConnect Pro Login
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="flex items-center space-x-2 p-2 border rounded">
                <Mail className="text-gray-500" />
                <Input
                  name="email"
                  type="email"
                  value={loginData.email}
                  onChange={handleLoginInputChange}
                  placeholder="Email"
                  className="border-0 focus:ring-0"
                />
              </div>
              <div className="flex items-center space-x-2 p-2 border rounded">
                <Lock className="text-gray-500" />
                <Input
                  name="password"
                  type="password"
                  value={loginData.password}
                  onChange={handleLoginInputChange}
                  placeholder="Password"
                  className="border-0 focus:ring-0"
                />
              </div>
              <div className="flex justify-center space-x-4">
                <Button
                  type="button"
                  onClick={() => setUserType("farmer")}
                  variant={userType === "farmer" ? "default" : "outline"}
                >
                  Farmer
                </Button>
                <Button
                  type="button"
                  onClick={() => setUserType("buyer")}
                  variant={userType === "buyer" ? "default" : "outline"}
                >
                  Buyer
                </Button>
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Loading..." : "Log In"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Signup Section */}
        <Card className="w-1/2">
          <CardHeader>
            <CardTitle className="text-2xl text-center text-blue-800">
              FarmConnect Pro Signup
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSignup} className="space-y-4">
              <div className="flex items-center space-x-2 p-2 border rounded">
                <User className="text-gray-500" />
                <Input
                  name="fullName"
                  value={signupData.fullName}
                  onChange={handleSignupInputChange}
                  placeholder="Full Name"
                  className="border-0 focus:ring-0"
                />
              </div>
              <div className="flex items-center space-x-2 p-2 border rounded">
                <Mail className="text-gray-500" />
                <Input
                  name="email"
                  type="email"
                  value={signupData.email}
                  onChange={handleSignupInputChange}
                  placeholder="Email"
                  className="border-0 focus:ring-0"
                />
              </div>
              <div className="flex items-center space-x-2 p-2 border rounded">
                <Phone className="text-gray-500" />
                <Input
                  name="phoneNumber"
                  type="tel"
                  value={signupData.phoneNumber}
                  onChange={handleSignupInputChange}
                  placeholder="Phone Number"
                  className="border-0 focus:ring-0"
                />
              </div>
              <div className="flex items-center space-x-2 p-2 border rounded">
                <Lock className="text-gray-500" />
                <Input
                  name="password"
                  type="password"
                  value={signupData.password}
                  onChange={handleSignupInputChange}
                  placeholder="Password"
                  className="border-0 focus:ring-0"
                />
              </div>
              <div className="flex justify-center space-x-4">
                <Button
                  type="button"
                  onClick={() => setSignupType("farmer")}
                  variant={signupType === "farmer" ? "default" : "outline"}
                >
                  Farmer
                </Button>
                <Button
                  type="button"
                  onClick={() => setSignupType("buyer")}
                  variant={signupType === "buyer" ? "default" : "outline"}
                >
                  Buyer
                </Button>
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Loading..." : "Sign Up"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
