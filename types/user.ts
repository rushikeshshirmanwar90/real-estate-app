export interface User2 {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  userType: string;
  password: string;
  clientId: string;
}

export interface User {
  _id: string;
  clientId: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  userType: string;
}

// Interface for individual payment details
export interface Payment {
  title: string;
  percentage: string;
  date: string;
}

// Interface for flat-specific property details
export interface FlatData {
  title: string;
  description: string;
  bhk: number;
  totalArea: number;
}

// Interface for row house-specific property details
export interface RowHouseData {
  name: string;
  description: string;
  area: number;
}

// Interface for building details (used in flat type)
export interface BuildingDetails {
  name: string;
  location: string;
}

// Union type for property details data (flat or row house)
export type PropertyData = FlatData | RowHouseData;

// Interface for property details
export interface PropertyDetails {
  type: "flat" | "rowHouse";
  data: PropertyData;
  buildingDetails?: BuildingDetails; // Optional, only present for "flat" type
}

// Interface for a single property
export interface Property {
  projectId: string;
  projectName: string;
  sectionId: string;
  sectionName: string;
  sectionType: "Buildings" | "row house";
  flatId: string; // Can be empty string for row houses
  flatName: string;
  _id: string;
  payments?: Payment[]; // Optional, as not all properties may have payments
  propertyDetails: PropertyDetails;
}

// Interface for the full customer details object
export interface CustomerDetails {
  userId: string;
  properties: Property[];
}

export interface Customer {
  _id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  userType: string;
  password?: string;
  clientId?: string;
  verified?: boolean;
}
