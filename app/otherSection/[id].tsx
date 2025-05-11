import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import Swiper from 'react-native-swiper';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { getSectionData } from '@/func/project';
import { SafeAreaView } from 'react-native-safe-area-context';

export interface OtherSectionProps {
    _id: string
    name: string;
    description?: string;
    projectId: string;
    area: number;
    images: string[];
}

const { width, height } = Dimensions.get("window");
const scaleFont = (size: any) => (width / 375) * size; // 375 is a standard base width

const OtherSection = () => {
    const { id } = useLocalSearchParams();

    const router = useRouter();

    const [sectionDetails, setSectionDetails] = useState<OtherSectionProps | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchOtherSectionData = async () => {
            try {
                const res = await getSectionData(String(id));
                if (res) {
                    setSectionDetails(res);
                } else {
                    console.warn('No section data received');
                }
            } catch (error) {
                console.error('Failed to fetch section data:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchOtherSectionData();
    }, [id]);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <Text style={styles.loadingText}>Loading...</Text>
            </View>
        )
    }

    if (!sectionDetails) {
        return (
            <View style={styles.container}>
                <View style={styles.headerContainer}>
                    <Text style={styles.title}>Section Not Found</Text>
                </View>
            </View>
        );
    }


    if (!sectionDetails) {
        return (
            <View style={styles.notFoundContainer}>
                <View style={styles.notFoundCard}>
                    <Text style={styles.notFoundTitle}>Row House Not Found</Text>
                    <Text style={styles.notFoundMessage}>The row house you're looking for doesn't exist or has been removed.</Text>
                    <TouchableOpacity
                        style={styles.returnButton}
                        onPress={() => router.back()}

                    >
                        <Text style={styles.returnButtonText}>Return to Project</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }


    return (

        <SafeAreaView style={{ flex: 1 }} >
            <ScrollView style={{ flex: 1, backgroundColor: '#E8F5E9' }} >

                <View style={styles.backButtonContainer}>
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => router.back()}
                    >
                        <Ionicons name="arrow-back" size={24} color="#43A047" />
                        <Text style={styles.backButtonText}>Back to project</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.container}>
                    <View style={styles.headerContainer}>
                        <Text style={styles.title}>{sectionDetails.name}</Text>
                    </View>

                    <View style={styles.imageContainer}>
                        <Swiper
                            style={styles.swiperContainer}
                            autoplay={true}
                            autoplayTimeout={5}
                            dot={<View style={styles.dot} />}
                            activeDot={<View style={styles.activeDot} />}
                            paginationStyle={styles.pagination}
                            buttonWrapperStyle={{
                                ...styles.buttonWrapper,
                                backgroundColor: "transparent",
                                paddingHorizontal: 20,
                            }}
                        >
                            {sectionDetails.images.map((image: string, index: number) => (
                                <View style={styles.slide} key={index}>
                                    <Image
                                        source={{ uri: image }}
                                        style={styles.image}
                                        resizeMode="cover"
                                    />
                                </View>
                            ))}
                        </Swiper>
                    </View>

                    <View style={styles.descriptionContainer}>
                        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                            <Text style={styles.sectionTitle}>About Row Houses</Text>
                            <TouchableOpacity
                                style={styles.backButton}
                                onPress={() => {
                                    const obj = {
                                        sectionId: sectionDetails._id,
                                        name: sectionDetails.name,
                                        updateSectionType: 'other',
                                        backgroundColor: "#E8F5E9",
                                        textColor: "#43A047",
                                    };
                                    const data = JSON.stringify(obj);
                                    router.push({ pathname: '/updates/[data]', params: { data } });
                                }}
                            >
                                <Ionicons name="eye-sharp" size={20} color="#43A047" />
                                <Text style={styles.backButtonText}>Updates</Text>
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.description}>{sectionDetails.description}</Text>
                    </View>

                    <View style={styles.statsContainer}>
                        <View style={styles.statCard}>
                            <View style={{ flex: 1, flexDirection: "row", gap: 5 }}>
                                <View style={styles.statIconContainer}>
                                    <MaterialCommunityIcons name="ruler" size={20} color="#43A047" />
                                </View>
                                <Text style={styles.statLabel}>Area Details</Text>
                            </View>
                            <Text style={styles.statValue}>{sectionDetails.area} sqft</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

export default OtherSection

const styles = StyleSheet.create({
    backButtonContainer: {
        paddingHorizontal: scaleFont(16),
        paddingTop: scaleFont(16),
        paddingBottom: scaleFont(8),
    },
    backButton: {
        flexDirection: "row",
        alignItems: "center",
    },
    backButtonText: {
        marginLeft: scaleFont(8),
        fontSize: scaleFont(14), // Reduced from 16
        color: "#43A047",
    },
    container: {
        marginHorizontal: scaleFont(5),
        backgroundColor: "white",
        borderRadius: scaleFont(12),
        padding: scaleFont(14), // Reduced from 16
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        marginBottom: scaleFont(14), // Reduced from 16
    },
    headerContainer: {
        marginBottom: scaleFont(14), // Reduced from 16
    },
    title: {
        fontSize: scaleFont(22), // Reduced from 24
        fontWeight: "bold",
        color: "#43A047",
    },
    imageContainer: {
        height: height * 0.3, // 30% of screen height (replaces fixed 250)
        width: "100%",
    },
    swiperContainer: {
        height: height * 0.3, // Match imageContainer height
    },
    slide: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    image: {
        borderRadius: scaleFont(15),
        width: "100%",
        height: "100%",
    },
    dot: {
        backgroundColor: "rgba(0,0,0,.2)",
        width: scaleFont(8),
        height: scaleFont(8),
        borderRadius: scaleFont(4),
        marginLeft: scaleFont(3),
        marginRight: scaleFont(3),
        marginTop: scaleFont(3),
        marginBottom: scaleFont(3),
    },
    activeDot: {
        backgroundColor: "#43A047",
        width: scaleFont(8),
        height: scaleFont(8),
        borderRadius: scaleFont(4),
        marginLeft: scaleFont(3),
        marginRight: scaleFont(3),
        marginTop: scaleFont(3),
        marginBottom: scaleFont(3),
    },
    pagination: {
        bottom: scaleFont(10),
    },
    buttonWrapper: {
        backgroundColor: "transparent",
        flexDirection: "row",
        position: "absolute",
        top: 0,
        left: 0,
        flex: 1,
        paddingHorizontal: scaleFont(10),
        paddingVertical: scaleFont(10),
        justifyContent: "space-between",
        alignItems: "center",
    },
    descriptionContainer: {
        marginVertical: scaleFont(16), // Reduced from 18
    },
    sectionTitle: {
        fontSize: scaleFont(16), // Reduced from 18
        fontWeight: "600",
        color: "#43A047",
        marginBottom: scaleFont(6), // Reduced from 8
    },
    description: {
        color: "#4B5563",
        fontSize: scaleFont(14), // Added fontSize for consistency
        lineHeight: scaleFont(22), // Reduced from 24
    },
    statsContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        flexWrap: "wrap",
        marginBottom: scaleFont(14), // Reduced from 16
        gap: scaleFont(5),
    },
    statCard: {
        width: width > 600 ? scaleFont(120) : "48%", // Fixed width on larger screens, percentage on smaller
        backgroundColor: "#E8F5E9",
        borderRadius: scaleFont(8),
        padding: scaleFont(10), // Reduced from 12
    },
    statIconContainer: {
        marginBottom: scaleFont(6), // Reduced from 8
    },
    statLabel: {
        fontSize: scaleFont(10), // Reduced from 15
        fontWeight: "600",
        color: "#43A047",
        marginBottom: scaleFont(6), // Reduced from 8
    },
    statValue: {
        fontSize: scaleFont(20), // Reduced from 28
        fontWeight: "bold",
        color: "#43A047",
    },
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#E8F5E9",
    },
    loadingText: {
        fontSize: scaleFont(16), // Reduced from 18
        color: "#6B7280",
    },
    notFoundContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: scaleFont(16),
        backgroundColor: "#E8F5E9",
    },
    notFoundCard: {
        backgroundColor: "white",
        borderRadius: scaleFont(12),
        padding: scaleFont(20), // Reduced from 24
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        width: width > 600 ? scaleFont(300) : "90%", // Fixed width on larger screens, percentage on smaller
    },
    notFoundTitle: {
        fontSize: scaleFont(18), // Reduced from 20
        fontWeight: "bold",
        color: "#92400E",
        marginBottom: scaleFont(10), // Reduced from 12
    },
    notFoundMessage: {
        textAlign: "center",
        color: "#6B7280",
        fontSize: scaleFont(14), // Added fontSize for consistency
        marginBottom: scaleFont(20), // Reduced from 24
    },
    returnButton: {
        backgroundColor: "#D97706",
        paddingVertical: scaleFont(10), // Reduced from 12
        paddingHorizontal: scaleFont(14), // Reduced from 16
        borderRadius: scaleFont(8),
    },
    returnButtonText: {
        color: "white",
        fontWeight: "600",
        fontSize: scaleFont(14), // Added fontSize for consistency
    },
});