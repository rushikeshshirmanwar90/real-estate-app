/**
 * Application Theme Configuration
 * 
 * This file contains all the color definitions and theme settings for the application.
 * To change the application's color scheme, modify the values in this file.
 */

export interface ThemeColors {
    // Primary colors
    primary: string;
    primaryDark: string;
    primaryLight: string;

    // Secondary colors
    secondary: string;
    secondaryDark: string;
    secondaryLight: string;

    // Accent colors
    accent: string;
    accentDark: string;
    accentLight: string;

    // Background colors
    background: {
        main: string;
        light: string;
        dark: string;
        card: string;
        cardAlt: string;
    };

    // Text colors
    text: {
        primary: string;
        secondary: string;
        tertiary: string;
        light: string;
        dark: string;
        muted: string;
        onPrimary: string;
        onPrimaryFaded: string;
    };

    // Status colors
    success: string;
    warning: string;
    error: string;
    info: string;

    // UI element colors
    border: {
        main: string;
        light: string;
        dark: string;
    };
    shadow: string;
    divider: string;

    // Gradient colors
    gradients: {
        primary: string[];
        secondary: string[];
        accent: string[];
        success: string[];
        warning: string[];
        error: string[];
        info: string[];
        rooms: string[][];
    };
}

// Default theme colors
const defaultTheme: ThemeColors = {
    // Primary colors - Teal/Blue theme
    primary: "#0d9488", // Teal
    primaryDark: "#115e59",
    primaryLight: "#e6f7f5",

    // Secondary colors - Purple theme
    secondary: "#6B48FF",
    secondaryDark: "#483D8B",
    secondaryLight: "#F3EFFF",

    // Accent colors - Orange theme
    accent: "#D97706", // Amber
    accentDark: "#92400E",
    accentLight: "#FFF7ED",

    // Background colors
    background: {
        main: "#F8F9FD",
        light: "#FFFFFF",
        dark: "#F0F0F0",
        card: "#FFFFFF",
        cardAlt: "#F9FAFB",
    },

    // Text colors
    text: {
        primary: "#333333",
        secondary: "#666666",
        tertiary: "#999999",
        light: "#666666",
        dark: "#000000",
        muted: "#64748b",
        onPrimary: "#FFFFFF",
        onPrimaryFaded: "rgba(255, 255, 255, 0.7)",
    },

    // Status colors
    success: "#4CD964",
    warning: "#FFA000",
    error: "#FF3B30",
    info: "#007AFF",

    // UI element colors
    border: {
        main: "#E0E0E0",
        light: "#F0F0F0",
        dark: "#CCCCCC"
    },
    shadow: "#000000",
    divider: "#F0F0F0",

    // Gradient colors
    gradients: {
        primary: ["#0d9488", "#0891b2"],
        secondary: ["#6B48FF", "#7F7FD5"],
        accent: ["#D97706", "#F59E0B"],
        success: ["#4CD964", "#34C759"],
        warning: ["#FFA000", "#FFB74D"],
        error: ["#FF3B30", "#FF6B6B"],
        info: ["#007AFF", "#4d89ff"],
        rooms: [
            ["#FF5E62", "#FF9966"],
            ["#4ECDC4", "#556270"],
            ["#7F7FD5", "#91EAE4"],
            ["#D66D75", "#E29587"],
            ["#6190E8", "#A7BFE8"],
        ],
    },
};

// Function to get room gradient colors based on ID
export const getRoomGradientColors = (id: string): string[] => {
    const index = Number(id) % defaultTheme.gradients.rooms.length;
    return defaultTheme.gradients.rooms[index];
};

// Function to get status color based on status
export const getStatusColor = (status: string): string => {
    switch (status.toLowerCase()) {
        case "active":
        case "completed":
        case "success":
            return defaultTheme.success;
        case "pending":
        case "warning":
            return defaultTheme.warning;
        case "error":
        case "failed":
            return defaultTheme.error;
        default:
            return defaultTheme.info;
    }
};

// Function to get status background color
export const getStatusBackgroundColor = (status: string): string => {
    switch (status.toLowerCase()) {
        case "active":
        case "completed":
        case "success":
            return "#E8F5E9";
        case "pending":
        case "warning":
            return "#FFF8E1";
        case "error":
        case "failed":
            return "#FFEBEE";
        default:
            return "#EBF5FF";
    }
};

// Export the default theme
export default defaultTheme;