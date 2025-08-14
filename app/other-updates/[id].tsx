import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    StatusBar,
    TouchableOpacity,
} from 'react-native';
import { WorkItem } from '@/types/updates/RowHouseSection';
import AddUpdateButton from '@/components/updates/row-house/AddButton';
import UpdateCard from '@/components/updates/row-house/updateCard';
import EnhancedCameraModal from '@/components/updates/EnhancedCameraModal';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';


const UpdatesScreen: React.FC = () => {

    const router = useRouter();

    const [modalVisible, setModalVisible] = useState(false);
    const [workItems, setWorkItems] = useState<WorkItem[]>([
        {
            id: '1',
            images: ['https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=400'],
            title: 'Title Of the Update',
            description: 'description of the project',
            date: '2025-04-08',
        },
        {
            id: '2',
            images: ['https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400'],
            title: 'Title Of the Update',
            description: 'description of the project',
            date: '2025-04-08'
        },
    ]);

    const handleOpenModal = () => {
        setModalVisible(true);
    };

    const handleCloseModal = () => {
        setModalVisible(false);
    };

    const handleSaveWorkItem = (workItemData: Omit<WorkItem, 'id' | 'date'>) => {
        const newWorkItem: WorkItem = {
            ...workItemData,
            id: Date.now().toString(),
            date: new Date().toISOString(),
        };

        console.log(newWorkItem)

        setWorkItems(prevItems => [newWorkItem, ...prevItems]);
    };

    const handleCardPress = (workItem: WorkItem) => {
        // Handle card press - you can navigate to detail screen or open modal
        console.log('Card pressed:', workItem.title);
    };

    return (
        <SafeAreaView style={styles.container}>

            {/* Header with Go Back Button */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.goBackButton} onPress={() => {
                    router.back();
                }}>
                    <Feather name="arrow-left" size={24} color="#1F2937" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Other section Updates</Text>
            </View>

            <StatusBar barStyle="dark-content" backgroundColor="#FFF8F0" />
            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                <View style={styles.content}>
                    {/* Header */}
                    <Text style={styles.sectionTitle}>Add Updates</Text>

                    {/* Add Update Button */}
                    <AddUpdateButton backgroundColor='#E8F6E9' foregroundColor='#46A249' onPress={handleOpenModal} />

                    {/* All Recent Updates Section */}
                    <Text style={styles.sectionTitle}>All Recent Updates</Text>

                    {/* Updates List */}
                    <View style={styles.updatesContainer}>
                        {workItems.map((item) => (
                            <UpdateCard
                                key={item.id}
                                workItem={item}
                                color='#46A249'
                                onPress={() => handleCardPress(item)}
                            />
                        ))}
                    </View>
                </View>
            </ScrollView>

            {/* Enhanced Camera Modal */}
            <EnhancedCameraModal
                visible={modalVisible}
                onClose={handleCloseModal}
                onSave={handleSaveWorkItem}
                updateType="general"
                sectionName="Project"
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E8F6E9',
    },
    scrollView: {
        flex: 1,
    },
    content: {
        paddingHorizontal: 16,
        paddingTop: 20,
        paddingBottom: 30,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#46A249',
        marginBottom: 16,
    },
    updatesContainer: {
        gap: 16,
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
});

export default UpdatesScreen;