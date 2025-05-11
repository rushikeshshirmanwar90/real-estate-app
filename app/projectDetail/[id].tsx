import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { getSingleProject } from '@/func/project';
import { SafeAreaView } from 'react-native-safe-area-context';
import Loading from '@/components/Loading';
import ProjectDetails from '@/components/project/ProjectDetails';
import SectionsList from '@/components/project/SectionList';
import ProjectAmenities from '@/components/Amenities';
import { Project } from '@/types/project';
import { styles } from '@/style/projectDetails';

const ProjectDetailsScreen = () => {
    const { id } = useLocalSearchParams();
    const [project, setProject] = useState<Project | undefined>();
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
    };

    useEffect(() => {
        fetchProjectData();
    }, [id]);

    if (loading) {
        return <Loading />;
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
                            <SectionsList sections={project.section} projectId={project._id} />
                        </View>

                        <View style={styles.sectionContainer}>
                            <Text style={styles.sectionTitle}>Amenities</Text>
                            <ProjectAmenities amenities={project.amenities} bg="#F8F9FD" fr="#6B48FF" />
                        </View>
                    </>
                )}
            </ScrollView>
        </SafeAreaView>
    );
};

export default ProjectDetailsScreen;