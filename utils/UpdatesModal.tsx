import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    TextInput,
    Modal,
    Platform,
} from 'react-native';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';

interface WorkItem {
    id: string;
    image: string;
    title: string;
    description: string;
    date: string;
}

const UpdatesModal = () => {
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

    const handleTakePicture = () => {
        // Add capture logic here
        console.log('Take picture pressed');
    };

    const handleToggleCameraType = () => {
        setCameraType((prev) => (prev === 'back' ? 'front' : 'back'));
    };

    const handleSaveWorkItem = () => {
        // Add save logic here
        console.log('Save pressed');
    };

    return (
        <>
            {/* Camera Modal */}
            <Modal visible={cameraVisible} animationType="slide" onRequestClose={() => setCameraVisible(false)}>
                <View style={styles.cameraContainer}>
                    <CameraView
                        style={styles.camera}
                        facing={cameraType}
                        ref={(ref) => setCamera(ref)}
                    >
                        <View style={styles.cameraControls}>
                            <TouchableOpacity style={styles.cameraControlButton} onPress={() => setCameraVisible(false)}>
                                <Ionicons name="close" size={28} color="white" />
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.captureButton} onPress={handleTakePicture}>
                                <View style={styles.captureButtonInner} />
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.cameraControlButton} onPress={handleToggleCameraType}>
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
                transparent
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
        </>
    );
};

const styles = StyleSheet.create({
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
});

export default UpdatesModal;
