// types/index.ts
export interface WorkItem {
    id: string;
    images: string[]; // Only string array for multiple images
    title: string;
    description: string;
    date: string;
}

export interface CameraModalProps {
    visible: boolean;
    onClose: () => void;
    onSave: (workItem: Omit<WorkItem, 'id' | 'date'>) => void;
    updateType?: string;
    sectionName?: string;
}

export interface UpdateCardProps {
    workItem: WorkItem;
    color: string;
    onPress?: () => void;
}

export interface UploadProgress {
    [key: string]: number;
}