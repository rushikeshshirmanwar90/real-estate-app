import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import EvilIcons from '@expo/vector-icons/EvilIcons';

const { width } = Dimensions.get('window');

// Simplified Project interface with only necessary data
export interface ProjectData {
    _id: string;
    name: string;
    images: string[];
    city: string;
    state: string;
    area: string;
    section: {
        name: string;
        type: string;
        _id: string;
    }[];
}

interface ProjectCardProps {
    project: ProjectData;
    onAddUpdate?: () => void;
}

const ProjectCard = ({ project, onAddUpdate }: ProjectCardProps) => {

    return (
        <View style={styles.cardContainer}>
            {/* Left side - Image */}
            <View style={styles.imageContainer}>
                {project.images && project.images.length > 0 ? (
                    <Image
                        style={styles.imageSection}
                        source={{ uri: project.images[0] }}
                        resizeMode="cover"
                    />
                ) : (
                    <Image
                        style={styles.imageSection}
                        source={require('@/assets/images/images/img (1).jpg')}
                    />
                )}
            </View>

            {/* Right side - Content */}
            <View style={styles.contentSection}>
                <View style={styles.headerSection}>
                    <Text style={styles.title} numberOfLines={2}>{project.name}</Text>

                    <View style={styles.locationContainer}>
                        <View style={styles.locationIconContainer}>
                            <EvilIcons name="location" size={20} color="#9CA3AF" />
                        </View>
                        <Text style={styles.locationText} numberOfLines={1}>
                            {project.city}, {project.state}
                        </Text>
                    </View>
                </View>

                <View style={styles.areaSection}>
                    <Text style={styles.areaLabel}>Area</Text>
                    <Text style={styles.areaValue}>{project.area} sq.ft</Text>
                </View>

                <View style={styles.sectionsWrapper}>
                    <Text style={styles.sectionTitle}>Sections:</Text>
                    <View style={styles.sectionsContainer}>
                        {project.section.slice(0, 3).map((section, index) => (
                            <View key={section._id || index} style={styles.sectionItem}>
                                <Text style={styles.sectionText} numberOfLines={1}>
                                    {section.name} ({section.type})
                                </Text>
                            </View>
                        ))}
                        {project.section.length > 3 && (
                            <View style={styles.moreSection}>
                                <Text style={styles.moreSectionText}>
                                    +{project.section.length - 3} more
                                </Text>
                            </View>
                        )}
                    </View>
                </View>

                <TouchableOpacity style={styles.button} onPress={onAddUpdate}>
                    <Text style={styles.buttonText}>Add Update</Text>
                    <Icon name="arrow-right" size={14} color="#fff" style={styles.buttonIcon} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    cardContainer: {
        width: width * 0.92,
        height: 260,
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        overflow: 'hidden',
        marginVertical: 12,
        marginHorizontal: width * 0.04,
        elevation: 6,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.12,
        shadowRadius: 8,
        flexDirection: 'row',
    },
    imageContainer: {
        width: '42%',
        height: '100%',
        borderTopLeftRadius: 16,
        borderBottomLeftRadius: 16,
        overflow: 'hidden',
    },
    imageSection: {
        width: '100%',
        height: '100%',
    },
    contentSection: {
        flex: 1,
        padding: 20,
        justifyContent: 'space-between',
        backgroundColor: '#FFFFFF',
    },
    headerSection: {
        marginBottom: 4,
    },
    title: {
        fontSize: 18,
        fontWeight: '700',
        color: '#1F2937',
        marginBottom: 10,
        lineHeight: 24,
    },
    locationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
    },
    locationIconContainer: {
        marginRight: 6,
        marginTop: 2,
    },
    locationText: {
        fontSize: 14,
        color: '#6B7280',
        flex: 1,
        lineHeight: 18,
    },
    areaSection: {
        marginBottom: 16,
        paddingVertical: 4,
    },
    areaLabel: {
        fontSize: 12,
        color: '#9CA3AF',
        marginBottom: 3,
        fontWeight: '500',
        textTransform: 'uppercase',
        letterSpacing: 0.3,
    },
    areaValue: {
        fontSize: 16,
        fontWeight: '700',
        color: '#1F2937',
        lineHeight: 20,
    },
    sectionsWrapper: {
        marginBottom: 20,
        flex: 1,
    },
    sectionTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: '#374151',
        marginBottom: 8,
    },
    sectionsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    sectionItem: {
        backgroundColor: '#F3F4F6',
        borderRadius: 6,
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: '#E5E7EB',
    },
    sectionText: {
        fontSize: 12,
        color: '#4B5563',
        fontWeight: '500',
    },
    moreSection: {
        backgroundColor: '#EEF2FF',
        borderRadius: 6,
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: '#C7D2FE',
    },
    moreSectionText: {
        fontSize: 12,
        color: '#6366F1',
        fontWeight: '600',
    },
    button: {
        flexDirection: 'row',
        backgroundColor: '#6366F1',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'stretch',
        elevation: 2,
        shadowColor: '#6366F1',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 15,
        fontWeight: '600',
        letterSpacing: 0.3,
    },
    buttonIcon: {
        marginLeft: 8,
    },
});

export default ProjectCard;