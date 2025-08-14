// components/EnhancedCameraModal.tsx
import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    TextInput,
    Modal,
    Platform,
    Alert,
    ActivityIndicator,
    ScrollView,
} from 'react-native';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';
import { CameraModalProps, UploadProgress } from '@/types/updates/RowHouseSection';
import { CloudinaryService } from '@/services/CloudinaryService';

interface CapturedImage {
    uri: string;
    id: string;
    uploading: boolean;
    uploaded: boolean;
    cloudinaryUrl?: string;
}

const EnhancedCameraModal: React.FC<CameraModalProps> = ({
    visible,
    onClose,
    onSave,
    updateType = 'general',
    sectionName = 'Building'
}) => {
    const [cameraVisible, setCameraVisible] = useState(false);
    const [capturedImages, setCapturedImages] = useState<CapturedImage[]>([]);
    const [descriptionModalVisible, setDescriptionModalVisible] = useState(false);
    const [currentTitle, setCurrentTitle] = useState('');
    const [currentDescription, setCurrentDescription] = useState('');
    const [cameraPermission, requestCameraPermission] = useCameraPermissions();
    const [cameraType, setCameraType] = useState<CameraType>('back');
    const [camera, setCamera] = useState<CameraView | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState<UploadProgress>({});

    // Set up Cloudinary progress callback
    useEffect(() => {
        CloudinaryService.setProgressCallback(setUploadProgress);
    }, []);

    // Reset state when modal opens
    useEffect(() => {
        if (visible) {
            // Start with description modal directly
            setDescriptionModalVisible(true);
        } else {
            resetState();
        }
    }, [visible]);

    const resetState = () => {
        setCameraVisible(false);
        setDescriptionModalVisible(false);
        setCapturedImages([]);
        setCurrentTitle('');
        setCurrentDescription('');
        setIsUploading(false);
        setUploadProgress({});
    };

    const handleAddPhoto = async () => {
        if (cameraPermission?.granted) {
            setCameraVisible(true);
            setDescriptionModalVisible(false);
        } else {
            const permission = await requestCameraPermission();
            if (permission.granted) {
                setCameraVisible(true);
                setDescriptionModalVisible(false);
            } else {
                Alert.alert(
                    'Camera Permission Required',
                    'Please grant camera permission to take photos.',
                    [{ text: 'OK' }]
                );
            }
        }
    };

    const handleTakePicture = async () => {
        if (camera) {
            try {
                const photo = await camera.takePictureAsync({
                    quality: 0.8,
                    base64: false,
                });

                if (photo?.uri) {
                    const newImage: CapturedImage = {
                        uri: photo.uri,
                        id: Date.now().toString(),
                        uploading: false,
                        uploaded: false,
                    };

                    setCapturedImages(prev => [...prev, newImage]);

                    // Go back to description modal
                    setCameraVisible(false);
                    setDescriptionModalVisible(true);
                }
            } catch (error) {
                console.error('Error taking picture:', error);
                Alert.alert('Error', 'Failed to take picture. Please try again.');
            }
        }
    };

    const handleToggleCameraType = () => {
        setCameraType((prev) => (prev === 'back' ? 'front' : 'back'));
    };

    const removeImage = (imageId: string) => {
        setCapturedImages(prev => prev.filter(img => img.id !== imageId));
    };

    const uploadAllImages = async (): Promise<string[]> => {
        const uploadedUrls: string[] = [];

        for (const image of capturedImages) {
            if (image.uploaded && image.cloudinaryUrl) {
                uploadedUrls.push(image.cloudinaryUrl);
                continue;
            }

            // Mark image as uploading
            setCapturedImages(prev =>
                prev.map(img =>
                    img.id === image.id
                        ? { ...img, uploading: true }
                        : img
                )
            );

            try {
                const cloudinaryUrl = await CloudinaryService.uploadToCloudinary(image.uri);

                if (cloudinaryUrl) {
                    uploadedUrls.push(cloudinaryUrl);

                    // Mark image as uploaded
                    setCapturedImages(prev =>
                        prev.map(img =>
                            img.id === image.id
                                ? { ...img, uploading: false, uploaded: true, cloudinaryUrl }
                                : img
                        )
                    );
                } else {
                    throw new Error('Failed to upload image');
                }
            } catch (error) {
                console.error('Error uploading image:', error);
                setCapturedImages(prev =>
                    prev.map(img =>
                        img.id === image.id
                            ? { ...img, uploading: false }
                            : img
                    )
                );
                throw error;
            }
        }

        return uploadedUrls;
    };

    const handleSaveWorkItem = async () => {
        if (capturedImages.length === 0) {
            Alert.alert('Error', 'Please take at least one photo.');
            return;
        }

        if (!currentTitle.trim()) {
            Alert.alert('Error', 'Please enter a title.');
            return;
        }

        try {
            setIsUploading(true);

            // Upload all images to Cloudinary
            const cloudinaryUrls = await uploadAllImages();

            if (cloudinaryUrls.length === 0) {
                Alert.alert('Error', 'Failed to upload images. Please try again.');
                setIsUploading(false);
                return;
            }

            const workItem = {
                images: cloudinaryUrls, // Only string array for images
                title: currentTitle.trim(),
                description: currentDescription.trim(),
                sectionId: updateType,
                updateType: updateType,
            };

            onSave(workItem as any);
            resetState();
            onClose();
        } catch (error) {
            console.error('Error saving work item:', error);
            Alert.alert('Error', 'Failed to save update. Please try again.');
            setIsUploading(false);
        }
    };

    const handleCancel = () => {
        if (isUploading) {
            Alert.alert(
                'Upload in Progress',
                'An upload is currently in progress. Are you sure you want to cancel?',
                [
                    { text: 'Continue Upload', style: 'cancel' },
                    {
                        text: 'Cancel Upload',
                        style: 'destructive',
                        onPress: () => {
                            resetState();
                            onClose();
                        }
                    }
                ]
            );
        } else {
            resetState();
            onClose();
        }
    };

    const getModalTitle = () => {
        switch (updateType) {
            case 'basic':
                return `Add ${sectionName} Basic Update`;
            case 'lobby':
                return 'Add Lobby Update';
            case 'terrace':
                return 'Add Terrace Garden Update';
            case 'flat':
                return `Add ${sectionName} Flat Update`;
            default:
                return 'Add Work Item Details';
        }
    };

    const getOverallUploadProgress = () => {
        if (capturedImages.length === 0) return 0;

        const totalProgress = capturedImages.reduce((sum, image) => {
            if (image.uploaded) return sum + 100;
            if (image.uploading) return sum + (uploadProgress[image.uri] || 0);
            return sum;
        }, 0);

        return Math.round(totalProgress / capturedImages.length);
    };

    return (
        <>
            {/* Camera Modal */}
            <Modal
                visible={visible && cameraVisible}
                animationType="slide"
                onRequestClose={() => {
                    setCameraVisible(false);
                    setDescriptionModalVisible(true);
                }}
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
                                onPress={() => {
                                    setCameraVisible(false);
                                    setDescriptionModalVisible(true);
                                }}
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
                visible={visible && descriptionModalVisible}
                animationType="slide"
                transparent
                onRequestClose={handleCancel}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>{getModalTitle()}</Text>

                        {/* Images Container with Plus Button */}
                        <View style={styles.imagesContainer}>
                            <ScrollView
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                contentContainerStyle={styles.imagesScrollContainer}
                            >
                                {/* Captured Images */}
                                {capturedImages.map((image) => (
                                    <View key={image.id} style={styles.imageWrapper}>
                                        <Image
                                            source={{ uri: image.uri }}
                                            style={styles.capturedImage}
                                            resizeMode="cover"
                                        />
                                        {!isUploading && (
                                            <TouchableOpacity
                                                style={styles.removeImageButton}
                                                onPress={() => removeImage(image.id)}
                                            >
                                                <Ionicons name="close-circle" size={20} color="red" />
                                            </TouchableOpacity>
                                        )}
                                        {image.uploading && (
                                            <View style={styles.uploadOverlay}>
                                                <ActivityIndicator size="small" color="white" />
                                                <Text style={styles.uploadText}>
                                                    {uploadProgress[image.uri] || 0}%
                                                </Text>
                                            </View>
                                        )}
                                        {image.uploaded && (
                                            <View style={styles.uploadOverlay}>
                                                <Ionicons name="checkmark-circle" size={20} color="green" />
                                            </View>
                                        )}
                                    </View>
                                ))}

                                {/* Plus Button */}
                                <TouchableOpacity
                                    style={styles.addPhotoButton}
                                    onPress={handleAddPhoto}
                                    disabled={isUploading}
                                >
                                    <Ionicons
                                        name="add"
                                        size={30}
                                        color={isUploading ? "#ccc" : "#666"}
                                    />
                                </TouchableOpacity>
                            </ScrollView>
                        </View>

                        {isUploading && (
                            <View style={styles.uploadProgressContainer}>
                                <View style={styles.progressBar}>
                                    <View
                                        style={[
                                            styles.progressFill,
                                            { width: `${getOverallUploadProgress()}%` }
                                        ]}
                                    />
                                </View>
                                <Text style={styles.progressText}>
                                    Uploading... {getOverallUploadProgress()}%
                                </Text>
                            </View>
                        )}

                        <TextInput
                            style={styles.descriptionInput}
                            placeholder="Enter title..."
                            value={currentTitle}
                            onChangeText={setCurrentTitle}
                            editable={!isUploading}
                        />

                        <TextInput
                            style={[styles.descriptionInput, styles.descriptionTextArea]}
                            placeholder="Describe the work done..."
                            multiline
                            numberOfLines={4}
                            textAlignVertical="top"
                            value={currentDescription}
                            onChangeText={setCurrentDescription}
                            editable={!isUploading}
                        />

                        <View style={styles.modalButtons}>
                            <TouchableOpacity
                                style={[
                                    styles.modalButton,
                                    styles.cancelButton,
                                    isUploading && styles.disabledButton
                                ]}
                                onPress={handleCancel}
                                disabled={isUploading}
                            >
                                <Text style={[
                                    styles.cancelButtonText,
                                    isUploading && styles.disabledButtonText
                                ]}>
                                    Cancel
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[
                                    styles.modalButton,
                                    styles.saveButton,
                                    isUploading && styles.disabledButton
                                ]}
                                onPress={handleSaveWorkItem}
                                disabled={isUploading}
                            >
                                {isUploading ? (
                                    <View style={styles.loadingContainer}>
                                        <ActivityIndicator size="small" color="white" />
                                        <Text style={styles.saveButtonText}>Saving...</Text>
                                    </View>
                                ) : (
                                    <Text style={styles.saveButtonText}>Save Update</Text>
                                )}
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
        maxHeight: '90%',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 16,
        textAlign: 'center',
    },
    imagesContainer: {
        marginBottom: 16,
    },
    imagesScrollContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    imageWrapper: {
        position: 'relative',
        marginRight: 12,
    },
    capturedImage: {
        width: 80,
        height: 80,
        borderRadius: 12,
        backgroundColor: '#f0f0f0',
    },
    removeImageButton: {
        position: 'absolute',
        top: -6,
        right: -6,
        backgroundColor: 'white',
        borderRadius: 10,
        width: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    uploadOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.7)',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    uploadText: {
        color: 'white',
        fontSize: 10,
        marginTop: 4,
    },
    addPhotoButton: {
        width: 80,
        height: 80,
        borderRadius: 12,
        backgroundColor: '#f0f0f0',
        borderWidth: 2,
        borderColor: '#ddd',
        borderStyle: 'dashed',
        justifyContent: 'center',
        alignItems: 'center',
    },
    uploadProgressContainer: {
        marginBottom: 16,
    },
    progressBar: {
        height: 4,
        backgroundColor: '#e0e0e0',
        borderRadius: 2,
        overflow: 'hidden',
        marginBottom: 8,
    },
    progressFill: {
        height: '100%',
        backgroundColor: '#4A90E2',
        borderRadius: 2,
    },
    progressText: {
        fontSize: 12,
        color: '#666',
        textAlign: 'center',
    },
    descriptionInput: {
        backgroundColor: '#f5f5f5',
        borderRadius: 8,
        padding: 12,
        marginBottom: 16,
        fontSize: 16,
        color: '#333',
    },
    descriptionTextArea: {
        minHeight: 100,
        textAlignVertical: 'top',
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 8,
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
        backgroundColor: '#4A90E2',
    },
    disabledButton: {
        opacity: 0.5,
    },
    cancelButtonText: {
        color: '#333',
        fontWeight: '600',
    },
    saveButtonText: {
        color: 'white',
        fontWeight: '600',
    },
    disabledButtonText: {
        color: '#999',
    },
    loadingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
});

export default EnhancedCameraModal;