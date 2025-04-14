// components/ContactInfo.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Feather from '@expo/vector-icons/Feather';
import { User, CustomerDetails } from '@/types/user';
import { scaleFont } from '@/utils/scaling';

interface ContactInfoProps {
    userData: User;
    properties?: CustomerDetails;
}

const ContactInfo: React.FC<ContactInfoProps> = ({ userData, properties }) => {
    return (
        <View style={styles.contactContainer}>
            <View style={styles.contactItem}>
                <View style={[styles.iconContainer, { backgroundColor: '#F3E8FF' }]}>
                    <FontAwesome name="envelope-o" size={scaleFont(24)} color="#9333EA" />
                </View>
                <View>
                    <Text style={styles.contactLabel}>Email</Text>
                    <Text style={styles.contactValue}>{userData.email}</Text>
                </View>
            </View>
            <View style={styles.contactItem}>
                <View style={[styles.iconContainer, { backgroundColor: '#FCE7F3' }]}>
                    <Feather name="phone" size={scaleFont(24)} color="#DB2777" />
                </View>
                <View>
                    <Text style={styles.contactLabel}>Phone</Text>
                    <Text style={styles.contactValue}>{userData.phoneNumber}</Text>
                </View>
            </View>
            <View style={styles.contactItem}>
                <View style={[styles.iconContainer, { backgroundColor: '#E0E7FF' }]}>
                    <Feather name="home" size={scaleFont(24)} color="#615AE8" />
                </View>
                <View>
                    <Text style={styles.contactLabel}>Properties</Text>
                    <Text style={styles.contactValue}>{properties?.properties?.length || '0'} Properties</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    contactContainer: {
        backgroundColor: '#FFFFFF',
        padding: scaleFont(12),
        borderRadius: scaleFont(10),
        marginBottom: scaleFont(16),
    },
    contactItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: scaleFont(12),
    },
    iconContainer: {
        width: scaleFont(40),
        height: scaleFont(40),
        borderRadius: scaleFont(20),
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: scaleFont(14),
    },
    contactLabel: {
        fontSize: scaleFont(10),
        color: '#6B7280',
        flex: 1,
    },
    contactValue: {
        fontSize: scaleFont(14),
        fontWeight: 'bold',
        color: '#000000',
        textAlign: 'right',
    },
});

export default ContactInfo;