// components/RoomHeader.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

interface RoomHeaderProps {
    roomName: string;
    roomIcon: string;
    propertyName: string;
    roomId: string;
}

export default function RoomHeader({ roomName, roomIcon, propertyName, roomId }: RoomHeaderProps) {
    const getGradientColors = (id: string): string[] => {
        const colorSets = [
            ['#FF5E62', '#FF9966'],
            ['#4ECDC4', '#556270'],
            ['#7F7FD5', '#91EAE4'],
            ['#D66D75', '#E29587'],
            ['#6190E8', '#A7BFE8'],
        ];
        return colorSets[Number(id) % colorSets.length];
    };

    return (
        <LinearGradient
            colors={getGradientColors(roomId)}
            style={styles.header}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
        >
            <MaterialIcons name={roomIcon as any} size={60} color="white" />
            <Text style={styles.roomName}>{roomName}</Text>
            <Text style={styles.propertyName}>{propertyName}</Text>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    header: {
        padding: 24,
        alignItems: 'center',
        borderBottomLeftRadius: 32,
        borderBottomRightRadius: 32,
        paddingBottom: 32,
    },
    roomName: {
        fontSize: 28,
        fontWeight: 'bold',
        color: 'white',
        marginTop: 12,
    },
    propertyName: {
        fontSize: 16,
        color: 'rgba(255, 255, 255, 0.9)',
        marginTop: 4,
    },
});