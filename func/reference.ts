import { clientId } from "@/client";
import { ReferenceData } from "@/components/reference-model/ReferenceModel";
import { domain } from "@/lib/domain";
import axios from "axios";

export const addReference = async (payload: ReferenceData) => {
  try {
    const res = await axios.post(
      `${domain}/api/reference-leads?clientId=${clientId}`,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (res.status === 200) {
      console.log("Reference added successfully:", res.data);
      return res.data;
    }
    return null;
  } catch (error: any) {
    console.log("Error adding reference:", error.message);
  }
};

export const getLeads = async (referenceCustomerId: string) => {
  try {
    const res = await axios.get(
      `${domain}/api/reference-leads?referenceCustomerId=${referenceCustomerId}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (res.status === 200) {
      console.log("Leads fetched successfully:", res.data);
      return res.data;
    }
    return null;
  } catch (error: any) {
    console.log("Error fetching leads:", error.message);
  }
};
