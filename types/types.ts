export type Property = {
  id: string;
  title: string;
  description: string;
  totalArea: string | number;
  bhk: string;
  location: string;
  flatName: string;
  images: string[];
};

export type Room = {
  id: string;
  name: string;
  icon: string;
  details: {
    area: string;
    features: string[];
  };
};

export type WorkItem = {
  id: string;
  image: string;
  description: string;
  date: string;
};

export type RootStackParamList = {
  Home: undefined;
  Detail: { property: Property };
  RoomDetail: { room: Room; property: Property };
  TodaysWork: { room: Room; property: Property };
};

// Section data interface
export interface SectionData {
  sectionId: string;
  name: string;
  type: string; // "Buildings" or other types
  // Add other section properties as needed
}

export interface Project {
  _id: string;
  name: string;
  section?: SectionData[];
  // Add other project properties as needed
}

// Flat information interface
export interface FlatInfo {
  _id: string;
  title: string;
  totalFlats: number;
  totalBookedFlats: number;
  // Add other flat properties as needed
}

// Building data interface
export interface Building {
  _id: string;
  flatInfo?: FlatInfo[];
  // Add other building properties as needed
}

// Scanned user data interface
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
  userId: string; // Optional, for linking to user
}
