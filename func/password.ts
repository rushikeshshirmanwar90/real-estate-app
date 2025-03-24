import axios from "axios";
import { domain } from "../lib/domain";

export const getUser = async (email: string) => {
  const res = await axios.post(`${domain}/api/user/find`, {
    email: email,
  });

  const data = res.data;

  if (res.status == 200) {
    return data;
  } else {
    return null;
  }
};

export const confirmMail = async (email: string) => {
  const res = await axios.post(`${domain}/api/user/find`, {
    email: email,
  });

  if (res.status == 200) {
    const obj = { verified: true, isUser: true };
    return obj;
  } else if (res.status == 201) {
    const obj = { verified: false, isUser: true };
    return obj;
  } else {
    const obj = { verified: false, isUser: false };
    return obj;
  }
};

export const sendOtp = async (email: string) => {
  const res = await axios.post(`${domain}/api/user/otp`, {
    email: email,
  });

  if (res.status == 200) {
    return true;
  } else {
    return false;
  }
};

export const verifyOtp = async (email: string, otp: string | number) => {
  const res = await axios.post(`${domain}/api/user/otp/valid`, {
    email: email,
    otp: otp,
  });

  if (res.status == 200) {
    return true;
  } else {
    return false;
  }
};

export const addPassword = async (email: string, password: string) => {
  const res = await axios.post(`${domain}/api/user/password`, {
    email: email,
    password: password,
  });

  if (res.status == 200) {
    return true;
  } else {
    return false;
  }
};

export const login = async (email: string, password: string) => {
  try {
    const res = await axios.post(`${domain}/api/user/login`, {
      email,
      password,
    });

    if (res.status === 200) {
      return { success: true };
    } else {
      return { success: false, error: res.data.message || "Login failed" };
    }
  } catch (error: any) {
    console.log("Failed to login");
    console.error(error.message);
    return {
      success: false,
      error:
        error.response?.data?.message || error.message || "An error occurred",
    };
  }
};
