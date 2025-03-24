// components/PropertyImages.tsx
import React, { useState } from 'react';
import { View, Image, FlatList, StyleSheet, Dimensions } from 'react-native';

interface PropertyImagesProps {
    images: string[];
}

export default function PropertyImages({ images }: PropertyImagesProps) {
    const [activeImageIndex, setActiveImageIndex] = useState(0);
    const screenWidth = Dimensions.get('window').width;

    return (
        <View style={styles.imageContainer}>
            <FlatList
                data={images}
                renderItem={({ item }) => (
                    <Image source={{ uri: item }} style={{ width: screenWidth, height: 250 }} />
                )}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onMomentumScrollEnd={(event) => {
                    const index = Math.round(event.nativeEvent.contentOffset.x / screenWidth);
                    setActiveImageIndex(index);
                }}
                keyExtractor={(_, index) => index.toString()}
            />

            <View style={styles.imageIndicators}>
                {images.map((_, index) => (
                    <View
                        key={index}
                        style={[
                            styles.indicator,
                            activeImageIndex === index && styles.activeIndicator,
                        ]}
                    />
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    imageContainer: {
        height: 250,
        position: 'relative',
    },
    imageIndicators: {
        position: 'absolute',
        bottom: 16,
        flexDirection: 'row',
        alignSelf: 'center',
    },
    indicator: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        marginHorizontal: 4,
    },
    activeIndicator: {
        backgroundColor: '#ffffff',
        width: 10,
        height: 10,
        borderRadius: 5,
    },
});