// components/ProgressBar.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ProgressBarProps } from '@/types/updates/updates';

const ProgressBar: React.FC<ProgressBarProps> = ({ progress, color }) => {
    return (
        <View style={styles.progressContainer}>
            <View style={styles.progressBackground}>
                <View
                    style={[
                        styles.progressFill,
                        { width: `${progress}%`, backgroundColor: color }
                    ]}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    progressContainer: {
        width: '100%',
    },
    progressBackground: {
        height: 6,
        backgroundColor: '#E5E7EB',
        borderRadius: 3,
        overflow: 'hidden',
    },
    progressFill: {
        height: '100%',
        borderRadius: 3,
    },
});

export default ProgressBar;