import { StyleSheet } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import TabBar from '@/components/TabBar'

const TabLayout = () => {
    return (
        <Tabs tabBar={props => <TabBar {...props} />}>
            <Tabs.Screen name='index' options={{ headerShown: false }} />
            <Tabs.Screen name='explore' options={{ title: "Explore" }} />
            <Tabs.Screen name='payments' options={{ title: "payments" }} />
            <Tabs.Screen name='profile' options={{ title: "Profile" }} />
        </Tabs>
    )
}

export default TabLayout

const styles = StyleSheet.create({})