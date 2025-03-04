import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Dimensions, FlatList } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList, Room, Property } from '../App';
import { MaterialIcons, Ionicons, FontAwesome5, Entypo, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';

type DetailScreenRouteProp = RouteProp<RootStackParamList, 'Detail'>;
type DetailScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Detail'>;

// Mock data for rooms
const ROOMS: Room[] = [
  {
    id: '1',
    name: 'Kitchen',
    icon: 'kitchen',
    details: {
      area: '140 sq ft',
      features: [
        'Modular kitchen',
        'Granite countertop',
        'Stainless steel sink',
        'Breakfast counter',
        'Built-in oven and microwave'
      ]
    }
  },
  {
    id: '2',
    name: 'Hall',
    icon: 'weekend',
    details: {
      area: '280 sq ft',
      features: [
        'Italian marble flooring',
        'False ceiling with LED lights',
        'French windows',
        'Large balcony access',
        'Entertainment unit'
      ]
    }
  },
  {
    id: '3',
    name: 'Bedroom 1',
    icon: 'king-bed',
    details: {
      area: '200 sq ft',
      features: [
        'Walk-in closet',
        'Hardwood flooring',
        'Attached bathroom',
        'Bay window with seating',
        'Air conditioning'
      ]
    }
  },
  {
    id: '4',
    name: 'Bedroom 2',
    icon: 'bed',
    details: {
      area: '180 sq ft',
      features: [
        'Built-in wardrobe',
        'Study table',
        'Laminate flooring',
        'Air conditioning',
        'Large windows with blackout curtains'
      ]
    }
  },
  {
    id: '5',
    name: 'Bathroom',
    icon: 'bathtub',
    details: {
      area: '70 sq ft',
      features: [
        'Rain shower',
        'Jacuzzi tub',
        'Heated flooring',
        'Dual sink vanity',
        'Anti-fog mirrors'
      ]
    }
  }
];

export default function DetailScreen() {
  const route = useRoute<DetailScreenRouteProp>();
  const { property } = route.params;
  const navigation = useNavigation<DetailScreenNavigationProp>();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const screenWidth = Dimensions.get('window').width;

  const renderRoomCard = ({ item }: { item: Room }) => (
    <View style={styles.roomCardContainer}>
      <TouchableOpacity 
        style={styles.roomCard}
        onPress={() => navigation.navigate('RoomDetail', { room: item, property })}
      >
        <LinearGradient
          colors={getGradientColors(item.id)}
          style={styles.roomCardGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <MaterialIcons name={item.icon as any} size={36} color="white" />
          <Text style={styles.roomName}>{item.name}</Text>
        </LinearGradient>
        
        <View style={styles.roomCardActions}>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => navigation.navigate('RoomDetail', { room: item, property })}
          >
            <Text style={styles.actionButtonText}>View Details</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.actionButton, styles.actionButtonSecondary]}
            onPress={() => navigation.navigate('TodaysWork', { room: item, property })}
          >
            <Text style={styles.actionButtonTextSecondary}>Add Today's Work</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </View>
  );

  const getGradientColors = (id: string): string[] => {
    const colorSets = [
      ['#FF5E62', '#FF9966'], // Reddish-orange gradient
      ['#4ECDC4', '#556270'], // Teal-gray gradient
      ['#7F7FD5', '#91EAE4'], // Purple-blue gradient
      ['#D66D75', '#E29587'], // Rose gradient
      ['#6190E8', '#A7BFE8'], // Blue gradient
    ];
    
    return colorSets[Number(id) % colorSets.length];
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <StatusBar style="light" />
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Property Images */}
        <View style={styles.imageContainer}>
          <FlatList
            data={property.images}
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
          
          {/* Image Indicators */}
          <View style={styles.imageIndicators}>
            {property.images.map((_, index) => (
              <View 
                key={index} 
                style={[
                  styles.indicator, 
                  activeImageIndex === index && styles.activeIndicator
                ]} 
              />
            ))}
          </View>
        </View>
        
        {/* Property Details */}
        <View style={styles.detailsSection}>
          <Text style={styles.propertyName}>{property.name}</Text>
          
          <View style={styles.locationContainer}>
            <Ionicons name="location-sharp" size={18} color="#4d89ff" />
            <Text style={styles.locationText}>{property.location}</Text>
          </View>
          
          <Text style={styles.description}>{property.description}</Text>
          
          <View style={styles.specs}>
            <View style={styles.specItem}>
              <MaterialIcons name="square-foot" size={22} color="#4d89ff" />
              <Text style={styles.specValue}>{property.area}</Text>
              <Text style={styles.specLabel}>Area</Text>
            </View>
            
            <View style={styles.specDivider} />
            
            <View style={styles.specItem}>
              <FontAwesome5 name="home" size={20} color="#4d89ff" />
              <Text style={styles.specValue}>{property.bhk}</Text>
              <Text style={styles.specLabel}>Type</Text>
            </View>
            
            <View style={styles.specDivider} />
            
            <View style={styles.specItem}>
              <MaterialIcons name="attach-money" size={22} color="#4d89ff" />
              <Text style={styles.specValue}>{property.price}</Text>
              <Text style={styles.specLabel}>Price</Text>
            </View>
          </View>
        </View>
        
        {/* Room Cards */}
        <View style={styles.roomsSection}>
          <Text style={styles.sectionTitle}>Explore Rooms</Text>
          <FlatList
            data={ROOMS}
            renderItem={renderRoomCard}
            keyExtractor={(item) => item.id}
            numColumns={2}
            scrollEnabled={false}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f9fc',
  },
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
  detailsSection: {
    backgroundColor: 'white',
    padding: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  propertyName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  locationText: {
    fontSize: 14,
    color: '#555',
    marginLeft: 4,
  },
  description: {
    fontSize: 15,
    color: '#555',
    lineHeight: 22,
    marginBottom: 20,
  },
  specs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#f8f9fb',
    borderRadius: 12,
    padding: 16,
  },
  specItem: {
    alignItems: 'center',
    flex: 1,
  },
  specValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 8,
    marginBottom: 2,
  },
  specLabel: {
    fontSize: 12,
    color: '#888',
  },
  specDivider: {
    width: 1,
    height: '80%',
    backgroundColor: '#ddd',
    alignSelf: 'center',
  },
  roomsSection: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  roomCardContainer: {
    width: '50%',
    padding: 6,
  },
  roomCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  roomCardGradient: {
    padding: 16,
    height: 110,
    alignItems: 'center',
    justifyContent: 'center',
  },
  roomName: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 8,
  },
  roomCardActions: {
    padding: 12,
  },
  actionButton: {
    backgroundColor: '#4d89ff',
    borderRadius: 8,
    paddingVertical: 8,
    alignItems: 'center',
    marginBottom: 8,
  },
  actionButtonSecondary: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#4d89ff',
  },
  actionButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 12,
  },
  actionButtonTextSecondary: {
    color: '#4d89ff',
    fontWeight: '600',
    fontSize: 12,
  },
});