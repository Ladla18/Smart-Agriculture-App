// Header Component
import React, { useState } from "react";
import { User, LogOut } from "lucide-react";
import { Button } from "../components/ui/Button"; 
export const Header = ({ userType, onLogout }) => (
  <header className="bg-white shadow">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
      <h1 className="text-3xl font-bold text-green-800">FarmConnect Pro</h1>
      <div className="flex items-center space-x-4">
        <User className="h-6 w-6 text-green-600" />
        <span className="text-green-700 font-medium">
          {userType === "farmer" ? "Farmer" : "Buyer"} Dashboard
        </span>
        <Button variant="outline" size="sm" onClick={onLogout}>
          <LogOut className="h-4 w-4 mr-2 mt-0.5" />
          Logout
        </Button>
      </div>
    </div>
  </header>
);
