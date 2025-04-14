// components/QRCodeModal.tsx
import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { User } from '@/types/user';
import { ScannedData } from '@/types/types';
import { scaleFont } from '@/utils/scaling';
import { width } from '@/utils/dimension'; // Utility to get screen width

interface QRCodeModalProps {
    visible: boolean;
    userData: User;
    onClose: () => void;
}

const QRCodeModal: React.FC<QRCodeModalProps> = ({ visible, userData, onClose }) => {
    const generateQRData = (): string => {
        const qrData: ScannedData = {
            firstName: userData.firstName,
            lastName: userData.lastName,
            email: userData.email,
            phoneNumber: userData.phoneNumber,
            userType: userData.userType,
            userId: userData._id,
        };
        return JSON.stringify(qrData);
    };

    return (
        <Modal visible={visible} transparent={true} animationType="fade" onRequestClose={onClose}>
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Personal QR Code</Text>
                    <View style={styles.qrContainer}>
                        <QRCode value={generateQRData()} size={width * 0.6} color="#333" backgroundColor="#FFF" />
                    </View>
                    <Text style={styles.qrDescription}>Scan this QR code to share your contact information</Text>
                    <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                        <Text style={styles.closeButtonText}>Close</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: scaleFont(20),
    },
    modalContent: {
        backgroundColor: 'white',
        borderRadius: scaleFont(16),
        padding: scaleFont(20),
        width: '90%',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    modalTitle: {
        fontSize: scaleFont(22),
        fontWeight: 'bold',
        color: '#333',
        marginBottom: scaleFont(20),
    },
    qrContainer: {
        padding: scaleFont(15),
        backgroundColor: 'white',
        borderRadius: scaleFont(10),
        marginBottom: scaleFont(20),
    },
    qrDescription: {
        fontSize: scaleFont(14),
        color: '#666',
        textAlign: 'center',
        marginBottom: scaleFont(20),
    },
    closeButton: {
        backgroundColor: '#A56CC1',
        paddingHorizontal: scaleFont(30),
        paddingVertical: scaleFont(12),
        borderRadius: scaleFont(8),
    },
    closeButtonText: {
        color: 'white',
        fontSize: scaleFont(16),
        fontWeight: 'bold',
    },
});

export default QRCodeModal;