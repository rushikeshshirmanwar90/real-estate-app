// components/RoomCard.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Room } from '@/types/types';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

interface RoomCardProps {
    room: Room;
    propertyId: string;
}

export default function RoomCard({ room, propertyId }: RoomCardProps) {
    const router = useRouter();

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
        <View style={styles.roomCardContainer}>
            <TouchableOpacity style={styles.roomCard}>
                <LinearGradient
                    colors={getGradientColors(room.id)}
                    style={styles.roomCardGradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                >
                    <MaterialIcons name={room.icon as any} size={36} color="white" />
                    <Text style={styles.roomName}>{room.name}</Text>
                </LinearGradient>

                <View style={styles.roomCardActions}>
                    <TouchableOpacity
                        style={styles.actionButton}
                        onPress={() => router.push(`/roomDetail/${room.id}?propertyId=${propertyId}`)}
                    >
                        <Text style={styles.actionButtonText}>View Details</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.actionButton, styles.actionButtonSecondary]}
                        onPress={() => router.push(`/todaysWork/${room.id}?propertyId=${propertyId}`)}
                    >
                        <Text style={styles.actionButtonTextSecondary}>Add Today's Work</Text>
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    roomCardContainer: {
        width: '50%',
        padding: 6,
    },
    roomCard: {
        backgroundColor: 'white',
        borderRadius: 16,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 3,
    },
    roomCardGradient: {
        padding: 16,
        height: 110,
        alignItems: 'center',
        justifyContent: 'center',
    },
    roomName: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
        marginTop: 8,
    },
    roomCardActions: {
        padding: 12,
    },
    actionButton: {
        backgroundColor: '#4d89ff',
        borderRadius: 8,
        paddingVertical: 8,
        alignItems: 'center',
        marginBottom: 8,
    },
    actionButtonSecondary: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#4d89ff',
    },
    actionButtonText: {
        color: 'white',
        fontWeight: '600',
        fontSize: 12,
    },
    actionButtonTextSecondary: {
        color: '#4d89ff',
        fontWeight: '600',
        fontSize: 12,
    },
});