import axios from "axios";
import { domain } from "../lib/domain";
import { Building } from "@/types/building";

export const getProject = async () => {
  try {
    const res = await axios.get(`${domain}/api/project`);
    const data = res.data;
    return data;
  } catch (error: any) {
    console.log(error.message);
  }
};

export const getSingleProject = async (id: string) => {
  try {
    const res = await axios.get(`${domain}/api/project?id=${id}`);
    const data = res.data;
    return data;
  } catch (error: any) {
    console.log(error.message);
  }
};

export const getSingleBuilding = async (id: string) => {
  try {
    const res = await axios.get(`${domain}/api/building?id=${id}`);
    const data: Building = res.data;
    return data;
  } catch (error: any) {
    console.log(error.message);
  }
};

export const getSingleRowHouse = async (id: string) => {
  try {
    const res = await axios.get(`${domain}/api/rowHouse?id=${id}`);
    const data = res.data.data;
    // console.log(data);
    return data;
  } catch (error: any) {
    console.log(error.message);
  }
};

export const getSectionData = async (id: string) => {
  try {
    const res = await axios.get(`${domain}/api/otherSection?id=${id}`);
    const data = res.data.data;
    return data;
  } catch (error: any) {
    console.log(error.message);
  }
};
