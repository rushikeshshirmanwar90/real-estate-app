import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface ModalHeaderProps {
    title: string;
}

const ModalHeader: React.FC<ModalHeaderProps> = ({ title }) => {
    return (
        <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>{title}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
        backgroundColor: '#f9f9f9',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
});

export default ModalHeader;