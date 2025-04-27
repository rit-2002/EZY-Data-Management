import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://ezy-api-service-dev-498807929429.us-central1.run.app",
  withCredentials: true,
});

export const axiosAPI = axiosInstance;
