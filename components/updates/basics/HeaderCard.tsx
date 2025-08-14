// components/HeaderCard.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { HeaderCardProps } from '@/types/updates/updates'

const HeaderCard: React.FC<HeaderCardProps> = ({ title, subtitle, onPress }) => {
    return (
        <TouchableOpacity style={styles.headerCard} onPress={onPress}>
            <View style={styles.headerContent}>
                <View style={styles.headerLeft}>
                    <View style={styles.headerIcon}>
                        <Feather name="calendar" size={24} color="white" />
                    </View>
                    <View>
                        <Text style={styles.headerTitle}>{title}</Text>
                        <Text style={styles.headerSubtitle}>{subtitle}</Text>
                    </View>
                </View>
                <Feather name="chevron-right" size={20} color="#666" />
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    headerCard: {
        backgroundColor: '#E8EDF5',
        borderRadius: 12,
        padding: 16,
        marginBottom: 20,
    },
    headerContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerIcon: {
        width: 48,
        height: 48,
        borderRadius: 8,
        backgroundColor: '#6B7280',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    headerTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1F2937',
        marginBottom: 2,
    },
    headerSubtitle: {
        fontSize: 14,
        color: '#6B7280',
    },
});

export default HeaderCard;