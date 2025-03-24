import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

interface PropertyCardProps {
    property: any;
    onSelect: () => void;
}

export default function PropertyCard({ property, onSelect }: PropertyCardProps) {

    // Check if we have valid property data
    if (!property) {
        console.log("Property is undefined or null");
        return null;
    }

    // Determine if it's a flat or row house
    const isFlat = property.sectionType === "Buildings";

    // Get the property title/name from the propertyDetails
    let displayName = "Unnamed Property";
    if (property.propertyDetails?.data) {
        if (property.propertyDetails.type === 'flat') {
            displayName = property.propertyDetails.data.title || "Unnamed Flat";
        } else {
            displayName = property.propertyDetails.data.name || "Unnamed Row House";
        }
    }

    return (
        <TouchableOpacity style={styles.card} onPress={onSelect} activeOpacity={0.7}>
            <View style={styles.cardContent}>
                <View style={styles.iconContainer}>
                    {isFlat ?
                        <FontAwesome name="building-o" size={24} color="black" /> :
                        <FontAwesome5 name="home" size={24} color="black" />
                    }
                </View>

                <View style={styles.detailsContainer}>
                    <Text style={styles.title}>
                        {displayName}
                    </Text>
                    <Text style={styles.subtitle}>
                        {property.projectName || "Project"} - {property.sectionName || "Section"}
                    </Text>
                    <Text style={styles.flatName}>
                        {isFlat ? `Flat ${property.flatName || ""}` : `Row House ${property.flatName || ""}`}
                    </Text>

                    <View style={styles.footer}>
                        <View style={styles.badge}>
                            <Text style={styles.badgeText}>
                                {property.payments?.length || 0} Payments
                            </Text>
                        </View>
                        <Text style={styles.viewText}>View Details</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
}

// Styles remain unchanged
const styles = StyleSheet.create({
    card: {
        backgroundColor: '#ffffff',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
        marginBottom: 8,
    },
    cardContent: {
        padding: 16,
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 12,
    },
    iconContainer: {
        backgroundColor: '#E7E7E8',
        padding: 10,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    detailsContainer: {
        flex: 1,
    },
    title: {
        fontSize: 16,
        fontWeight: '500',
        marginBottom: 2,
    },
    subtitle: {
        fontSize: 14,
        color: '#666',
        marginBottom: 2,
    },
    flatName: {
        fontSize: 14,
        marginBottom: 8,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 4,
    },
    badge: {
        backgroundColor: '#E7E7E8',
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderRadius: 12,
    },
    badgeText: {
        color: '#000',
        fontSize: 12,
    },
    viewText: {
        color: '#000',
        fontWeight: "bold",
        fontSize: 14,
    },
});