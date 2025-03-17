// Buyer Dashboard Component


import { StatCard } from "../components/StatCard";
import { FeatureCard } from "../components/FeatureCard";
import {
  ShoppingCart,
  TrendingUp,
  Package,
  Search,
} from "lucide-react";
export const BuyerDashboard = () => {


    return (
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatCard
            icon={<ShoppingCart className="h-8 w-8 text-blue-500" />}
            title="Active Orders"
            value="3"
          />
          <StatCard
            icon={<TrendingUp className="h-8 w-8 text-green-500" />}
            title="Avg. Savings"
            value="15%"
          />
          <StatCard
            icon={<Package className="h-8 w-8 text-purple-500" />}
            title="Products Sourced"
            value="12"
          />
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-blue-800">Buyer Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FeatureCard
              icon={<Search className="h-12 w-12 text-blue-500" />}
              title="Product Search"
              description="Find the exact produce you need from our network of farmers."
            />
            <FeatureCard
              icon={<ShoppingCart className="h-12 w-12 text-green-500" />}
              title="Marketplace"
              description="Browse all available products and make purchases."
            />
            <FeatureCard
              icon={<TrendingUp className="h-12 w-12 text-purple-500" />}
              title="Price Analytics"
              description="View price trends and make informed purchasing decisions."
            />
            <FeatureCard
              icon={<Package className="h-12 w-12 text-red-500" />}
              title="Order Management"
              description="Track and manage all your orders in one place."
            />
          </div>
        </div>
      </div>
    );

}