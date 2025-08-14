import { View, FlatList, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { ProjectData } from '@/components/PropertyCard'; // Import interface from PropertyCard
import { getProject } from '@/func/project';
import { useRouter } from 'expo-router';
import Loading from '@/components/Loading';
import ProjectCard from '@/components/ProjectCard'; // Correct import path
import { SafeAreaView } from 'react-native-safe-area-context';

const Explore = () => {
    const router = useRouter();

    const [projects, setProjects] = useState<ProjectData[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const res = await getProject();

                const simplifiedProjects: ProjectData[] = res.map((project: ProjectData) => ({
                    _id: project._id,
                    name: project.name,
                    images: project.images,
                    city: project.city,
                    state: project.state,
                    area: project.area,
                    section: project.section
                }));

                setProjects(simplifiedProjects);
            } catch (error) {
                console.error('Error fetching projects:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    if (loading) {
        return <Loading />
    }

    const handleAddUpdate = (projectId: string) => {
        // Handle add update navigation or action
        router.push({ pathname: '/updates/[id]', params: { id: projectId } });
        // Or you can navigate to any other screen for adding updates
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.container}>
                <FlatList
                    data={projects}
                    renderItem={({ item }) => (
                        <ProjectCard
                            project={item}
                            onAddUpdate={() => handleAddUpdate(item._id)}
                        />
                    )}
                    keyExtractor={item => item._id}
                    contentContainerStyle={styles.listContainer}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F7FA',
    },
    listContainer: {
        paddingVertical: 10,
    }
});

export default Explore;