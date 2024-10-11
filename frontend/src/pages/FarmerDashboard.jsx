// Farmer Dashboard Component

import { StatCard } from "../components/StatCard";
import { FeatureCard } from "../components/FeatureCard";
import {

  Leaf,
  ShoppingCart,
  BarChart2,
  Camera,
  CloudSun,
  TrendingUp,
 
} from "lucide-react";
export const FarmerDashboard = () => (

  <div className="space-y-8">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <StatCard
        icon={<Leaf className="h-8 w-8 text-green-500" />}
        title="Active Crops"
        value="4"
      />
      <StatCard
        icon={<ShoppingCart className="h-8 w-8 text-blue-500" />}
        title="Market Listings"
        value="7"
      />
      <StatCard
        icon={<BarChart2 className="h-8 w-8 text-purple-500" />}
        title="Avg. Yield Increase"
        value="12%"
      />
    </div>

    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-green-800">Farmer Tools</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FeatureCard
          icon={<Camera className="h-12 w-12 text-green-500" />}
          title="Crop Disease Detection"
          description="Upload images of your crops to detect diseases early."
        />
        <FeatureCard
          icon={<CloudSun className="h-12 w-12 text-blue-500" />}
          title="Weather Forecast"
          description="Get accurate, localized weather predictions for your farm."
        />
        <FeatureCard
          icon={<ShoppingCart className="h-12 w-12 text-purple-500" />}
          title="Buy & Sell Marketplace"
          description="List your produce or find farming supplies easily."
        />
        <FeatureCard
          icon={<TrendingUp className="h-12 w-12 text-red-500" />}
          title="Crop Price Prediction"
          description="AI-powered forecasts to help you make informed decisions."
        />
      </div>
    </div>
  </div>
);
