export interface Section {
  sectionId: string;
  name: string;
  type: string;
  _id?: string;
}

export interface Amenity {
  icon: string;
  name: string;
  _id?: string;
}

export interface Project {
  _id: string;
  name: string;
  images: string[];
  state: string;
  city: string;
  area: string;
  address: string;
  description: string;
  projectType: string;
  longitude: number;
  latitude: number;
  section: Section[];
  amenities: Amenity[];
}
