import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList, Property } from '../App';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

// Mock data for properties
const PROPERTIES: Property[] = [
  {
    id: '1',
    name: 'Sunshine Apartments',
    description: 'Luxurious apartment with modern amenities and beautiful sea view',
    area: '1250 sq ft',
    bhk: '2 BHK',
    price: '₹85,00,000',
    location: 'Bandra West, Mumbai',
    images: [
      `https://api.a0.dev/assets/image?text=modern%20luxury%20apartment%20living%20room%20with%20sea%20view&aspect=16:9&seed=100`,
      `https://api.a0.dev/assets/image?text=modern%20kitchen%20with%20island%20and%20stainless%20steel%20appliances&aspect=16:9&seed=101`,
      `https://api.a0.dev/assets/image?text=master%20bedroom%20with%20large%20windows%20and%20city%20view&aspect=16:9&seed=102`,
    ],
  },
  {
    id: '2',
    name: 'Royal Palms Villa',
    description: 'Spacious villa with garden, swimming pool and premium interiors',
    area: '2800 sq ft',
    bhk: '4 BHK',
    price: '₹1,75,00,000',
    location: 'Juhu, Mumbai',
    images: [
      `https://api.a0.dev/assets/image?text=luxury%20villa%20exterior%20with%20garden%20and%20swimming%20pool&aspect=16:9&seed=103`,
      `https://api.a0.dev/assets/image?text=spacious%20living%20room%20with%20high%20ceiling%20and%20luxury%20furniture&aspect=16:9&seed=104`,
      `https://api.a0.dev/assets/image?text=modern%20bathroom%20with%20bathtub%20and%20shower&aspect=16:9&seed=105`,
    ],
  },
  {
    id: '3',
    name: 'Green Valley Heights',
    description: 'Eco-friendly apartment complex with lush green surroundings',
    area: '1100 sq ft',
    bhk: '3 BHK',
    price: '₹65,00,000',
    location: 'Powai, Mumbai',
    images: [
      `https://api.a0.dev/assets/image?text=eco-friendly%20apartment%20complex%20with%20green%20surroundings&aspect=16:9&seed=106`,
      `https://api.a0.dev/assets/image?text=modern%20balcony%20with%20plants%20and%20seating&aspect=16:9&seed=107`,
      `https://api.a0.dev/assets/image?text=cozy%20bedroom%20with%20wood%20accents&aspect=16:9&seed=108`,
    ],
  },
];

export default function HomeScreen() {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const screenWidth = Dimensions.get('window').width;

  const renderPropertyCard = ({ item }: { item: Property }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('Detail', { property: item })}
      activeOpacity={0.95}
    >
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: item.images[0] }}
          style={styles.image}
        />
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.8)']}
          style={styles.gradient}
        />
        <View style={styles.priceContainer}>
          <Text style={styles.price}>{item.price}</Text>
        </View>
      </View>
      
      <View style={styles.cardBody}>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.description} numberOfLines={2}>{item.description}</Text>
        
        <View style={styles.locationContainer}>
          <Ionicons name="location-sharp" size={14} color="#4d89ff" />
          <Text style={styles.locationText}>{item.location}</Text>
        </View>
        
        <View style={styles.detailsContainer}>
          <View style={styles.detailItem}>
            <MaterialIcons name="square-foot" size={18} color="#4d89ff" />
            <Text style={styles.detailText}>{item.area}</Text>
          </View>
          
          <View style={styles.detailItem}>
            <FontAwesome5 name="home" size={16} color="#4d89ff" />
            <Text style={styles.detailText}>{item.bhk}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <StatusBar style="light" />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Find Your Dream Home</Text>
        <Text style={styles.headerSubtitle}>Explore our featured properties</Text>
      </View>
      
      <FlatList
        data={PROPERTIES}
        renderItem={renderPropertyCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f9fc',
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#f7f9fc',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  listContainer: {
    padding: 12,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    overflow: 'hidden',
  },
  imageContainer: {
    height: 200,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 80,
  },
  priceContainer: {
    position: 'absolute',
    bottom: 10,
    left: 12,
    backgroundColor: 'rgba(77, 137, 255, 0.9)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  price: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  cardBody: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 6,
  },
  description: {
    color: '#666',
    fontSize: 14,
    marginBottom: 12,
    lineHeight: 20,
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
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    marginLeft: 6,
    fontSize: 14,
    color: '#555',
    fontWeight: '500',
  },
});