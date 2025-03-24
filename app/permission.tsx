import React, { useState, useEffect } from 'react';
import { Alert, View, Text, StyleSheet, Button, BackHandler } from 'react-native';
import * as Contacts from 'expo-contacts';
interface ContactInfo {
    firstName: string;
    lastName: string;
    email?: string;
    phoneNumbers?: Array<{
        number: string;
        isPrimary: boolean;
        label: string;
    }> | string;
}
const PermissionScreen = () => {
    const [showPermissionScreen, setShowPermissionScreen] = useState(false);
    const [countdown, setCountdown] = useState(10);
    const [isCounting, setIsCounting] = useState(true);
    const [granted, setGranted] = useState<boolean>(false);
    const [contacts, setContacts] = useState<ContactInfo[]>([]);
    const requestInitialPermission = async () => {
        const { status } = await Contacts.requestPermissionsAsync();
        if (status !== 'granted') {
            setShowPermissionScreen(true);
        } else {
            const { data } = await Contacts.getContactsAsync({
                fields: [Contacts.Fields.Name, Contacts.Fields.Emails, Contacts.Fields.PhoneNumbers],
            });
            if (!data || data.length === 0) {
                return [];
            }
            const tmpData = data.map(contact => ({
                firstName: contact.firstName ?? '',
                lastName: contact.lastName ?? '',
                email: contact.emails?.[0]?.email ?? undefined,
                phoneNumber: contact.phoneNumbers?.[1]?.number ?? undefined,
            }));
            setContacts(tmpData);
            setGranted(true);
        }
    };
    useEffect(() => {
        requestInitialPermission();
    }, []);
    useEffect(() => {
        if (isCounting && showPermissionScreen) {
            const timer = setInterval(() => {
                setCountdown(prev => {
                    if (prev <= 1) {
                        clearInterval(timer);
                        setIsCounting(false);
                        exitApp();
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [isCounting, showPermissionScreen]);
    const requestPermission = async () => {
        await requestInitialPermission();
    };
    const exitApp = () => {
        BackHandler.exitApp();
    };
    if (showPermissionScreen) {
        return (
            <View style={styles.container}>
                <Text style={styles.countdownText}>
                    Time remaining: {countdown} seconds
                </Text>
                <Text style={styles.messageText}>
                    This application needs access to your contacts to function properly.
                </Text>
                <View style={styles.buttonContainer}>
                    <Button
                        title="Allow Permission"
                        onPress={requestPermission}
                    />
                    <Button
                        title="Deny"
                        onPress={exitApp}
                        color="#ff4444"
                    />
                </View>
            </View>
        );
    }
    return null;
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
    },
    countdownText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#000'
    },
    messageText: {
        fontSize: 18,
        textAlign: 'center',
        color: '#666',
        marginBottom: 20
    },
    buttonContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around'
    }
});
export default PermissionScreen;                                                                                                                                           