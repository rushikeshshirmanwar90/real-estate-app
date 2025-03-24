import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

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

const RoomItem: React.FC<{ room: Room }> = ({ room }) => {
    const router = useRouter();
    return (
        <View style={styles.roomItem}>
            <View style={styles.roomDetails}>
                <View style={{ backgroundColor: room.viewColor, padding: 10, borderRadius: 10 }}>
                    {room.icon}
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.roomName}>{room.name}</Text>
                    <Text style={styles.roomArea}>{room.area}</Text>
                </View>
            </View>
            <View style={styles.actionButtons}>
                <TouchableOpacity
                    onPress={() => {
                        router.push({
                            pathname: '/roomDetail/[id]',
                            params: {
                                id: JSON.stringify(room)
                            },
                        });
                    }}
                    style={[styles.viewButton, { backgroundColor: room.viewColor }]}
                >
                    <Text style={[styles.viewButtonText, { color: room.iconsColor }]}>View</Text>
                    <Ionicons name="chevron-forward" size={18} color={room.iconsColor} />
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => {
                        router.push({ pathname: "/todaysWork/[id]", params: { id: '20' } });
                    }}
                >
                    <Text style={styles.addButtonText}>+</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default RoomItem

const styles = StyleSheet.create({
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
        fontSize: 19,
        fontWeight: 'bold',
        color: '#333',
    },
    roomArea: {
        fontSize: 15,
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
        fontSize: 16,
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
        fontSize: 20,
        color: '#666',
        fontWeight: 'bold',
    },
})