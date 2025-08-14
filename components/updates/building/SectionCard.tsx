// components/SectionCard.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { SectionCardProps } from '@/types/updates/BuildingSection';

const SectionCard: React.FC<SectionCardProps> = ({
    title,
    subtitle,
    onPress,
    onSeeAllPress
}) => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.sectionTitle}>{title}</Text>
                {onSeeAllPress && (
                    <TouchableOpacity onPress={onSeeAllPress} style={styles.seeAllButton}>
                        <Text style={styles.seeAllText}>See All Updates</Text>
                        <Feather name="arrow-right" size={16} color="#4A90E2" />
                    </TouchableOpacity>
                )}
            </View>

            <TouchableOpacity style={styles.card} onPress={onPress}>
                <View style={styles.cardContent}>
                    <View style={styles.iconContainer}>
                        <View style={styles.plusIcon}>
                            <View style={styles.plusHorizontal} />
                            <View style={styles.plusVertical} />
                        </View>
                    </View>
                    <Text style={styles.cardSubtitle}>{subtitle}</Text>
                </View>
            </TouchableOpacity>
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
        marginBottom: 12,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#4A90E2',
    },
    seeAllButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    seeAllText: {
        fontSize: 14,
        color: '#4A90E2',
        marginRight: 4,
    },
    card: {
        backgroundColor: '#F8FAFC',
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#4A90E2',
        borderStyle: 'dashed',
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 100,
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
    cardSubtitle: {
        fontSize: 14,
        color: '#4A90E2',
        textAlign: 'center',
        fontWeight: '500',
    },
});

export default SectionCard;