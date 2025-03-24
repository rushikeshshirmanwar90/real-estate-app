import { Property } from "@/types/types"

export const PROPERTIES: Property[] = [
    {
        id: '1',
        title: 'Sunshine Apartments',
        description: 'Luxurious apartment with modern amenities and beautiful sea view',
        totalArea: '1250 sq ft',
        bhk: '2 BHK',
        location: 'Bandra West, Mumbai',
        images: [
            `https://api.a0.dev/assets/image?text=modern%20luxury%20apartment%20living%20room%20with%20sea%20view&aspect=16:9&seed=100`,
            `https://api.a0.dev/assets/image?text=modern%20kitchen%20with%20island%20and%20stainless%20steel%20appliances&aspect=16:9&seed=101`,
            `https://api.a0.dev/assets/image?text=master%20bedroom%20with%20large%20windows%20and%20city%20view&aspect=16:9&seed=102`,
        ],
    },
    {
        id: '2',
        title: 'Royal Palms Villa',
        description: 'Spacious villa with garden, swimming pool and premium interiors',
        totalArea: '2800 sq ft',
        bhk: '4 BHK',
        location: 'Juhu, Mumbai',
        images: [
            `https://api.a0.dev/assets/image?text=luxury%20villa%20exterior%20with%20garden%20and%20swimming%20pool&aspect=16:9&seed=103`,
            `https://api.a0.dev/assets/image?text=spacious%20living%20room%20with%20high%20ceiling%20and%20luxury%20furniture&aspect=16:9&seed=104`,
            `https://api.a0.dev/assets/image?text=modern%20bathroom%20with%20bathtub%20and%20shower&aspect=16:9&seed=105`,
        ],
    },
    {
        id: '3',
        title: 'Green Valley Heights',
        description: 'Eco-friendly apartment complex with lush green surroundings',
        totalArea: '1100 sq ft',
        bhk: '3 BHK',
        location: 'Powai, Mumbai',
        images: [
            `https://api.a0.dev/assets/image?text=eco-friendly%20apartment%20complex%20with%20green%20surroundings&aspect=16:9&seed=106`,
            `https://api.a0.dev/assets/image?text=modern%20balcony%20with%20plants%20and%20seating&aspect=16:9&seed=107`,
            `https://api.a0.dev/assets/image?text=cozy%20bedroom%20with%20wood%20accents&aspect=16:9&seed=108`,
        ],
    },
];