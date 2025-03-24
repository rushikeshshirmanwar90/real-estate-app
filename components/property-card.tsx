import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList, Property } from '@/types/types';

const ProjectCard: React.FC<{ property: Property }> = ({ property }) => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    const handlePropertyPress = () => {
        navigation.navigate('Detail', { property });
    };

    return (
        <TouchableOpacity style={styles.card} onPress={handlePropertyPress}>
            <Image
                source={{ uri: property.images[0] }}
                style={styles.image}
                resizeMode="cover"
            />
            <View style={styles.details}>
                <Text style={styles.title}>{property.name}</Text>
                <Text style={styles.location}>{property.location}</Text>
                <View style={styles.infoContainer}>
                    <View style={styles.infoItem}>
                        <Text style={styles.infoLabel}>Area</Text>
                        <Text style={styles.infoValue}>{property.area} sq.ft</Text>
                    </View>
                    <View style={styles.infoItem}>
                        <Text style={styles.infoLabel}>BHK</Text>
                        <Text style={styles.infoValue}>{property.bhk}</Text>
                    </View>
                    <View style={styles.infoItem}>
                        <Text style={styles.infoLabel}>Price</Text>
                        <Text style={styles.infoValue}>₹{property.price}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: 'white',
        borderRadius: 10,
        marginVertical: 10,
        marginHorizontal: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    image: {
        width: '100%',
        height: 200,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    details: {
        padding: 15,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    location: {
        fontSize: 14,
        color: '#666',
        marginBottom: 10,
    },
    infoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    infoItem: {
        alignItems: 'center',
    },
    infoLabel: {
        fontSize: 12,
        color: '#888',
    },
    infoValue: {
        fontSize: 14,
        fontWeight: 'bold',
    },
});

export default ProjectCard;