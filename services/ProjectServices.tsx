// services/projectService.ts
import axios from 'axios';
import { Project } from '@/types/updates/updates';
import { domain } from '@/lib/domain';
import { clientId } from '@/client';


export const getProject = async (id: string): Promise<Project> => {
    try {
        const res = await axios.get(`${domain}/api/project?clientId=${clientId}&id=${id}`);
        const data: Project = res.data;
        return data;
    } catch (error: any) {
        console.log('Error fetching projects:', error.message);
        throw error;
    }
};

// Utility function to get icon name based on section type
export const getIconForSectionType = (type: string): string => {
    const typeMap: { [key: string]: string } = {
        'Buildings': 'home',
        'building': 'home',
        'row house': 'grid',
        'rowhouse': 'grid',
        'other': 'layers',
        'amenity': 'star',
        'parking': 'square',
        'garden': 'triangle',
    };

    return typeMap[type.toLowerCase()] || 'home';
};

// Utility function to get color based on index or section type
export const getColorForSection = (index: number, type?: string): string => {
    const colors = ['#4A90E2', '#4CAF50', '#FF9800', '#9C27B0', '#F44336', '#00BCD4'];

    // You can customize color logic based on section type if needed
    if (type) {
        const typeColorMap: { [key: string]: string } = {
            'Buildings': '#4A90E2',
            'building': '#4A90E2',
            'row house': '#FF9800',
            'rowhouse': '#FF9800',
            'other': '#4CAF50',
        };

        return typeColorMap[type.toLowerCase()] || colors[index % colors.length];
    }

    return colors[index % colors.length];
};

// Mock function to simulate progress data (replace with actual API call)
export const getSectionProgress = (sectionId: string): number => {
    // This should be replaced with actual API call to get section progress
    // For now, returning random progress between 60-90%
    const mockProgress = [60, 70, 75, 80, 85, 90];
    return mockProgress[Math.floor(Math.random() * mockProgress.length)];
};