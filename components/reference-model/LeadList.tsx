import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { Lead } from './ReferenceModel';

interface LeadsListProps {
    leads: Lead[];
    onUpdatePress: (lead: Lead) => void;
}

const LeadsList: React.FC<LeadsListProps> = ({ leads, onUpdatePress }) => {
    return (
        <ScrollView style={styles.container}>
            <View style={styles.sectionTitle}>
                <MaterialIcons name="people" size={20} color="#555" />
                <Text style={styles.sectionTitleText}>Add Leads</Text>
            </View>

            {leads.length > 0 && (
                <View style={styles.leadsContainer}>
                    {leads.map((lead, index) => (
                        <View key={lead.id} style={styles.leadItem}>
                            <View style={styles.leadInfo}>
                                <Text style={styles.leadNumber}>#{index + 1}</Text>
                                <View>
                                    <Text style={styles.leadName}>{lead.name}</Text>
                                    <Text style={styles.leadContact}>{lead.contactNumber}</Text>
                                </View>
                            </View>
                            <TouchableOpacity
                                style={styles.updateButton}
                                onPress={() => onUpdatePress(lead)}
                            >
                                <FontAwesome name="edit" size={18} color="#4C9FD8" />
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        maxHeight: '40%',
        paddingHorizontal: 20,
    },
    sectionTitle: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        marginTop: 5,
    },
    sectionTitleText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginLeft: 6,
    },
    leadsContainer: {
        marginBottom: 15,
    },
    leadItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 12,
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
        marginBottom: 8,
        borderWidth: 1,
        borderColor: '#eee',
    },
    leadInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    leadNumber: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#4CAF50',
        marginRight: 10,
        width: 25,
    },
    leadName: {
        fontSize: 15,
        fontWeight: '500',
        color: '#333',
    },
    leadContact: {
        fontSize: 13,
        color: '#777',
        marginTop: 2,
    },
    updateButton: {
        padding: 8,
    }
});

export default LeadsList;