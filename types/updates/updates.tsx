// types/Project.ts
export interface Amenity {
    icon: string;
    name: string;
    _id: string;
}

export interface Section {
    sectionId: string;
    name: string;
    type: string;
    _id: string;
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
    clientId: string;
    projectType: string;
    amenities: Amenity[];
    section: Section[];
    createdAt: string;
    updatedAt: string;
    __v: number;
    latitude: number;
    longitude: number;
}

export interface ProjectCardProps {
    title: string;
    subtitle: string;
    progress: number;
    color: string;
    iconName: string;
    onPress: () => void;
    showProgress?: boolean;
}

export interface HeaderCardProps {
    title: string;
    subtitle: string;
    onPress: () => void;
}

export interface SectionHeaderProps {
    title: string;
    subtitle: string;
}

export interface ProgressBarProps {
    progress: number;
    color: string;
}

export interface ProjectManagementScreenProps {
    onGoBack?: () => void;
}