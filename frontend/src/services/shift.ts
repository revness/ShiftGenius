import axios from "axios";
import { SignUpFormInputs } from "../pages/SignUp/SignUp";
import { SignInFormInputs } from "../pages/SignIn/SignIn";
import { ShiftFormInputs } from "../components/Shifts/Shifts";

const baseURL = import.meta.env.VITE_APP_API_BASE_URL;

export interface User {
  token: string;
  userName: string;
  email: string;
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
    const { token, userName, email } = response.data;
    return { token, userName, email };
    return response.data as User;
  } catch (error) {
    throw new Error("Failed to login");
  }
};

export const postTimeSheet = async (data: ShiftFormInputs) => {
  try {
    console.log("Posting to URL:", `${baseURL}/timesheet`);

    const response = await axios.post(`${baseURL}/timesheet`, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJqb2huc21pdGhAZ21haWwuY29tIiwiaWF0IjoxNzI5NDU4NDkzLCJleHAiOjE3Mjk1NDQ4OTN9.esI-cbMfHlVXmp_cFjjqaZsxOxtdbVfEEPxI5qom-yI`,
      },
    });
    console.log("timesheet", response.data);
    return response.data;
  } catch (error) {
    throw new Error("Failed to post timesheet");
  }
};

export const getTimeSheet = async (date: String) => {
  try {
    const response = await axios.get(`${baseURL}/timesheet/`, {
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJqb2huQGdtYWlsLmNvbSIsImlhdCI6MTcyOTQ2NTc3NiwiZXhwIjoxNzI5NTUyMTc2fQ.6ZT-5y_pA8oAfO04U_Siti_EY0QoUJMwSNKn_aVnpQA",
      },
      params: { date: date },
    });
    console.log("timesheet", response.data);
    return response.data;
  } catch (error) {
    throw new Error("Failed to get timesheet");
  }
};
