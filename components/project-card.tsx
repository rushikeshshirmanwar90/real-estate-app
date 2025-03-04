import { StyleSheet, Text, View, Image, useWindowDimensions } from 'react-native';
import React from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const ProjectCard = () => {
    const { width } = useWindowDimensions();
    const router = useRouter();

    return (
        <View style={[styles.card, { width: width * 0.9 }]}>
            {/* Background Image */}
            <Image
                source={require('../assets/images/images/img (1).jpg')}
                style={styles.image}
            />
            {/* Details Container */}
            <View style={styles.detailsContainer}>
                {/* Title */}
                <View style={{ display: "flex", flexDirection: "row", gap: 45 }} >
                    <Text style={styles.title}>Midnight Ridge Villa</Text>
                    <Text style={styles.price}>$ 452.00/month</Text>
                </View>
                {/* Location */}
                <Text style={styles.location}>
                    <FontAwesome name="map-marker" size={14} color="#888" /> 460 Thamrin Jakarta, Indonesia
                </Text>
            </View>
            {/* Bookmark Icon */}
            <View style={styles.bookmarkContainer}>
                <FontAwesome name="bookmark" size={24} color="#3b82f6" />
            </View>
        </View>
    );
};

export default ProjectCard;

const styles = StyleSheet.create({
    card: {
        borderRadius: 16,
        overflow: 'hidden',
        marginVertical: 10,
        alignSelf: 'center',
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 4,
    },
    image: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
    },
    detailsContainer: {
        padding: 16,
        backgroundColor: '#f9f9f9',
        borderBottomLeftRadius: 16,
        borderBottomRightRadius: 16,
    },
    title: {
        fontSize: 18,
        fontWeight: '700',
        marginBottom: 8,
        color: '#162c63', // App's theme color
    },
    location: {
        fontSize: 14,
        color: '#888',
        marginBottom: 8,
    },
    price: {
        fontSize: 18,
        fontWeight: '600',
        color: '#162c63',
        marginBottom: 12,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    rating: {
        fontSize: 14,
        color: '#888',
        marginLeft: 6,
    },
    bookmarkContainer: {
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: '#fff',
        borderRadius: 24,
        padding: 8,
        elevation: 4,
    },
});