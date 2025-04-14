import { ActivityIndicator, StyleSheet } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const Loading = () => {
    return (
        <SafeAreaView style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#6B48FF" />
        </SafeAreaView>
    )
}

export default Loading

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
})