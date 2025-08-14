import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface FloatingButtonsProps {
    onOpenCamera: () => void;
    onOpenGallery: () => void;
    textColor?: string;
}

const FloatingButtons: React.FC<FloatingButtonsProps> = ({
    onOpenCamera,
    onOpenGallery,
    textColor = '#fff',
}) => (
    <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.floatingButton} onPress={onOpenCamera}>
            <MaterialIcons name="add-a-photo" size={28} color={textColor} />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.floatingButton, styles.galleryButton]} onPress={onOpenGallery}>
            <MaterialIcons name="photo-library" size={28} color={textColor} />
        </TouchableOpacity>
    </View>
);

const styles = StyleSheet.create({
    buttonsContainer: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        flexDirection: 'column',
        gap: 12,
        zIndex: 999,
    },
    floatingButton: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#007AFF',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    galleryButton: {
        backgroundColor: '#34C759',
    },
});

export default FloatingButtons;