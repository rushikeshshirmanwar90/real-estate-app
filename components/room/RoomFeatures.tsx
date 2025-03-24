// components/RoomFeatures.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface RoomFeaturesProps {
    features: string[];
}

export default function RoomFeatures({ features }: RoomFeaturesProps) {
    const getIconForFeature = (feature: string) => {
        const lowerFeature = feature.toLowerCase();
        if (lowerFeature.includes('flooring') || lowerFeature.includes('marble') || lowerFeature.includes('floor')) {
            return 'grid-on';
        } else if (lowerFeature.includes('window') || lowerFeature.includes('french')) {
            return 'window';
        } else if (lowerFeature.includes('light') || lowerFeature.includes('led')) {
            return 'lightbulb-outline';
        } else if (lowerFeature.includes('air') || lowerFeature.includes('conditioning')) {
            return 'ac-unit';
        } else if (lowerFeature.includes('sink') || lowerFeature.includes('shower') || lowerFeature.includes('tub')) {
            return 'water-damage';
        } else if (lowerFeature.includes('wardrobe') || lowerFeature.includes('closet')) {
            return 'checkroom';
        } else if (lowerFeature.includes('kitchen') || lowerFeature.includes('oven') || lowerFeature.includes('microwave')) {
            return 'microwave';
        } else if (lowerFeature.includes('counter') || lowerFeature.includes('table')) {
            return 'table-bar';
        } else if (lowerFeature.includes('mirror')) {
            return 'flip';
        } else {
            return 'check-circle-outline';
        }
    };

    return (
        <View style={styles.featuresContainer}>
            <Text style={styles.sectionTitle}>Features</Text>
            {features.map((feature, index) => (
                <View key={index} style={styles.featureItem}>
                    <MaterialIcons
                        name={getIconForFeature(feature) as any}
                        size={22}
                        color="#4d89ff"
                    />
                    <Text style={styles.featureText}>{feature}</Text>
                </View>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    featuresContainer: {
        backgroundColor: 'white',
        borderRadius: 16,
        padding: 16,
        marginTop: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 16,
    },
    featureItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
        paddingBottom: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    featureText: {
        fontSize: 15,
        color: '#444',
        marginLeft: 12,
    },
});