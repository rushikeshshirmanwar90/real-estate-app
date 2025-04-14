// components/QRScannerModal.tsx
import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { CameraView, CameraType } from 'expo-camera';
import { scaleFont } from '@/utils/scaling';
import { width } from '@/utils/dimension';

interface QRScannerModalProps {
    visible: boolean;
    cameraPermission: { granted: boolean } | null;
    onClose: () => void;
    onBarcodeScanned: ({ type, data }: { type: string; data: string }) => void;
}

const QRScannerModal: React.FC<QRScannerModalProps> = ({ visible, cameraPermission, onClose, onBarcodeScanned }) => {
    return (
        <Modal visible={visible} transparent={true} animationType="fade" onRequestClose={onClose}>
            <View style={styles.scannerContainer}>
                {cameraPermission?.granted === false ? (
                    <Text style={styles.scannerText}>No access to camera</Text>
                ) : (
                    <CameraView
                        style={styles.scanner}
                        facing={'back' as CameraType}
                        barcodeScannerSettings={{
                            barcodeTypes: ['qr'],
                        }}
                        onBarcodeScanned={onBarcodeScanned}
                    >
                        <View style={styles.scannerOverlay}>
                            <View style={styles.scannerMarker} />
                        </View>
                        <TouchableOpacity style={styles.cancelScanButton} onPress={onClose}>
                            <Text style={styles.cancelScanText}>Cancel</Text>
                        </TouchableOpacity>
                    </CameraView>
                )}
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    scannerContainer: {
        flex: 1,
        backgroundColor: 'black',
    },
    scanner: {
        flex: 1,
    },
    scannerOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    scannerMarker: {
        width: width * 0.7,
        height: width * 0.7,
        borderWidth: 2,
        borderColor: '#A56CC1',
        borderRadius: 10,
    },
    scannerText: {
        color: 'white',
        fontSize: scaleFont(16),
        textAlign: 'center',
        margin: 20,
    },
    cancelScanButton: {
        position: 'absolute',
        bottom: 50,
        alignSelf: 'center',
        backgroundColor: 'white',
        paddingHorizontal: scaleFont(30),
        paddingVertical: scaleFont(12),
        borderRadius: scaleFont(8),
    },
    cancelScanText: {
        color: '#A56CC1',
        fontSize: scaleFont(16),
        fontWeight: 'bold',
    },
});

export default QRScannerModal;