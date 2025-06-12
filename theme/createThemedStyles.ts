import { StyleSheet } from "react-native";
import { ThemeColors } from "./applicationTheme";
import { useTheme } from "./ThemeProvider";

/**
 * A utility function to create themed styles
 *
 * This function takes a style creator function that accepts a theme parameter,
 * and returns a function that uses the useTheme hook to get the current theme
 * and create styles with it.
 *
 * @param createStyles A function that takes the theme and returns a styles object
 * @returns A function that returns a StyleSheet with the created styles
 */
export function createThemedStyles<
  T extends StyleSheet.NamedStyles<T> | StyleSheet.NamedStyles<any>
>(createStyles: (theme: ThemeColors) => T) {
  return () => {
    const theme = useTheme();
    return StyleSheet.create(createStyles(theme));
  };
}

export default createThemedStyles;
