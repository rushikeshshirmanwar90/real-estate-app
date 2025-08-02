import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, TextInput, Modal, Platform, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { toast } from 'sonner-native';
import Lottie from 'lottie-react-native';

// Define WorkItem type within the file
interface WorkItem {
    id: string;
    image: string;
    title: string;
    description: string;
    date: string;
}

export default function TodaysWorkScreen() {
    const [workItems, setWorkItems] = useState<WorkItem[]>([]);
    const [cameraVisible, setCameraVisible] = useState(false);
    const [capturedImage, setCapturedImage] = useState<string | null>(null);
    const [descriptionModalVisible, setDescriptionModalVisible] = useState(false);
    const [currentTitle, setCurrentTitle] = useState('');
    const [currentDescription, setCurrentDescription] = useState('');
    const [cameraPermission, requestCameraPermission] = useCameraPermissions();
    const [cameraType, setCameraType] = useState<CameraType>('back');
    const [camera, setCamera] = useState<CameraView | null>(null);

    const handleAddWorkItem = () => {
        if (cameraPermission?.granted) {
            setCameraVisible(true);
        } else {
            requestCameraPermission();
        }
    };

    const handleTakePicture = async () => {
        if (camera) {
            try {
                const photo = await camera.takePictureAsync();
                if (photo) {
                    setCapturedImage(photo.uri);
                } else {
                    toast.error('Failed to take picture');
                }
                setCameraVisible(false);
                setDescriptionModalVisible(true);
            } catch (error) {
                console.error('Error taking picture:', error);
                toast.error('Failed to take picture');
            }
        }
    };

    const handleToggleCameraType = () => {
        setCameraType(current => (current === 'back' ? 'front' : 'back'));
    };

    const handleSaveWorkItem = () => {
        if (capturedImage && currentTitle.trim() && currentDescription.trim()) {
            const newItem: WorkItem = {
                id: Date.now().toString(),
                image: capturedImage,
                title: currentTitle.trim(),
                description: currentDescription.trim(),
                date: new Date().toLocaleDateString(),
            };
            setWorkItems(prev => [newItem, ...prev]);
            setDescriptionModalVisible(false);
            setCapturedImage(null);
            setCurrentTitle('');
            setCurrentDescription('');
            toast.success('Work item added successfully');
        } else {
            toast.error('Please add both a title and description');
        }
    };

    const renderWorkItem = ({ item }: { item: WorkItem }) => (
        <View style={styles.workItemCard}>
            <Image source={{ uri: item.image }} style={styles.workItemImage} />
            <View style={styles.workItemContent}>
                <Text style={styles.workItemTitle}>{item.title}</Text>
                <Text style={styles.workItemDescription}>{item.description}</Text>
                <View style={styles.workItemFooter}>
                    <View style={styles.workItemDate}>
                        <Ionicons name="calendar-outline" size={14} color="#FBAA39" />
                        <Text style={styles.workItemDateText}>{item.date}</Text>
                    </View>
                </View>
            </View>
        </View>
    );

    if (!cameraPermission) {
        return (
            <View style={styles.container}>
                <Text>Checking camera permissions...</Text>
            </View>
        );
    }

    if (!cameraPermission.granted && cameraPermission.status !== 'undetermined') {
        return (
            <View style={styles.container}>
                <Text>Camera permission is required to take photos. Please enable it in settings.</Text>
                <TouchableOpacity onPress={requestCameraPermission}>
                    <Text style={styles.permissionButtonText}>Request Permission</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <SafeAreaView style={styles.container}>
                <StatusBar style="light" />
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.header}>
                        <Text style={styles.headerTitle}>Today's Work</Text>
                    </View>

                    <FlatList
                        data={workItems}
                        renderItem={renderWorkItem}
                        keyExtractor={(item) => item.id}
                        contentContainerStyle={styles.workItemsList}
                        ListEmptyComponent={
                            <View style={styles.emptyState}>
                                <Lottie style={{ width: 300, height: 300 }} source={require("@/assets/onBoarding/not-found.json")} autoPlay loop />
                                <Text style={styles.emptyStateText}>No work items yet</Text>
                                <Text style={styles.emptyStateSubText}>
                                    Add your first work item by taking a photo and adding a title and description
                                </Text>
                            </View>
                        }
                        scrollEnabled={false}
                    />

                    <View style={styles.addButtonContainer}>
                        <TouchableOpacity style={styles.addButton} onPress={handleAddWorkItem}>
                            <View style={styles.addButtonGradient}>
                                <Ionicons name="add" size={24} color="white" />
                                <Text style={styles.addButtonText}>Add Work Item</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </ScrollView>

                {/* Camera Modal */}
                <Modal
                    visible={cameraVisible}
                    animationType="slide"
                    onRequestClose={() => setCameraVisible(false)}
                >
                    <View style={styles.cameraContainer}>
                        <CameraView
                            style={styles.camera}
                            facing={cameraType}
                            ref={(ref) => setCamera(ref)}
                        >
                            <View style={styles.cameraControls}>
                                <TouchableOpacity
                                    style={styles.cameraControlButton}
                                    onPress={() => setCameraVisible(false)}
                                >
                                    <Ionicons name="close" size={28} color="white" />
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={styles.captureButton}
                                    onPress={handleTakePicture}
                                >
                                    <View style={styles.captureButtonInner} />
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={styles.cameraControlButton}
                                    onPress={handleToggleCameraType}
                                >
                                    <Ionicons name="camera-reverse" size={28} color="white" />
                                </TouchableOpacity>
                            </View>
                        </CameraView>
                    </View>
                </Modal>

                {/* Description Modal */}
                <Modal
                    visible={descriptionModalVisible}
                    animationType="slide"
                    transparent={true}
                    onRequestClose={() => setDescriptionModalVisible(false)}
                >
                    <View style={styles.modalOverlay}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalTitle}>Add Work Item Details</Text>
                            {capturedImage && (
                                <Image
                                    source={{ uri: capturedImage }}
                                    style={styles.previewImage}
                                    resizeMode="cover"
                                />
                            )}
                            <TextInput
                                style={styles.descriptionInput}
                                placeholder="Enter title..."
                                value={currentTitle}
                                onChangeText={setCurrentTitle}
                            />
                            <TextInput
                                style={[styles.descriptionInput, { minHeight: 100 }]}
                                placeholder="Describe the work done..."
                                multiline
                                value={currentDescription}
                                onChangeText={setCurrentDescription}
                            />
                            <View style={styles.modalButtons}>
                                <TouchableOpacity
                                    style={[styles.modalButton, styles.cancelButton]}
                                    onPress={() => {
                                        setDescriptionModalVisible(false);
                                        setCapturedImage(null);
                                        setCurrentTitle('');
                                        setCurrentDescription('');
                                    }}
                                >
                                    <Text style={styles.cancelButtonText}>Cancel</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.modalButton, styles.saveButton]}
                                    onPress={handleSaveWorkItem}
                                >
                                    <Text style={styles.saveButtonText}>Save</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
            </SafeAreaView>
        </GestureHandlerRootView>
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
        justifyContent: 'center',
        paddingHorizontal: 16,
        paddingTop: 25,
        paddingBottom: 10,
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FBAA39',
    },
    workItemsList: {
        padding: 16,
    },
    workItemCard: {
        backgroundColor: 'white',
        borderRadius: 12,
        overflow: 'hidden',
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 3,
    },
    workItemImage: {
        width: '100%',
        height: 180,
    },
    workItemContent: {
        padding: 16,
    },
    workItemTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
        marginBottom: 8,
    },
    workItemDescription: {
        fontSize: 15,
        color: '#333',
        marginBottom: 12,
        lineHeight: 22,
    },
    workItemFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 8,
        borderTopWidth: 1,
        borderTopColor: '#f0f0f0',
    },
    workItemDate: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    workItemDateText: {
        fontSize: 12,
        color: '#666',
        marginLeft: 4,
    },
    emptyState: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 32,
    },
    emptyStateText: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#666',
        marginTop: 16,
    },
    emptyStateSubText: {
        fontSize: 14,
        color: '#999',
        textAlign: 'center',
        marginTop: 8,
        maxWidth: '80%',
    },
    addButtonContainer: {
        padding: 16,
    },
    addButton: {
        borderRadius: 12,
        overflow: 'hidden',
        shadowColor: '#4d89ff',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 5,
    },
    addButtonGradient: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 16,
        backgroundColor: '#FBAA39',
    },
    addButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
        marginLeft: 8,
    },
    cameraContainer: {
        flex: 1,
        backgroundColor: 'black',
    },
    camera: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    cameraControls: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        paddingBottom: Platform.OS === 'ios' ? 40 : 20,
        backgroundColor: 'rgba(0,0,0,0.3)',
    },
    cameraControlButton: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    captureButton: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: 'rgba(255,255,255,0.3)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    captureButtonInner: {
        width: 54,
        height: 54,
        borderRadius: 27,
        backgroundColor: 'white',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
        paddingBottom: Platform.OS === 'ios' ? 40 : 20,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 16,
        textAlign: 'center',
    },
    previewImage: {
        width: '100%',
        height: 200,
        borderRadius: 12,
        marginBottom: 16,
    },
    descriptionInput: {
        backgroundColor: '#f5f5f5',
        borderRadius: 8,
        padding: 12,
        marginBottom: 16,
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    modalButton: {
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 16,
        flex: 1,
        marginHorizontal: 6,
        alignItems: 'center',
    },
    cancelButton: {
        backgroundColor: '#f1f2f6',
    },
    saveButton: {
        backgroundColor: '#FBAA39',
    },
    cancelButtonText: {
        color: '#333',
        fontWeight: '600',
    },
    saveButtonText: {
        color: 'white',
        fontWeight: '600',
    },
    permissionButtonText: {
        color: '#FBAA39',
        fontSize: 16,
        fontWeight: '600',
        marginTop: 16,
    },
});