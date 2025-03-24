import { User2 } from "@/types/user";
import axios from "axios";
import { domain } from "../lib/domain";

export const addUser = async (body: User2) => {
  try {
    const res = await axios.post(`${domain}/api/user`, body);

    return res;
  } catch (error: any) {
    console.log("something went wrong");
  }
};

export const getSingleUser = async (userId: string) => {
  try {
    const res = await axios.get(`${domain}/api/user?id=${userId}`);
    return res.data;
  } catch (error: any) {
    console.log("something went wrong");
  }
};
