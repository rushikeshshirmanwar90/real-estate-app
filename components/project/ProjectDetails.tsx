import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import Swiper from 'react-native-swiper';
import { router } from 'expo-router';
import { Project } from '@/types/project';
import { styles } from '@/style/projectDetails';

interface ProjectDetailsProps {
    project: Project;
}

const ProjectDetails: React.FC<ProjectDetailsProps> = ({ project }) => {
    const getTypeColor = (type: string) => {
        switch (type) {
            case 'ongoing':
                return { backgroundColor: '#EBF5FF', textColor: '#1E88E5' };
            case 'upcoming':
                return { backgroundColor: '#FFF8E1', textColor: '#FFA000' };
            case 'completed':
                return { backgroundColor: '#E8F5E9', textColor: '#43A047' };
            default:
                return { backgroundColor: '#F5F5F5', textColor: '#757575' };
        }
    };

    const typeColor = getTypeColor(project.projectType);

    return (
        <View style={styles.projectCard}>
            <View style={styles.headerContainer}>
                <View style={styles.titleRow}>
                    <Text style={styles.projectName}>{project.name}</Text>
                    <View style={[styles.badge, { backgroundColor: typeColor.backgroundColor }]}>
                        <Text style={[styles.badgeText, { color: typeColor.textColor }]}>
                            {project.projectType.charAt(0).toUpperCase() + project.projectType.slice(1)}
                        </Text>
                    </View>
                </View>

                <View style={styles.addressContainer}>
                    <Feather name="map-pin" size={16} color="#6B48FF" />
                    <Text style={styles.addressText}>{project.address}</Text>
                </View>
            </View>

            <View style={styles.imageContainer}>
                <Swiper
                    style={styles.swiperContainer}
                    showsButtons={true}
                    autoplay={true}
                    autoplayTimeout={5}
                    dot={<View style={styles.dot} />}
                    activeDot={<View style={styles.activeDot} />}
                    paginationStyle={styles.pagination}
                    buttonWrapperStyle={styles.buttonWrapper}
                >
                    {project.images.map((image, index) => (
                        <View style={styles.slide} key={index}>
                            <Image source={{ uri: image }} style={styles.image} resizeMode="cover" />
                        </View>
                    ))}
                </Swiper>
            </View>

            <View style={styles.descriptionContainer}>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Text style={styles.descriptionTitle}>About This Project</Text>
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => {
                            const obj = {
                                sectionId: project._id,
                                name: project.name,
                                updateSectionType: 'projects',
                                backgroundColor: "#F8F9FD",
                                textColor: "#6B48FF",
                            };
                            const data = JSON.stringify(obj);
                            router.push({ pathname: '/updates/[data]', params: { data } });
                        }}
                    >
                        <Ionicons name="eye-sharp" size={20} color="#6B48FF" />
                        <Text style={styles.backButtonText}>Updates</Text>
                    </TouchableOpacity>
                </View>
                <Text style={styles.descriptionText}>{project.description}</Text>
            </View>

            <View style={styles.infoContainer}>
                <View style={styles.infoCard}>
                    <View style={styles.infoHeader}>
                        <Feather name="info" size={16} color="#6B48FF" />
                        <Text style={styles.infoTitle}>Location Details</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>State:</Text>
                        <Text style={styles.infoValue}>{project.state}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>City:</Text>
                        <Text style={styles.infoValue}>{project.city}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Area:</Text>
                        <Text style={styles.infoValue}>{project.area} sq.ft</Text>
                    </View>
                </View>

                <View style={styles.infoCard}>
                    <View style={styles.infoHeader}>
                        <Feather name="calendar" size={16} color="#6B48FF" />
                        <Text style={styles.infoTitle}>Project Status</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Type:</Text>
                        <Text style={styles.infoValue}>
                            {project.projectType.charAt(0).toUpperCase() + project.projectType.slice(1)}
                        </Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Total Sections:</Text>
                        <Text style={styles.infoValue}>{project.section.length}</Text>
                    </View>
                </View>
            </View>
        </View>
    );
};

export default ProjectDetails;