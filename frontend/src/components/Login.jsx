// Login and Signup Page Component
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
import axios from "axios";

export const LoginPage = ({ onLogin, onSignup }) => {
  const [userType, setUserType] = useState("farmer");
  const [signupType, setSignupType] = useState("farmer");
  const [signupData, setSignupData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    userType: signupType
  });

  const handleSignup = async (e) => {
    e.preventDefault();
    

    setSignupData({
      fullName: "",
      email: "",
      phoneNumber: "",
      password: "",
      userType: signupType
    });

    const response  = await axios.post("http://localhost:3000/api/user/signup", signupData);
    console.log(response.data);




    console.log(signupData);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSignupData({
      ...signupData,
      [name]: value
    });
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
            <form
              onSubmit={(e) => {
                e.preventDefault();
                onLogin(userType);
              }}
              className="space-y-4"
            >
              <div className="flex items-center space-x-2 p-2 border rounded">
                <User className="text-gray-500" />
                <Input
                  placeholder="Username"
                  className="border-0 focus:ring-0"
                />
              </div>
              <div className="flex items-center space-x-2 p-2 border rounded">
                <Lock className="text-gray-500" />
                <Input
                  type="password"
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
              <Button type="submit" className="w-full">
                Log In
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
            <form
              onSubmit={handleSignup}
              className="space-y-4"
            >
              <div className="flex items-center space-x-2 p-2 border rounded">
                <User className="text-gray-500" />
                <Input
                  name="fullName"
                  value={signupData.fullName}
                  onChange={handleInputChange}
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
                  onChange={handleInputChange}
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
                  onChange={handleInputChange}
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
                  onChange={handleInputChange}
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
              
                <Button type="submit" className="w-full  ">
                  Sign Up
                </Button>
       
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
