export interface Amenity {
  icon: string;
  name: string;
}

export interface RowHouseProps {
  _id: string;
  name: string;
  description?: string;
  projectId: string;
  area: number;
  totalHouse: number;
  bookedHouse: number;
  images: string[];
  amenities?: Amenity[];
}
