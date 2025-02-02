import axios from "axios";
import { User } from "../types";

const authApi = axios.create({
  baseURL: "http://45.138.158.137:92/api/auths",
});

// REFISTER USER 🚩
export const authRegister = async (userData: User) => {
  const res = await authApi.post(`/sign-up`, userData);

  if (res.status !== 200) throw new Error("Failed to register user!");
};

// LOGIN USER 🚩
export const authLogin = async (userData: User) => {
  const res = await authApi.post(`/sign-in`, userData);

  if (res.status !== 200) throw new Error("Failed to login user!");

  const access_token = res.data;
  localStorage.setItem("token", access_token);
};
