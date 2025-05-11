export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  userType: string;
}

export interface Review {
  userId: string;
  firstName: string;
  lastName: string;
  review: string;
  _id: string;
}

export interface Update {
  images: string[];
  title: string;
  description: string;
  reviews?: Review[];
  _id: string;
}

export interface UploadedData {
  _id: string;
  updateSectionType: string;
  sectionId: string;
  name: string;
  updates: Update[];
}

export interface UploadProgress {
  [key: string]: number;
}

export interface ProjectInfo {
  sectionId: string;
  updateSectionType: string;
  name: string;
  backgroundColor?: string;
  textColor?: string;
}
