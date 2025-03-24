import * as Contacts from 'expo-contacts';
import { Alert, BackHandler, Linking } from 'react-native';

interface ContactInfo {
    firstName: string;
    lastName: string;
    email?: string;
    phoneNumbers?: Array<{
        number: string;
        isPrimary: boolean;
        label: string;
    }>;
}
export const getContact = async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    if (status !== 'granted') {
        return null;
    }

    const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.Name, Contacts.Fields.Emails, Contacts.Fields.PhoneNumbers],
    });

    if (!data || data.length === 0) {
        return [];
    }

    return data.map(contact => ({
        firstName: contact.firstName ?? '',
        lastName: contact.lastName ?? '',
        email: contact.emails?.[0]?.email ?? '',
        phoneNumber: contact.phoneNumbers?.[0]?.number ?? '', // Extract first phone number directly
        phoneNumbers: contact.phoneNumbers // Keep the original for reference if needed
    }));
};


export const showPermissionDialog = async () => {
    Alert.alert(
        'Permission Required',
        'This application needs access to your contacts to function properly. Please grant permission to continue.',
        [
            {
                text: 'Cancel',
                style: 'cancel',
                onPress: () => {
                    BackHandler.exitApp();
                }
            },
            {
                text: 'Grant Permission',
                onPress: () => Linking.openSettings()
            }
        ]
    );
}