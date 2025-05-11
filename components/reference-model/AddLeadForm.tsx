import React, { useState, useRef, useEffect } from 'react';
import {
    View,
    TextInput,
    TouchableOpacity,
    Text,
    StyleSheet,
    Alert,
    Animated,
    Keyboard
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Lead } from './ReferenceModel';

interface AddLeadFormProps {
    onAddLead: (lead: Lead) => void;
    isUpdateMode: boolean;
    selectedLead: Lead | null;
    onUpdateLead: (lead: Lead) => void;
    onCancelUpdate: () => void;
}

const AddLeadForm: React.FC<AddLeadFormProps> = ({
    onAddLead,
    isUpdateMode,
    selectedLead,
    onUpdateLead,
    onCancelUpdate
}) => {
    const [leadName, setLeadName] = useState<string>('');
    const [leadContact, setLeadContact] = useState<string>('');
    const [isKeyboardVisible, setKeyboardVisible] = useState<boolean>(false);

    const shakeAnim = useRef<Animated.Value>(new Animated.Value(0)).current;
    const slideInAnim = useRef<Animated.Value>(new Animated.Value(isUpdateMode ? 1 : 0)).current;

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

        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);

    // Update form when entering update mode
    useEffect(() => {
        if (isUpdateMode && selectedLead) {
            setLeadName(selectedLead.name);
            setLeadContact(selectedLead.contactNumber);

            // Animation for update mode
            Animated.spring(slideInAnim, {
                toValue: 1,
                tension: 50,
                friction: 7,
                useNativeDriver: true
            }).start();
        } else {
            Animated.timing(slideInAnim, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true
            }).start();
        }
    }, [isUpdateMode, selectedLead]);

    const resetForm = () => {
        setLeadName('');
        setLeadContact('');
    };

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

    const validateInput = (): boolean => {
        if (!leadName.trim() || !leadContact.trim()) {
            // Shake animation for validation error
            Animated.sequence([
                Animated.timing(shakeAnim, { toValue: 10, duration: 100, useNativeDriver: true }),
                Animated.timing(shakeAnim, { toValue: -10, duration: 100, useNativeDriver: true }),
                Animated.timing(shakeAnim, { toValue: 10, duration: 100, useNativeDriver: true }),
                Animated.timing(shakeAnim, { toValue: 0, duration: 100, useNativeDriver: true })
            ]).start();

            Alert.alert("Validation Error", "Please enter both lead name and contact number");
            return false;
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

            Alert.alert("Invalid Contact", "Please enter a valid 10-digit phone number");
            return false;
        }

        return true;
    };

    const handleAddLead = (): void => {
        if (!validateInput()) return;

        const newLead: Lead = {
            id: `lead-${Date.now()}`,
            name: leadName.trim(),
            contactNumber: leadContact.trim()
        };

        onAddLead(newLead);
        resetForm();
    };

    const handleUpdateLead = (): void => {
        if (!validateInput() || !selectedLead) return;

        const updatedLead: Lead = {
            ...selectedLead,
            name: leadName.trim(),
            contactNumber: leadContact.trim()
        };

        onUpdateLead(updatedLead);
        resetForm();
    };

    const handleCancelUpdate = (): void => {
        resetForm();
        onCancelUpdate();
    };

    return (
        <Animated.View
            style={[
                styles.container,
                {
                    transform: [
                        { translateX: shakeAnim },
                        {
                            scale: slideInAnim.interpolate({
                                inputRange: [0, 1],
                                outputRange: [1, 1.03]
                            })
                        }
                    ],
                    backgroundColor: isUpdateMode ? '#f8f8ff' : 'white',
                    borderWidth: isUpdateMode ? 1 : 0,
                    borderColor: isUpdateMode ? '#4C9FD8' : 'transparent',
                    borderRadius: isUpdateMode ? 8 : 0,
                    margin: isUpdateMode ? 10 : 0,
                    padding: isUpdateMode ? 10 : 0
                }
            ]}
        >
            {isUpdateMode && (
                <View style={styles.updateModeHeader}>
                    <Text style={styles.updateModeTitle}>Update Lead</Text>
                </View>
            )}

            <View style={styles.formContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Lead Name"
                    value={leadName}
                    onChangeText={setLeadName}
                    placeholderTextColor="#888"
                />
                <TextInput
                    style={[styles.input, { marginBottom: isUpdateMode ? 10 : 35 }]}
                    placeholder="Lead Contact Number"
                    value={leadContact}
                    onChangeText={(text) => setLeadContact(formatPhoneNumber(text))}
                    keyboardType="phone-pad"
                    maxLength={12} // Account for format XXX-XXX-XXXX
                    placeholderTextColor="#888"
                />
            </View>

            {isUpdateMode ? (
                <View style={styles.updateButtonsContainer}>
                    <TouchableOpacity
                        style={[styles.button, styles.cancelButton]}
                        onPress={handleCancelUpdate}
                    >
                        <Text style={styles.cancelButtonText}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.button, styles.saveButton]}
                        onPress={handleUpdateLead}
                    >
                        <Text style={styles.buttonText}>Save</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <TouchableOpacity
                    style={[styles.button, styles.addButton]}
                    onPress={handleAddLead}
                    activeOpacity={0.7}
                >
                    <Ionicons name="add-circle" size={20} color="#fff" />
                    <Text style={styles.buttonText}>Add Lead</Text>
                </TouchableOpacity>
            )}
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
    },
    formContainer: {
        marginBottom: 5,
    },
    updateModeHeader: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingVertical: 5,
        marginBottom: 5,
    },
    updateModeTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#4C9FD8',
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
    button: {
        height: 46,
        borderRadius: 8,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 15,
        marginBottom: 5,
    },
    addButton: {
        backgroundColor: "#2b2b2b",
        width: "50%",
        alignSelf: "flex-end",
        marginRight: 15,
    },
    updateButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    saveButton: {
        backgroundColor: "#4C9FD8",
        flex: 1,
        marginLeft: 5,
    },
    cancelButton: {
        backgroundColor: "#f0f0f0",
        flex: 1,
        marginRight: 5,
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
    }
});

export default AddLeadForm;