// components/FlatCard.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FlatCardProps } from '@/types/updates/BuildingSection';

const FlatCard: React.FC<FlatCardProps> = ({ title, status, onPress }) => {
    const getStatusColor = () => {
        switch (status) {
            case 'completed': return '#4CAF50';
            case 'in_progress': return '#FF9800';
            case 'pending':
            default: return '#4A90E2';
        }
    };

    const getStatusText = () => {
        switch (status) {
            case 'completed': return 'Unit Completed';
            case 'in_progress': return 'In Progress';
            case 'pending':
            default: return 'Add Updates';
        }
    };

    const isCompleted = status === 'completed';

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>

            {isCompleted ? (
                <View style={[styles.statusButton, { backgroundColor: getStatusColor() }]}>
                    <Text style={styles.statusButtonText}>{getStatusText()}</Text>
                </View>
            ) : (
                <TouchableOpacity
                    style={[styles.updateCard, !isCompleted && styles.dashed]}
                    onPress={onPress}
                >
                    <View style={styles.cardContent}>
                        {!isCompleted && (
                            <View style={styles.iconContainer}>
                                <View style={styles.plusIcon}>
                                    <View style={styles.plusHorizontal} />
                                    <View style={styles.plusVertical} />
                                </View>
                            </View>
                        )}
                        <Text style={[styles.cardText, { color: getStatusColor() }]}>
                            {getStatusText()}
                        </Text>
                    </View>
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 20,
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
        color: '#4A90E2',
        marginBottom: 12,
    },
    updateCard: {
        backgroundColor: '#F8FAFC',
        borderRadius: 12,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 100,
    },
    dashed: {
        borderWidth: 2,
        borderColor: '#4A90E2',
        borderStyle: 'dashed',
    },
    cardContent: {
        alignItems: 'center',
    },
    iconContainer: {
        marginBottom: 8,
    },
    plusIcon: {
        width: 32,
        height: 32,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    plusHorizontal: {
        width: 20,
        height: 2,
        backgroundColor: '#4A90E2',
        position: 'absolute',
    },
    plusVertical: {
        width: 2,
        height: 20,
        backgroundColor: '#4A90E2',
        position: 'absolute',
    },
    cardText: {
        fontSize: 14,
        textAlign: 'center',
        fontWeight: '500',
    },
    statusButton: {
        borderRadius: 12,
        padding: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    statusButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: 'white',
    },
});

export default FlatCard;