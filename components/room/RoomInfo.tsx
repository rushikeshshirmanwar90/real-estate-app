// components/RoomInfo.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '@/theme/ThemeProvider';
import createThemedStyles from '@/theme/createThemedStyles';

interface RoomInfoProps {
    area: string;
}

export default function RoomInfo({ area }: RoomInfoProps) {
    const theme = useTheme();
    return (
        <View style={styles.infoBox}>
            <View style={styles.infoRow}>
                <MaterialIcons name="square-foot" size={22} color={theme.info} />
                <Text style={styles.infoLabel}>Area:</Text>
                <Text style={styles.infoValue}>{area}</Text>
            </View>
        </View>
    );
}

const createStyles = createThemedStyles((theme) => ({
    infoBox: {
        backgroundColor: theme.background.card,
        borderRadius: 16,
        padding: 16,
        marginTop: -20,
        shadowColor: theme.shadow,
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
        color: theme.text.tertiary,
        marginLeft: 8,
        marginRight: 4,
    },
    infoValue: {
        fontSize: 16,
        fontWeight: '600',
        color: theme.text.primary,
    },
}));

// Use the created styles function
const styles = createStyles();