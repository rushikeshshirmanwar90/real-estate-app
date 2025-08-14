import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface EmptyStateProps {
    textColor?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ textColor = '#777' }) => (
    <View style={styles.emptyStateContainer}>
        <MaterialIcons name="photo-library" size={80} color="#ccc" />
        <Text style={[styles.emptyStateTitle, { color: textColor }]}>No Updates Yet</Text>
        <Text style={[styles.emptyStateDescription, { color: textColor }]}>
            Add updates to keep track of project progress. Click the button below to add your first update.
        </Text>
    </View>
);

const styles = StyleSheet.create({
    emptyStateContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 30,
    },
    emptyStateTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 16,
        marginBottom: 8,
    },
    emptyStateDescription: {
        fontSize: 16,
        textAlign: 'center',
        lineHeight: 24,
    },
});

export default EmptyState;