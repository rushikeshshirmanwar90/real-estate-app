import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native";
import { BadgeProps, ButtonProps, CardProps, InputProps } from "@/types/updates/updates";

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = "default",
  style,
}) => (
  <View
    style={[
      styles.badge,
      variant === "outline"
        ? styles.badgeOutline
        : variant === "secondary"
          ? styles.badgeSecondary
          : styles.badgeDefault,
      style,
    ]}
  >
    <Text
      style={[
        styles.badgeText,
        variant === "outline"
          ? styles.badgeTextOutline
          : variant === "secondary"
            ? styles.badgeTextSecondary
            : styles.badgeTextDefault,
      ]}
    >
      {children}
    </Text>
  </View>
);

export const Button: React.FC<ButtonProps> = ({
  children,
  onPress,
  variant = "default",
  style,
  disabled,
}) => (
  <TouchableOpacity
    style={[
      styles.button,
      variant === "ghost"
        ? styles.buttonGhost
        : variant === "outline"
          ? styles.buttonOutline
          : styles.buttonDefault,
      disabled && styles.buttonDisabled,
      style,
    ]}
    onPress={onPress}
    disabled={disabled}
  >
    <Text
      style={[
        styles.buttonText,
        variant === "ghost"
          ? styles.buttonTextGhost
          : variant === "outline"
            ? styles.buttonTextOutline
            : styles.buttonTextDefault,
      ]}
    >
      {children}
    </Text>
  </TouchableOpacity>
);

export const Card: React.FC<CardProps> = ({ children, style, onPress }) => (
  <TouchableOpacity
    style={[styles.card, style]}
    onPress={onPress}
    disabled={!onPress}
    activeOpacity={onPress ? 0.7 : 1}
  >
    {children}
  </TouchableOpacity>
);

export const Input: React.FC<InputProps> = ({
  placeholder,
  value,
  onChangeText,
  style,
  multiline,
  numberOfLines,
  keyboardType = "default",
}) => (
  <TextInput
    style={[styles.input, multiline && styles.textArea, style]}
    placeholder={placeholder}
    value={value}
    onChangeText={onChangeText}
    multiline={multiline}
    numberOfLines={numberOfLines}
    keyboardType={keyboardType}
    placeholderTextColor="#9CA3AF"
  />
);

const styles = StyleSheet.create({
  // Badge Styles
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: "flex-start",
  },
  badgeDefault: {
    backgroundColor: "#3B82F6",
  },
  badgeOutline: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#D1D5DB",
  },
  badgeSecondary: {
    backgroundColor: "#F3F4F6",
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "500",
  },
  badgeTextDefault: {
    color: "#FFFFFF",
  },
  badgeTextOutline: {
    color: "#374151",
  },
  badgeTextSecondary: {
    color: "#6B7280",
  },

  // Button Styles
  button: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonDefault: {
    backgroundColor: "#3B82F6",
  },
  buttonGhost: {
    backgroundColor: "transparent",
  },
  buttonOutline: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#D1D5DB",
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "500",
  },
  buttonTextDefault: {
    color: "#FFFFFF",
  },
  buttonTextGhost: {
    color: "#374151",
  },
  buttonTextOutline: {
    color: "#374151",
  },

  // Card Styles
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    marginBottom: 16,
  },

  // Input Styles
  input: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: "#FFFFFF",
  },
  textArea: {
    minHeight: 80,
    textAlignVertical: "top",
  },
});
