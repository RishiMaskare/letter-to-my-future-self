import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080/api",
});

export const sendLetter = (data) =>
  API.post("/letters", data);
