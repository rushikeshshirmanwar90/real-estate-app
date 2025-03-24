// components/EmptyState.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function EmptyState() {
    return (
        <View style={styles.emptyState}>
            <MaterialIcons name="construction" size={64} color="#ccc" />
            <Text style={styles.emptyStateText}>No work items yet</Text>
            <Text style={styles.emptyStateSubText}>
                Add your first work item by taking a photo and adding a description
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    emptyState: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 32,
    },
    emptyStateText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#666',
        marginTop: 16,
    },
    emptyStateSubText: {
        fontSize: 14,
        color: '#999',
        textAlign: 'center',
        marginTop: 8,
        maxWidth: '80%',
    },
});