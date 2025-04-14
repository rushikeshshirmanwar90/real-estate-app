// components/PropertiesList.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { CustomerDetails, Payment, Property } from '@/types/user';
import { scaleFont } from '@/utils/scaling';

interface PropertiesListProps {
    properties?: CustomerDetails;
}

const PropertiesList: React.FC<PropertiesListProps> = ({ properties }) => {
    if (!properties) {
        return <Text style={styles.noPropertiesText}>No properties available.</Text>;
    }

    return (
        <View style={styles.propertiesContainer}>
            <View style={styles.sectionHeader}>
                <FontAwesome name="building-o" size={scaleFont(24)} color="#9333EA" style={styles.sectionIcon} />
                <View>
                    <Text style={styles.sectionTitle}>My Properties</Text>
                    <Text style={styles.sectionSubtitle}>View your payment details</Text>
                </View>
            </View>
            {properties.properties.map((property: Property, index: number) => (
                <View key={index} style={styles.propertyCard}>
                    <View style={styles.propertyHeaderLine} />
                    <Text style={styles.propertyTitle}>{property.projectName}</Text>
                    <Text style={styles.propertySubtitle}>{property.sectionType}</Text>
                    {property.payments && property.payments.length > 0 ? (
                        <View style={styles.paymentDetailsContainer}>
                            <Text style={styles.paymentSectionTitle}>Payment Details</Text>
                            {property.payments.map((payment: Payment, paymentIndex: number) => (
                                <View key={paymentIndex} style={styles.paymentItem}>
                                    <View style={styles.paymentLabelContainer}>
                                        <Text style={styles.paymentLabel}>{payment.title}</Text>
                                        <Text style={styles.paymentDate}>{payment.date}</Text>
                                    </View>
                                    <Text style={styles.paymentValue}>{payment.percentage}</Text>
                                </View>
                            ))}
                        </View>
                    ) : (
                        <Text style={styles.noPaymentsText}>No payments recorded for this property.</Text>
                    )}
                </View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    propertiesContainer: {
        backgroundColor: '#FFFFFF',
        padding: scaleFont(12),
        borderRadius: scaleFont(10),
        marginBottom: scaleFont(16),
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: scaleFont(12),
    },
    sectionIcon: {
        marginRight: scaleFont(8),
    },
    sectionTitle: {
        fontSize: scaleFont(18),
        fontWeight: 'bold',
        color: '#000000',
    },
    sectionSubtitle: {
        fontSize: scaleFont(12),
        color: '#666666',
    },
    propertyCard: {
        padding: scaleFont(12),
        backgroundColor: '#FFFFFF',
        borderRadius: scaleFont(12),
        marginBottom: scaleFont(12),
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    propertyHeaderLine: {
        height: scaleFont(4),
        backgroundColor: '#9333EA',
        borderRadius: scaleFont(2),
        marginBottom: scaleFont(8),
    },
    propertyTitle: {
        fontSize: scaleFont(16),
        fontWeight: 'bold',
        color: '#000000',
        marginBottom: scaleFont(4),
    },
    propertySubtitle: {
        fontSize: scaleFont(14),
        color: '#6B7280',
        marginBottom: scaleFont(12),
    },
    paymentDetailsContainer: {
        marginTop: scaleFont(8),
    },
    paymentSectionTitle: {
        fontSize: scaleFont(16),
        fontWeight: '600',
        color: '#9333EA',
        marginBottom: scaleFont(8),
    },
    paymentItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#F9FAFB',
        padding: scaleFont(8),
        borderRadius: scaleFont(8),
        marginBottom: scaleFont(4),
    },
    paymentLabelContainer: {
        flex: 1,
        flexDirection: 'column',
    },
    paymentLabel: {
        fontSize: scaleFont(14),
        fontWeight: '500',
        color: '#6B7280',
    },
    paymentDate: {
        fontSize: scaleFont(12),
        color: '#6B7280',
    },
    paymentValue: {
        fontSize: scaleFont(14),
        fontWeight: 'bold',
        color: '#1F2937',
    },
    noPaymentsText: {
        fontSize: scaleFont(12),
        color: '#6B7280',
        fontStyle: 'italic',
        textAlign: 'center',
        marginTop: scaleFont(8),
    },
    noPropertiesText: {
        fontSize: scaleFont(14),
        color: '#666666',
        textAlign: 'center',
        marginTop: scaleFont(16),
    },
});

export default PropertiesList;