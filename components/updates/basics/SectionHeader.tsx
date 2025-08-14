// components/SectionHeader.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { SectionHeaderProps } from '@/types/updates/updates';

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, subtitle }) => {
    return (
        <View style={styles.sectionHeader}>
            <View style={styles.sectionIconContainer}>
                <Feather name="layout" size={24} color="white" />
            </View>
            <View style={styles.sectionTextContainer}>
                <Text style={styles.sectionTitle}>{title}</Text>
                <Text style={styles.sectionSubtitle}>{subtitle}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 24,
        paddingBottom: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#B3E5FC',
    },
    sectionIconContainer: {
        width: 48,
        height: 48,
        borderRadius: 8,
        backgroundColor: '#8E24AA',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    sectionTextContainer: {
        flex: 1,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1A1A1A',
        marginBottom: 4,
    },
    sectionSubtitle: {
        fontSize: 14,
        color: '#666666',
    },
});

export default SectionHeader;