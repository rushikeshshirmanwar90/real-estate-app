import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");
const scaleFont = (size: any) => (width / 375) * size; // 375 is a standard base width

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF7ED",
  },
  contentContainer: {
    padding: scaleFont(16), // Responsive padding
  },
  backButtonContainer: {
    paddingHorizontal: scaleFont(16),
    paddingTop: scaleFont(16),
    paddingBottom: scaleFont(8),
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  backButtonText: {
    marginLeft: scaleFont(8),
    fontSize: scaleFont(14), // Reduced from 16 for consistency
    color: "#B45309",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF7ED",
  },
  loadingText: {
    fontSize: scaleFont(16), // Reduced from 18
    color: "#B45309",
  },
  notFoundContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: scaleFont(16), // Responsive padding
    backgroundColor: "#FFF7ED",
  },
  notFoundCard: {
    backgroundColor: "white",
    borderRadius: scaleFont(12),
    padding: scaleFont(20), // Reduced from 24
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    width: width > 600 ? scaleFont(300) : "90%", // Fixed width on larger screens, percentage on smaller
  },
  notFoundTitle: {
    fontSize: scaleFont(18), // Reduced from 20
    fontWeight: "bold",
    color: "#92400E",
    marginBottom: scaleFont(10), // Reduced from 12
  },
  notFoundMessage: {
    textAlign: "center",
    color: "#6B7280",
    fontSize: scaleFont(14), // Added fontSize for consistency
    marginBottom: scaleFont(20), // Reduced from 24
  },
  returnButton: {
    backgroundColor: "#D97706",
    paddingVertical: scaleFont(10), // Reduced from 12
    paddingHorizontal: scaleFont(14), // Reduced from 16
    borderRadius: scaleFont(8),
  },
  returnButtonText: {
    color: "white",
    fontWeight: "600",
    fontSize: scaleFont(14), // Added fontSize for consistency
  },
  amenitiesContainer: {
    marginTop: scaleFont(28), // Reduced from 32
    marginBottom: scaleFont(40), // Reduced from 48
  },
  amenitiesTitle: {
    fontSize: scaleFont(16), // Reduced from 20
    fontWeight: "bold",
    marginBottom: scaleFont(14), // Reduced from 16
    color: "#92400E",
  },
});
