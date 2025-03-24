import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import { Building as BuildingProps } from '@/types/building';
import { getSingleBuilding } from '@/func/project';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import { ChevronLeft } from 'lucide-react-native';
import { BuildingDetails } from '@/components/building/BuildingDetails';
import FlatInfo from '@/components/building/FlatInfo';
import { BuildingAmenities } from '@/components/building/BuildingAminities';
import { useRouter } from 'expo-router';



const TMP = () => {

    const router = useRouter();

    const { id } = useLocalSearchParams();
    const [building, setBuilding] = useState<BuildingProps>();


    useEffect(() => {
        const fetchBuildingData = async () => {
            const res = await getSingleBuilding(String(id));
            // console.log(res);
            setBuilding(res)
        }

        fetchBuildingData();

    }, [])

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <TouchableOpacity
                    style={styles.backLink}
                    onPress={() => router.back()}
                >
                    <ChevronLeft size={20} color="#0d9488" />
                    <Text style={styles.backLinkText}>Back to Project</Text>
                </TouchableOpacity>

                {/* <BuildingDetails building={building} /> */}

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
                    <FlatInfo flatInfo={building?.flatInfo} />
                    {/* <FlatInfo /> */}
                </View>

                <View style={[styles.sectionContainer, styles.lastSection]}>
                    <Text style={styles.sectionTitle}>Building Amenities</Text>
                    <BuildingAmenities amenities={building?.amenities} />
                </View>
            </ScrollView>
        </SafeAreaView >
    );
}

export default TMP


export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e6f7f7', // light teal gradient equivalent
        padding: 16,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#e6f7f7',
    },
    loadingText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#0d9488',
    },
    notFoundContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#e6f7f7',
        padding: 16,
    },
    notFoundCard: {
        backgroundColor: '#ffffff',
        borderRadius: 12,
        padding: 24,
        alignItems: 'center',
        width: '100%',
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    notFoundTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#115e59', // dark teal
        marginBottom: 16,
    },
    notFoundMessage: {
        fontSize: 16,
        color: '#64748b', // gray
        textAlign: 'center',
        marginBottom: 24,
    },
    backButton: {
        backgroundColor: '#0d9488', // teal
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 6,
    },
    backButtonText: {
        color: '#ffffff',
        fontWeight: '600',
        fontSize: 16,
    },
    backLink: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    backLinkText: {
        marginLeft: 8,
        fontSize: 16,
        color: '#0d9488', // teal
        fontWeight: '500',
    },
    sectionContainer: {
        marginTop: 32,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#115e59', // dark teal
        marginBottom: 16,
    },
    sectionGrid: {
        flexDirection: 'column',
    },
    sectionCard: {
        backgroundColor: '#ffffff',
        borderRadius: 12,
        overflow: 'hidden',
        marginBottom: 16,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    sectionImage: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
    },
    sectionContent: {
        padding: 16,
    },
    sectionName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#115e59', // dark teal
        marginBottom: 8,
    },
    sectionDescription: {
        fontSize: 14,
        color: '#64748b', // gray
    },
    lastSection: {
        marginBottom: 32,
    }
});