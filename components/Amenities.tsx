import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Feather, MaterialIcons, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

export interface AmenityItem {
    name: string;
    icon: string;
}

const { width } = Dimensions.get('window');
const scaleFont = (size: any) => (width / 375) * size; // 375 is a standard base width

interface BuildingAmenitiesProps {
    amenities: AmenityItem[] | undefined;
    bg?: string; // Background color for icon container
    fr?: string; // Foreground (icon) color
}

const BuildingAmenities: React.FC<BuildingAmenitiesProps> = ({ amenities, bg = '#EBF5FF', fr = '#1E88E5' }) => {
    if (!amenities || amenities.length === 0) {
        return (
            <View style={styles.container}>
                <Text style={styles.noAmenitiesText}>No amenities available</Text>
            </View>
        );
    }

    const getIcon = (iconName: string) => {
        switch (iconName.toLowerCase()) {
            case 'wifi':
                return <Feather name="wifi" size={scaleFont(24)} color={fr} />;
            case 'tv':
                return <MaterialIcons name="tv" size={scaleFont(24)} color={fr} />;
            case 'car':
                return <Ionicons name="car" size={scaleFont(24)} color={fr} />;
            case 'coffee':
                return <MaterialCommunityIcons name="coffee" size={scaleFont(24)} color={fr} />;
            case 'bath':
                return <MaterialIcons name="bathtub" size={scaleFont(24)} color={fr} />;
            case 'bed':
                return <MaterialIcons name="bed" size={scaleFont(24)} color={fr} />;
            case 'hotel':
                return <MaterialIcons name="hotel" size={scaleFont(24)} color={fr} />;
            case 'key':
                return <MaterialIcons name="vpn-key" size={scaleFont(24)} color={fr} />;
            case 'computer':
                return <MaterialIcons name="computer" size={scaleFont(24)} color={fr} />;
            case 'sun':
                return <Feather name="sun" size={scaleFont(24)} color={fr} />;
            case 'music':
                return <Feather name="music" size={scaleFont(24)} color={fr} />;
            case 'home':
                return <Feather name="home" size={scaleFont(24)} color={fr} />;
            case 'mail':
                return <Feather name="mail" size={scaleFont(24)} color={fr} />;
            case 'phone':
                return <Feather name="phone" size={scaleFont(24)} color={fr} />;
            case 'camera':
                return <Feather name="camera" size={scaleFont(24)} color={fr} />;
            case 'settings':
                return <Feather name="settings" size={scaleFont(24)} color={fr} />;
            case 'user':
                return <Feather name="user" size={scaleFont(24)} color={fr} />;
            default:
                return <MaterialIcons name="help-outline" size={scaleFont(24)} color={fr} />; // Fallback icon
        }
    };

    return (
        <View style={styles.container}>
            {amenities.map((amenity, index) => (
                <View key={index} style={styles.amenityCard}>
                    <View style={[styles.iconContainer, { backgroundColor: bg }]}>
                        {getIcon(amenity.icon)}
                    </View>
                    <Text style={styles.amenityName}>{amenity.name}</Text>
                </View>
            ))}
        </View>
    );
};

export const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    amenityCard: {
        width: width > 600 ? scaleFont(100) : '48%', // Fixed width on larger screens, percentage on smaller
        backgroundColor: '#ffffff',
        borderRadius: scaleFont(8),
        padding: scaleFont(12), // Reduced from 16
        marginBottom: scaleFont(12), // Reduced from 16
        alignItems: 'center',
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
    },
    iconContainer: {
        width: scaleFont(48),
        height: scaleFont(48),
        borderRadius: scaleFont(24),
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: scaleFont(8), // Reduced from 12
    },
    amenityName: {
        fontSize: scaleFont(12), // Reduced from 14
        fontWeight: '500',
        textAlign: 'center',
    },
    noAmenitiesText: {
        fontSize: scaleFont(12),
        color: '#64748b',
        textAlign: 'center',
        padding: scaleFont(12),
    },
});

export default BuildingAmenities;