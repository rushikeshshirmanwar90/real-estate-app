import axios from "axios";
import { domain } from "../domain";

export const getAllUsers = async () => {
  try {
    const res = await axios.get(`${domain}/api/user`);
    return res.data;
  } catch (error: any) {
    console.log(error.message);
    return null;
  }
};
