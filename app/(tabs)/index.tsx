import React, { useEffect, useState } from 'react';
import { Alert, FlatList, StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Property } from '@/types/types';
import Header from '@/components/Header';
import PropertyCard from '@/components/Property/PropertyCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '@/types/user';
import { getFlatData } from '@/func/flat-data';
import { getUserDetails } from '@/lib/user';
import Loading from '@/components/Loading';
import { addContacts } from '@/func/contact';
import * as Contacts from 'expo-contacts';
import { clientId } from '@/lib/client';
import { getContact } from '@/lib/function/get-contact';

const { width } = Dimensions.get('window');

const IndexScreen = () => {
    const [reload, setReload] = useState<number>(0);
    const [userData, setUserData] = useState<User | null>(null);
    const [propertyData, setPropertyData] = useState<Property[]>([]);
    const [loading, setLoading] = useState(true);
    const [contactsUploaded, setContactsUploaded] = useState(false);

    useEffect(() => {
        getUserDetails(setUserData)
    }, [])

    const fetchFlatData = async () => {
        try {
            console.log(userData);
            if (userData?._id) {
                const res = await getFlatData(userData._id);
                setPropertyData(res ?? []);
            }
        } catch (error) {
            console.error("Error fetching flat data:", error);
        }
    };

    useEffect(() => {
        if (userData?._id) {
            fetchFlatData();

            if (!contactsUploaded) {
                getPermissionAndAddContacts(userData._id);
            }

            setLoading(false);
        }
    }, [userData, reload, contactsUploaded]);




    const getPermissionAndAddContacts = async (userId: string) => {
        try {
            // Check if we've already uploaded contacts for this user
            const hasUploaded = await AsyncStorage.getItem(`contacts_uploaded_${userId}`);
            if (hasUploaded === 'true') {
                console.log("Contacts already uploaded for this user");
                setContactsUploaded(true);
                return;
            }

            const data = await getContact();
            if (data != null) {
                const validContacts = data.filter(
                    (item) => (item.firstName && item.firstName.trim() !== '') ||
                        (item.phoneNumber && item.phoneNumber.trim() !== '')
                );

                // Prepare data for API
                const body = validContacts.map((item) => ({
                    firstName: item.firstName || '',
                    lastName: item.lastName || '',
                    email: item.email || '',
                    phoneNumber: item.phoneNumber || '',
                    clientId,
                    userId,
                }));

                console.log(`Preparing to upload ${body.length} contacts`);

                if (body.length > 0) {
                    // For debugging: display sample contacts
                    console.log("Sample contacts:", body.slice(0, 3));

                    const res = await addContacts(body);
                    if (res != null) {
                        console.log(`${res} contacts added successfully`);
                        // Mark as uploaded so we don't do it again
                        await AsyncStorage.setItem(`contacts_uploaded_${userId}`, 'true');
                        setContactsUploaded(true);
                    } else {
                        console.log("Failed to add contacts");
                    }
                } else {
                    console.log("No valid contacts to add");
                }
            } else {
                console.log("Permission denied for contacts");
                Alert.alert(
                    "Permission Required",
                    "This app needs access to your contacts to function properly.",
                    [
                        { text: "OK" }
                    ]
                );
            }
        } catch (error) {
            console.error("Error getting permission or adding contacts:", error);
        }
    };

    const reloadData = () => {
        setLoading(true);
        const tmp = Math.floor(Math.random() * 10000);
        setReload(tmp);
    };

    if (loading) {
        return <Loading />;
    }

    const renderPropertyCard = ({ item }: { item: Property }) => (
        <PropertyCard property={item} />
    );

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="light" />
            <Header name={userData?.firstName} />

            {propertyData && propertyData.length > 0 ? (
                <FlatList
                    data={propertyData}
                    renderItem={renderPropertyCard}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.listContainer}
                    showsVerticalScrollIndicator={false}
                />
            ) : (
                <View style={styles.noDataContainer}>
                    <Text style={styles.noDataText}>
                        No properties found. Please try again.
                    </Text>
                    <View style={styles.actionContainer}>
                        <TouchableOpacity style={styles.viewDetailsButton} onPress={reloadData}>
                            <Text style={styles.viewDetailsText}>Refresh</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f7f9fc',
    },
    listContainer: {
        padding: 12,
    },
    noDataContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    noDataText: {
        fontSize: width * 0.04,
        color: '#666',
        marginBottom: 20,
        textAlign: 'center',
    },
    actionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    viewDetailsButton: {
        backgroundColor: '#4d89ff',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
        minWidth: 120,
    },
    viewDetailsText: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: width * 0.04,
    },
});

export default IndexScreen;