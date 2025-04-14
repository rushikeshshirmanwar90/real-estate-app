// components/ProfileHeader.tsx
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { User } from '@/types/user';
import { scaleFont } from '@/utils/scaling';

interface ProfileHeaderProps {
    userData: User;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ userData }) => {
    return (
        <View style={styles.profileContainer}>
            <View>
                <Image style={styles.profileImage} source={require('@/assets/images/profile.png')} />
            </View>
            <Text style={styles.name}>{`${userData.firstName} ${userData.lastName}`}</Text>
            <Text style={styles.role}>{userData.userType}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    profileContainer: {
        alignItems: 'center',
        marginBottom: scaleFont(16),
    },
    profileImage: {
        width: scaleFont(150),
        height: scaleFont(150),
        borderRadius: scaleFont(75),
    },
    name: {
        fontSize: scaleFont(22),
        fontWeight: 'bold',
        color: '#000000',
        marginTop: scaleFont(8),
    },
    role: {
        fontSize: scaleFont(14),
        color: '#A56CC1',
        backgroundColor: '#EDE0EA',
        paddingHorizontal: scaleFont(8),
        paddingVertical: scaleFont(4),
        borderRadius: scaleFont(15),
        overflow: 'hidden',
        marginTop: scaleFont(4),
    },
});

export default ProfileHeader;