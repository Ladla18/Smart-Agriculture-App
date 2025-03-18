import axiosInstance from "../config/axios";
import { API_ENDPOINTS } from "../constants/apiConstants";

export const userService = {
  login: async (credentials) => {
    try {
      const response = await axiosInstance.post(
        API_ENDPOINTS.LOGIN,
        credentials
      );
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
      }
      return response.data;
    } catch (error) {
      throw error?.response?.data?.message || "Login failed";
    }
  },

  signup: async (userData) => {
    try {
      const response = await axiosInstance.post(API_ENDPOINTS.SIGNUP, userData);
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
      }
      return response.data;
    } catch (error) {
      throw error?.response?.data?.message || "Signup failed";
    }
  },

  logout: () => {
    localStorage.removeItem("token");
  },

  getCurrentUser: () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return null;

      const base64Url = token.split(".")[1];
      if (!base64Url) return null;

      const payload = JSON.parse(atob(base64Url));
      if (!payload || !payload.userType || !payload.userId) {
        localStorage.removeItem("token"); // Remove invalid token
        return null;
      }

      return payload;
    } catch (error) {
      console.error("Error parsing token:", error);
      localStorage.removeItem("token"); // Remove invalid token
      return null;
    }
  },
};
