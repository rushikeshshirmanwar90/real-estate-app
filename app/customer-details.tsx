import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    ActivityIndicator,
    Dimensions
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from "@expo/vector-icons";
import PropertyCard from '@/components/payments/PropertyCard';
import AddPaymentForm from '@/components/payments/AddPayment';
import { router } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';

const { width, height } = Dimensions.get('window');
const scaleFont = (size: number) => (width / 375) * size;


const mockCustomerDetails = {
    userId: "67dfda4147fae5ccd5c0fde6",
    property: [
        {
            projectId: "67b396c1827b34ec3620ec88",
            projectName: "Kameshwari Heights",
            sectionId: "67d7532a18ae14c87a1cd926",
            sectionName: "Tower A",
            sectionType: "Buildings",
            flatId: "67d7532a18ae14c87a1cd929",
            flatName: "102",
            _id: "67dfdfe4232d33fa6475f536",
            payments: [
                {
                    title: "Booking Amount",
                    percentage: "10",
                    date: "2025-03-23",
                },
            ],
            propertyDetails: {
                type: "flat",
                data: {
                    title: "1 BHK Premium",
                    description: "Compact yet luxurious 1 bedroom apartments perfect for singles or couples.",
                    bhk: 1,
                    totalArea: 650,
                },
                buildingDetails: {
                    name: "Tower A",
                    location: "Shrinager nanded 1-10-113 Guru Gobind Singh Ji Road Kohinor City Kailash Nagar",
                },
            },
        },
        {
            projectId: "67b396c1827b34ec3620ec88",
            projectName: "Kameshwari Heights",
            sectionId: "67b3c1f1e64827aa8e2c9295",
            sectionName: "row house",
            sectionType: "row house",
            flatId: "",
            flatName: "104",
            _id: "67dfe089232d33fa6475f550",
            propertyDetails: {
                type: "rowHouse",
                data: {
                    name: "row house",
                    description: "description about the row house",
                    area: 15,
                },
            },
        },
    ],
};

const mockUserData = {
    _id: "67dfda4147fae5ccd5c0fde6",
    firstName: "Rushikesh",
    lastName: "Shrimanwar",
    phoneNumber: "9579896842",
    email: "rushikeshshrimanwar@gmail.com",
};


export default function CustomerDetailsScreen() {

    const [customerDetails, setCustomerDetails] = useState<any>(null);
    const [userData, setUserData] = useState<any>(null);
    const [selectedProperty, setSelectedProperty] = useState<any>(null);
    const [showPaymentForm, setShowPaymentForm] = useState(false);

    useEffect(() => {
        // In a real app, fetch data from API
        setCustomerDetails(mockCustomerDetails);
        setUserData(mockUserData);
    }, []);

    const handleSelectProperty = (property: any) => {
        setSelectedProperty(property);
        setShowPaymentForm(false);
    };

    const handleAddPayment = () => {
        setShowPaymentForm(true);
    };

    const handlePaymentSubmit = (paymentData: any) => {
        // In a real app, send to API
        console.log("Payment added:", paymentData);
        setShowPaymentForm(false);

        // Update local state to show the new payment
        if (selectedProperty) {
            const updatedProperties = customerDetails.properties?.map((prop: any) => {
                if (prop._id === selectedProperty._id) {
                    return {
                        ...prop,
                        payments: [...(prop.payments || []), paymentData],
                    };
                }
                return prop;
            });

            setCustomerDetails({
                ...customerDetails,
                properties: updatedProperties,
            });

            // Update selected property
            setSelectedProperty({
                ...selectedProperty,
                payments: [...(selectedProperty.payments || []), paymentData],
            });
        }
    };

    if (!customerDetails || !userData) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
                <Text style={styles.loadingText}>Loading...</Text>
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.container}>

                <View style={styles.header}>
                    <View style={styles.headerTopRow}>
                        <TouchableOpacity
                            style={styles.backButton}
                            onPress={() => router.back()}
                        >
                            <Feather name="arrow-left" size={20} color="#fff" />
                        </TouchableOpacity>
                        <Text style={styles.headerTitle}>Customer Profile</Text>
                    </View>
                    <View style={styles.profileContainer}>
                        <View style={styles.avatarContainer}>
                            <Text style={styles.avatarText}>
                                {userData.firstName?.[0]}{userData.lastName?.[0]}
                            </Text>
                        </View>
                        <View style={styles.userInfo}>
                            <Text style={styles.userName}>
                                {userData.firstName} {userData.lastName}
                            </Text>
                            <View style={styles.contactRow}>
                                <Feather name="phone" size={12} color="rgba(255, 255, 255, 0.8)" />
                                <Text style={styles.contactText}>{userData.phoneNumber}</Text>
                            </View>
                            <View style={styles.contactRow}>
                                <Feather name="mail" size={12} color="rgba(255, 255, 255, 0.8)" />
                                <Text style={styles.contactText}>{userData.email}</Text>
                            </View>
                        </View>
                    </View>
                </View>

                <View style={{ padding: 16 }}>

                    {!selectedProperty ? (
                        <View>
                            <Text style={styles.sectionTitle}>Properties</Text>
                            <View style={styles.propertiesContainer}>
                                {customerDetails.property?.map((property: any) => (
                                    <PropertyCard
                                        key={property._id}
                                        property={property}
                                        onSelect={() => handleSelectProperty(property)}
                                    />
                                ))}
                            </View>
                        </View>
                    ) : showPaymentForm ? (
                        <AddPaymentForm
                            onSubmit={handlePaymentSubmit}
                            onCancel={() => setShowPaymentForm(false)}
                        />
                    ) : (
                        <View>
                            <View style={styles.actionsContainer}>
                                <TouchableOpacity
                                    style={styles.outlineButton}
                                    onPress={() => setSelectedProperty(null)}
                                >
                                    <Ionicons name="arrow-back" size={20} color="black" />
                                    <Text style={styles.outlineButtonText}>Back</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.primaryButton}
                                    onPress={handleAddPayment}
                                >
                                    <Ionicons name="add-outline" size={24} color="#fff" />
                                    <Text style={styles.primaryButtonText}>Add Payment</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={styles.card}>
                                <View style={styles.cardHeader}>
                                    <Text style={styles.cardTitle}>
                                        {selectedProperty.propertyDetails.type === "flat"
                                            ? selectedProperty.propertyDetails.data.title
                                            : selectedProperty.propertyDetails.data.name}
                                    </Text>
                                </View>
                                <View style={styles.cardContent}>
                                    <View style={styles.propertyInfoContainer}>
                                        <Text style={styles.propertyInfoText}>Project: {selectedProperty.projectName}</Text>
                                        <Text style={styles.propertyInfoText}>Section: {selectedProperty.sectionName}</Text>
                                        <Text style={styles.propertyInfoText}>
                                            {selectedProperty.propertyDetails.type === "flat" ? "Flat" : "Row House"}:{" "}
                                            {selectedProperty.flatName}
                                        </Text>
                                    </View>

                                    <View style={styles.paymentContainer}>
                                        <Text style={styles.paymentTitle}>Payment History</Text>
                                        {selectedProperty.payments && selectedProperty.payments.length > 0 ? (
                                            <View style={styles.paymentList}>
                                                {selectedProperty.payments?.map((payment: any, index: number) => (
                                                    <View key={index} style={styles.paymentItem}>
                                                        <View>
                                                            <Text style={styles.paymentName}>{payment.title}</Text>
                                                            <Text style={styles.paymentText}>{payment.date}</Text>
                                                        </View>
                                                        <Text style={styles.percentage}>{payment.percentage}%</Text>
                                                    </View>
                                                ))}
                                            </View>
                                        ) : (
                                            <Text style={styles.noPaymentsText}>No payments recorded yet.</Text>
                                        )}
                                    </View>
                                </View>
                            </View>
                        </View>
                    )}
                </View>

            </ScrollView >
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        marginTop: scaleFont(10),
        fontSize: scaleFont(16),
    },
    card: {
        backgroundColor: '#ffffff',
        borderRadius: 8,
        marginBottom: scaleFont(24),
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    cardHeader: {
        padding: scaleFont(16),
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    cardTitle: {
        fontSize: scaleFont(18),
        fontWeight: 'bold',
    },
    cardContent: {
        padding: scaleFont(16),
    },
    infoContainer: {
        gap: 8,
    },
    nameText: {
        fontSize: scaleFont(18),
        fontWeight: '500',
    },
    infoText: {
        fontSize: scaleFont(14),
        color: '#666',
    },
    sectionTitle: {
        fontSize: scaleFont(18),
        fontWeight: '600',
        marginBottom: 16,
    },
    propertiesContainer: {
        gap: scaleFont(12),
    },
    actionsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: scaleFont(16),
    },
    outlineButton: {
        flexDirection: "row",
        alignItems: "center",
        gap: scaleFont(8),
        borderRadius: 4,
        paddingVertical: scaleFont(8),
        paddingHorizontal: scaleFont(12),
        backgroundColor: '#fff',
    },
    outlineButtonText: {
        color: '#333',
        fontSize: scaleFont(14),
    },
    primaryButton: {
        backgroundColor: '#222',
        borderRadius: 4,
        paddingVertical: scaleFont(8),
        paddingHorizontal: scaleFont(12),
        flexDirection: 'row',
        alignItems: 'center',
    },
    primaryButtonText: {
        color: '#fff',
        fontSize: scaleFont(14),
        marginLeft: scaleFont(4),
    },
    propertyInfoContainer: {
        marginBottom: scaleFont(16),
    },
    propertyInfoText: {
        fontSize: scaleFont(14),
        fontWeight: '500',
        marginBottom: 4,
    },
    paymentContainer: {
        gap: scaleFont(12),
    },
    paymentTitle: {
        fontSize: scaleFont(16),
        fontWeight: '600',
        marginBottom: 8,
    },
    paymentList: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
    },
    paymentItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignContent: "center",
        alignItems: "center",
        padding: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    paymentName: {
        fontSize: scaleFont(16),
        fontWeight: '600',
        marginBottom: 4,
    },
    paymentText: {
        fontSize: scaleFont(15),
        color: '#666',
    },

    percentage: {
        fontSize: scaleFont(20),
        color: '#111',
        fontWeight: "bold",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20
    },

    noPaymentsText: {
        fontSize: 14,
        color: '#666',
        fontStyle: 'italic',
    },




    header: {
        paddingVertical: scaleFont(24),
        borderBottomLeftRadius: scaleFont(24),
        borderBottomRightRadius: scaleFont(24),
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
        elevation: 5,
        marginBottom: scaleFont(24),
        backgroundColor: "#2A2A2A", // Dark gray/almost black background
        paddingTop: 40,
    },
    headerTopRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: scaleFont(16),
        paddingHorizontal: scaleFont(16),
    },
    headerTitle: {
        color: '#FFFFFF',
        fontSize: scaleFont(20),
        fontWeight: '600',
        marginLeft: 12,
    },
    backButton: {
        height: scaleFont(36),
        width: scaleFont(36),
        borderRadius: 18,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
    },
    profileContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        gap: scaleFont(16),
    },
    avatarContainer: {
        height: scaleFont(68),
        width: scaleFont(68),
        borderRadius: 34,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 2,
        borderColor: '#E0E0E0',
        alignItems: 'center',
        justifyContent: 'center',
    },
    avatarText: {
        fontSize: scaleFont(22),
        fontWeight: 'bold',
        color: '#F5F5F5',
    },
    userInfo: {
        flex: 1,
    },
    userName: {
        fontSize: scaleFont(22),
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginBottom: 6,
    },
    contactRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
    },
    contactText: {
        fontSize: scaleFont(14),
        color: '#CCCCCC',
        marginLeft: 8,
    },
    content: {
        flex: 1,
        padding: scaleFont(16),
        backgroundColor: '#F8F8F8',
    },
});