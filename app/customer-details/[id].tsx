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
import { router, useLocalSearchParams } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Customer, CustomerDetails, Payment, Property } from '@/types/user';
import { getSingleUser } from '@/func/user';
import axios from 'axios';
import { domain } from '@/lib/domain';

const { width, height } = Dimensions.get('window');
const scaleFont = (size: number) => (width / 375) * size;

export default function CustomerDetailsScreen() {
    const userId = useLocalSearchParams();
    const id = String(userId.id);
    const [customerDetails, setCustomerDetails] = useState<CustomerDetails | undefined>(undefined);
    const [userData, setUserData] = useState<Customer | undefined>(undefined);
    const [selectedProperty, setSelectedProperty] = useState<Property | undefined>(undefined);
    const [showPaymentForm, setShowPaymentForm] = useState(false);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchPropertyData = async () => {
            setLoading(true);
            try {
                const res = await axios.get(`${domain}/api/building/flat?userId=${id}`);
                const data = res.data;


                setCustomerDetails(data);
            } catch (error: any) {
                console.log("Error fetching property data:", error.message);
                console.log("Full error:", error);
            }

            setLoading(false);
        }

        const fetchUserData = async () => {
            setLoading(true);
            try {
                const res = await getSingleUser(id);
                setUserData(res);
            } catch (error: any) {
                console.log("User Data Error:", error.message);
            }
            setLoading(false);
        }

        fetchUserData();
        fetchPropertyData();
    }, []);

    const handleSelectProperty = (property: Property) => {
        setSelectedProperty(property);
        setShowPaymentForm(false);
    };

    const handleAddPayment = () => {
        setShowPaymentForm(true);
    };

    const handlePaymentSubmit = async (paymentData: Payment) => {

        setShowPaymentForm(false);


        const formattedPaymentData = {
            userId: id, // This is the user ID from useLocalSearchParams()
            propertyId: selectedProperty?._id, // The selected property's ID
            payment: {
                title: paymentData.title,
                percentage: paymentData.percentage,
                date: paymentData.date
            }
        };

        try {
            const res = await axios.post(`${domain}/api/payment`, formattedPaymentData)
            if (res.status == 200) {
                if (selectedProperty && customerDetails) {
                    const updatedProperties = customerDetails.properties?.map((prop) => {
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
                        properties: updatedProperties, // Note: properties plural
                    });

                    setSelectedProperty({
                        ...selectedProperty,
                        payments: [...(selectedProperty.payments || []), paymentData],
                    });
                }

            }

        } catch (error: any) {
            console.log(`Error : something went`);
        }



    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
                <Text style={styles.loadingText}>Loading...</Text>
            </View>
        );
    }

    if (!customerDetails || !userData) {
        return (
            <View style={styles.loadingContainer}>
                <Text style={styles.loadingText}>No data available</Text>
            </View>
        );
    }


    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.container}>
                <View style={styles.header}>
                    <View style={styles.headerTopRow}>
                        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
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
                            {customerDetails.properties && customerDetails.properties.length > 0 ? (
                                <View style={styles.propertiesContainer}>
                                    {customerDetails.properties.map((property) => (
                                        <PropertyCard
                                            key={property._id || `property-${Math.random()}`}
                                            property={property}
                                            onSelect={() => handleSelectProperty(property)}
                                        />
                                    ))}
                                </View>
                            ) : (
                                <Text>No properties found for this customer.</Text>
                            )}
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
                                    onPress={() => setSelectedProperty(undefined)}
                                >
                                    <Ionicons name="arrow-back" size={20} color="black" />
                                    <Text style={styles.outlineButtonText}>Back</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.primaryButton} onPress={handleAddPayment}>
                                    <Ionicons name="add-outline" size={24} color="#fff" />
                                    <Text style={styles.primaryButtonText}>Add Payment</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={styles.card}>
                                <View style={styles.cardHeader}>
                                    <Text style={styles.cardTitle}>
                                        {selectedProperty.flatName}
                                    </Text>
                                </View>
                                <View style={styles.cardContent}>
                                    <View style={styles.propertyInfoContainer}>
                                        <Text style={styles.propertyInfoText}>
                                            Project: {selectedProperty.projectName}
                                        </Text>
                                        <Text style={styles.propertyInfoText}>
                                            Section: {selectedProperty.sectionName}
                                        </Text>
                                        <Text style={styles.propertyInfoText}>
                                            {selectedProperty.sectionType === 'Buildings' ? 'Flat' : 'Row House'}:{' '}
                                            {selectedProperty.flatName}
                                        </Text>
                                    </View>

                                    <View style={styles.paymentContainer}>
                                        <Text style={styles.paymentTitle}>Payment History</Text>
                                        {selectedProperty.payments && selectedProperty.payments.length > 0 ? (
                                            <View style={styles.paymentList}>
                                                {selectedProperty.payments?.map((payment, index) => (
                                                    <View key={index} style={styles.paymentItem}>
                                                        <View>
                                                            <Text style={styles.paymentName}>{payment.title}</Text>
                                                            <Text style={styles.paymentText}>{payment.date}</Text>
                                                        </View>
                                                        <Text style={styles.percentage}>{payment.percentage}</Text>
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
            </ScrollView>
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