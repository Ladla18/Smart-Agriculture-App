import React, { useState } from "react";
import { User, Lock, Mail, Phone } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/Card";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";

import { Toaster, toast } from "react-hot-toast";
import axios from "axios";

export const LoginPage = ({ onLogin, onSignup }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [loginLoading, setLoginLoading] = useState(false);
  const [signupLoading, setSignupLoading] = useState(false);

  const [userType, setUserType] = useState("farmer");
  const [signupType, setSignupType] = useState("farmer");

  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [signupData, setSignupData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:3000/api/user/login",
        {
          ...loginData,
          userType,
        }
      );
      toast.success("Login successful!");
      onLogin(response.data);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Login failed.");
    } finally {
      setLoginLoading(false);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setSignupLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:3000/api/user/signup",
        {
          ...signupData,
          userType: signupType,
        }
      );
      toast.success("Account created successfully!");
      setSignupData({ fullName: "", email: "", phoneNumber: "", password: "" });
      onSignup(response.data);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Signup failed.");
    } finally {
      setSignupLoading(false);
    }
  };

  const handleInputChange = (e, setter) => {
    const { name, value } = e.target;
    setter((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <Toaster position="top-center" />

      <Card className="w-full max-w-4xl bg-white/80 backdrop-blur-sm shadow-2xl">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Left Side - Hero Section */}
          <div className="p-6 bg-gradient-to-br from-green-600 to-blue-600 text-white rounded-l-xl hidden md:block">
            <div className="h-full flex flex-col justify-between">
              <div className="space-y-6">
                <h1 className="text-4xl font-bold">FarmConnect Pro</h1>
                <p className="text-lg opacity-90">
                  Connect, Trade, and Grow with the Leading Agricultural
                  Marketplace
                </p>
                <div className="space-y-4 mt-8">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-white/20 rounded-full">
                      <User className="w-6 h-6" />
                    </div>
                    <p>Connect with verified buyers and farmers</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-white/20 rounded-full">
                      <Lock className="w-6 h-6" />
                    </div>
                    <p>Secure transactions and communication</p>
                  </div>
                </div>
              </div>
              <p className="text-sm opacity-75">
                © 2024 FarmConnect Pro. All rights reserved.
              </p>
            </div>
          </div>

          {/* Right Side - Auth Forms */}
          <div className="p-6">
            <div className="mb-6 text-center md:hidden">
              <h1 className="text-3xl font-bold text-green-600">
                FarmConnect Pro
              </h1>
            </div>

            <div className="space-y-6">
              {/* Form Toggle Buttons */}
              <div className="flex gap-4 mb-6">
                <button
                  onClick={() => setIsLogin(true)}
                  className={`flex-1 py-2 text-center rounded-lg transition-all ${
                    isLogin
                      ? "bg-green-600 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  Login
                </button>
                <button
                  onClick={() => setIsLogin(false)}
                  className={`flex-1 py-2 text-center rounded-lg transition-all ${
                    !isLogin
                      ? "bg-green-600 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  Sign Up
                </button>
              </div>

              {isLogin ? (
                /* Login Form */
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <Input
                        name="email"
                        type="email"
                        value={loginData.email}
                        onChange={(e) => handleInputChange(e, setLoginData)}
                        className="pl-10 bg-gray-50 border-gray-200"
                        placeholder="Enter your email"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <Input
                        name="password"
                        type="password"
                        value={loginData.password}
                        onChange={(e) => handleInputChange(e, setLoginData)}
                        className="pl-10 bg-gray-50 border-gray-200"
                        placeholder="Enter your password"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-sm font-medium">I am a:</label>
                    <div className="grid grid-cols-2 gap-3">
                      <Button
                        type="button"
                        onClick={() => setUserType("farmer")}
                        className={`py-6 ${
                          userType === "farmer"
                            ? "bg-green-600 hover:bg-green-700"
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                      >
                        <div className="flex flex-col items-center gap-1">
                          <User className="w-5 h-5" />
                          <span>Farmer</span>
                        </div>
                      </Button>
                      <Button
                        type="button"
                        onClick={() => setUserType("buyer")}
                        className={`py-6 ${
                          userType === "buyer"
                            ? "bg-blue-600 hover:bg-blue-700"
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                      >
                        <div className="flex flex-col items-center gap-1">
                          <User className="w-5 h-5" />
                          <span>Buyer</span>
                        </div>
                      </Button>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
                    disabled={loginLoading}
                  >
                    {loginLoading ? (
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin" />
                        <span>Logging in...</span>
                      </div>
                    ) : (
                      "Log In"
                    )}
                  </Button>
                </form>
              ) : (
                /* Signup Form */
                <form onSubmit={handleSignup} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <Input
                        name="fullName"
                        value={signupData.fullName}
                        onChange={(e) => handleInputChange(e, setSignupData)}
                        className="pl-10 bg-gray-50 border-gray-200"
                        placeholder="Enter your full name"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <Input
                        name="email"
                        type="email"
                        value={signupData.email}
                        onChange={(e) => handleInputChange(e, setSignupData)}
                        className="pl-10 bg-gray-50 border-gray-200"
                        placeholder="Enter your email"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Phone Number</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <Input
                        name="phoneNumber"
                        type="tel"
                        value={signupData.phoneNumber}
                        onChange={(e) => handleInputChange(e, setSignupData)}
                        className="pl-10 bg-gray-50 border-gray-200"
                        placeholder="Enter your phone number"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <Input
                        name="password"
                        type="password"
                        value={signupData.password}
                        onChange={(e) => handleInputChange(e, setSignupData)}
                        className="pl-10 bg-gray-50 border-gray-200"
                        placeholder="Create a strong password"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-sm font-medium">Sign up as:</label>
                    <div className="grid grid-cols-2 gap-3">
                      <Button
                        type="button"
                        onClick={() => setSignupType("farmer")}
                        className={`py-6 ${
                          signupType === "farmer"
                            ? "bg-green-600 hover:bg-green-700"
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                      >
                        <div className="flex flex-col items-center gap-1">
                          <User className="w-5 h-5" />
                          <span>Farmer</span>
                        </div>
                      </Button>
                      <Button
                        type="button"
                        onClick={() => setSignupType("buyer")}
                        className={`py-6 ${
                          signupType === "buyer"
                            ? "bg-blue-600 hover:bg-blue-700"
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                      >
                        <div className="flex flex-col items-center gap-1">
                          <User className="w-5 h-5" />
                          <span>Buyer</span>
                        </div>
                      </Button>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
                    disabled={signupLoading}
                  >
                    {signupLoading ? (
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin" />
                        <span>Creating account...</span>
                      </div>
                    ) : (
                      "Sign Up"
                    )}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
