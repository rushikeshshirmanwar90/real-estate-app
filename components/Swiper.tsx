import React from "react";
import { Image, Dimensions, StyleSheet, View } from "react-native";
import Swiper from "react-native-swiper";

const { width, height } = Dimensions.get("window");

const SwiperItem: React.FC<{ images: any[], color: any }> = ({ images, color }) => (
    <View style={{ flex: 1 }}>
        <View style={styles.swiperContainer}>
            <Swiper
                autoplay
                autoplayTimeout={2}
                loop
                index={0}
                showsPagination
                paginationStyle={styles.paginationStyle}
                dotStyle={styles.paginationStyleItem}
                activeDotStyle={[styles.paginationStyleItem, { backgroundColor: color }]}
            >
                {images.map((item, index) => (
                    <View key={index} style={styles.child}>
                        <Image
                            source={{ uri: item }}
                            style={[styles.image, { borderColor: color }]}
                        />
                    </View>
                ))}
            </Swiper>
        </View>
    </View>

);


const styles = StyleSheet.create({

    imageContainer: {
        height: 250,
        width: '100%',
    },

    slide: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    dot: {
        backgroundColor: 'rgba(95, 95, 95, 0.2)',
        width: 8,
        height: 8,
        borderRadius: 4,
        marginLeft: 3,
        marginRight: 3,
        marginTop: 3,
        marginBottom: 3,
    },
    activeDot: {
        backgroundColor: '#6B48FF',
        width: 8,
        height: 8,
        borderRadius: 4,
        marginLeft: 3,
        marginRight: 3,
        marginTop: 3,
        marginBottom: 3,
    },
    pagination: {
        bottom: 10,
    },
    buttonWrapper: {
        backgroundColor: 'transparent',
        flexDirection: 'row',
        position: 'absolute',
        top: 0,
        left: 0,
        flex: 1,
        paddingHorizontal: 10,
        paddingVertical: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    buttonText: {
        color: '#6B48FF',
        fontSize: 30,
        fontWeight: 'bold',
        backgroundColor: 'rgba(255,255,255,0.4)',
        borderRadius: 15,
        width: 30,
        height: 30,
        textAlign: 'center',
        lineHeight: 28,
    },

    swiperContainer: {
        marginVertical: 20,
        height: height * 0.4
    },

    child: {
        width: width * 0.95,
        justifyContent: "center",
        alignItems: "center",
    },

    image: {
        width: "90%",
        height: height * 0.4,
        borderRadius: 10,
        borderWidth: 2.5,
        marginHorizontal: "auto"
    },

    paginationStyle: {
        position: "absolute",
        bottom: 10,
        left: 0,
        right: 0,
        justifyContent: "center",
        alignItems: "center",
    },

    paginationStyleItem: {
        width: 10,
        height: 10,
        borderRadius: 5,
        marginHorizontal: 2,
        backgroundColor: "#333",
    },
});

export default SwiperItem;