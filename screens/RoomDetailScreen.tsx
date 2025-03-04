import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../App';
import { MaterialIcons, Entypo } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

type RoomDetailScreenRouteProp = RouteProp<RootStackParamList, 'RoomDetail'>;

export default function RoomDetailScreen() {
  const route = useRoute<RoomDetailScreenRouteProp>();
  const { room, property } = route.params;

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

  const getIconForFeature = (feature: string) => {
    const lowerFeature = feature.toLowerCase();
    
    if (lowerFeature.includes('flooring') || lowerFeature.includes('marble') || lowerFeature.includes('floor')) {
      return 'grid-on';
    } else if (lowerFeature.includes('window') || lowerFeature.includes('french')) {
      return 'window';
    } else if (lowerFeature.includes('light') || lowerFeature.includes('led')) {
      return 'lightbulb-outline';
    } else if (lowerFeature.includes('air') || lowerFeature.includes('conditioning')) {
      return 'ac-unit';
    } else if (lowerFeature.includes('sink') || lowerFeature.includes('shower') || lowerFeature.includes('tub')) {
      return 'water-damage';
    } else if (lowerFeature.includes('wardrobe') || lowerFeature.includes('closet')) {
      return 'checkroom';
    } else if (lowerFeature.includes('kitchen') || lowerFeature.includes('oven') || lowerFeature.includes('microwave')) {
      return 'microwave';
    } else if (lowerFeature.includes('counter') || lowerFeature.includes('table')) {
      return 'table-bar';
    } else if (lowerFeature.includes('mirror')) {
      return 'flip';
    } else {
      return 'check-circle-outline';
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <StatusBar style="light" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <LinearGradient
          colors={getGradientColors(room.id)}
          style={styles.header}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <MaterialIcons name={room.icon as any} size={60} color="white" />
          <Text style={styles.roomName}>{room.name}</Text>
          <Text style={styles.propertyName}>{property.name}</Text>
        </LinearGradient>

        <View style={styles.content}>
          <View style={styles.infoBox}>
            <View style={styles.infoRow}>
              <MaterialIcons name="square-foot" size={22} color="#4d89ff" />
              <Text style={styles.infoLabel}>Area:</Text>
              <Text style={styles.infoValue}>{room.details.area}</Text>
            </View>
          </View>

          <View style={styles.featuresContainer}>
            <Text style={styles.sectionTitle}>Features</Text>
            
            {room.details.features.map((feature, index) => (
              <View key={index} style={styles.featureItem}>
                <MaterialIcons 
                  name={getIconForFeature(feature) as any} 
                  size={22} 
                  color="#4d89ff" 
                />
                <Text style={styles.featureText}>{feature}</Text>
              </View>
            ))}
          </View>

          <View style={styles.additionalInfo}>
            <Text style={styles.sectionTitle}>About this {room.name}</Text>
            <Text style={styles.additionalInfoText}>
              This {room.name.toLowerCase()} is part of the {property.name} property, 
              offering {room.details.area} of space with modern design and high-quality finishes.
              It's designed to provide maximum comfort and functionality with attention to detail
              in every aspect.
            </Text>
          </View>
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
  header: {
    padding: 24,
    alignItems: 'center',
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    paddingBottom: 32,
  },
  roomName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 12,
  },
  propertyName: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    marginTop: 4,
  },
  content: {
    padding: 16,
  },
  infoBox: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    marginTop: -20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  infoLabel: {
    fontSize: 16,
    color: '#666',
    marginLeft: 8,
    marginRight: 4,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  featuresContainer: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    marginTop: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  featureText: {
    fontSize: 15,
    color: '#444',
    marginLeft: 12,
  },
  additionalInfo: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    marginTop: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  additionalInfoText: {
    fontSize: 15,
    color: '#444',
    lineHeight: 22,
  },
});