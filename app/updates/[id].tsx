// screens/ProjectManagementScreen.tsx
import React, { useState, useEffect } from 'react';
import {
    View,
    StyleSheet,
    ScrollView,
    ActivityIndicator,
    Alert,
    Text,
    TouchableOpacity,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import HeaderCard from '@/components/updates/basics/HeaderCard';
import SectionHeader from '@/components/updates/basics/SectionHeader';
import ProjectCard from '@/components/updates/basics/ProjectCard';
import { Project, Section } from '@/types/updates/updates';
import {
    getProject,
    getIconForSectionType,
    getColorForSection,
    getSectionProgress,
} from '@/services/ProjectServices';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';

interface ProjectManagementScreenProps {
    onGoBack?: () => void;
}

const ProjectManagementScreen: React.FC<ProjectManagementScreenProps> = ({ onGoBack }) => {
    const [projects, setProjects] = useState<Project>();
    const [loading, setLoading] = useState<boolean>(true);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    const router = useRouter();
    const { id } = useLocalSearchParams();

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            setLoading(true);
            const projectData = await getProject(String(id));
            setProjects(projectData);
            setSelectedProject(projectData);
        } catch (error) {
            Alert.alert('Error', 'Failed to fetch projects. Please try again.');
            console.error('Error fetching projects:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleGoBack = () => {
        if (onGoBack) {
            onGoBack();
        } else {
            router.back()
        }
    };

    const handleBasicUpdatesPress = () => {
        if (selectedProject) {
            console.log('Add basic updates for project:', selectedProject.name);
            // navigation.navigate('BasicUpdates', { projectId: selectedProject._id });
        }
    };

    const handleSectionPress = (section: Section) => {
        const data = JSON.stringify({
            sectionId: section._id,
            projectId: selectedProject?._id
        })
        if (section.type == "Buildings") {
            router.push({ pathname: '/building-updates/[id]', params: { id: data } })
        } else if (section.type == "row house") {
            router.push({ pathname: '/row-house-updates/[id]', params: { id: data } })
        } else {
            router.push({ pathname: '/other-updates/[id]', params: { id: data } })
        }

    };

    if (loading) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#4A90E2" />
                    <Text style={styles.loadingText}>Loading projects...</Text>
                </View>
            </SafeAreaView>
        );
    }

    if (!selectedProject) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>No projects found</Text>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.goBackButton} onPress={handleGoBack}>
                    <Feather name="arrow-left" size={24} color="#1F2937" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Project Updates</Text>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>
                <Text style={styles.projectTitle}>{selectedProject.name}</Text>
                <Text style={styles.projectLocation}>
                    {selectedProject.city}, {selectedProject.state}
                </Text>

                <HeaderCard
                    title="Add Basic Updates"
                    subtitle="Add basic project updates"
                    onPress={handleBasicUpdatesPress}
                />

                {selectedProject.section && selectedProject.section.length > 0 && (
                    <View style={styles.sectionContainer}>
                        <SectionHeader
                            title="Project Section Updates"
                            subtitle="Update specific section of project"
                        />

                        {selectedProject.section.map((section: Section, index: number) => {
                            const progress = getSectionProgress("50"); // Updated here
                            const color = getColorForSection(index, section.type);
                            const iconName = getIconForSectionType(section.type);

                            return (
                                <ProjectCard
                                    key={section._id}
                                    title={section.name}
                                    subtitle={section.type}
                                    progress={progress}
                                    color={color}
                                    iconName={iconName}
                                    onPress={() => handleSectionPress(section)}
                                />
                            );
                        })}
                    </View>
                )}

            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F7FA',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        borderBottomColor: '#E5E7EB',
    },
    goBackButton: {
        padding: 8,
        marginRight: 12,
        borderRadius: 8,
        backgroundColor: '#F9FAFB',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1F2937',
        flex: 1,
    },
    scrollContent: {
        padding: 16,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 16,
    },
    loadingText: {
        marginTop: 16,
        fontSize: 16,
        color: '#666',
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 16,
    },
    emptyText: {
        fontSize: 18,
        color: '#666',
    },
    projectTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1F2937',
        marginBottom: 4,
    },
    projectLocation: {
        fontSize: 16,
        color: '#6B7280',
        marginBottom: 20,
    },
    sectionContainer: {
        backgroundColor: '#E3F2FD',
        borderRadius: 16,
        padding: 20,
        marginBottom: 20,
    },
    projectDetailsContainer: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
    },
    detailsTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1F2937',
        marginBottom: 12,
    },
    detailItem: {
        flexDirection: 'row',
        marginBottom: 8,
    },
    detailLabel: {
        fontSize: 14,
        fontWeight: '500',
        color: '#6B7280',
        width: 80,
    },
    detailValue: {
        fontSize: 14,
        color: '#1F2937',
        flex: 1,
    },
    amenitiesContainer: {
        marginTop: 12,
    },
    amenitiesTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1F2937',
        marginBottom: 8,
    },
    amenityItem: {
        fontSize: 14,
        color: '#6B7280',
        marginBottom: 4,
    },


});

export default ProjectManagementScreen;
