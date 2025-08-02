import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { User } from '@/types/user';
import { getUserDetails } from '@/lib/user';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ProjectData } from '../PropertyCard';
import { getProject } from '@/func/project';

const SiteEng = () => {

    const [projects, setProjects] = useState<ProjectData[]>([]);
    const [Loading, setLoading] = useState<boolean>();

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

    return (
        <SafeAreaView>

        </SafeAreaView>
    )
}

export default SiteEng