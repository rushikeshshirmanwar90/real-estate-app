import { StyleSheet, Dimensions } from 'react-native';

// Get screen dimensions for responsive scaling
const { width, height } = Dimensions.get('window');
const scaleFont = (size: any) => (width / 375) * size; // 375 is a standard base width (iPhone 6/7/8)

export const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff',
        borderRadius: scaleFont(10), // Slightly smaller radius
        overflow: 'hidden',
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    tabsHeader: {
        flexDirection: 'row',
        backgroundColor: '#f1f5f9', // light slate
        borderTopLeftRadius: scaleFont(10),
        borderTopRightRadius: scaleFont(10),
    },
    tabButton: {
        flex: 1,
        paddingVertical: scaleFont(12), // Reduced from 16
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 2,
        borderBottomColor: 'transparent',
    },
    activeTabButton: {
        borderBottomColor: '#1E88E5', // teal
        backgroundColor: '#ffffff',
    },
    tabButtonText: {
        fontSize: scaleFont(12), // Reduced from 14
        fontWeight: '500',
        color: '#64748b',
    },
    activeTabButtonText: {
        color: '#1E88E5',
    },
    tabsContent: {
        backgroundColor: '#ffffff',
        borderBottomLeftRadius: scaleFont(10),
        borderBottomRightRadius: scaleFont(10),
    },
    tabContent: {
        padding: scaleFont(12), // Reduced from 16
    },
    flatInfoGrid: {
        flexDirection: 'column',
    },
    flatInfoContent: {
        marginBottom: scaleFont(12), // Reduced from 16
    },
    flatTitle: {
        fontSize: scaleFont(16), // Reduced from 18
        fontWeight: 'bold',
        color: '#1E88E5',
        marginBottom: scaleFont(8), // Reduced from 10
    },
    flatDescription: {
        fontSize: scaleFont(12), // Reduced from 14
        color: '#64748b', // gray
        marginBottom: scaleFont(12), // Reduced from 16
    },
    availabilityContainer: {
        marginBottom: scaleFont(12), // Reduced from 16
    },
    availabilityHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: scaleFont(4), // Reduced from 6
    },
    availabilityLabel: {
        fontSize: scaleFont(12), // Reduced from 14
        fontWeight: '500',
        color: '#334155', // slate
    },
    availabilityCount: {
        fontSize: scaleFont(12), // Reduced from 14
        color: '#64748b', // gray
    },
    progressBarContainer: {
        height: scaleFont(6), // Reduced from 8
        backgroundColor: '#e2e8f0', // slate-200
        borderRadius: scaleFont(3), // Reduced from 4
        overflow: 'hidden',
    },
    progressBar: {
        height: '100%',
        backgroundColor: '#1E88E5',
        borderRadius: scaleFont(3), // Reduced from 4
    },
    statsContainer: {
        flexDirection: 'column', // Always column, regardless of screen size
        marginBottom: scaleFont(12), // Reduced from 16
    },
    statCard: {
        flex: 1,
        backgroundColor: '#EBF5FF',
        borderRadius: scaleFont(6), // Reduced from 8
        padding: scaleFont(12), // Reduced from 16
        marginRight: 0, // No right margin since always column
        marginBottom: scaleFont(6), // Reduced from 8, always applied
    },
    statHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: scaleFont(6), // Reduced from 8
    },
    statLabel: {
        marginLeft: scaleFont(4), // Reduced from 6
        fontSize: scaleFont(12), // Reduced from 14
        fontWeight: '500',
        color: '#334155', // slate
    },
    statValue: {
        fontSize: scaleFont(16), // Reduced from 20
        fontWeight: 'bold',
        color: '#1E88E5',
    },
    videoContainer: {
        marginTop: scaleFont(12), // Reduced from 16
    },
    videoHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: scaleFont(8), // Reduced from 10
    },
    videoLabel: {
        marginLeft: scaleFont(4), // Reduced from 6
        fontSize: scaleFont(12), // Reduced from 14
        fontWeight: '500',
        color: '#334155', // slate
    },
    videoButton: {
        backgroundColor: '#1E88E5', // teal
        paddingVertical: scaleFont(6), // Reduced from 8
        paddingHorizontal: scaleFont(12), // Reduced from 16
        borderRadius: scaleFont(4), // Reduced from 6
        alignSelf: 'flex-start',
    },
    videoButtonText: {
        color: '#ffffff',
        fontSize: scaleFont(12), // Reduced from 14
        fontWeight: '500',
    },
    carouselContainer: {
        marginTop: scaleFont(12), // Reduced from 16
        height: height * 0.28, // Slightly reduced from 0.3 for smaller footprint
        borderRadius: scaleFont(6), // Reduced from 8
        overflow: 'hidden',
    },
    carouselImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        borderRadius: scaleFont(6), // Reduced from 8
    },
    imageContainer: {
        height: height * 0.28, // Slightly reduced from 0.3
        width: '100%',
    },
    swiperContainer: {
        height: height * 0.28, // Match imageContainer height
    },
    slide: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        borderRadius: scaleFont(12), // Reduced from 15
        width: '100%',
        height: '100%',
    },
    dot: {
        backgroundColor: 'rgba(0,0,0,.2)',
        width: scaleFont(6), // Reduced from 8
        height: scaleFont(6), // Reduced from 8
        borderRadius: scaleFont(3), // Reduced from 4
        marginLeft: scaleFont(2), // Reduced from 3
        marginRight: scaleFont(2), // Reduced from 3
        marginTop: scaleFont(2), // Reduced from 3
        marginBottom: scaleFont(2), // Reduced from 3
    },
    activeDot: {
        backgroundColor: '#1E88E5',
        width: scaleFont(6), // Reduced from 8
        height: scaleFont(6), // Reduced from 8
        borderRadius: scaleFont(3), // Reduced from 4
        marginLeft: scaleFont(2), // Reduced from 3
        marginRight: scaleFont(2), // Reduced from 3
        marginTop: scaleFont(2), // Reduced from 3
        marginBottom: scaleFont(2), // Reduced from 3
    },
    pagination: {
        bottom: scaleFont(8), // Reduced from 10
    },
    buttonWrapper: {
        backgroundColor: 'transparent',
        flexDirection: 'row',
        position: 'absolute',
        top: 0,
        left: 0,
        flex: 1,
        paddingHorizontal: scaleFont(8), // Reduced from 10
        paddingVertical: scaleFont(8), // Reduced from 10
        justifyContent: 'space-between',
        alignItems: 'center',
    },
});