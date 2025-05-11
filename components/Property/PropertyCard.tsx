import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { Property } from '@/types/types';
import { Ionicons } from '@expo/vector-icons';

interface PropertyCardProps {
    property: Property;
}

const { width } = Dimensions.get('window');

export default function PropertyCard({ property }: PropertyCardProps) {
    const router = useRouter();

    return (
        <View style={styles.card}>
            <View style={styles.imageContainer}>
                <Image
                    source={{ uri: property.images[0] }}
                    style={styles.image}
                />
            </View>

            <View style={styles.cardContent}>
                <Text style={styles.title}>{property.title} - {property.flatName}</Text>
                <View style={styles.locationContainer}>
                    <Ionicons name="location-sharp" size={18} color="#666" style={{ marginTop: 5 }} />
                    <Text style={styles.location}>{property.location}</Text>
                </View>

                <View style={styles.detailsContainer}>
                    <View style={styles.detailBox}>
                        <View style={[styles.iconContainer, { backgroundColor: '#E6EEFF' }]}>
                            <Ionicons name="home-outline" size={20} color="#4D89FF" />
                        </View>
                        <Text style={styles.detailText}>{property.totalArea} sqft</Text>
                    </View>
                    <View style={styles.detailBox}>
                        <View style={[styles.iconContainer, { backgroundColor: '#E6E6FF' }]}>
                            <Ionicons name="bed-outline" size={20} color="#7B68EE" />
                        </View>
                        <Text style={styles.detailText}>{property.bhk} BHK</Text>
                    </View>
                </View>

                <View style={styles.actionContainer}>
                    <TouchableOpacity
                        style={styles.viewDetailsButton}
                        onPress={() => router.push({ pathname: '/room-list/[id]', params: { id: property.id } })}
                    >
                        <Text style={styles.viewDetailsText}>View Details</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: 'white',
        borderRadius: 12,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
    },
    imageContainer: {
        height: 200,
        position: 'relative',
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    priceTag: {
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: '#ff6b00',
        color: 'white',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
        fontWeight: 'bold',
        zIndex: 1,
    },
    cardContent: {
        padding: 16,
    },
    title: {
        fontSize: width * 0.05, // Responsive font size
        fontWeight: 'bold',
        color: '#2E3A59',
    },
    locationContainer: {
        flexDirection: 'row',
        marginBottom: 8,
    },
    location: {
        marginLeft: 4,
        color: '#666',
        fontSize: width * 0.035, // Responsive font size
    },
    description: {
        color: '#666',
        marginBottom: 12,
        fontSize: width * 0.035, // Responsive font size
        lineHeight: 20,
    },
    detailsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    detailBox: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 8,
    },
    iconContainer: {
        padding: 8,
        borderRadius: 8,
        marginRight: 8,
    },
    detailText: {
        color: '#333',
        fontSize: width * 0.035, // Responsive font size
        fontWeight: '500',
        paddingRight: 8,
    },
    actionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    viewDetailsButton: {
        flex: 1,
        backgroundColor: '#4d89ff',
        paddingVertical: 12,
        borderRadius: 8,
        marginRight: 10,
    },
    viewDetailsText: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: width * 0.04, // Responsive font size
    },
    favoriteButton: {
        padding: 10,
    },
});