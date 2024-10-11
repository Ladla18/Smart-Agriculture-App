// Login Page Component
import React, { useState } from "react";
import {
  User,
  Lock,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/Card";
import { Input } from "../components/ui/Input"; 
import { Button } from "../components/ui/Button"; 

export const LoginPage = ({ onLogin }) => {
  const [userType, setUserType] = useState("farmer");

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center text-green-800">
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
              <Input placeholder="Username" className="border-0 focus:ring-0" />
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
    </div>
  );
};
