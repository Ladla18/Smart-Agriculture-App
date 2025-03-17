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
    const token = localStorage.getItem("token");
    return token ? JSON.parse(atob(token.split(".")[1])) : null;
  },
};
