// components/ProjectCard.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import ProgressBar from './ProgressBar';
import { ProjectCardProps } from '@/types/updates/updates';

const ProjectCard: React.FC<ProjectCardProps> = ({
    title,
    subtitle,
    progress,
    color,
    iconName,
    onPress,
    showProgress = true
}) => {
    return (
        <TouchableOpacity style={styles.projectCard} onPress={onPress}>
            <View style={styles.cardContent}>
                <View style={styles.cardLeft}>
                    <View style={[styles.iconContainer, { backgroundColor: color }]}>
                        <Feather name={iconName as any} size={24} color="white" />
                    </View>
                    <View style={styles.cardText}>
                        <Text style={styles.cardTitle}>{title}</Text>
                        <Text style={styles.cardSubtitle}>{subtitle}</Text>
                    </View>
                </View>
                <Feather name="chevron-right" size={20} color={color} />
            </View>

            {showProgress && (
                <View style={styles.progressSection}>
                    <Text style={styles.progressText}>{progress}% work completed</Text>
                    <ProgressBar progress={progress} color={color} />
                </View>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    projectCard: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
    },
    cardContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    cardLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    iconContainer: {
        width: 48,
        height: 48,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    cardText: {
        flex: 1,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1F2937',
        marginBottom: 2,
    },
    cardSubtitle: {
        fontSize: 14,
        color: '#6B7280',
    },
    progressSection: {
        marginTop: 8,
    },
    progressText: {
        fontSize: 14,
        color: '#6B7280',
        marginBottom: 8,
        textAlign: 'right',
    },
});

export default ProjectCard;