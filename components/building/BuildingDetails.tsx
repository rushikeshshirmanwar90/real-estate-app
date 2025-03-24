import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import { MapPin } from 'lucide-react-native';
import { Building } from '@/types/building';
import Swiper from 'react-native-swiper';

const { width: screenWidth, height } = Dimensions.get('window');
const scaleFont = (size: any) => (screenWidth / 375) * size; // 375 is a standard base width (iPhone 6/7/8)

export const BuildingDetails: React.FC<{ building: Building | undefined }> = ({ building }) => {
    if (!building) {
        return null;
    }

    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Swiper
                    style={styles.swiperContainer}
                    autoplay={true}
                    autoplayTimeout={5}
                    dot={<View style={styles.dot} />}
                    activeDot={<View style={styles.activeDot} />}
                    paginationStyle={styles.pagination}
                    buttonWrapperStyle={styles.buttonWrapper}
                >
                    {building.images.map((image, index) => (
                        <View style={styles.slide} key={index}>
                            <Image
                                source={{ uri: image }}
                                style={styles.image}
                                resizeMode="cover"
                            />
                        </View>
                    ))}
                </Swiper>
            </View>

            <View style={styles.detailsContainer}>
                <Text style={styles.buildingName}>{building.name}</Text>

                <View style={styles.locationContainer}>
                    <MapPin size={scaleFont(18)} color="#1E88E5" />
                    <Text style={styles.locationText}>{building.location}</Text>
                </View>

                <View style={styles.infoCard}>
                    <View style={styles.infoItem}>
                        <Text style={styles.infoLabel}>Total Area</Text>
                        <Text style={styles.infoValue}>{building.area} sq.ft.</Text>
                    </View>

                    <View style={styles.infoItem}>
                        <Text style={styles.infoLabel}>Flats</Text>
                        <Text style={styles.infoValue}>
                            {building.flatInfo?.reduce((acc, flat) => acc + flat.totalFlats, 0) || 0}
                        </Text>
                    </View>

                    <View style={styles.infoItem}>
                        <Text style={styles.infoLabel}>Sections</Text>
                        <Text style={styles.infoValue}>{building.section?.length || 0}</Text>
                    </View>
                </View>

                <View style={styles.descriptionContainer}>
                    <Text style={styles.descriptionTitle}>About</Text>
                    <Text style={styles.descriptionText}>{building.description}</Text>
                </View>
            </View>
        </View>
    );
};

export const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff',
        borderRadius: scaleFont(12),
        overflow: 'hidden',
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
        marginBottom: scaleFont(16),
    },
    imageContainer: {
        height: height * 0.3, // 30% of screen height (replaces fixed 250)
        width: '100%',
    },
    swiperContainer: {
        height: height * 0.3, // Match imageContainer height
    },
    slide: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        borderRadius: scaleFont(15),
        width: '100%',
        height: '100%',
    },
    dot: {
        backgroundColor: 'rgba(0,0,0,.2)',
        width: scaleFont(8),
        height: scaleFont(8),
        borderRadius: scaleFont(4),
        marginLeft: scaleFont(3),
        marginRight: scaleFont(3),
        marginTop: scaleFont(3),
        marginBottom: scaleFont(3),
    },
    activeDot: {
        backgroundColor: '#1E88E5',
        width: scaleFont(8),
        height: scaleFont(8),
        borderRadius: scaleFont(4),
        marginLeft: scaleFont(3),
        marginRight: scaleFont(3),
        marginTop: scaleFont(3),
        marginBottom: scaleFont(3),
    },
    pagination: {
        bottom: scaleFont(10),
    },
    buttonWrapper: {
        backgroundColor: 'transparent',
        flexDirection: 'row',
        position: 'absolute',
        top: 0,
        left: 0,
        flex: 1,
        paddingHorizontal: scaleFont(10),
        paddingVertical: scaleFont(10),
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    detailsContainer: {
        padding: scaleFont(16), // Responsive padding
    },
    buildingName: {
        fontSize: scaleFont(20), // Reduced from 22 for consistency with other components
        fontWeight: 'bold',
        color: '#1E88E5', // dark teal
        marginBottom: scaleFont(8),
    },
    locationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: scaleFont(16),
    },
    locationText: {
        fontSize: scaleFont(12), // Reduced from 14
        color: '#64748b', // gray
        marginLeft: scaleFont(6),
        flex: 1,
    },
    infoCard: {
        flexDirection: 'row', // Always horizontal, no conditional logic
        backgroundColor: '#EBF5FF', // slate-50
        borderRadius: scaleFont(8),
        padding: scaleFont(12),
        marginBottom: scaleFont(16),
    },
    infoItem: {
        flex: 1,
        alignItems: 'center',
    },
    infoLabel: {
        fontSize: scaleFont(10),
        color: '#64748b', // gray
        marginBottom: scaleFont(4),
    },
    infoValue: {
        fontSize: scaleFont(14),
        fontWeight: 'bold',
        color: '#1E88E5', // teal
    },
    descriptionContainer: {
        marginTop: scaleFont(8),
    },
    descriptionTitle: {
        fontSize: scaleFont(14), // Reduced from 16
        fontWeight: 'bold',
        color: '#1E88E5', // slate
        marginBottom: scaleFont(8),
    },
    descriptionText: {
        fontSize: scaleFont(12), // Reduced from 14
        lineHeight: scaleFont(18), // Reduced from 20
        color: '#64748b', // gray
    },
});