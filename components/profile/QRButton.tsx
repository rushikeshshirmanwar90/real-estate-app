// components/QRButtons.tsx
import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { User } from '@/types/user';
import { scaleFont } from '@/utils/scaling';

interface QRButtonsProps {
    userData: User;
    onShowQR: () => void;
    onScanQR: () => void;
}

const QRButtons: React.FC<QRButtonsProps> = ({ userData, onShowQR, onScanQR }) => {
    return (
        <View style={styles.qrButtonsContainer}>
            {userData.userType === 'customer' ? (
                <TouchableOpacity style={styles.qrButton} onPress={onShowQR}>
                    <MaterialCommunityIcons name="qrcode" size={scaleFont(20)} color="#000" style={styles.sectionIcon} />
                    <Text style={styles.qrText}>Show QR Code</Text>
                </TouchableOpacity>
            ) : (
                <TouchableOpacity style={styles.qrButton} onPress={onScanQR}>
                    <MaterialCommunityIcons name="qrcode-scan" size={scaleFont(20)} color="#000" style={styles.sectionIcon} />
                    <Text style={styles.qrText}>Scan QR Code</Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    qrButtonsContainer: {
        marginBottom: scaleFont(16),
    },
    qrButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFFFFF',
        padding: scaleFont(12),
        borderRadius: scaleFont(10),
        marginBottom: scaleFont(-5),
    },
    qrText: {
        fontSize: scaleFont(14),
        color: '#000',
        fontWeight: 'bold',
        marginLeft: scaleFont(8),
    },
    sectionIcon: {
        marginRight: scaleFont(8),
    },
});

export default QRButtons;