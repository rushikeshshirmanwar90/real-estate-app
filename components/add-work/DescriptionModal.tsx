// components/DescriptionModal.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, TextInput, Image } from 'react-native';

interface DescriptionModalProps {
    visible: boolean;
    capturedImage: string | null;
    currentDescription: string;
    onClose: () => void;
    onSave: () => void;
    onChangeDescription: (text: string) => void;
}

export default function DescriptionModal({
    visible,
    capturedImage,
    currentDescription,
    onClose,
    onSave,
    onChangeDescription,
}: DescriptionModalProps) {
    return (
        <Modal visible={visible} animationType="slide" transparent={true} onRequestClose={onClose}>
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Add Work Description</Text>
                    {capturedImage && (
                        <Image source={{ uri: capturedImage }} style={styles.previewImage} resizeMode="cover" />
                    )}
                    <TextInput
                        style={styles.descriptionInput}
                        placeholder="Describe the work done..."
                        multiline
                        value={currentDescription}
                        onChangeText={onChangeDescription}
                    />
                    <View style={styles.modalButtons}>
                        <TouchableOpacity style={[styles.modalButton, styles.cancelButton]} onPress={onClose}>
                            <Text style={styles.cancelButtonText}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.modalButton, styles.saveButton]} onPress={onSave}>
                            <Text style={styles.saveButtonText}>Save</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
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
        paddingBottom: 20,
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
        minHeight: 100,
        textAlignVertical: 'top',
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
        backgroundColor: '#4d89ff',
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