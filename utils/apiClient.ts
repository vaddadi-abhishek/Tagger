import axios from "axios";
import { getToken } from "./storage";

const api = axios.create({
  baseURL: "https://yourbackend/api", // change this
});

api.interceptors.request.use(async (config) => {
  const token = await getToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
