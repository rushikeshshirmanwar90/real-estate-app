// components/RoomAbout.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@/theme/ThemeProvider';
import createThemedStyles from '@/theme/createThemedStyles';

interface RoomAboutProps {
    roomName: string;
    propertyName: string;
    area: string;
}

export default function RoomAbout({ roomName, propertyName, area }: RoomAboutProps) {
    const theme = useTheme();
    return (
        <View style={styles.additionalInfo}>
            <Text style={styles.sectionTitle}>About this {roomName}</Text>
            <Text style={styles.additionalInfoText}>
                This {roomName.toLowerCase()} is part of the {propertyName} property,
                offering {area} of space with modern design and high-quality finishes.
                It's designed to provide maximum comfort and functionality with attention to detail
                in every aspect.
            </Text>
        </View>
    );
}

const createStyles = createThemedStyles((theme) => ({
    additionalInfo: {
        backgroundColor: theme.background.card,
        borderRadius: 16,
        padding: 16,
        marginTop: 16,
        marginBottom: 20,
        shadowColor: theme.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: theme.text.primary,
        marginBottom: 16,
    },
    additionalInfoText: {
        fontSize: 15,
        color: theme.text.secondary,
        lineHeight: 22,
    },
}));

// Use the created styles function
const styles = createStyles();