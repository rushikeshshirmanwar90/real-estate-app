import { getAllUsers } from '@/lib/function/getAllUsers';
import { Customer } from '@/types/user';
import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    FlatList,
    ActivityIndicator,
    SafeAreaView,
    StatusBar,
    ListRenderItem,
    Dimensions
} from 'react-native';

import { router } from 'expo-router';
import { Feather } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
const scaleFont = (size: number) => (width / 375) * size;

export default function CustomerManagement(): JSX.Element {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [filteredCustomers, setFilteredCustomers] = useState<Customer[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    // Fetch customers from API
    useEffect(() => {
        fetchCustomers();
    }, []);

    const fetchCustomers = async (): Promise<void> => {
        setIsLoading(true);
        try {
            const users = await getAllUsers();
            setCustomers(users);
            setFilteredCustomers(users);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
            setError(errorMessage);

            const sampleData: Customer[] = [
                {
                    "_id": "67dfda4147fae5ccd5c0fde6",
                    "firstName": "Rushikesh",
                    "lastName": "Shrimanwar",
                    "phoneNumber": "9579896842",
                    "email": "rushikeshshrimanwar@gmail.com",
                    "userType": "customer",
                    "password": "rushi@123",
                    "clientId": "67d6d72a52f8dc7d3ae22917",
                    "verified": true
                }
            ];

            setCustomers(sampleData);
            setFilteredCustomers(sampleData);
        } finally {
            setIsLoading(false);
        }
    };

    // Handle search
    const handleSearch = (): void => {
        if (searchTerm.trim() === '') {
            setFilteredCustomers(customers);
        } else {
            const filtered = customers.filter((customer) =>
                `${customer.firstName} ${customer.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
                customer.phoneNumber.includes(searchTerm) ||
                (customer.email && customer.email.toLowerCase().includes(searchTerm.toLowerCase()))
            );
            setFilteredCustomers(filtered);
        }
    };

    // Get initials for avatar
    const getInitials = (firstName: string, lastName: string): string => {
        return `${firstName.charAt(0).toUpperCase()}${lastName.charAt(0).toUpperCase()}`;
    };

    // Render customer item
    const renderCustomerItem: ListRenderItem<Customer> = ({ item }) => (
        <TouchableOpacity
            style={styles.customerItem}
            onPress={() => router.push({ pathname: '/customer-details/[id]', params: { id: String(item._id) } })}
        >
            <View style={styles.customerContent}>
                <View style={styles.avatarContainer}>
                    <Text style={styles.avatarText}>
                        {getInitials(item.firstName, item.lastName)}
                    </Text>
                </View>
                <View>
                    <Text style={styles.customerName}>{item.firstName} {item.lastName}</Text>
                    <Text style={styles.customerPhone}>{item.phoneNumber}</Text>
                </View>
            </View>
            <TouchableOpacity
                style={styles.viewButton}
                onPress={() => router.push({ pathname: '/customer-details/[id]', params: { id: String(item._id) } })}
            >
                <Text style={styles.viewButtonText}>View</Text>
            </TouchableOpacity>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" />

            <Text style={styles.title}>Add Payments</Text>

            {/* Search Bar */}
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search customer name..."
                    value={searchTerm}
                    onChangeText={setSearchTerm}
                />
                <TouchableOpacity
                    style={styles.searchButton}
                    onPress={handleSearch}
                >
                    <Feather name="search" size={24} color="white" />
                </TouchableOpacity>
            </View>

            {/* Error message */}
            {error && (
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>{error}</Text>
                    <TouchableOpacity onPress={fetchCustomers}>
                        <Text style={styles.retryText}>Retry</Text>
                    </TouchableOpacity>
                </View>
            )}

            {/* Loading indicator */}
            {isLoading ? (
                <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
            ) : (
                <FlatList
                    data={filteredCustomers}
                    keyExtractor={(item) => item._id}
                    renderItem={renderCustomerItem}
                    contentContainerStyle={styles.list}
                    ListEmptyComponent={
                        <Text style={styles.emptyText}>No customers found</Text>
                    }
                />
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        padding: scaleFont(16),
    },
    title: {
        fontSize: scaleFont(24),
        fontWeight: 'bold',
        marginBottom: scaleFont(16),
    },
    searchContainer: {
        flexDirection: 'row',
        marginBottom: scaleFont(16),
        gap: 8,
    },
    searchInput: {
        flex: 1,
        height: scaleFont(50),
        borderWidth: 1,
        borderColor: 'rgba(52, 102, 232, 0.2)',
        borderRadius: 8,
        paddingHorizontal: scaleFont(16),
        backgroundColor: 'white',
    },
    searchButton: {
        width: scaleFont(50),
        height: scaleFont(50),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        backgroundColor: '#3466E8',
    },
    list: {
        paddingBottom: scaleFont(16),
    },
    customerItem: {
        backgroundColor: 'white',
        padding: scaleFont(16),
        borderRadius: scaleFont(12),
        marginBottom: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    customerContent: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    avatarContainer: {
        width: scaleFont(40),
        height: scaleFont(40),
        borderRadius: scaleFont(20),
        backgroundColor: '#F4F4F5',
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatarText: {
        color: '#000',
        fontWeight: '600',
        fontSize: scaleFont(16),
    },
    customerName: {
        fontSize: scaleFont(16),
        fontWeight: '600',
    },
    customerPhone: {
        color: '#666',
        marginTop: 4,
        fontSize: scaleFont(15),
    },
    viewButton: {
        paddingVertical: scaleFont(8),
        paddingHorizontal: scaleFont(12),
        borderRadius: 4,
    },
    viewButtonText: {
        color: '#000',
        fontWeight: '600',
    },
    loader: {
        marginTop: scaleFont(20),
    },
    emptyText: {
        textAlign: 'center',
        marginTop: scaleFont(24),
        color: '#666',
    },
    errorContainer: {
        backgroundColor: '#ffebee',
        padding: scaleFont(16),
        borderRadius: 8,
        marginBottom: scaleFont(16),
        alignItems: 'center',
    },
    errorText: {
        color: '#c62828',
        marginBottom: 8,
    },
    retryText: {
        color: '#1976d2',
        fontWeight: 'bold',
    },
});