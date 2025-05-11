// RowHouse.tsx
import { Text, View, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams, router } from 'expo-router'
import { RowHouseProps } from '@/types/rowHouse'
import { Ionicons } from '@expo/vector-icons'
import { RowHouseDetails } from '@/components/row-house/rowHouseDetails'
import RowHouseAmenities from '@/components/Amenities'
import { styles } from '@/style/row-house/main'
import { getSingleRowHouse } from '@/func/project'
import { SafeAreaView } from 'react-native-safe-area-context'

const RowHouse = () => {
    const { id } = useLocalSearchParams();
    const [rowHouse, setRowHouse] = useState<RowHouseProps>()
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchRowHouseData();
    }, [])

    const fetchRowHouseData = async () => {
        try {
            console.log(String(id));
            const res = await getSingleRowHouse(String(id));
            setRowHouse(res);
        } catch (error) {
            console.error('Failed to fetch row house data:', error);
        } finally {
            setLoading(false);
        }
    }

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <Text style={styles.loadingText}>Loading...</Text>
            </View>
        )
    }

    if (!rowHouse) {
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
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView style={styles.container}>
                <View style={styles.backButtonContainer}>
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => router.back()}
                    >
                        <Ionicons name="arrow-back" size={24} color="#B45309" />
                        <Text style={styles.backButtonText}>Back to project</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.contentContainer}>
                    <RowHouseDetails rowHouse={rowHouse} />

                    <View style={styles.amenitiesContainer}>
                        <Text style={styles.amenitiesTitle}>Row House Amenities</Text>
                        <RowHouseAmenities amenities={rowHouse?.amenities} bg='#FFF7ED' fr='#D97706' />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default RowHouse;