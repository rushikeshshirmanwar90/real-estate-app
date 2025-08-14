// screens/BuildingSectionScreen.tsx
import React, { useState, useEffect } from 'react';
import {
    View,
    StyleSheet,
    ScrollView,
    ActivityIndicator,
    Alert,
    Text,
    TouchableOpacity,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import UpdateCard from '@/components/updates/building/updateCard';
import SectionCard from '@/components/updates/building/SectionCard';
import FlatCard from '@/components/updates/building/FlatCard';
import {
    BuildingSection,
    BuildingUpdate,
    FlatUnit,
    BuildingSectionScreenProps,
    WorkItem
} from '@/types/updates/BuildingSection';
import {
    getMockBuildingData
} from '@/services/BuildingSectionServices';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import EnhancedCameraModal from '@/components/updates/EnhancedCameraModal';

const BuildingSectionScreen: React.FC<BuildingSectionScreenProps> = ({
    projectId,
    sectionId,
    sectionName,
    onGoBack
}) => {

    const router = useRouter();

    const [buildingData, setBuildingData] = useState<BuildingSection | null>(null);
    const [updates, setUpdates] = useState<BuildingUpdate[]>([]);
    const [flatUnits, setFlatUnits] = useState<FlatUnit[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [cameraModalVisible, setCameraModalVisible] = useState<boolean>(false);
    const [currentUpdateType, setCurrentUpdateType] = useState<string>('basic');
    const [workItems, setWorkItems] = useState<WorkItem[]>([]);

    useEffect(() => {
        fetchBuildingData();
    }, [projectId, sectionId]);

    const fetchBuildingData = async () => {
        try {
            setLoading(true);

            // For now, using mock data. Replace with actual API calls when ready
            const mockData = getMockBuildingData(sectionName);

            setTimeout(() => {
                setBuildingData({
                    _id: sectionId,
                    sectionId: sectionId,
                    name: sectionName,
                    type: 'building',
                    category: 'building'
                });
                setLoading(false);
            }, 1000);

        } catch (error) {
            Alert.alert('Error', 'Failed to fetch building data. Please try again.');
            console.error('Error fetching building data:', error);
            setLoading(false);
        }
    };

    const handleGoBack = () => {
        router.back();
    };

    const handleBasicUpdatesPress = () => {
        console.log('Add basic updates for building:', sectionName);
        setCurrentUpdateType('basic');
        setCameraModalVisible(true);
    };

    const handleSectionPress = (sectionType: string) => {
        console.log(`Add ${sectionType} updates pressed`);
        setCurrentUpdateType(sectionType.toLowerCase());
        setCameraModalVisible(true);
    };

    const handleFlatPress = (flatType: string) => {
        console.log(`Add updates for ${flatType} pressed`);
        setCurrentUpdateType('flat');
        setCameraModalVisible(true);
    };

    const handleSaveWorkItem = async (workItem: Omit<WorkItem, 'id' | 'date'>) => {
        try {
            const newWorkItem: WorkItem = {
                ...workItem,
                id: Date.now().toString(),
                date: new Date().toISOString(),
            };

            // Add to local state
            setWorkItems(prev => [newWorkItem, ...prev]);

            // Here you would typically save to your backend
            // await addBuildingUpdate(projectId, sectionId, newWorkItem);

            Alert.alert('Success', 'Work item added successfully!');
            console.log('Work item saved:', newWorkItem);

        } catch (error) {
            console.error('Error saving work item:', error);
            Alert.alert('Error', 'Failed to save work item. Please try again.');
        }
    };

    const handleSeeAllPress = (type: string) => {
        console.log(`See all ${type} updates pressed`);
    };

    if (loading) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity style={styles.goBackButton} onPress={handleGoBack}>
                        <Feather name="arrow-left" size={24} color="#1F2937" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Loading...</Text>
                </View>
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#4A90E2" />
                    <Text style={styles.loadingText}>Loading building data...</Text>
                </View>
            </SafeAreaView>
        );
    }

    if (!buildingData) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity style={styles.goBackButton} onPress={handleGoBack}>
                        <Feather name="arrow-left" size={24} color="#1F2937" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Building Updates</Text>
                </View>
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>No building data found</Text>
                </View>
            </SafeAreaView>
        );
    }

    const mockData = getMockBuildingData(sectionName);

    return (
        <SafeAreaView style={styles.container}>
            {/* Header with Go Back Button */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.goBackButton} onPress={handleGoBack}>
                    <Feather name="arrow-left" size={24} color="#1F2937" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Building Updates</Text>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>
                {/* Add Building Basic Updates */}
                <UpdateCard
                    title={mockData.basicUpdate.title}
                    subtitle={mockData.basicUpdate.subtitle}
                    showSeeAll={true}
                    onPress={handleBasicUpdatesPress}
                    onSeeAllPress={() => handleSeeAllPress('basic')}
                />

                {/* Add Building Section Updates */}
                <View style={styles.sectionUpdatesContainer}>
                    <Text style={styles.sectionTitle}>Add Building Section Updates</Text>

                    <View style={{ backgroundColor: "#fff", padding: 20, borderRadius: 20 }} >

                        {mockData.sections.map((section) => (
                            <SectionCard
                                key={section.id}
                                title={section.name}
                                subtitle={section.subtitle}
                                onPress={() => handleSectionPress(section.name)}
                                onSeeAllPress={() => handleSeeAllPress(section.id)}
                            />
                        ))}


                    </View>

                </View>

                {/* Add Flat Updates */}
                <View style={styles.flatUpdatesContainer}>
                    <Text style={styles.sectionTitle}>Add Flat Updates</Text>


                    <View style={{ backgroundColor: "#fff", padding: 20, borderRadius: 20 }} >


                        {mockData.flats.map((flat) => (
                            <FlatCard
                                key={flat.id}
                                title={flat.name}
                                status={flat.status}
                                onPress={() => handleFlatPress(flat.name)}
                            />
                        ))}
                    </View>

                </View>
            </ScrollView>

            {/* Camera Modal */}
            <EnhancedCameraModal
                visible={cameraModalVisible}
                onClose={() => setCameraModalVisible(false)}
                onSave={handleSaveWorkItem}
                updateType={currentUpdateType}
                sectionName={sectionName}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F7FA',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        borderBottomColor: '#E5E7EB',
    },
    goBackButton: {
        padding: 8,
        marginRight: 12,
        borderRadius: 8,
        backgroundColor: '#F9FAFB',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1F2937',
        flex: 1,
    },
    scrollContent: {
        padding: 16,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 16,
    },
    loadingText: {
        marginTop: 16,
        fontSize: 16,
        color: '#666',
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 16,
    },
    emptyText: {
        fontSize: 18,
        color: '#666',
    },
    buildingTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#1F2937',
        marginBottom: 24,
    },
    sectionUpdatesContainer: {
        marginBottom: 32,
    },
    flatUpdatesContainer: {
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#4A90E2',
        marginBottom: 16,
    },
});

export default BuildingSectionScreen;