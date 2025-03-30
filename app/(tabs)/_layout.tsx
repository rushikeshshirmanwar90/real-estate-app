import { StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Tabs } from 'expo-router';
import TabBar from '@/components/TabBar';
import { User } from '@/types/user';
import { getUserDetails } from '@/lib/user';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Feather } from "@expo/vector-icons";

const TabLayout = () => {
    const [userData, setUserData] = useState<User | undefined>(undefined);
    
    // Basic icons for all users
    const icons = {
        index: (props: any) => <Feather name='home' size={24} {...props} />,
        explore: (props: any) => <Feather name='compass' size={24} {...props} />,
        profile: (props: any) => <Feather name='user' size={24} {...props} />,
        payments: (props: any) => <MaterialCommunityIcons name="contactless-payment-circle-outline" size={24} {...props} />
    };
    
    useEffect(() => {
        getUserDetails(setUserData);
    }, []);
    
    return (
        <Tabs tabBar={props => <TabBar {...props} icons={icons} />}>
            <Tabs.Screen name='index' options={{ headerShown: false }} />
            <Tabs.Screen name='explore' options={{ title: "Explore" }} />
            <Tabs.Screen name='payments' options={{ title: "Payments" }} />
            <Tabs.Screen name='profile' options={{ title: "Profile" }} />
        </Tabs>
    );
};

export default TabLayout;

const styles = StyleSheet.create({});