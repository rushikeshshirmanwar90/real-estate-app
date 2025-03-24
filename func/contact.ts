import axios from "axios";
import { domain } from "../lib/domain";
import { getContact } from "@/lib/function/get-contact";

export const addContacts = async (body: any) => {
  try {
    const res = await axios.post(`${domain}/api/contacts`, body, {
      headers: { "Content-Type": "application/json" },
    });

    if (res.status === 200) {
      const insertedCount = res.data.insertedCount || body.length; // Adjust based on your API response
      console.log(`${insertedCount} contacts added successfully`);
      return insertedCount;
    } else {
      console.log("Something went wrong:", res.status);
      return null;
    }
  } catch (error: any) {
    console.error("Error adding contacts:", error.message);
    if (error.response) {
      console.error("Server response:", error.response.data);
    }
    return null;
  }
};

export const getPermissionAndAddContacts = async (userId: string) => {
  const clientId = process.env.EXPO_PUBLIC_CLIENT_ID;
  try {
    const data = await getContact();
    if (data != null) {
      // Filter contacts where firstName and phoneNumbers array exists and has at least one entry
      const validContacts = data.filter(
        (item) =>
          item.firstName && item.phoneNumbers && item.phoneNumbers.length > 0
      );

      // Map to the format your API expects
      const body = validContacts.map((item) => ({
        firstName: item.firstName,
        lastName: item.lastName || "",
        email: item.email || "",
        phoneNumber: item.phoneNumbers?.[0]?.number || "", // Extract the first phone number
        clientId,
        userId,
      }));

      // Remove empty entries before sending
      const cleanedBody = body.filter(
        (contact) =>
          contact.firstName.trim() !== "" || contact.phoneNumber.trim() !== ""
      );

      if (cleanedBody.length > 0) {
        const res = await addContacts(cleanedBody);
        if (res != null) {
          console.log(`${res} contacts added successfully`);
        } else {
          console.log("Failed to add contacts");
        }
      } else {
        console.log("No valid contacts to add");
      }
    } else {
      console.log("Permission denied");
    }
  } catch (error) {
    console.error("Error getting permission or adding contacts:", error);
  }
};
