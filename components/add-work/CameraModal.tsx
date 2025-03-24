// components/CameraModal.tsx
import React from 'react';
import { View, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { CameraView, CameraType } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';

interface CameraModalProps {
    visible: boolean;
    cameraType: CameraType;
    cameraRef: React.MutableRefObject<CameraView | null>;
    onClose: () => void;
    onTakePicture: () => void;
    onToggleCameraType: () => void;
}

export default function CameraModal({
    visible,
    cameraType,
    cameraRef,
    onClose,
    onTakePicture,
    onToggleCameraType,
}: CameraModalProps) {
    return (
        <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
            <View style={styles.cameraContainer}>
                <CameraView style={styles.camera} facing={cameraType} ref={cameraRef}>
                    <View style={styles.cameraControls}>
                        <TouchableOpacity style={styles.cameraControlButton} onPress={onClose}>
                            <Ionicons name="close" size={28} color="white" />
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.captureButton} onPress={onTakePicture}>
                            <View style={styles.captureButtonInner} />
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.cameraControlButton} onPress={onToggleCameraType}>
                            <Ionicons name="camera-reverse" size={28} color="white" />
                        </TouchableOpacity>
                    </View>
                </CameraView>
            </View>
        </Modal>
    );
}

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
        paddingBottom: 40,
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
});