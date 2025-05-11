import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

// Scaling function for font sizes and other dimensions based on screen width
const scaleFont = (size: any) => (width / 375) * size; // 375 is a standard base width (iPhone 6/7/8)

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FD",
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: scaleFont(16), // Responsive padding
  },
  backButtonText: {
    marginLeft: scaleFont(8),
    fontSize: scaleFont(16), // Responsive font size
    color: "#6B48FF",
    fontWeight: "500",
  },
  sectionContainer: {
    marginTop: scaleFont(24),
    marginBottom: scaleFont(16),
    paddingHorizontal: scaleFont(16), // Responsive padding
  },
  sectionTitle: {
    fontSize: scaleFont(20), // Responsive font size
    fontWeight: "bold",
    color: "#6B48FF",
    marginBottom: scaleFont(16),
  },

  // ProjectDetails Styles
  projectCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: scaleFont(12),
    overflow: "hidden",
    marginHorizontal: scaleFont(16), // Responsive margin
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  headerContainer: {
    padding: scaleFont(16), // Responsive padding
  },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: scaleFont(8),
  },
  projectName: {
    fontSize: scaleFont(21), // Responsive font size
    fontWeight: "bold",
    color: "#483D8B",
    flex: 1,
  },
  badge: {
    paddingHorizontal: scaleFont(12),
    paddingVertical: scaleFont(6),
    borderRadius: scaleFont(16),
  },
  badgeText: {
    fontSize: scaleFont(12), // Responsive font size
    fontWeight: "600",
  },
  addressContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: scaleFont(4),
  },
  addressText: {
    marginLeft: scaleFont(8),
    fontSize: scaleFont(14), // Responsive font size
    color: "#666",
    flex: 1,
  },
  imageContainer: {
    height: height * 0.3, // 30% of screen height for responsiveness
    width: "100%",
  },
  swiperContainer: {
    height: height * 0.3, // Match imageContainer height
  },
  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  dot: {
    backgroundColor: "rgba(0,0,0,.2)",
    width: scaleFont(8),
    height: scaleFont(8),
    borderRadius: scaleFont(4),
    marginLeft: scaleFont(3),
    marginRight: scaleFont(3),
    marginTop: scaleFont(3),
    marginBottom: scaleFont(3),
  },
  activeDot: {
    backgroundColor: "#6B48FF",
    width: scaleFont(8),
    height: scaleFont(8),
    borderRadius: scaleFont(4),
    marginLeft: scaleFont(3),
    marginRight: scaleFont(3),
    marginTop: scaleFont(3),
    marginBottom: scaleFont(3),
  },
  pagination: {
    bottom: scaleFont(10),
  },
  buttonWrapper: {
    backgroundColor: "transparent",
    flexDirection: "row",
    position: "absolute",
    top: 0,
    left: 0,
    flex: 1,
    paddingHorizontal: scaleFont(10),
    paddingVertical: scaleFont(10),
    justifyContent: "space-between",
    alignItems: "center",
  },
  buttonText: {
    color: "#6B48FF",
    fontSize: scaleFont(30), // Responsive font size
    fontWeight: "bold",
    backgroundColor: "rgba(255,255,255,0.4)",
    borderRadius: scaleFont(15),
    width: scaleFont(30),
    height: scaleFont(30),
    textAlign: "center",
    lineHeight: scaleFont(28),
  },
  descriptionContainer: {
    padding: scaleFont(16), // Responsive padding
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  descriptionTitle: {
    fontSize: scaleFont(16), // Responsive font size
    fontWeight: "600",
    color: "#483D8B",
    marginBottom: scaleFont(8),
  },
  descriptionText: {
    fontSize: scaleFont(14), // Responsive font size
    lineHeight: scaleFont(20), // Responsive line height
    color: "#666",
  },
  infoContainer: {
    padding: scaleFont(16), // Responsive padding
    flexDirection: width > 600 ? "row" : "column", // Row on larger screens, column on smaller
    gap: scaleFont(10),
    justifyContent: "space-between",
  },
  infoCard: {
    flex: 1,
    backgroundColor: "#F8F9FD",
    borderRadius: scaleFont(8),
    padding: scaleFont(12), // Responsive padding
    marginHorizontal: scaleFont(4),
  },
  infoHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: scaleFont(12),
  },
  infoTitle: {
    marginLeft: scaleFont(8),
    fontSize: scaleFont(14), // Responsive font size
    fontWeight: "600",
    color: "#483D8B",
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: scaleFont(8),
  },
  infoLabel: {
    fontSize: scaleFont(14), // Responsive font size
    color: "#666",
  },
  infoValue: {
    fontSize: scaleFont(14), // Responsive font size
    fontWeight: "500",
    color: "#333",
  },

  // SectionsList Styles
  sectionsList: {
    marginBottom: scaleFont(16),
  },
  sectionCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: scaleFont(12), // Responsive padding
    borderRadius: scaleFont(10),
    marginBottom: scaleFont(10),
    borderWidth: 1,
  },
  sectionIconContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  sectionIcon: {
    width: scaleFont(40),
    height: scaleFont(40),
    borderRadius: scaleFont(20),
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  sectionInfo: {
    marginLeft: scaleFont(12),
  },
  sectionName: {
    fontSize: scaleFont(15), // Responsive font size
    fontWeight: "600",
    color: "#333",
  },
  sectionType: {
    fontSize: scaleFont(12), // Responsive font size
    color: "#666",
  },

  // ProjectAmenities Styles
  amenitiesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: scaleFont(16),
  },
  amenityCard: {
    width: width > 600 ? width / 4 - scaleFont(20) : width / 3 - scaleFont(20), // Adjust width for larger screens
    backgroundColor: "white",
    alignItems: "center",
    padding: scaleFont(12), // Responsive padding
    borderRadius: scaleFont(8),
    marginBottom: scaleFont(10),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  amenityIconContainer: {
    width: scaleFont(48),
    height: scaleFont(48),
    borderRadius: scaleFont(24),
    backgroundColor: "#F3EFFF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: scaleFont(8),
  },
  amenityName: {
    fontSize: scaleFont(12), // Responsive font size
    fontWeight: "500",
    color: "#333",
    textAlign: "center",
  },
});
