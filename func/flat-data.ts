import axios from "axios";
import { domain } from "../lib/domain";

// Property interfaces
export interface Property {
  id: string;
  title: string;
  description: string;
  totalArea: number;
  bhk: string;
  location: string;
  images: string[];
  flatName: string;
  projectId?: string;
  projectName?: string;
  video?: string;
}

interface PropertyCardProps {
  property: Property;
}

// Main function to fetch property data
export const getFlatData = async (
  userId: string | undefined
): Promise<Property[] | undefined> => {
  try {
    if (!userId) {
      console.error("User ID is required");
      return undefined;
    }

    const res = await axios.get(`${domain}/api/building/flat?userId=${userId}`);
    const data = res.data;

    // Transform the response into the Property format needed for PropertyCard
    const propertyData: Property[] = data.properties.map((item: any) => {
      // Handle flat type properties
      if (item.propertyDetails.type === "flat") {
        const flatData = item.propertyDetails.data;
        const buildingDetails = item.propertyDetails.buildingDetails;
        return {
          id: item.flatId,
          title: flatData.title || "",
          description: flatData.description || "",
          totalArea: flatData.totalArea || 0,
          bhk: flatData.bhk?.toString() || "0",
          location: buildingDetails?.location || "",
          images: flatData.images?.length
            ? flatData.images
            : ["https://via.placeholder.com/300"],
          flatName: item.flatName || "",
          projectId: item.projectId,
          projectName: item.projectName,
          video: flatData.video,
        };
      }
      // Handle row house type properties
      else if (item.propertyDetails.type === "rowHouse") {
        const rowHouseData = item.propertyDetails.data;

        return {
          id: item.id,
          title: rowHouseData.name || "",
          description: rowHouseData.description || "",
          totalArea: rowHouseData.area || 0,
          bhk: "Row House", // Display "Row House" instead of BHK for row houses
          location: `${item.projectName}, ${item.sectionName}`, // Create a location from project and section
          images: rowHouseData.images?.length
            ? rowHouseData.images
            : ["https://via.placeholder.com/300"],
          flatName: item.flatName || "",
          projectId: item.projectId,
          projectName: item.projectName,
        };
      }
      // Fallback for any other property types
      else {
        return {
          id: item.id || "",
          title: item.flatName || "",
          description: "No description available",
          totalArea: 0,
          bhk: "0",
          location: item.projectName || "",
          images: ["https://via.placeholder.com/300"],
          flatName: item.flatName || "",
        };
      }
    });

    return propertyData;
  } catch (error: any) {
    console.error("Error fetching flat data:", error.message);
    return undefined;
  }
};

// Helper function to get a single property by ID
export const getPropertyById = (
  properties: Property[] | undefined,
  id: string
): Property | undefined => {
  if (!properties) return undefined;
  return properties.find((property) => property.id === id);
};

// Helper function to filter properties by project
export const filterPropertiesByProject = (
  properties: Property[] | undefined,
  projectId: string
): Property[] => {
  if (!properties) return [];
  return properties.filter((property) => property.projectId === projectId);
};

// Helper function to safely display property images
export const getPropertyImage = (property: Property): string => {
  if (property.images && property.images.length > 0) {
    return property.images[0];
  }
  return "https://via.placeholder.com/300";
};
