// components/AddUpdateButton.tsx
import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';

interface AddUpdateButtonProps {
    onPress: () => void;
    backgroundColor: string;
    foregroundColor: string;
}

const AddUpdateButton: React.FC<AddUpdateButtonProps> = ({ onPress, backgroundColor, foregroundColor }) => {
    return (
        <TouchableOpacity style={styles.addUpdateContainer} onPress={onPress} activeOpacity={0.7}>
            <View style={[styles.addUpdateBox, {
                borderColor: `${foregroundColor}`,
                backgroundColor: `${backgroundColor}`,
            }]}>
                <View style={styles.plusIcon}>
                    <View style={[styles.plusHorizontal, { backgroundColor: foregroundColor }]} />
                    <View style={[styles.plusVertical, { backgroundColor: foregroundColor }]} />
                </View>
                <Text style={[styles.addUpdateText, { color: `${foregroundColor}` }]}>Add Updates</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    addUpdateContainer: {
        marginBottom: 24,
    },
    addUpdateBox: {
        borderWidth: 2,
        borderStyle: 'dashed',
        borderRadius: 12,
        padding: 40,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 150,
    },
    plusIcon: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
        position: 'relative',
    },
    plusHorizontal: {
        width: 30,
        height: 3,
        borderRadius: 2,
        position: 'absolute',
    },
    plusVertical: {
        width: 3,
        height: 30,
        borderRadius: 2,
        position: 'absolute',
    },
    addUpdateText: {
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center',
    },
});

export default AddUpdateButton;