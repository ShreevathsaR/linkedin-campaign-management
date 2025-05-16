import axios  from "axios"

export const api = axios.create({
  baseURL: "http://localhost:7000/api",
  headers: {
    "Content-Type": "application/json",
  },
})