import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions, Image } from 'react-native';
import { Ionicons, MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import Swiper from 'react-native-swiper';
import { router, useLocalSearchParams } from 'expo-router';
import { getSingleProject } from '@/func/project';
import { SafeAreaView } from 'react-native-safe-area-context';
import ProjectAmenities from "@/components/Amenities"

import { styles } from "@/style/projectDetails"
import Loading from '@/components/Loading';


// Types
interface Section {
    sectionId: string;
    name: string;
    type: string;
    _id?: string;
}

interface Amenity {
    icon: string;
    name: string;
    _id?: string;
}

interface Project {
    _id: string | any;
    name: string;
    images: string[];
    state: string;
    city: string;
    area: string;
    address: string;
    description: string;
    projectType: string;
    longitude: number;
    latitude: number;
    section: Section[];
    amenities: Amenity[];
}

interface ProjectDetailsScreenProps {
    navigation: any;
}

const { width } = Dimensions.get('window');

const ProjectDetailsScreen = ({ navigation }: ProjectDetailsScreenProps) => {

    const { id } = useLocalSearchParams();
    const [project, setProject] = useState<Project>();
    const [loading, setLoading] = useState(true);

    const fetchProjectData = async () => {
        try {
            const res = await getSingleProject(String(id));
            setProject(res);

        } catch (error) {
            console.error('Failed to fetch building data:', error);
        } finally {
            setLoading(false);
        }

    }

    useEffect(() => {
        fetchProjectData();
    }, [id]);

    if (loading) {
        return <Loading />
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView style={styles.container}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => router.back()}
                >
                    <Ionicons name="arrow-back" size={24} color="#6B48FF" />
                    <Text style={styles.backButtonText}>Back to Projects</Text>
                </TouchableOpacity>

                {project && <ProjectDetails project={project} />}

                {project && (
                    <>
                        <View style={styles.sectionContainer}>
                            <Text style={styles.sectionTitle}>Project Sections</Text>
                            <SectionsList sections={project.section} projectId={project._id} navigation={navigation} />
                        </View>

                        <View style={styles.sectionContainer}>
                            <Text style={styles.sectionTitle}>Amenities</Text>
                            <ProjectAmenities amenities={project.amenities} bg='#F8F9FD' fr='#6B48FF' />
                        </View>
                    </>
                )}
            </ScrollView>
        </SafeAreaView>
    );
};

const ProjectDetails = ({ project }: { project: Project }) => {
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
                            <Image
                                source={{ uri: image }}
                                style={styles.image}
                                resizeMode="cover"
                            />
                        </View>
                    ))}
                </Swiper>
            </View>

            <View style={styles.descriptionContainer}>
                <View style={{
                    flexDirection: "row", justifyContent: "space-between", alignContent: "center", alignItems: "center"
                }} >
                    <Text style={styles.descriptionTitle}>About This Project</Text>
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => {
                            const obj = {
                                sectionId: project._id,
                                name: project.name,
                                updateSectionType: "projects"
                            }

                            const data = JSON.stringify(obj);

                            router.push({ pathname: '/updates/[data]', params: { data: data } })

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
                        <Text style={styles.infoValue}>{project.projectType.charAt(0).toUpperCase() + project.projectType.slice(1)}</Text>
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

const SectionsList = ({ sections, projectId, navigation }: { sections: Section[], projectId: string, navigation: any }) => {
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
                router.push({ pathname: '/building/[id]', params: { id: sectionId } })
                break;
            case 'row house':
                router.push({ pathname: '/row-house/[id]', params: { id: sectionId } })
                break;
            case 'other':
                router.push({ pathname: '/otherSection/[id]', params: { id: sectionId } })
                break;
            default:
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
                            <View style={styles.sectionIcon}>
                                {getIcon(section.type)}
                            </View>
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




export default ProjectDetailsScreen;