import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ProjectCard from '@/components/project-card'

const Home = () => {
    return (
        <View style={styles.container} >
            <View style={styles.ProjectCards} >
                <ProjectCard />
            </View>
        </View>
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    ProjectCards: {
        width: "100%",
        marginHorizontal: "auto"
    }
})