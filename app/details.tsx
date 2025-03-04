import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';


const Details = () => {
    const router = useRouter();
    const params = useLocalSearchParams();
    const { title, price, location, image } = params;

    return (
        <ScrollView style={styles.container}>
            <Image
                source={require('../assets/images/images/img (1).jpg')}
                style={styles.heroImage}
            />

            <View style={styles.content}>
                <View style={styles.header}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.price}>$ {price}/month</Text>
                </View>

                <View style={styles.locationContainer}>
                    <FontAwesome name="map-marker" size={16} color="#888" />
                    <Text style={styles.location}>{location}</Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Description</Text>
                    <Text style={styles.description}>
                        Luxurious villa featuring modern amenities, spacious living areas, and stunning views.
                        Perfect for those seeking comfort and elegance in the heart of Jakarta.
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Features</Text>
                    <View style={styles.featuresGrid}>
                        <View style={styles.featureItem}>
                            <FontAwesome name="bed" size={20} color="#162c63" />
                            <Text style={styles.featureText}>3 Bedrooms</Text>
                        </View>
                        <View style={styles.featureItem}>
                            <FontAwesome name="bath" size={20} color="#162c63" />
                            <Text style={styles.featureText}>2 Bathrooms</Text>
                        </View>
                        <View style={styles.featureItem}>
                            <FontAwesome name="car" size={20} color="#162c63" />
                            <Text style={styles.featureText}>2 Parking</Text>
                        </View>
                    </View>
                </View>

                <TouchableOpacity style={styles.contactButton}>
                    <Text style={styles.contactButtonText}>Contact Agent</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

export default Details

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    heroImage: {
        width: '100%',
        height: 300,
        resizeMode: 'cover',
    },
    content: {
        padding: 20,
    },
    header: {
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#162c63',
        marginBottom: 8,
    },
    price: {
        fontSize: 20,
        fontWeight: '600',
        color: '#3b82f6',
    },
    locationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 24,
    },

    location: {
        fontSize: 16,
        color: '#888',
        marginLeft: 8,
    },
    section: {
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#162c63',
        marginBottom: 12,
    },
    description: {
        fontSize: 16,
        color: '#666',
        lineHeight: 24,
    },
    featuresGrid: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 12,
    },
    featureItem: {
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        padding: 16,
        borderRadius: 12,
        width: '30%',
    },
    featureText: {
        marginTop: 8,
        color: '#162c63',
        fontSize: 14,
    },
    contactButton: {
        backgroundColor: '#3b82f6',
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 24,
    },
    contactButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
});