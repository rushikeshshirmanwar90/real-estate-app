import axios from "axios";
import { domain } from "../lib/domain";

export const getRooms = async (flatId: string) => {
  try {
    const res = await axios.get(`${domain}/api/room-info?flatId=${flatId}`);

    const data = res.data;
  } catch (error: any) {
    console.error(error.message);
  }
};
