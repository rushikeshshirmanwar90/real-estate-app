import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Feather } from "@expo/vector-icons";
import { useEffect, useState } from 'react';
import { User } from '@/types/user';
import { getUserDetails } from '@/lib/user';

// Basic icons that all users will see
const baseIcons = {
    index: (props: any) => <Feather name='home' size={24} {...props} />,
    explore: (props: any) => <Feather name='compass' size={24} {...props} />,
    profile: (props: any) => <Feather name='user' size={24} {...props} />
};

// Additional icon for non-customer users
const paymentsIcon = {
    payments: (props: any) => <MaterialCommunityIcons name="contactless-payment-circle-outline" size={24} {...props} />
};

export const useTabIcons = () => {
    const [userData, setUserData] = useState<User | undefined>(undefined);
    const [icons, setIcons] = useState(baseIcons);

    useEffect(() => {
        getUserDetails(setUserData);
    }, []);

    useEffect(() => {
        if (userData) {
            if (userData.userType !== 'customer') {
                // For non-customers, include the payments icon
                setIcons({ ...baseIcons, ...paymentsIcon });
            } else {
                // For customers, only use the base icons
                setIcons(baseIcons);
            }
        }
    }, [userData]);

    return { icons, isCustomer: userData?.userType === 'customer' };
};