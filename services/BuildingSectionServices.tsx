// services/buildingSectionService.ts
import axios from 'axios';
import { BuildingSection, BuildingUpdate, FlatUnit } from '@/types/updates/BuildingSection';

const domain = 'YOUR_API_DOMAIN';
const clientId = 'YOUR_CLIENT_ID';

// Get building section details
export const getBuildingSection = async (projectId: string, sectionId: string): Promise<BuildingSection> => {
    try {
        const res = await axios.get(`${domain}/api/project/${projectId}/section/${sectionId}?clientId=${clientId}`);
        return res.data;
    } catch (error: any) {
        console.log('Error fetching building section:', error.message);
        throw error;
    }
};

// Get building updates
export const getBuildingUpdates = async (sectionId: string): Promise<BuildingUpdate[]> => {
    try {
        const res = await axios.get(`${domain}/api/updates/section/${sectionId}?clientId=${clientId}`);
        return res.data;
    } catch (error: any) {
        console.log('Error fetching building updates:', error.message);
        throw error;
    }
};

// Get flat units for a building section
export const getFlatUnits = async (sectionId: string): Promise<FlatUnit[]> => {
    try {
        const res = await axios.get(`${domain}/api/section/${sectionId}/flats?clientId=${clientId}`);
        return res.data;
    } catch (error: any) {
        console.log('Error fetching flat units:', error.message);
        throw error;
    }
};

// Add basic building update
export const addBasicBuildingUpdate = async (sectionId: string, updateData: any): Promise<BuildingUpdate> => {
    try {
        const res = await axios.post(`${domain}/api/updates/basic`, {
            sectionId,
            clientId,
            ...updateData
        });
        return res.data;
    } catch (error: any) {
        console.log('Error adding basic update:', error.message);
        throw error;
    }
};

// Add section update
export const addSectionUpdate = async (sectionId: string, subSectionId: string, updateData: any): Promise<BuildingUpdate> => {
    try {
        const res = await axios.post(`${domain}/api/updates/section`, {
            sectionId,
            subSectionId,
            clientId,
            ...updateData
        });
        return res.data;
    } catch (error: any) {
        console.log('Error adding section update:', error.message);
        throw error;
    }
};

// Add flat update
export const addFlatUpdate = async (flatId: string, updateData: any): Promise<BuildingUpdate> => {
    try {
        const res = await axios.post(`${domain}/api/updates/flat`, {
            flatId,
            clientId,
            ...updateData
        });
        return res.data;
    } catch (error: any) {
        console.log('Error adding flat update:', error.message);
        throw error;
    }
};

// Mock data for development (remove when API is ready)
export const getMockBuildingData = (sectionName: string) => {
    return {
        basicUpdate: {
            title: `Add Building Basic Updates`,
            subtitle: `Add Basic Updates of ${sectionName}`,
        },
        sections: [
            {
                id: 'lobby',
                name: 'Lobby',
                subtitle: 'Add Lobby Updates',
            },
            {
                id: 'terrace',
                name: 'Terrace Garden',
                subtitle: 'Add Terrace Garden Updates',
            }
        ],
        flats: [
            {
                id: '1bhk_premium',
                name: '1BHK Premium',
                status: 'pending' as const,
            },
            {
                id: '2bhk_deluxe',
                name: '2BHK Deluxe',
                status: 'pending' as const,
            }
        ]
    };
};