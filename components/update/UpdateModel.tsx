import React from 'react';
import {
    View,
    Text,
    Modal,
    ScrollView,
    Image,
    TouchableOpacity,
    TextInput,
    StyleSheet,
    ActivityIndicator,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { UploadProgress } from '@/types/update';

interface UpdateModalProps {
    isVisible: boolean;
    images: string[];
    title: string;
    description: string;
    isLoading: boolean;
    uploadProgress: UploadProgress;
    textColor?: string;
    onClose: () => void;
    onAddMore: () => void;
    onRemoveImage: (index: number) => void;
    onTitleChange: (text: string) => void;
    onDescriptionChange: (text: string) => void;
    onSubmit: () => void;
}

const UpdateModal: React.FC<UpdateModalProps> = ({
    isVisible,
    images,
    title,
    description,
    isLoading,
    uploadProgress,
    textColor = '#333',
    onClose,
    onAddMore,
    onRemoveImage,
    onTitleChange,
    onDescriptionChange,
    onSubmit,
}) => (
    <Modal
        visible={isVisible}
        transparent
        animationType="slide"
        onRequestClose={() => !isLoading && onClose()}
    >
        <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
                <Text style={[styles.modalTitle, { color: textColor }]}>Add Update</Text>
                <ScrollView horizontal style={styles.imagePreviewContainer}>
                    {images.map((image, index) => (
                        <View key={index} style={styles.previewImageContainer}>
                            <Image source={{ uri: image }} style={styles.previewImage} />
                            {isLoading ? (
                                <View style={styles.progressOverlay}>
                                    <Text style={styles.progressText}>{uploadProgress[image] || 0}%</Text>
                                    <View style={[styles.progressBar, { width: `${uploadProgress[image] || 0}%` }]} />
                                </View>
                            ) : (
                                <TouchableOpacity
                                    style={styles.removeImageButton}
                                    onPress={() => onRemoveImage(index)}
                                >
                                    <MaterialIcons name="close" size={20} color="white" />
                                </TouchableOpacity>
                            )}
                        </View>
                    ))}
                    {!isLoading && (
                        <TouchableOpacity style={[styles.addMoreButton, { borderColor: textColor }]} onPress={onAddMore}>
                            <MaterialIcons name="photo-library" size={32} color={textColor} />
                            <Text style={[styles.addMoreText, { color: textColor }]}>Add More</Text>
                        </TouchableOpacity>
                    )}
                </ScrollView>
                <View style={styles.formContainer}>
                    <Text style={[styles.formLabel, { color: textColor }]}>Title *</Text>
                    <TextInput
                        style={styles.input}
                        value={title}
                        onChangeText={onTitleChange}
                        placeholder="Enter title for this update"
                        placeholderTextColor={textColor}
                        editable={!isLoading}
                    />
                    <Text style={[styles.formLabel, { color: textColor }]}>Description</Text>
                    <TextInput
                        style={[styles.input, styles.textArea]}
                        value={description}
                        onChangeText={onDescriptionChange}
                        placeholder="Add details about this update (optional)"
                        placeholderTextColor={textColor}
                        multiline
                        numberOfLines={4}
                        editable={!isLoading}
                    />
                </View>
                <View style={styles.modalButtons}>
                    <TouchableOpacity
                        style={[styles.modalButton, styles.cancelButton, isLoading && styles.disabledButton]}
                        onPress={onClose}
                        disabled={isLoading}
                    >
                        <Text style={[styles.cancelButtonText, { color: textColor }]}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.modalButton, styles.submitButton, isLoading && styles.disabledButton]}
                        onPress={onSubmit}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <View style={styles.buttonLoadingContainer}>
                                <ActivityIndicator size="small" color={textColor} />
                                <Text style={[styles.submitButtonText, { color: textColor }]}>Uploading...</Text>
                            </View>
                        ) : (
                            <Text style={[styles.submitButtonText, { color: textColor }]}>Submit</Text>
                        )}
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    </Modal>
);

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        padding: 16,
    },
    modalContent: {
        backgroundColor: 'white',
        borderRadius: 16,
        padding: 20,
        maxHeight: '90%',
    },
    modalTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    imagePreviewContainer: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    previewImageContainer: {
        marginRight: 12,
        position: 'relative',
    },
    previewImage: {
        width: 120,
        height: 120,
        borderRadius: 8,
    },
    removeImageButton: {
        position: 'absolute',
        top: -8,
        right: -8,
        backgroundColor: 'red',
        borderRadius: 12,
        padding: 4,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    progressOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    progressText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 5,
    },
    progressBar: {
        height: 8,
        backgroundColor: '#4CD964',
        position: 'absolute',
        bottom: 0,
        left: 0,
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
    },
    addMoreButton: {
        width: 120,
        height: 120,
        borderRadius: 8,
        borderWidth: 2,
        borderStyle: 'dashed',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f8ff',
    },
    addMoreText: {
        marginTop: 8,
        fontSize: 14,
        fontWeight: '500',
    },
    formContainer: {
        marginBottom: 20,
    },
    formLabel: {
        fontSize: 16,
        fontWeight: '500',
        marginBottom: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        marginBottom: 16,
        backgroundColor: '#fafafa',
    },
    textArea: {
        minHeight: 100,
        textAlignVertical: 'top',
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 12,
    },
    modalButton: {
        flex: 1,
        padding: 14,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    submitButton: {
        backgroundColor: '#007AFF',
    },
    cancelButton: {
        backgroundColor: '#f0f0f0',
    },
    disabledButton: {
        opacity: 0.5,
    },
    submitButtonText: {
        fontSize: 16,
        fontWeight: '600',
    },
    cancelButtonText: {
        fontSize: 16,
        fontWeight: '600',
    },
    buttonLoadingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
    },
});

export default UpdateModal;