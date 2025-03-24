// components/Header.tsx
import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
const scaleFont = (size: any) => (width / 375) * size;

const Header: React.FC<{ name?: string }> = ({ name }) => {
    return (
        <View style={styles.header}>
            <Text style={styles.headerTitle}>Welcome {name}</Text>
            <Text style={styles.headerSubtitle}>See all the updates related to your</Text>
        </View>
    );
}

export default Header;

const styles = StyleSheet.create({
    header: {
        paddingHorizontal: scaleFont(15),
        paddingVertical: scaleFont(10),
        backgroundColor: '#f7f9fc',
    },
    headerTitle: {
        fontSize: scaleFont(20),
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 4,
    },
    headerSubtitle: {
        fontSize: scaleFont(12),
        color: '#666',
        marginBottom: 8,
    },
});