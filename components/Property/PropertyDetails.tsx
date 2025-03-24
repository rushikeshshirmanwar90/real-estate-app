// components/PropertyDetails.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Property } from '@/types/types';
import { Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';

interface PropertyDetailsProps {
    property: Property;
}

export default function PropertyDetails({ property }: PropertyDetailsProps) {
    return (
        <View style={styles.detailsSection}>
            <Text style={styles.propertyName}>{property.name}</Text>

            <View style={styles.locationContainer}>
                <Ionicons name="location-sharp" size={18} color="#4d89ff" />
                <Text style={styles.locationText}>{property.location}</Text>
            </View>

            <Text style={styles.description}>{property.description}</Text>

            <View style={styles.specs}>
                <View style={styles.specItem}>
                    <MaterialIcons name="square-foot" size={22} color="#4d89ff" />
                    <Text style={styles.specValue}>{property.area}</Text>
                    <Text style={styles.specLabel}>Area</Text>
                </View>

                <View style={styles.specDivider} />

                <View style={styles.specItem}>
                    <FontAwesome5 name="home" size={20} color="#4d89ff" />
                    <Text style={styles.specValue}>{property.bhk}</Text>
                    <Text style={styles.specLabel}>Type</Text>
                </View>

                <View style={styles.specDivider} />

                <View style={styles.specItem}>
                    <MaterialIcons name="attach-money" size={22} color="#4d89ff" />
                    <Text style={styles.specValue}>{property.price}</Text>
                    <Text style={styles.specLabel}>Price</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    detailsSection: {
        backgroundColor: 'white',
        padding: 20,
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
    },
    propertyName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 8,
    },
    locationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    locationText: {
        fontSize: 14,
        color: '#555',
        marginLeft: 4,
    },
    description: {
        fontSize: 15,
        color: '#555',
        lineHeight: 22,
        marginBottom: 20,
    },
    specs: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#f8f9fb',
        borderRadius: 12,
        padding: 16,
    },
    specItem: {
        alignItems: 'center',
        flex: 1,
    },
    specValue: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#333',
        marginTop: 8,
        marginBottom: 2,
    },
    specLabel: {
        fontSize: 12,
        color: '#888',
    },
    specDivider: {
        width: 1,
        height: '80%',
        backgroundColor: '#ddd',
        alignSelf: 'center',
    },
});