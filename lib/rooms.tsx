import { Room } from '@/types/types';

export const ROOMS: Room[] = [
    {
        id: '1',
        name: 'Kitchen',
        icon: 'kitchen',
        details: {
            area: '140 sq ft',
            features: [
                'Modular kitchen',
                'Granite countertop',
                'Stainless steel sink',
                'Breakfast counter',
                'Built-in oven and microwave'
            ]
        }
    },
    {
        id: '2',
        name: 'Hall',
        icon: 'weekend',
        details: {
            area: '280 sq ft',
            features: [
                'Italian marble flooring',
                'False ceiling with LED lights',
                'French windows',
                'Large balcony access',
                'Entertainment unit'
            ]
        }
    },
    {
        id: '3',
        name: 'Bedroom 1',
        icon: 'king-bed',
        details: {
            area: '200 sq ft',
            features: [
                'Walk-in closet',
                'Hardwood flooring',
                'Attached bathroom',
                'Bay window with seating',
                'Air conditioning'
            ]
        }
    },
    {
        id: '4',
        name: 'Bedroom 2',
        icon: 'bed',
        details: {
            area: '180 sq ft',
            features: [
                'Built-in wardrobe',
                'Study table',
                'Laminate flooring',
                'Air conditioning',
                'Large windows with blackout curtains'
            ]
        }
    },
    {
        id: '5',
        name: 'Bathroom',
        icon: 'bathtub',
        details: {
            area: '70 sq ft',
            features: [
                'Rain shower',
                'Jacuzzi tub',
                'Heated flooring',
                'Dual sink vanity',
                'Anti-fog mirrors'
            ]
        }
    }
];