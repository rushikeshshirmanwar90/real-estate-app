// components/RoomInfo.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface RoomInfoProps {
    area: string;
}

export default function RoomInfo({ area }: RoomInfoProps) {
    return (
        <View style={styles.infoBox}>
            <View style={styles.infoRow}>
                <MaterialIcons name="square-foot" size={22} color="#4d89ff" />
                <Text style={styles.infoLabel}>Area:</Text>
                <Text style={styles.infoValue}>{area}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    infoBox: {
        backgroundColor: 'white',
        borderRadius: 16,
        padding: 16,
        marginTop: -20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
    },
    infoLabel: {
        fontSize: 16,
        color: '#666',
        marginLeft: 8,
        marginRight: 4,
    },
    infoValue: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
    },
});