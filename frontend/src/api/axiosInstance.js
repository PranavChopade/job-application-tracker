import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.baseURL || "http://localhost:3000/api",
  withCredentials: true,
})