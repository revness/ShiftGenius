import axios from "axios";
import { SignUpFormInputs } from "../pages/SignUp/SignUp";
import { SignInFormInputs } from "../pages/SignIn/SignIn";
import { ProfileFormInputs } from "../pages/Profile/schema";

const baseURL = import.meta.env.VITE_APP_API_BASE_URL;

export interface User {
  id: string;
  token: string;
  userName: string;
  email: string;
  position: string;
  department: string;
  phone: string;
}

export const signUp = async (data: SignUpFormInputs) => {
  try {
    const response = await axios.post(`${baseURL}/auth/register`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("signup", response.data);
    return response.data as User;
  } catch (error) {
    throw new Error("Failed to register");
  }
};

export const logIn = async (data: SignInFormInputs) => {
  try {
    const response = await axios.post(`${baseURL}/auth/login`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("login", response.data);
    console.log("loginToken", response.data.token);
    const { token, userName, email } = response.data as User;
    localStorage.setItem("token", token);
    return { token, userName, email };
  } catch (error) {
    throw new Error("Failed to login");
  }
};

export const addProfile = async (data: ProfileFormInputs) => {
  try {
    const token = localStorage.getItem("token");
    console.log("profileToken", token);
    const response = await axios.post(`${baseURL}/profile/add`, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data);
    return response.data as User;
  } catch (error) {
    throw new Error("Failed to add profile");
  }
};

export const getProfile = async (id: string) => {
  try {
    const token = localStorage.getItem("token");
    console.log("profileToken", token);
    const response = await axios.get(`${baseURL}/profile/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const { position, department, phone } = response.data as User;
    return { position, department, phone };
  } catch (error) {
    throw new Error("Failed to add profile");
  }
};
