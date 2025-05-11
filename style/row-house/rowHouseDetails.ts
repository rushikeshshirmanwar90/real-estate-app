import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");
const scaleFont = (size: any) => (width / 375) * size; // 375 is a standard base width

export const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: scaleFont(12),
    padding: scaleFont(14), // Reduced from 16
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: scaleFont(14), // Reduced from 16
  },
  headerContainer: {
    marginBottom: scaleFont(14), // Reduced from 16
  },
  title: {
    fontSize: scaleFont(22), // Reduced from 24
    fontWeight: "bold",
    color: "#78350F",
  },
  imageContainer: {
    height: height * 0.3, // 30% of screen height (replaces fixed 250)
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
    borderRadius: scaleFont(15),
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
    backgroundColor: "#D97706",
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
    outlineColor: "#D97706",
  },
  descriptionContainer: {
    marginVertical: scaleFont(16), // Reduced from 18
  },
  sectionTitle: {
    fontSize: scaleFont(16), // Reduced from 18
    fontWeight: "600",
    color: "#92400E",
    marginBottom: scaleFont(6), // Reduced from 8
  },
  description: {
    color: "#4B5563",
    fontSize: scaleFont(14), // Added fontSize for consistency
    lineHeight: scaleFont(22), // Reduced from 24
  },
  availabilityContainer: {
    marginBottom: scaleFont(20), // Reduced from 24
  },
  availabilityHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: scaleFont(6), // Reduced from 8
  },
  availabilityText: {
    fontSize: scaleFont(12), // Reduced from 14
    fontWeight: "500",
    color: "#4B5563",
  },
  availabilityCount: {
    fontSize: scaleFont(12), // Reduced from 14
    color: "#6B7280",
  },
  progressBar: {
    width: "100%",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
    marginBottom: scaleFont(14), // Reduced from 16
    gap: scaleFont(5),
  },
  statCard: {
    width: width > 600 ? scaleFont(120) : "48%", // Fixed width on larger screens, percentage on smaller
    marginBottom: scaleFont(8), // Reduced from 10
    backgroundColor: "#FFF7E6",
    borderRadius: scaleFont(8),
    padding: scaleFont(10), // Reduced from 12
  },
  statIconContainer: {
    marginBottom: scaleFont(6), // Reduced from 8
  },
  statLabel: {
    fontSize: scaleFont(10), // Reduced from 15
    fontWeight: "600",
    color: "#92400E",
    marginBottom: scaleFont(6), // Reduced from 8
  },
  statValue: {
    fontSize: scaleFont(18), // Reduced from 28
    fontWeight: "bold",
    color: "#B45309",
  },

  backButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: scaleFont(16), // Responsive padding
  },
  backButtonText: {
    marginLeft: scaleFont(8),
    fontSize: scaleFont(16), // Responsive font size
    color: "#92400E",
    fontWeight: "500",
  },
});
