// components/LogoutButton.tsx
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { scaleFont } from '@/utils/scaling';

interface LogoutButtonProps {
    onLogout: () => void;
}

const LogoutButton: React.FC<LogoutButtonProps> = ({ onLogout }) => {
    return (
        <TouchableOpacity style={styles.logoutButton} onPress={onLogout}>
            <MaterialCommunityIcons name="logout-variant" size={scaleFont(20)} color="#A56CC1" style={styles.sectionIcon} />
            <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFFFFF',
        padding: scaleFont(12),
        borderRadius: scaleFont(10),
        marginBottom: scaleFont(16),
    },
    logoutText: {
        fontSize: scaleFont(14),
        color: '#A56CC1',
        fontWeight: 'bold',
        marginLeft: scaleFont(8),
    },
    sectionIcon: {
        marginRight: scaleFont(8),
    },
});

export default LogoutButton;