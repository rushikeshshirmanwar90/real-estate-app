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

interface PropertyCardProps {
    project: ProjectData;
    onPress?: () => void;
}

const PropertyCard = ({ project, onPress }: PropertyCardProps) => {

    return (
        <View style={styles.cardContainer}>
            <View>
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

            <View style={styles.detailsSection}>
                <Text style={styles.title}>{project.name}</Text>

                <View style={styles.locationContainer}>
                    <EvilIcons name="location" size={24} color="black" />
                    <Text style={styles.locationText}>
                        {project.city}, {project.state}
                    </Text>
                </View>

                <View style={styles.infoRow}>
                    <View style={styles.infoItem}>
                        <Text style={styles.infoLabel}>Area</Text>
                        <Text style={styles.infoValue}>{project.area} sq.ft</Text>
                    </View>
                </View>

                <Text style={styles.sectionTitle}>Sections:</Text>

                <View style={styles.sectionsContainer}>
                    {project.section.map((section, index) => (
                        <Text key={section._id || index} style={styles.sectionItem}>
                            {section.name} ({section.type})
                        </Text>
                    ))}
                </View>

                <View style={styles.divider}></View>

                <TouchableOpacity style={styles.button} onPress={onPress}>
                    <Text style={styles.buttonText}>View Details</Text>
                    <Icon name="arrow-right" size={16} color="#fff" style={styles.buttonIcon} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    cardContainer: {
        width: width * 0.9,
        backgroundColor: '#F5F7FA',
        borderRadius: 10,
        overflow: 'hidden',
        marginVertical: 10,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    imageSection: {
        height: 200,
        width: width * 0.9,
        objectFit: "cover",
    },
    detailsSection: {
        padding: 15,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: width * 0.05, // Responsive font size
        fontWeight: 'bold',
        color: '#2E3A59',
    },
    locationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
    },
    locationText: {
        fontSize: width * 0.035, // Responsive font size
        color: '#7D8FAB',
        marginLeft: 5,
    },
    infoRow: {
        flexDirection: 'row',
        marginTop: 8,
    },
    infoItem: {
        marginRight: 20,
    },
    infoLabel: {
        fontSize: width * 0.03, // Responsive font size
        color: '#7D8FAB',
    },
    infoValue: {
        fontSize: width * 0.035, // Responsive font size
        fontWeight: 'bold',
        color: '#2E3A59',
    },
    sectionTitle: {
        fontSize: width * 0.035, // Responsive font size
        fontWeight: 'bold',
        color: '#2E3A59',
        marginTop: 10,
    },
    sectionsContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        marginVertical: 5,
        gap: 8,
    },
    sectionItem: {
        fontSize: width * 0.03, // Responsive font size
        fontWeight: "bold",
        backgroundColor: '#F9FAFB',
        color: '#000',
        borderColor: '#EAEAEA',
        borderWidth: 2,
        paddingVertical: 3,
        paddingHorizontal: 6,
        marginVertical: 2,
        borderRadius: 8
    },
    divider: {
        width: width * 0.8,
        backgroundColor: "#EAEAEA",
        marginTop: 10,
        height: 2,
        marginHorizontal: "auto"
    },
    button: {
        flexDirection: 'row',
        backgroundColor: '#6B48FF',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: width * 0.04, // Responsive font size
        fontWeight: 'bold',
    },
    buttonIcon: {
        marginLeft: 5,
    },
});

export default PropertyCard;