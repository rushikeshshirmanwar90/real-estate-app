import { Dimensions, Image, Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { FlatInfo } from '@/types/building';
import { styles } from '@/style/building/FlatInfo';
import { Home, Ruler, VideoIcon } from 'lucide-react-native';
import Swiper from 'react-native-swiper';

const screenWidth = Dimensions.get('window').width;

const renderTab = (flat: FlatInfo, activeTab: string) => {
    const isActive = activeTab === flat.title;
    const availableFlats = flat.totalFlats - flat.totalBookedFlats;
    const availabilityPercentage = (flat.totalBookedFlats / flat.totalFlats) * 100;

    if (!isActive) return null;

    return (
        <View key={flat.title} style={styles.tabContent}>
            <View style={styles.flatInfoGrid}>
                <View style={styles.flatInfoContent}>
                    <Text style={styles.flatTitle}>{flat.title}</Text>
                    <Text style={styles.flatDescription}>{flat.description}</Text>

                    <View style={styles.availabilityContainer}>
                        <View style={styles.availabilityHeader}>
                            <Text style={styles.availabilityLabel}>Availability</Text>
                            <Text style={styles.availabilityCount}>
                                {availableFlats} of {flat.totalFlats} available
                            </Text>
                        </View>
                        <View style={styles.progressBarContainer}>
                            <View
                                style={[
                                    styles.progressBar,
                                    { width: `${availabilityPercentage}%` },
                                ]}
                            />
                        </View>
                    </View>

                    <View style={styles.statsContainer}>
                        <View style={styles.statCard}>
                            <View style={styles.statHeader}>
                                <Home size={18} color="#1E88E5" />
                                <Text style={styles.statLabel}>Total Flats</Text>
                            </View>
                            <Text style={styles.statValue}>{flat.totalFlats}</Text>
                        </View>

                        <View style={styles.statCard}>
                            <View style={styles.statHeader}>
                                <Ruler size={18} color="#1E88E5" />
                                <Text style={styles.statLabel}>Area</Text>
                            </View>
                            <Text style={styles.statValue}>{flat.totalArea} sq.ft.</Text>
                        </View>
                    </View>

                    {flat.video && (
                        <View style={styles.videoContainer}>
                            <View style={styles.videoHeader}>
                                <VideoIcon size={18} color="#1E88E5" />
                                <Text style={styles.videoLabel}>Virtual Tour</Text>
                            </View>
                            <TouchableOpacity
                                style={styles.videoButton}
                                onPress={() => flat.video && Linking.openURL(flat.video)}
                            >
                                <Text style={styles.videoButtonText}>Watch Video</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>

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
                        {flat.images.map((image, index) => (
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
            </View>
        </View>
    );
};

const FlatInfoComponent: React.FC<{ flatInfo: FlatInfo[] | undefined }> = ({ flatInfo }) => {
    const [activeTab, setActiveTab] = useState(flatInfo && flatInfo.length > 0 ? flatInfo[0].title : '');

    return (
        <View style={styles.container}>
            <View style={styles.tabsHeader}>
                {flatInfo?.map((flat) => (
                    <TouchableOpacity
                        key={flat.title}
                        style={[
                            styles.tabButton,
                            activeTab === flat.title ? styles.activeTabButton : null,
                        ]}
                        onPress={() => setActiveTab(flat.title)}
                    >
                        <Text
                            style={[
                                styles.tabButtonText,
                                activeTab === flat.title ? styles.activeTabButtonText : null,
                            ]}
                        >
                            {flat.title}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            <View style={styles.tabsContent}>
                {flatInfo?.map((flat) => renderTab(flat, activeTab))}
            </View>
        </View>
    );
};

export default FlatInfoComponent;