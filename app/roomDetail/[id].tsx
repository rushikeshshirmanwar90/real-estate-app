import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import Swiper from '@/components/Swiper';

// Get screen dimensions for responsive scaling
const { width } = Dimensions.get('window');
const scaleFont = (size) => (width / 375) * size;

export default function RoomDetailScreen() {
    const router = useRouter();
    const {
        id,
        viewColor,
        iconsColor,
        name,
        area,
        description,
        images: imagesString,
        features: featuresString
    } = useLocalSearchParams();
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Parse the stringified arrays from params
    const images = imagesString ? JSON.parse(String(imagesString)) : ['https://via.placeholder.com/300x200'];
    const features = featuresString ? JSON.parse(String(featuresString)) : [];

    console.log("images : ", images);
    console.log("features : ", features);

    const getIconForFeature = (feature: { icon?: string; name: string }) => {
        // If an icon is provided (from RoomFeatureSelector), map it to MaterialIcons
        if (feature.icon) {
            switch (feature.icon.toLowerCase()) {
                case 'bed': return 'bed';
                case 'bath': return 'bathtub';
                case 'shower': return 'shower';
                case 'tv': return 'tv';
                case 'wifi': return 'wifi';
                case 'airConditioner': return 'ac-unit';
                case 'fridge': return 'kitchen';
                case 'microwave': return 'microwave';
                case 'washer': return 'local-laundry-service';
                case 'wardrobe': return 'checkroom';
                case 'window': return 'window';
                case 'desk': return 'desk';
                case 'sofa': return 'weekend';
                case 'diningTable': return 'table-restaurant';
                case 'parking': return 'local-parking';
                case 'gym': return 'fitness-center';
                case 'pool': return 'pool';
                case 'security': return 'security';
                case 'elevator': return 'elevator';
                case 'balcony': return 'balcony';
                default: return 'check-circle-outline'; // Default for unmatched icons
            }
        }

        // Fallback to deriving icon from name if no icon is provided
        const lowerFeature = feature.name.toLowerCase();
        if (lowerFeature.includes('flooring') || lowerFeature.includes('marble') || lowerFeature.includes('floor')) {
            return 'grid-on';
        } else if (lowerFeature.includes('window') || lowerFeature.includes('french')) {
            return 'window';
        } else if (lowerFeature.includes('light') || lowerFeature.includes('led')) {
            return 'lightbulb-outline';
        } else if (lowerFeature.includes('air') || lowerFeature.includes('conditioning')) {
            return 'ac-unit';
        } else if (lowerFeature.includes('sink') || lowerFeature.includes('shower') || lowerFeature.includes('tub')) {
            return 'shower';
        } else if (lowerFeature.includes('wardrobe') || lowerFeature.includes('closet')) {
            return 'checkroom';
        } else if (lowerFeature.includes('kitchen') || lowerFeature.includes('oven') || lowerFeature.includes('microwave')) {
            return 'microwave';
        } else if (lowerFeature.includes('counter') || lowerFeature.includes('table')) {
            return 'table-restaurant';
        } else if (lowerFeature.includes('mirror')) {
            return 'mirror';
        } else {
            return 'check-circle-outline'; // Default icon
        }
    };

    // Default colors if not provided
    const headerColor = viewColor ? String(viewColor) : '#fff';
    const iconColor = iconsColor ? String(iconsColor) : '#4d89ff';

    const roomImg: string[] = images.length > 0 ? images : [
        require('@/assets/images/rooms/img1.jpeg'),
        require('@/assets/images/rooms/img2.jpeg'),
        require('@/assets/images/rooms/img3.jpeg')
    ];

    return (
        <SafeAreaView style={styles.container} edges={['bottom']}>
            <StatusBar style="light" />
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Header */}
                <View style={[styles.header, { backgroundColor: headerColor }]}>
                    <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                        <Ionicons name="chevron-back" size={28} color={iconColor} />
                    </TouchableOpacity>
                    <Text style={[styles.headerTitle, { color: iconColor }]}>{name}</Text>
                    <View style={{ marginHorizontal: 10, padding: 10, backgroundColor: `${iconColor}`, borderRadius: 30 }}>
                        <Text style={[styles.headerArea, { color: `${viewColor}`, fontWeight: "bold" }]}>{area || 'N/A'}</Text>
                    </View>
                </View>

                {/* Image Section */}
                <View style={styles.imageContainer}>
                    <Swiper images={roomImg} color={iconColor} />
                </View>

                {/* About Section */}
                <View style={styles.aboutContainer}>
                    <Text style={[styles.sectionTitle, { color: iconColor }]}>About this {name}</Text>
                    <Text style={styles.aboutText}>
                        {description || `Modern ${String(name).toLowerCase()} with ample storage and natural lighting`}
                    </Text>
                </View>

                {/* Features Section */}
                <View style={styles.featuresContainer}>
                    <Text style={[styles.sectionTitle, { color: iconColor }]}>Features</Text>
                    <View style={styles.featuresGrid}>
                        {features.length > 0 ? (
                            features.map((feature: { icon?: string; name: string }, index: number) => (
                                <View key={index} style={[styles.featureItem, { backgroundColor: `${viewColor}` }]}>
                                    <MaterialIcons
                                        name={getIconForFeature(feature)}
                                        size={scaleFont(20)}
                                        color={iconColor}
                                    />
                                    <Text style={[styles.featureText, { color: iconColor }]}>{feature.name}</Text>
                                </View>
                            ))
                        ) : (
                            <Text style={styles.noFeaturesText}>No features available</Text>
                        )}
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f7f9fc',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: 35,
        paddingVertical: 16,
        paddingHorizontal: 16,
    },
    backButton: {
        padding: 8,
    },
    headerTitle: {
        fontSize: scaleFont(20),
        fontWeight: 'bold',
        flex: 1,
        textAlign: 'center',
    },
    headerArea: {
        fontSize: scaleFont(14),
        textAlign: 'center',
    },
    imageContainer: {
        width: '100%',
        alignItems: 'center',
        paddingVertical: 12,
        backgroundColor: '#fff',
    },
    aboutContainer: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        marginHorizontal: 16,
        marginVertical: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
    },
    sectionTitle: {
        fontSize: scaleFont(18),
        fontWeight: 'bold',
        marginBottom: 8,
    },
    aboutText: {
        fontSize: scaleFont(14),
        color: '#666',
        lineHeight: scaleFont(20),
        textAlign: 'justify',
    },
    featuresContainer: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        marginHorizontal: 16,
        marginVertical: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
    },
    featuresGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    featureItem: {
        flexDirection: 'row',
        alignItems: 'center',
        width: width > 600 ? '30%' : '48%',
        padding: 10,
        borderRadius: 8,
        marginBottom: 8,
        minHeight: scaleFont(40),
    },
    featureText: {
        fontSize: scaleFont(14),
        marginLeft: 8,
        flexShrink: 1,
    },
    noFeaturesText: {
        fontSize: scaleFont(14),
        color: '#666',
        textAlign: 'center',
        width: '100%',
    },
});