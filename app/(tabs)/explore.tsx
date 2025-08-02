import { View, FlatList, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import PropertyCard, { ProjectData } from '@/components/PropertyCard'
import { getProject } from '@/func/project';
import { useRouter } from 'expo-router';
import Loading from '@/components/Loading';

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

    const handleViewDetails = (projectId: string) => {
        router.push({ pathname: '/projectDetail/[id]', params: { id: projectId } })
    };

    return (
        <View style={styles.container}>

            <FlatList
                data={projects}
                renderItem={({ item }) => (
                    <PropertyCard
                        project={item}
                        onPress={() => handleViewDetails(item._id)}
                    />
                )}
                keyExtractor={item => item._id}
                contentContainerStyle={styles.listContainer}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F7FA',
    },
    listContainer: {
        paddingVertical: 10,
        alignItems: 'center'
    }
});

export default Explore;