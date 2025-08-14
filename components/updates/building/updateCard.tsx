// components/UpdateCard.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { UpdateCardProps } from '@/types/updates/BuildingSection';

const UpdateCard: React.FC<UpdateCardProps> = ({
    title,
    subtitle,
    status,
    hasSubItems = false,
    showSeeAll = false,
    onPress,
    onSeeAllPress,
    children
}) => {
    const getStatusColor = () => {
        switch (status) {
            case 'completed': return '#4CAF50';
            case 'in_progress': return '#FF9800';
            case 'pending':
            default: return '#6B7280';
        }
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.title}>{title}</Text>
                {showSeeAll && onSeeAllPress && (
                    <TouchableOpacity onPress={onSeeAllPress} style={styles.seeAllButton}>
                        <Text style={styles.seeAllText}>See All Updates</Text>
                        <Feather name="arrow-right" size={16} color="#4A90E2" />
                    </TouchableOpacity>
                )}
            </View>

            {/* Main Content */}
            {hasSubItems ? (
                <View style={styles.subItemsContainer}>
                    {children}
                </View>
            ) : (
                <TouchableOpacity style={styles.updateCard} onPress={onPress}>
                    <View style={styles.cardContent}>
                        <View style={styles.iconContainer}>
                            <View style={styles.plusIcon}>
                                <View style={styles.plusHorizontal} />
                                <View style={styles.plusVertical} />
                            </View>
                        </View>
                        <Text style={styles.subtitle}>{subtitle}</Text>
                    </View>
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 24,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        color: '#4A90E2',
    },
    seeAllButton: {
        marginTop: 20,
        marginBottom: -10,
        fontWeight: 800,
        flexDirection: 'row',
        alignItems: 'center',
    },
    seeAllText: {
        fontSize: 14,
        color: '#4A90E2',
        marginRight: 4,
    },
    updateCard: {
        backgroundColor: '#F8FAFC',
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#4A90E2',
        borderStyle: 'dashed',
        padding: 24,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 120,
    },
    cardContent: {
        alignItems: 'center',
    },
    iconContainer: {
        marginBottom: 12,
    },
    plusIcon: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    plusHorizontal: {
        width: 24,
        height: 3,
        backgroundColor: '#4A90E2',
        position: 'absolute',
    },
    plusVertical: {
        width: 3,
        height: 24,
        backgroundColor: '#4A90E2',
        position: 'absolute',
    },
    subtitle: {
        fontSize: 16,
        color: '#4A90E2',
        textAlign: 'center',
        fontWeight: '500',
    },
    subItemsContainer: {
        gap: 16,
    },
});

export default UpdateCard;