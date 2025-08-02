import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import axios from 'axios';
import { domain } from '@/lib/domain';
import Loading from '@/components/Loading';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

interface Room {
    id: string;
    name: string;
    icon: React.ReactNode;
    area: string;
    viewColor: string;
    iconsColor: string;
    description?: string;
    images: string[];
    features: { icon: string; name: string }[];
}

export default function RoomsList() {
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const size = 35;

    const [rooms, setRooms] = useState<Room[]>([]);
    const [loading, setLoading] = useState(true);

    const colorPairs = [
        { viewColor: '#E6EEFF', iconsColor: '#4D89FF' },
        { viewColor: '#FFF4E6', iconsColor: '#FF9966' },
        { viewColor: '#E6E6FF', iconsColor: '#7B68EE' },
        { viewColor: '#FFE6F0', iconsColor: '#FF6B9E' },
        { viewColor: '#E6F4E6', iconsColor: '#4CAF50' },
    ];

    const getRoomIcon = (type: string, iconsColor: string) => {
        switch (type.toLowerCase()) {
            case 'kitchens':
                return <Ionicons name="restaurant-outline" size={size} color={iconsColor} />;
            case 'livingrooms':
                return <Ionicons name="home-outline" size={size} color={iconsColor} />;
            case 'rooms':
            case 'bedroom':
                return <Ionicons name="bed-outline" size={size} color={iconsColor} />;
            case 'bathroooms':
            case 'bathroom':
                return <Ionicons name="water-outline" size={size} color={iconsColor} />;
            case 'balconies':
                return <Ionicons name="leaf-outline" size={size} color={iconsColor} />;
            case 'other':
            default:
                return <Ionicons name="cube-outline" size={size} color={iconsColor} />;
        }
    };

    useEffect(() => {
        const fetchRoomData = async () => {
            try {
                setLoading(true);
                const res = await axios.get(`${domain}/api/room-info?flatId=${id}`);
                const data = res.data;

                if (data && data.rooms) {
                    const mappedRooms = data.rooms.map((room: any, index: number) => {
                        const colorPair = colorPairs[index % colorPairs.length];
                        return {
                            id: room._id,
                            name: room.title,
                            icon: getRoomIcon(room.type, colorPair.iconsColor),
                            area: `${room.area} sqft`,
                            viewColor: colorPair.viewColor,
                            iconsColor: colorPair.iconsColor,
                            description: room.description,
                            images: room.images,
                            features: room.features || []
                        };
                    });
                    setRooms(mappedRooms);
                }
            } catch (error) {
                console.error('Error fetching room data:', error);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchRoomData();
        }
    }, [id]);

    const RoomItem = ({ id, name, area, icon, viewColor, iconsColor, description, images, features }: Room) => (
        <View style={styles.roomItem}>
            <View style={styles.roomDetails}>
                <View style={{ backgroundColor: viewColor, padding: 10, borderRadius: 10 }}>
                    {icon}
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.roomName}>{name}</Text>
                    <Text style={styles.roomArea}>{area}</Text>
                </View>
            </View>
            <View style={styles.actionButtons}>
                <TouchableOpacity
                    onPress={() => {
                        router.push({
                            pathname: '/roomDetail/[id]',
                            params: {
                                id,
                                viewColor,
                                iconsColor,
                                name,
                                area,
                                description,
                                images: JSON.stringify(images),
                                features: JSON.stringify(features)
                            },
                        });
                    }}
                    style={[styles.viewButton, { backgroundColor: viewColor }]}
                >
                    <Text style={[styles.viewButtonText, { color: iconsColor }]}>View</Text>
                    <Ionicons name="chevron-forward" size={18} color={iconsColor} />
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.addButton}
                    // Commenting out navigation as todaysWork route doesn't exist in app directory
                    onPress={() => {
                        router.push({ pathname: "/todaysWork/[id]", params: { id: '20' } });
                    }}
                >
                    <Text style={styles.addButtonText}>+</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    if (loading) {
        return (
            <Loading />
        );
    }



    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                    <Ionicons name="chevron-back" size={28} color="#333" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Rooms</Text>
                <View style={styles.headerSpacer} />
            </View>

            <View style={styles.innerContainer}>
                {rooms.length > 0 ? (
                    rooms.map((room) => (
                        <RoomItem key={room.id} {...room} />
                    ))
                ) : (
                    <Text>No rooms found</Text>

                )}
            </View>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f7f9fc',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingTop: 20,
        paddingBottom: 10,
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    backButton: {
        padding: 8,
    },
    headerTitle: {
        fontSize: width * 0.05, // Smaller responsive font size
        fontWeight: 'bold',
        color: '#333',
    },
    headerSpacer: {
        width: 44,
    },
    innerContainer: {
        padding: 16,
        flex: 1,
    },
    roomItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
    },
    roomDetails: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    textContainer: {
        marginLeft: 12,
    },
    roomName: {
        fontSize: width * 0.045, // Smaller responsive font size
        fontWeight: 'bold',
        color: '#333',
    },
    roomArea: {
        fontSize: width * 0.035, // Smaller responsive font size
        color: '#666',
    },
    actionButtons: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    viewButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 8,
        marginRight: 8,
    },
    viewButtonText: {
        marginRight: 4,
        fontSize: width * 0.035, // Smaller responsive font size
    },
    addButton: {
        width: 40,
        height: 40,
        borderRadius: 8,
        backgroundColor: '#f0f0f0',
        justifyContent: 'center',
        alignItems: 'center',
    },
    addButtonText: {
        fontSize: width * 0.045, // Smaller responsive font size
        color: '#666',
        fontWeight: 'bold',
    },
});
