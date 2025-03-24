import axios from "axios";
import { domain } from "../lib/domain";

interface PropertyItem {
  projectId: string;
  projectName: string;
  sectionId: string;
  sectionName: string;
  sectionType: string;
  flatId: string;
  flatName: string;
  userId: string;
}

export const addProperty = async (body: PropertyItem) => {
  try {
    const res = await axios.post(`${domain}/api/property`, body);
    const data = res.data;
    return data;
  } catch (error: any) {
    console.log("ERROR : can't able to add the property");
    console.log(error);
    return null;
  }
};

export const getProperties = async (userId: string | undefined) => {
  try {
    const res = await axios.get(`${domain}/api/property?userId=${userId}`);

    return res;
  } catch (error) {
    console.log("ERROR : can't able to get the property");
    console.log(error);
    return null;
  }
};
