export interface Building {
  _id: string;
  name: string;
  description: string;
  location: string;
  area: number;
  images: string[];
  amenities: Amenity[];
  section: Section[];
  flatInfo: FlatInfo[];
  projectId: string;
}

export interface Amenity {
  icon: string;
  name: string;
}

export interface Section {
  _id: string;
  name: string;
  description: string;
  images: string[];
}

export interface FlatInfo {
  _id: string;
  title: string;
  description: string;
  bhk: number;
  totalArea: number;
  totalFlats: number;
  totalBookedFlats: number;
  images: string[];
  video?: string;
}
