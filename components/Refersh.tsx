import React, { useState } from 'react';
import { 
  TouchableOpacity, 
  StyleSheet, 
  View, 
  Text, 
  Animated, 
  Easing 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface RefreshButtonProps {
  onRefresh: () => void;
  size?: number;
  color?: string;
  label?: string;
  disabled?: boolean;
}

const RefreshButton: React.FC<RefreshButtonProps> = ({ 
  onRefresh, 
  size = 24, 
  color = '#3498db', 
  label = 'Refresh',
  disabled = false 
}) => {
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const spinValue = new Animated.Value(0);

  const handlePress = async () => {
    // Prevent multiple presses
    if (isRefreshing || disabled) return;
    
    setIsRefreshing(true);
    
    // Start rotation animation
    const spinAnimation = Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );
    
    spinAnimation.start();
    
    try {
      // Call the provided refresh function
      await onRefresh();
    } finally {
      // Stop animation and reset state
      spinAnimation.stop();
      spinValue.setValue(0);
      setIsRefreshing(false);
    }
  };

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  });

  return (
    <TouchableOpacity 
      onPress={handlePress} 
      style={[styles.container, disabled && styles.disabled]}
      activeOpacity={0.7}
      disabled={isRefreshing || disabled}
    >
      <View style={styles.buttonContent}>
        <Animated.View style={{ transform: [{ rotate: spin }] }}>
          <Ionicons 
            name={isRefreshing ? "refresh" : "refresh-outline"} 
            size={size} 
            color={disabled ? '#cccccc' : color} 
          />
        </Animated.View>
        <Text 
          style={[
            styles.label, 
            { color: disabled ? '#cccccc' : color }
          ]}
        >
          {label}
        </Text>
      </View>
      
      {/* Ripple effect for the button */}
      <View style={[
        styles.ripple, 
        { 
          borderColor: disabled ? '#cccccc' : color, 
          opacity: isRefreshing ? 0.3 : 0 
        }
      ]} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    padding: 12,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  disabled: {
    backgroundColor: 'rgba(245, 245, 245, 0.9)',
    shadowOpacity: 0.05,
    elevation: 1,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    marginLeft: 8,
    fontWeight: '600',
    fontSize: 16,
  },
  ripple: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderWidth: 2,
    borderRadius: 8,
  }
});

export default RefreshButton;