import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Section } from '@/types/project';
import { styles } from '@/style/projectDetails';

interface SectionsListProps {
    sections: Section[];
    projectId: string;
}

const SectionsList: React.FC<SectionsListProps> = ({ sections, projectId }) => {
    const getIcon = (type: string) => {
        switch (type) {
            case 'Buildings':
                return <MaterialCommunityIcons name="office-building" size={24} color="#1E88E5" />;
            case 'row house':
                return <MaterialCommunityIcons name="home" size={24} color="#FFA000" />;
            case 'other':
                return <MaterialCommunityIcons name="tree" size={24} color="#43A047" />;
            default:
                return <MaterialCommunityIcons name="office-building" size={24} color="#757575" />;
        }
    };

    const getColor = (type: string) => {
        switch (type) {
            case 'Buildings':
                return { bg: '#EBF5FF', border: '#BBDEFB' };
            case 'row house':
                return { bg: '#FFF8E1', border: '#FFECB3' };
            case 'other':
                return { bg: '#E8F5E9', border: '#C8E6C9' };
            default:
                return { bg: '#F5F5F5', border: '#EEEEEE' };
        }
    };

    const handleSectionPress = (type: string, sectionId: string) => {
        switch (type) {
            case 'Buildings':
                router.push({ pathname: '/building/[id]', params: { id: sectionId } });
                break;
            case 'row house':
                router.push({ pathname: '/row-house/[id]', params: { id: sectionId } });
                break;
            case 'other':
                router.push({ pathname: '/otherSection/[id]', params: { id: sectionId } });
                break;
            default:
                break;
        }
    };

    return (
        <View style={styles.sectionsList}>
            {sections.map((section) => {
                const colors = getColor(section.type);
                return (
                    <TouchableOpacity
                        key={section.sectionId || section._id}
                        style={[styles.sectionCard, { backgroundColor: colors.bg, borderColor: colors.border }]}
                        onPress={() => handleSectionPress(section.type, section.sectionId)}
                    >
                        <View style={styles.sectionIconContainer}>
                            <View style={styles.sectionIcon}>{getIcon(section.type)}</View>
                            <View style={styles.sectionInfo}>
                                <Text style={styles.sectionName}>{section.name}</Text>
                                <Text style={styles.sectionType}>
                                    {section.type.charAt(0).toUpperCase() + section.type.slice(1).replace('-', ' ')}
                                </Text>
                            </View>
                        </View>
                        <Feather name="chevron-right" size={20} color="#9E9E9E" />
                    </TouchableOpacity>
                );
            })}
        </View>
    );
};

export default SectionsList;