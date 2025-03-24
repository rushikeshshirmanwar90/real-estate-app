import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff',
        borderRadius: 12,
        overflow: 'hidden',
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
        marginBottom: 16,
    },
    carouselContainer: {
        height: 240,
    },
    carouselImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    detailsContainer: {
        padding: 16,
    },
    buildingName: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#115e59', // dark teal
        marginBottom: 8,
    },
    locationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    locationText: {
        fontSize: 14,
        color: '#64748b', // gray
        marginLeft: 6,
        flex: 1,
    },
    infoCard: {
        flexDirection: 'row',
        backgroundColor: '#f8fafc', // slate-50
        borderRadius: 8,
        padding: 16,
        marginBottom: 16,
    },
    infoItem: {
        flex: 1,
        alignItems: 'center',
    },
    infoLabel: {
        fontSize: 12,
        color: '#64748b', // gray
        marginBottom: 4,
    },
    infoValue: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#0d9488', // teal
    },
    descriptionContainer: {
        marginTop: 8,
    },
    descriptionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#334155', // slate
        marginBottom: 8,
    },
    descriptionText: {
        fontSize: 14,
        lineHeight: 20,
        color: '#64748b', // gray
    },
});