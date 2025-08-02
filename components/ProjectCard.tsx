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

            <View style={styles.contentSection}>
                <Text style={styles.title}>{project.name}</Text>

                <View style={styles.locationContainer}>
                    <EvilIcons name="location" size={20} color="black" />
                    <Text style={styles.locationText}>
                        {project.city}, {project.state}
                    </Text>
                </View>

                <View style={styles.areaContainer}>
                    <Text style={styles.infoLabel}>Area:</Text>
                    <Text style={styles.infoValue}>{project.area} sq.ft</Text>
                </View>

                <View style={styles.sectionsWrapper}>
                    <Text style={styles.sectionTitle}>Sections:</Text>
                    <View style={styles.sectionsContainer}>
                        {project.section.map((section, index) => (
                            <Text key={section._id || index} style={styles.sectionItem}>
                                {section.name} ({section.type})
                            </Text>
                        ))}
                    </View>
                </View>

                <TouchableOpacity style={styles.button} onPress={onAddUpdate}>
                    <Icon name="plus" size={16} color="#fff" style={styles.buttonIcon} />
                    <Text style={styles.buttonText}>Add Update</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    cardContainer: {
        width: width * 0.45, // Smaller width for vertical layout
        backgroundColor: '#F5F7FA',
        borderRadius: 12,
        overflow: 'hidden',
        marginVertical: 8,
        marginHorizontal: 5,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    imageContainer: {
        height: 120,
        width: '100%',
    },
    imageSection: {
        height: '100%',
        width: '100%',
        objectFit: "cover",
    },
    contentSection: {
        padding: 12,
        backgroundColor: '#fff',
        flex: 1,
    },
    title: {
        fontSize: width * 0.038,
        fontWeight: 'bold',
        color: '#2E3A59',
        marginBottom: 6,
    },
    locationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    locationText: {
        fontSize: width * 0.032,
        color: '#7D8FAB',
        marginLeft: 4,
        flex: 1,
    },
    areaContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    infoLabel: {
        fontSize: width * 0.03,
        color: '#7D8FAB',
        marginRight: 5,
    },
    infoValue: {
        fontSize: width * 0.032,
        fontWeight: 'bold',
        color: '#2E3A59',
    },
    sectionsWrapper: {
        marginBottom: 12,
        flex: 1,
    },
    sectionTitle: {
        fontSize: width * 0.032,
        fontWeight: 'bold',
        color: '#2E3A59',
        marginBottom: 6,
    },
    sectionsContainer: {
        flexDirection: "column",
        gap: 4,
    },
    sectionItem: {
        fontSize: width * 0.028,
        fontWeight: "500",
        backgroundColor: '#F9FAFB',
        color: '#000',
        borderColor: '#EAEAEA',
        borderWidth: 1,
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderRadius: 6,
        textAlign: 'center',
    },
    button: {
        flexDirection: 'row',
        backgroundColor: '#6B48FF',
        paddingVertical: 10,
        paddingHorizontal: 12,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 'auto', // Push button to bottom
    },
    buttonText: {
        color: '#fff',
        fontSize: width * 0.035,
        fontWeight: 'bold',
        marginLeft: 5,
    },
    buttonIcon: {
        marginRight: 2,
    },
});

export default ProjectCard;