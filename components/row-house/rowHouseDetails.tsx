import React from 'react';
import { View, Text, Image, Dimensions } from 'react-native';
import { MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import * as Progress from 'react-native-progress';
import { RowHouseProps } from '@/types/rowHouse';
import { styles } from '@/style/row-house/rowHouseDetails';
import Swiper from 'react-native-swiper';

export function RowHouseDetails({ rowHouse }: { rowHouse: RowHouseProps }) {
    const availableHouses = rowHouse.totalHouse - rowHouse.bookedHouse;
    const percentBooked = (rowHouse.bookedHouse / rowHouse.totalHouse) * 100;

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.title}>{rowHouse.name}</Text>
            </View>

            <View style={styles.imageContainer}>
                <Swiper
                    style={styles.swiperContainer}
                    autoplay={true}
                    autoplayTimeout={5}
                    dot={<View style={styles.dot} />}
                    activeDot={<View style={styles.activeDot} />}
                    paginationStyle={styles.pagination}
                    buttonWrapperStyle={{
                        ...styles.buttonWrapper,
                        backgroundColor: "transparent",
                        paddingHorizontal: 20,
                    }}
                >
                    {rowHouse.images.map((image: string, index: number) => (
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

            <View style={styles.descriptionContainer}>
                <Text style={styles.sectionTitle}>About These Row Houses</Text>
                <Text style={styles.description}>{rowHouse.description}</Text>
            </View>

            <View style={styles.availabilityContainer}>
                <View style={styles.availabilityHeader}>
                    <Text style={styles.availabilityText}>Availability</Text>
                    <Text style={styles.availabilityCount}>
                        {availableHouses} of {rowHouse.totalHouse} available
                    </Text>
                </View>
                <Progress.Bar
                    progress={percentBooked / 100}
                    width={null}
                    height={8}
                    color="#D97706"
                    unfilledColor="#E5E7EB"
                    borderWidth={0}
                    style={styles.progressBar}

                />
            </View>

            <View style={styles.statsContainer}>

                <View style={[styles.statCard]}>
                    <View style={{ flex: 1, flexDirection: "row", gap: 5 }}>
                        <View style={styles.statIconContainer}>
                            <MaterialCommunityIcons name="home" size={20} color="#B45309" />
                        </View>
                        <Text style={styles.statLabel}>Total Houses</Text>
                    </View>
                    <Text style={styles.statValue}>{rowHouse.totalHouse}</Text>
                </View>

                <View style={styles.statCard}>
                    <View style={{ flex: 1, flexDirection: "row", gap: 5 }}>
                        <View style={styles.statIconContainer}>
                            <Feather name="percent" size={20} color="#B45309" />
                        </View>
                        <Text style={styles.statLabel}>Available</Text>
                    </View>
                    <Text style={styles.statValue}>{availableHouses}</Text>
                </View>

                <View style={styles.statCard}>
                    <View style={{ flex: 1, flexDirection: "row", gap: 5 }}>
                        <View style={styles.statIconContainer}>
                            <MaterialCommunityIcons name="ruler" size={20} color="#B45309" />
                        </View>
                        <Text style={styles.statLabel}>Area per House</Text>
                    </View>
                    <Text style={styles.statValue}>{rowHouse.area} sq.ft.</Text>
                </View>

            </View>
        </View>
    );
}