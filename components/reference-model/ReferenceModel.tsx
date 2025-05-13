import React, { useState, useRef, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Modal,
    StyleSheet,
    ScrollView,
    Animated,
    Dimensions,
    KeyboardAvoidingView,
    Platform,
    Keyboard,
    Alert
} from 'react-native';
import { FontAwesome, MaterialIcons, Ionicons } from '@expo/vector-icons';
import { User } from '@/types/user';
import { getUserDetails } from '@/lib/user';
import { getLeads } from '@/func/reference';

// Define types
interface Lead {
    _id?: string;
    name: string;
    contactNumber: string;
}

interface ReferenceCustomer {
    id: string;
    name: string;
    contactNumber: string | undefined;
}

export interface ReferenceData {
    referenceCustomer: ReferenceCustomer;
    leads: Lead[];
}

interface ReferralModalProps {
    visible: boolean;
    onClose: () => void;
    onSubmit: (data: ReferenceData) => void;
}

const ReferralModal: React.FC<ReferralModalProps> = ({ visible, onClose, onSubmit }) => {
    const [leadName, setLeadName] = useState<string>('');
    const [leadContact, setLeadContact] = useState<string>('');
    const [leads, setLeads] = useState<Lead[]>([]);
    const [isKeyboardVisible, setKeyboardVisible] = useState<boolean>(false);
    const [userData, setUserData] = useState<User | undefined>(undefined);
    const [editingLead, setEditingLead] = useState<Lead | null>(null);
    const [leadEditId, setLeadEditId] = useState<string | undefined>("");

    const slideAnim = useRef<Animated.Value>(new Animated.Value(0)).current;
    const fadeAnim = useRef<Animated.Value>(new Animated.Value(0)).current;
    const shakeAnim = useRef<Animated.Value>(new Animated.Value(0)).current;

    // Getting leads data
    useEffect(() => {
        const fetchLeads = async () => {
            const leadsData = await getLeads(userData?._id || "");
            if (leadsData) {
                console.log(leadsData[0]?.leads[0], "leads data");
                setLeads(leadsData[0]?.leads || []);
            }
        };
        if (userData) {
            fetchLeads();
        }
    }, [userData]);

    // Set up keyboard listeners
    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            () => setKeyboardVisible(true)
        );
        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => setKeyboardVisible(false)
        );

        // Animation when modal opens
        Animated.parallel([
            Animated.timing(slideAnim, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true,
            }),
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 600,
                useNativeDriver: true,
            }),
        ]).start();

        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, [slideAnim, fadeAnim]);

    useEffect(() => {
        getUserDetails(setUserData);
    }, []);

    const formatPhoneNumber = (input: string): string => {
        // Keep only digits
        let numbers = input.replace(/\D/g, '');

        // Apply pattern XXX-XXX-XXXX
        if (numbers.length > 0) {
            if (numbers.length <= 3) {
                return numbers;
            } else if (numbers.length <= 6) {
                return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
            } else {
                return `${numbers.slice(0, 3)}-${numbers.slice(3, 6)}-${numbers.slice(6, 10)}`;
            }
        }
        return numbers;
    };

    const handleAddLead = (): void => {
        if (!leadName.trim() || !leadContact.trim()) {
            // Shake animation for validation error
            Animated.sequence([
                Animated.timing(shakeAnim, { toValue: 10, duration: 100, useNativeDriver: true }),
                Animated.timing(shakeAnim, { toValue: -10, duration: 100, useNativeDriver: true }),
                Animated.timing(shakeAnim, { toValue: 10, duration: 100, useNativeDriver: true }),
                Animated.timing(shakeAnim, { toValue: 0, duration: 100, useNativeDriver: true })
            ]).start();

            return Alert.alert("Validation Error", "Please enter both lead name and contact number");
        }

        // Simple phone validation
        const phoneRegex = /^\d{10}$/;
        if (!phoneRegex.test(leadContact.replace(/[^0-9]/g, ''))) {
            Animated.sequence([
                Animated.timing(shakeAnim, { toValue: 10, duration: 100, useNativeDriver: true }),
                Animated.timing(shakeAnim, { toValue: -10, duration: 100, useNativeDriver: true }),
                Animated.timing(shakeAnim, { toValue: 10, duration: 100, useNativeDriver: true }),
                Animated.timing(shakeAnim, { toValue: 0, duration: 100, useNativeDriver: true })
            ]).start();

            return Alert.alert("Invalid Contact", "Please enter a valid 10-digit phone number");
        }

        if (editingLead) {
            // Update existing lead
            const updatedLeads = leads.map(lead =>
                lead._id === editingLead._id
                    ? { ...lead, name: leadName.trim(), contactNumber: leadContact.trim() }
                    : lead
            );
            setLeads(updatedLeads);
            setEditingLead(null);
        } else {
            // Add new lead
            const newLead: Lead = {
                name: leadName.trim(),
                contactNumber: leadContact.trim()
            };

            setLeads([...leads, newLead]);
        }

        setLeadName('');
        setLeadContact('');
    };

    const handleEditLead = (lead: Lead): void => {
        console.log("Edit clicked for lead:", lead);
        setEditingLead(lead);
        setLeadName(lead.name);
        setLeadContact(lead.contactNumber);
        setLeadEditId(lead._id);
    };

    const handleUpdateLead = () => {
        if (!leadName.trim() || !leadContact.trim()) {
            return Alert.alert("Validation Error", "Please enter both lead name and contact number");
        }

        // Simple phone validation
        const phoneRegex = /^\d{10}$/;
        if (!phoneRegex.test(leadContact.replace(/[^0-9]/g, ''))) {
            return Alert.alert("Invalid Contact", "Please enter a valid 10-digit phone number");
        }

        // Update the lead in the leads array
        const updatedLeads = leads.map(lead =>
            lead._id === leadEditId
                ? { ...lead, name: leadName.trim(), contactNumber: leadContact.trim() }
                : lead
        );

        setLeads(updatedLeads);
        setEditingLead(null);
        setLeadName('');
        setLeadContact('');
        setLeadEditId("");

        console.log("Lead updated:", {
            id: leadEditId,
            name: leadName,
            contactNumber: leadContact
        });
    };

    const cancelEditing = (): void => {
        setEditingLead(null);
        setLeadName('');
        setLeadContact('');
        setLeadEditId("");
    };

    const handleSubmit = (): void => {
        if (leads.length === 0) {
            return Alert.alert("No Leads", "Please add at least one lead before submitting");
        }

        const referenceData: ReferenceData = {
            referenceCustomer: {
                id: userData?._id || "",
                name: userData?.firstName + " " + userData?.lastName,
                contactNumber: userData?.phoneNumber
            },
            leads: leads
        };

        console.log("Submitting reference data:", referenceData);
        onSubmit(referenceData);
        onClose();
    };

    return (
        <Modal
            visible={visible}
            transparent={true}
            animationType="fade"
            onRequestClose={onClose}
        >
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.modalOverlay}
            >
                <Animated.View
                    style={[
                        styles.modalContainer,
                        {
                            transform: [
                                {
                                    translateY: slideAnim.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [300, 0],
                                    }),
                                },
                                {
                                    translateX: shakeAnim
                                }
                            ],
                            opacity: fadeAnim
                        }
                    ]}
                >
                    <View style={styles.modalHeader}>
                        <Text style={styles.modalTitle}>Reference</Text>
                    </View>

                    <ScrollView style={styles.modalContent}>
                        <View style={styles.descriptionContainer}>
                            <Ionicons name="gift" size={24} color="#FF6B6B" style={styles.giftIcon} />
                            <Text style={styles.modalDescription}>
                                Give us at least 5 leads to get the prize money upto 50,000
                            </Text>
                        </View>

                        <View style={styles.divider} />

                        <View style={styles.sectionTitle}>
                            <MaterialIcons name="people" size={20} color="#555" />
                            <Text style={styles.sectionTitleText}>Add Leads</Text>
                        </View>

                        {/* Display added leads */}
                        {leads.length > 0 && (
                            <View style={styles.leadsContainer}>
                                {leads.map((lead, index) => (
                                    <View key={lead._id} style={styles.leadItem}>
                                        <View style={styles.leadInfo}>
                                            <Text style={styles.leadNumber}>#{index + 1}</Text>
                                            <View>
                                                <Text style={styles.leadName}>{lead.name}</Text>
                                                <Text style={styles.leadContact}>{lead.contactNumber}</Text>
                                            </View>
                                        </View>
                                        <TouchableOpacity onPress={() => handleEditLead(lead)}>
                                            <FontAwesome name="edit" size={18} color="#4C9FD8" />
                                        </TouchableOpacity>
                                    </View>
                                ))}
                            </View>
                        )}

                        <View style={[
                            styles.addLeadSection,
                            editingLead && styles.editingSection
                        ]}>
                            {editingLead && (
                                <View style={styles.editingHeader}>
                                    <Text style={styles.editingTitle}>Editing Lead</Text>
                                </View>
                            )}

                            <TextInput
                                style={styles.input}
                                placeholder="Lead Name"
                                value={leadName}
                                onChangeText={setLeadName}
                                placeholderTextColor="#888"
                            />
                            <TextInput
                                style={[styles.input, { marginBottom: 15 }]}
                                placeholder="Lead Contact Number"
                                value={leadContact}
                                onChangeText={(text) => setLeadContact(formatPhoneNumber(text))}
                                keyboardType="phone-pad"
                                maxLength={12} // Account for format XXX-XXX-XXXX
                                placeholderTextColor="#888"
                            />

                            <View style={styles.buttonRow}>
                                {editingLead && (
                                    <TouchableOpacity
                                        style={[styles.button, styles.cancelButton]}
                                        onPress={cancelEditing}
                                    >
                                        <Text style={styles.cancelButtonText}>Cancel</Text>
                                    </TouchableOpacity>
                                )}

                                <TouchableOpacity
                                    style={[
                                        styles.button,
                                        styles.addButton
                                    ]}
                                    onPress={editingLead ? handleUpdateLead : handleAddLead}
                                >
                                    <Ionicons
                                        name={editingLead ? "save" : "add-circle"}
                                        size={20}
                                        color="#fff"
                                    />
                                    <Text style={styles.buttonText}>
                                        {editingLead ? "Save Changes" : "Add Lead"}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ScrollView>

                    {/* New Done Button */}
                    <TouchableOpacity
                        style={styles.doneButton}
                        onPress={handleSubmit}
                    >
                        <Text style={styles.doneButtonText}>Done</Text>
                        <Ionicons name="checkmark-circle" size={20} color="#fff" />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={onClose}>
                        <Text style={styles.skipText}>I will give it later, skip for now</Text>
                    </TouchableOpacity>
                </Animated.View>
            </KeyboardAvoidingView>
        </Modal >
    );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        width: width * 0.9,
        maxHeight: '80%',
        backgroundColor: '#fff',
        borderRadius: 16,
        overflow: 'hidden',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'center',
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
    modalContent: {
        padding: 20,
    },
    descriptionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF9F9',
        padding: 15,
        borderRadius: 10,
        marginBottom: 20,
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
    sectionTitle: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        marginTop: 10,
    },
    sectionTitleText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginLeft: 6,
    },
    input: {
        height: 50,
        backgroundColor: '#f5f5f5',
        borderRadius: 8,
        paddingHorizontal: 15,
        marginBottom: 12,
        fontSize: 15,
        color: '#333',
        borderWidth: 1,
        borderColor: '#e0e0e0',
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    button: {
        height: 46,
        borderRadius: 8,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 15,
    },
    addButton: {
        backgroundColor: "#2b2b2b",
        flex: 1,
    },
    cancelButton: {
        backgroundColor: "#f0f0f0",
        marginRight: 10,
        flex: 0.4,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
        marginLeft: 5,
    },
    cancelButtonText: {
        color: '#333',
        fontSize: 16,
        fontWeight: '600',
    },
    skipText: {
        color: '#888',
        fontSize: 14,
        textAlign: 'center',
        marginTop: 10,
        marginBottom: 15,
        textDecorationLine: 'underline',
    },
    divider: {
        height: 1,
        backgroundColor: '#f0f0f0',
        marginVertical: 0,
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
    addLeadSection: {
        marginTop: 5,
        padding: 0,
    },
    editingSection: {
        backgroundColor: '#f8f8ff',
        padding: 10,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#e0e0e0',
        marginTop: 5,
        marginBottom: 20,
    },
    editingHeader: {
        marginBottom: 10,
        paddingBottom: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
        alignItems: 'center',
    },
    editingTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#4C9FD8',
    },
    doneButton: {
        backgroundColor: '#4CAF50',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        borderRadius: 8,
        marginHorizontal: 20,
        marginBottom: 10,
    },
    doneButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        marginRight: 5,
    },
});

export default ReferralModal;