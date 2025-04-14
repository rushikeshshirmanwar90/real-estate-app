// types/user.ts
export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  userType: "customer" | "admin" | string; // Adjust based on actual user types
}

export interface Payment {
  title: string;
  date: string;
  percentage: string;
}

export interface Property {
  projectName: string;
  sectionType: string;
  payments?: Payment[];
}

export interface CustomerDetails {
  properties: Property[];
}

// types/types.ts
export interface Project {
  _id: string;
  name: string;
  section: SectionData[];
}

export interface SectionData {
  sectionId: string;
  name: string;
  type: string;
}

export interface FlatInfo {
  _id: string;
  title: string;
  totalFlats: number;
  totalBookedFlats: number;
}

export interface Building {
  _id: string;
  flatInfo?: FlatInfo[];
}

export interface ScannedData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  userType: string;
  userId: string;
}

export interface PropertyItem {
  projectId: string;
  projectName: string;
  sectionId: string;
  sectionName: string;
  sectionType: string;
  flatId: string;
  flatName: string;
  flatNumber: string;
  userId: string;
}
