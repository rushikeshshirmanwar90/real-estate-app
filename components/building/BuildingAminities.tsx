import React from 'react';
import { View, Text } from 'react-native';
import { CableCarIcon, Power, Droplet, Flame, Wifi, Car, Music } from 'lucide-react-native';
import { styles } from "@/style/building/BuildingAminities"
import { Amenity } from '@/types/building';


const Amenities: React.FC<{ amenities: Amenity[] | undefined }> = ({ amenities }) => {
    if (!amenities || amenities.length === 0) {
        return null;
    }

    const getIcon = (iconName: any) => {
        const iconProps = { size: 24, color: '#0d9488' };

        switch (iconName.toLowerCase()) {
            case 'elevator':
                return <CableCarIcon {...iconProps} />;
            case 'power-backup':
                return <Power {...iconProps} />;
            case 'water':
                return <Droplet {...iconProps} />;
            case 'fire':
                return <Flame {...iconProps} />;
            case 'wifi':
                return <Wifi {...iconProps} />;
            case 'car':
                return <Car {...iconProps} />;
            case 'music':
                return <Music {...iconProps} />;
            default:
                return <CableCarIcon {...iconProps} />;
        }
    };

    return (
        <View style={styles.container}>
            {amenities.map((amenity: Amenity, index: number) => (
                <View key={index} style={styles.amenityCard}>
                    <View style={styles.iconContainer}>
                        {getIcon(amenity.icon)}
                    </View>
                    <Text style={styles.amenityName}>{amenity.name}</Text>
                </View>
            ))}
        </View>
    );
};

export default Amenities