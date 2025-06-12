// components/RoomHeader.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '@/theme/ThemeProvider';
import { getRoomGradientColors } from '@/theme/applicationTheme';
import createThemedStyles from '@/theme/createThemedStyles';

interface RoomHeaderProps {
    roomName: string;
    roomIcon: string;
    propertyName: string;
    roomId: string;
}

export default function RoomHeader({ roomName, roomIcon, propertyName, roomId }: RoomHeaderProps) {
    // Use the theme from context
    const theme = useTheme();

    return (
        <LinearGradient
            colors={getRoomGradientColors(roomId)}
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

const createStyles = createThemedStyles((theme) => ({

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
        color: theme.text.onPrimaryFaded,
        marginTop: 4,
    },
}));

// Use the created styles function
const styles = createStyles();