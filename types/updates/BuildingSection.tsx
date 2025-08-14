// types/BuildingSection.ts
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

export interface WorkItem {
    id: string;
    image: string;
    title: string;
    description: string;
    date: string;
    sectionId?: string;
    updateType?: string;
}

export interface BuildingUpdate {
    _id: string;
    sectionId: string;
    updateType: 'basic' | 'section' | 'flat';
    title: string;
    description?: string;
    status: 'pending' | 'in_progress' | 'completed';
    createdAt: string;
    updatedAt: string;
    image?: string;
}

export interface BuildingSection {
    _id: string;
    sectionId: string;
    name: string;
    type: string;
    category: 'building' | 'section' | 'flat';
    subSections?: BuildingSubSection[];
    updates?: BuildingUpdate[];
    completionStatus?: 'pending' | 'in_progress' | 'completed';
}

export interface BuildingSubSection {
    _id: string;
    name: string;
    type: string;
    status: 'pending' | 'in_progress' | 'completed';
    updates?: BuildingUpdate[];
}

export interface FlatUnit {
    _id: string;
    unitName: string;
    type: string; // "1BHK Premium", "2BHK Deluxe"
    status: 'pending' | 'in_progress' | 'completed';
    completionPercentage?: number;
}

export interface UpdateCardProps {
    title: string;
    subtitle?: string;
    status?: 'pending' | 'in_progress' | 'completed';
    hasSubItems?: boolean;
    showSeeAll?: boolean;
    onPress: () => void;
    onSeeAllPress?: () => void;
    children?: React.ReactNode;
}

export interface SectionCardProps {
    title: string;
    subtitle: string;
    onPress: () => void;
    onSeeAllPress?: () => void;
}

export interface FlatCardProps {
    title: string;
    status: 'pending' | 'in_progress' | 'completed';
    onPress: () => void;
}

export interface BuildingSectionScreenProps {
    projectId: string;
    sectionId: string;
    sectionName: string;
    onGoBack?: () => void;
}

export interface CameraModalProps {
    visible: boolean;
    onClose: () => void;
    onSave: (workItem: Omit<WorkItem, 'id' | 'date'>) => void;
    updateType?: string;
    sectionName?: string;
}