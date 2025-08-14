import { Project, Section } from "@/types/updates/updates";

export const mockProjects: Project[] = [
  {
    id: "1",
    name: "Sunrise Residency",
    location: "Mumbai, Maharashtra",
    status: "ongoing",
    progress: 75,
    lastUpdate: "2 days ago",
  },
  {
    id: "2",
    name: "Green Valley Apartments",
    location: "Pune, Maharashtra",
    status: "ongoing",
    progress: 45,
    lastUpdate: "1 week ago",
  },
  {
    id: "3",
    name: "Royal Heights",
    location: "Bangalore, Karnataka",
    status: "upcoming",
    progress: 15,
    lastUpdate: "3 days ago",
  },
];

export const mockSections: Record<string, Section[]> = {
  "1": [
    { id: "s1", name: "Tower A", type: "building", progress: 80, units: 120 },
    {
      id: "s2",
      name: "Villa Section",
      type: "row house",
      progress: 60,
      units: 25,
    },
    { id: "s3", name: "Club House", type: "other", progress: 40, units: 1 },
  ],
  "2": [
    { id: "s4", name: "Block A", type: "building", progress: 50, units: 80 },
    { id: "s5", name: "Block B", type: "building", progress: 40, units: 80 },
    { id: "s6", name: "Parking Area", type: "other", progress: 30, units: 1 },
  ],
  "3": [
    { id: "s7", name: "Phase 1", type: "building", progress: 20, units: 100 },
    { id: "s8", name: "Amenities", type: "other", progress: 10, units: 1 },
  ],
};
