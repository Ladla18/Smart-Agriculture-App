import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader } from "../components/ui/Card";

const WeatherForecasting = ({ data }) => {
  // Check if data is available and has the expected structure
  if (
    !data ||
    !data.list ||
    !Array.isArray(data.list) ||
    data.list.length === 0
  ) {
    return <div className="p-4">No weather data available</div>;
  }

  const forecastData = data.list.map((item) => ({
    date: new Date(item.dt * 1000).toLocaleDateString(),
    temp: item.main.temp - 273.15, // Convert Kelvin to Celsius
    humidity: item.main.humidity,
    description: item.weather[0].description,
  }));

  const cityName =
    data.city && data.city.name ? data.city.name : "Unknown City";

    

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">
        Weather Forecast for {cityName}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <Card>
          <CardHeader>Temperature Forecast</CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={forecastData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="temp"
                  stroke="#8884d8"
                  name="Temperature (°C)"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>Humidity Forecast</CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={forecastData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="humidity"
                  stroke="#82ca9d"
                  name="Humidity (%)"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>5-Day Forecast</CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {forecastData
              .filter((_, index) => index % 8 === 0)
              .map((day, index) => (
                <div key={index} className="text-center">
                  <p className="font-bold">{day.date}</p>
                  <p>{day.temp.toFixed(1)}°C</p>
                  <p>{day.humidity}%</p>
                  <p>{day.description}</p>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WeatherForecasting;
