// components/WorkItemCard.tsx
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { WorkItem } from '@/types/types';
import { Ionicons } from '@expo/vector-icons';

interface WorkItemCardProps {
    item: WorkItem;
}

export default function WorkItemCard({ item }: WorkItemCardProps) {
    return (
        <View style={styles.workItemCard}>
            <Image source={{ uri: item.image }} style={styles.workItemImage} />
            <View style={styles.workItemContent}>
                <Text style={styles.workItemDescription}>{item.description}</Text>
                <View style={styles.workItemFooter}>
                    <View style={styles.workItemDate}>
                        <Ionicons name="calendar-outline" size={14} color="#666" />
                        <Text style={styles.workItemDateText}>{item.date}</Text>
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    workItemCard: {
        backgroundColor: 'white',
        borderRadius: 12,
        overflow: 'hidden',
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 3,
    },
    workItemImage: {
        width: '100%',
        height: 180,
    },
    workItemContent: {
        padding: 16,
    },
    workItemDescription: {
        fontSize: 15,
        color: '#333',
        marginBottom: 12,
        lineHeight: 22,
    },
    workItemFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 8,
        borderTopWidth: 1,
        borderTopColor: '#f0f0f0',
    },
    workItemDate: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    workItemDateText: {
        fontSize: 12,
        color: '#666',
        marginLeft: 4,
    },
});