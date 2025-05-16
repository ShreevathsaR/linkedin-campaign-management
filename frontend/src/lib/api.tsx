import axios  from "axios"

export const api = axios.create({
  // baseURL: "https://linkedin-campaign-management-system.onrender.com/api",
  baseURL: "http://localhost:7000/api",
  headers: {
    "Content-Type": "application/json",
  },
})