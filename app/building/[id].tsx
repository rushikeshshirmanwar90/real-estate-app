import { Image, StyleSheet, Text, TouchableOpacity, View, Dimensions } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Building as BuildingProps } from '@/types/building';
import { getSingleBuilding } from '@/func/project';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import { ChevronLeft } from 'lucide-react-native';
import { BuildingDetails } from '@/components/building/BuildingDetails';
import FlatInfo from '@/components/building/FlatInfo';
import BuildingAmenities from '@/components/Amenities';

// Get screen dimensions for responsive scaling
const { width, height } = Dimensions.get('window');
const scaleFont = (size: any) => (width / 375) * size; // 375 is a standard base width (iPhone 6/7/8)

const TMP = () => {
    const router = useRouter();
    const { id } = useLocalSearchParams();
    const [building, setBuilding] = useState<BuildingProps>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBuildingData = async () => {
            try {
                const res = await getSingleBuilding(String(id));
                setBuilding(res);
            } catch (error) {
                console.error('Failed to fetch building data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchBuildingData();
    }, [id]);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <Text style={styles.loadingText}>Loading...</Text>
            </View>
        );
    }

    if (!building) {
        return (
            <View style={styles.notFoundContainer}>
                <View style={styles.notFoundCard}>
                    <Text style={styles.notFoundTitle}>Building Not Found</Text>
                    <Text style={styles.notFoundMessage}>The building you're looking for doesn't exist or has been removed.</Text>
                    <TouchableOpacity
                        style={styles.returnButton}
                        onPress={() => router.back()}
                    >
                        <Text style={styles.returnButtonText}>Return to Project</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <TouchableOpacity
                    style={styles.backLink}
                    onPress={() => router.back()}
                >
                    <ChevronLeft size={scaleFont(20)} color="#1E88E5" />
                    <Text style={styles.backLinkText}>Back to Project</Text>
                </TouchableOpacity>

                <BuildingDetails building={building} />

                <View style={styles.sectionContainer}>
                    <Text style={styles.sectionTitle}>Building Sections</Text>
                    <View style={styles.sectionGrid}>
                        {building?.section?.map((section, index) => (
                            <View key={index} style={styles.sectionCard}>
                                <Image
                                    source={{ uri: section?.images?.[0] || "https://via.placeholder.com/300" }}
                                    style={styles.sectionImage}
                                />
                                <View style={styles.sectionContent}>
                                    <Text style={styles.sectionName}>{section?.name}</Text>
                                    <Text style={styles.sectionDescription}>{section?.description}</Text>
                                </View>
                            </View>
                        ))}
                    </View>
                </View>

                <View style={styles.sectionContainer}>
                    <Text style={styles.sectionTitle}>Available Flats</Text>
                    <Text style={[styles.sectionDescription, { marginBottom: scaleFont(16) }]}>
                        Tap to get the details
                    </Text>
                    <FlatInfo flatInfo={building?.flatInfo} />
                </View>

                <View style={[styles.sectionContainer, styles.lastSection]}>
                    <Text style={styles.sectionTitle}>Building Amenities</Text>
                    <BuildingAmenities amenities={building?.amenities} bg="#EBF5FF" fr="#1E88E5" />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default TMP;

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EBF5FF', // light teal gradient equivalent
        padding: scaleFont(16), // Responsive padding
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#EBF5FF',
    },
    loadingText: {
        fontSize: scaleFont(16), // Responsive font size
        fontWeight: '600',
        color: '#1E88E5',
    },
    notFoundContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#EBF5FF',
        padding: scaleFont(16), // Responsive padding
    },
    notFoundCard: {
        backgroundColor: '#ffffff',
        borderRadius: scaleFont(12),
        padding: scaleFont(24), // Responsive padding
        alignItems: 'center',
        width: '100%',
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    notFoundTitle: {
        fontSize: scaleFont(22), // Responsive font size
        fontWeight: 'bold',
        color: '#1E88E5', // dark teal
        marginBottom: scaleFont(16),
    },
    notFoundMessage: {
        fontSize: scaleFont(16), // Responsive font size
        color: '#64748b', // gray
        textAlign: 'center',
        marginBottom: scaleFont(24),
    },
    backButton: {
        backgroundColor: '#0d9488', // teal
        paddingVertical: scaleFont(12),
        paddingHorizontal: scaleFont(16), // Responsive padding
        borderRadius: scaleFont(6),
    },
    backButtonText: {
        color: '#ffffff',
        fontWeight: '600',
        fontSize: scaleFont(16), // Responsive font size
    },
    backLink: {
        position: "sticky",
        top: 0,
        elevation: 3,
        zIndex: 100,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: scaleFont(16),
    },
    backLinkText: {
        marginLeft: scaleFont(8),
        fontSize: scaleFont(16), // Responsive font size
        color: '#1E88E5', // teal
        fontWeight: '500',
    },
    sectionContainer: {
        marginTop: scaleFont(32),
    },
    sectionTitle: {
        marginBottom: scaleFont(5),
        fontSize: scaleFont(20), // Responsive font size
        fontWeight: 'bold',
        color: '#1E88E5', // dark teal
    },
    sectionGrid: {
        flexDirection: 'column',
    },
    sectionCard: {
        backgroundColor: '#ffffff',
        borderRadius: scaleFont(12),
        overflow: 'hidden',
        marginBottom: scaleFont(16),
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    sectionImage: {
        width: '100%',
        height: height * 0.25, // 25% of screen height for responsiveness (replaces fixed 200)
        resizeMode: 'cover',
    },
    sectionContent: {
        padding: scaleFont(16), // Responsive padding
    },
    sectionName: {
        fontSize: scaleFont(18), // Responsive font size
        fontWeight: 'bold',
        color: '#1E88E5', // dark teal
        marginBottom: scaleFont(8),
    },
    sectionDescription: {
        fontSize: scaleFont(14), // Responsive font size
        color: '#64748b', // gray
    },
    lastSection: {
        marginBottom: scaleFont(32),
    },
    returnButton: {
        backgroundColor: "#EBF5FF",
        paddingVertical: scaleFont(12),
        paddingHorizontal: scaleFont(16), // Responsive padding
        borderRadius: scaleFont(8),
    },
    returnButtonText: {
        color: "#1E88E5", // Updated to match theme (was white, which blends with bg)
        fontWeight: "600",
        fontSize: scaleFont(16), // Responsive font size
    },
});