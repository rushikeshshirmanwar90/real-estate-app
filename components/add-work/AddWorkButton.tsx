// components/AddWorkButton.tsx
import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

interface AddWorkButtonProps {
    onPress: () => void;
}

export default function AddWorkButton({ onPress }: AddWorkButtonProps) {
    return (
        <View style={styles.addButtonContainer}>
            <TouchableOpacity style={styles.addButton} onPress={onPress}>
                <LinearGradient
                    colors={['#4d89ff', '#4361ee']}
                    style={styles.addButtonGradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                >
                    <Ionicons name="add" size={24} color="white" />
                    <Text style={styles.addButtonText}>Add Today's Work</Text>
                </LinearGradient>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    addButtonContainer: {
        padding: 16,
    },
    addButton: {
        borderRadius: 12,
        overflow: 'hidden',
        shadowColor: '#4d89ff',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 5,
    },
    addButtonGradient: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 16,
    },
    addButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
        marginLeft: 8,
    },
});