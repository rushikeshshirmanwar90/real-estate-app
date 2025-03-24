import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get("window");

export const styles = StyleSheet.create({
  amenityIcon: {
    color: "#ffffff",
    width: 24,
    height: 24,
  },
  container: {
    flex: 1,
    backgroundColor: "#e6f7f5",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e6f7f5",
  },
  loadingText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#0d9488",
  },
  notFoundContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e6f7f5",
    padding: 20,
  },
  notFoundTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#0d9488",
    marginBottom: 12,
  },
  notFoundText: {
    fontSize: 16,
    color: "#64748b",
    textAlign: "center",
    marginBottom: 24,
  },
  backButton: {
    backgroundColor: "#0d9488",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  backButtonText: {
    color: "#ffffff",
    fontWeight: "600",
    fontSize: 16,
  },
  backLinkContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backIcon: {
    color: "#0d9488",
    marginRight: 8,
  },
  backLinkText: {
    color: "#0d9488",
    fontSize: 16,
    fontWeight: "500",
  },
  buildingDetailsContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    margin: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  imageSwiper: {
    height: 200,
  },
  slideBg: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
  },
  buildingImage: {
    width: "100%",
    height: "100%",
  },
  buildingInfoContainer: {
    padding: 16,
  },
  buildingName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#0d9488",
    marginBottom: 8,
  },
  buildingLocation: {
    fontSize: 16,
    color: "#64748b",
    marginBottom: 12,
  },
  buildingDescription: {
    fontSize: 16,
    color: "#334155",
    marginBottom: 16,
  },
  buildingMetaContainer: {
    flexDirection: "row",
    marginTop: 8,
  },
  buildingMetaItem: {
    backgroundColor: "#e6f7f5",
    padding: 12,
    borderRadius: 8,
    marginRight: 12,
  },
  buildingMetaLabel: {
    fontSize: 14,
    color: "#64748b",
    marginBottom: 4,
  },
  buildingMetaValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#0d9488",
  },
  sectionContainer: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#0d9488",
    marginBottom: 16,
  },
  sectionScrollView: {
    flexDirection: "row",
  },
  sectionCard: {
    width: width * 0.8,
    backgroundColor: "#ffffff",
    borderRadius: 12,
    marginRight: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionImage: {
    width: "100%",
    height: 150,
  },
  sectionContent: {
    padding: 16,
  },
  sectionName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#0d9488",
    marginBottom: 8,
  },
  sectionDescription: {
    fontSize: 14,
    color: "#64748b",
  },
  flatsContainer: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  tabContainer: {
    flexDirection: "row",
    marginBottom: 16,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    backgroundColor: "#e6f7f5",
    borderRadius: 8,
    marginRight: 8,
    alignItems: "center",
  },
  activeTabButton: {
    backgroundColor: "#0d9488",
  },
  tabButtonText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#0d9488",
  },
  activeTabButtonText: {
    color: "#ffffff",
  },
  flatInfoContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  flatTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#0d9488",
    marginBottom: 8,
  },
  flatDescription: {
    fontSize: 14,
    color: "#64748b",
    marginBottom: 16,
  },
  availabilityContainer: {
    marginBottom: 16,
  },
  availabilityTextContainer: {
    marginBottom: 8,
  },
  availabilityLabel: {
    fontSize: 14,
    color: "#64748b",
    marginBottom: 4,
  },
  availabilityValue: {
    fontSize: 14,
    color: "#334155",
  },
  progressBarContainer: {
    height: 4,
    backgroundColor: "#e6f7f5",
    borderRadius: 2,
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#0d9488",
  },
  flatStatsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  flatStatCard: {
    backgroundColor: "#e6f7f5",
    padding: 12,
    borderRadius: 8,
    flex: 1,
    marginRight: 8,
  },
  flatStatIconContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  flatStatLabel: {
    fontSize: 12,
    color: "#64748b",
    marginLeft: 4,
  },
  flatStatValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#0d9488",
  },
  videoContainer: {
    marginBottom: 16,
  },
  videoLabelContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  videoLabel: {
    fontSize: 14,
    color: "#64748b",
    marginLeft: 4,
  },
  watchVideoButton: {
    backgroundColor: "#0d9488",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  watchVideoButtonText: {
    color: "#ffffff",
    fontSize: 14,
    textAlign: "center",
  },
  flatImageSwiper: {
    height: 200,
    marginBottom: 16,
  },
  flatImage: {
    width: "100%",
    height: "100%",
  },
  amenitiesContainer: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  amenitiesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  amenityCard: {
    width: "45%",
    backgroundColor: "#ffffff",
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  amenityIconContainer: {
    width: 40,
    height: 40,
    marginBottom: 8,
  },
  amenityName: {
    fontSize: 14,
    color: "#64748b",
    textAlign: "center",
  },
});
