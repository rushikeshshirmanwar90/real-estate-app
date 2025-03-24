// components/WorkHeader.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface WorkHeaderProps {
    roomName: string;
    propertyName: string;
}

export default function WorkHeader({ roomName, propertyName }: WorkHeaderProps) {
    return (
        <View style={styles.header}>
            <Text style={styles.headerTitle}>{roomName} Work Log</Text>
            <Text style={styles.headerSubtitle}>{propertyName}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        padding: 16,
        backgroundColor: '#4d89ff',
    },
    headerTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: 'white',
    },
    headerSubtitle: {
        fontSize: 14,
        color: 'rgba(255, 255, 255, 0.8)',
        marginTop: 4,
    },
});