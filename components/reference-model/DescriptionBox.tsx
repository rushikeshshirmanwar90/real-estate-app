import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const DescriptionBox: React.FC = () => {
    return (
        <View style={styles.container}>
            <View style={styles.descriptionContainer}>
                <Ionicons name="gift" size={24} color="#FF6B6B" style={styles.giftIcon} />
                <Text style={styles.modalDescription}>
                    Give us at least 4 closed leads to get the 50,000 prize money or rewards
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    descriptionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF9F9',
        padding: 15,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#FFE5E5',
    },
    giftIcon: {
        marginRight: 10,
    },
    modalDescription: {
        fontSize: 14,
        color: '#333',
        flex: 1,
        lineHeight: 20,
    },
});

export default DescriptionBox;