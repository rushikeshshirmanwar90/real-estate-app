import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Alert
} from 'react-native';

interface AddPaymentFormProps {
    onSubmit: (data: any) => void;
    onCancel: () => void;
}

interface FormErrors {
    title?: string;
    percentage?: string;
    date?: string;
}

export default function AddPaymentForm({ onSubmit, onCancel }: AddPaymentFormProps) {
    const [paymentData, setPaymentData] = useState({
        title: "",
        percentage: "",
        date: new Date().toISOString().split("T")[0],
    });
    const [errors, setErrors] = useState<FormErrors>({});

    const handleChange = (name: string, value: string) => {
        setPaymentData((prev) => ({
            ...prev,
            [name]: value,
        }));

        // Clear error when field is edited
        if (errors[name as keyof FormErrors]) {
            setErrors(prev => ({
                ...prev,
                [name]: undefined
            }));
        }
    };

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};
        let isValid = true;

        // Validate title
        if (!paymentData.title.trim()) {
            newErrors.title = "Payment title is required";
            isValid = false;
        }

        // Validate percentage
        if (!paymentData.percentage.trim()) {
            newErrors.percentage = "Percentage is required";
            isValid = false;
        } else {
            // Remove any % symbol for validation
            const percentValue = paymentData.percentage.replace('%', '').trim();
            if (isNaN(Number(percentValue))) {
                newErrors.percentage = "Percentage must be a valid number";
                isValid = false;
            } else if (Number(percentValue) <= 0 || Number(percentValue) > 100) {
                newErrors.percentage = "Percentage must be between 1 and 100";
                isValid = false;
            }
        }

        // Validate date
        if (!paymentData.date.trim()) {
            newErrors.date = "Payment date is required";
            isValid = false;
        } else {
            // Check if date is valid
            const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
            if (!dateRegex.test(paymentData.date)) {
                newErrors.date = "Date must be in YYYY-MM-DD format";
                isValid = false;
            } else {
                const dateObj = new Date(paymentData.date);
                if (isNaN(dateObj.getTime())) {
                    newErrors.date = "Invalid date";
                    isValid = false;
                } else {
                    // Check if date is in the past
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);
                    if (dateObj < today) {
                        newErrors.date = "Date cannot be in the past";
                        isValid = false;
                    }
                }
            }
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = () => {
        if (validateForm()) {
            // Format percentage to ensure consistency
            const formattedData = {
                ...paymentData,
                percentage: paymentData.percentage.includes('%')
                    ? paymentData.percentage
                    : `${paymentData.percentage}%`
            };
            onSubmit(formattedData);
        } else {
            Alert.alert("Validation Error", "Please correct the errors in the form");
        }
    };

    return (
        <View style={styles.card}>
            <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>Add New Payment</Text>
            </View>

            <View style={styles.formContainer}>
                <View style={styles.formGroup}>
                    <Text style={styles.label}>Payment Title<Text style={styles.required}>*</Text></Text>
                    <TextInput
                        style={[styles.input, errors.title ? styles.inputError : null]}
                        placeholder="e.g. Booking Amount, First Installment"
                        value={paymentData.title}
                        onChangeText={(text) => handleChange('title', text)}
                    />
                    {errors.title ? <Text style={styles.errorText}>{errors.title}</Text> : null}
                </View>

                <View style={styles.formGroup}>
                    <Text style={styles.label}>Percentage<Text style={styles.required}>*</Text></Text>
                    <TextInput
                        style={[styles.input, errors.percentage ? styles.inputError : null]}
                        placeholder="e.g. 10%, 25%"
                        value={paymentData.percentage}
                        onChangeText={(text) => handleChange('percentage', text)}
                        keyboardType="numeric"
                    />
                    {errors.percentage ? <Text style={styles.errorText}>{errors.percentage}</Text> : null}
                </View>

                <View style={styles.formGroup}>
                    <Text style={styles.label}>Payment Date<Text style={styles.required}>*</Text></Text>
                    <TextInput
                        style={[styles.input, errors.date ? styles.inputError : null]}
                        value={paymentData.date}
                        onChangeText={(text) => handleChange('date', text)}
                        placeholder="YYYY-MM-DD"
                    />
                    {errors.date ? <Text style={styles.errorText}>{errors.date}</Text> : null}
                </View>
            </View>

            <View style={styles.cardFooter}>
                <TouchableOpacity
                    style={styles.cancelButton}
                    onPress={onCancel}
                >
                    <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.submitButton}
                    onPress={handleSubmit}
                >
                    <Text style={styles.submitButtonText}>Save Payment</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#ffffff',
        borderRadius: 8,
        marginVertical: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
        overflow: 'hidden',
    },
    cardHeader: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    formContainer: {
        padding: 16,
    },
    formGroup: {
        marginBottom: 16,
    },
    label: {
        fontSize: 14,
        fontWeight: '500',
        marginBottom: 8,
    },
    required: {
        color: 'red',
        marginLeft: 4,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 4,
        paddingHorizontal: 12,
        paddingVertical: 10,
        fontSize: 16,
    },
    inputError: {
        borderColor: 'red',
    },
    errorText: {
        color: 'red',
        fontSize: 12,
        marginTop: 4,
    },
    cardFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 16,
        borderTopWidth: 1,
        borderTopColor: '#f0f0f0',
    },
    cancelButton: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 4,
        paddingVertical: 10,
        paddingHorizontal: 16,
        backgroundColor: '#fff',
    },
    cancelButtonText: {
        color: '#333',
        fontSize: 14,
        fontWeight: '500',
    },
    submitButton: {
        backgroundColor: '#111',
        borderRadius: 4,
        paddingVertical: 10,
        paddingHorizontal: 16,
    },
    submitButtonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '500',
    },
});