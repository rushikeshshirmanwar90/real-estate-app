// components/RoomCard.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Room } from '@/types/types';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '@/theme/ThemeProvider';
import { getRoomGradientColors } from '@/theme/applicationTheme';
import createThemedStyles from '@/theme/createThemedStyles';

interface RoomCardProps {
    room: Room;
    propertyId: string;
}

export default function RoomCard({ room, propertyId }: RoomCardProps) {
    const router = useRouter();
    const theme = useTheme();

    return (
        <View style={styles.roomCardContainer}>
            <TouchableOpacity style={styles.roomCard}>
                <LinearGradient
                    colors={getRoomGradientColors(room.id)}
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

const createStyles = createThemedStyles((theme) => ({
    roomCardContainer: {
        width: '50%',
        padding: 6,
    },
    roomCard: {
        backgroundColor: theme.background.card,
        borderRadius: 16,
        overflow: 'hidden',
        shadowColor: theme.shadow,
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
        color: theme.text.onPrimary,
        fontWeight: 'bold',
        fontSize: 16,
        marginTop: 8,
    },
    roomCardActions: {
        padding: 12,
    },
    actionButton: {
        backgroundColor: theme.info,
        borderRadius: 8,
        paddingVertical: 8,
        alignItems: 'center',
        marginBottom: 8,
    },
    actionButtonSecondary: {
        backgroundColor: theme.background.card,
        borderWidth: 1,
        borderColor: theme.info,
    },
    actionButtonText: {
        color: theme.text.onPrimary,
        fontWeight: '600',
        fontSize: 12,
    },
    actionButtonTextSecondary: {
        color: theme.info,
        fontWeight: '600',
        fontSize: 12,
    },
}));

// Use the created styles function
const styles = createStyles();