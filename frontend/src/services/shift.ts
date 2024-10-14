import axios from "axios";
import { SignUpFormInputs } from "../pages/SignUp/SignUp";
import { SignInFormInputs } from "../pages/SignIn/SignIn";

const baseURL = import.meta.env.VITE_APP_API_BASE_URL;

export interface User {
  token: string;
}

export const signUp = async (data: SignUpFormInputs) => {
  try {
    const response = await axios.post(`${baseURL}/auth/register`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(response.data);
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
    console.log(response.data);
    return response.data as User;
  } catch (error) {
    throw new Error("Failed to login");
  }
};
