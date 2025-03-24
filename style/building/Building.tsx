import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e6f7f7', // light teal gradient equivalent
        padding: 16,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#e6f7f7',
    },
    loadingText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#0d9488',
    },
    notFoundContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#e6f7f7',
        padding: 16,
    },
    notFoundCard: {
        backgroundColor: '#ffffff',
        borderRadius: 12,
        padding: 24,
        alignItems: 'center',
        width: '100%',
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    notFoundTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#115e59', // dark teal
        marginBottom: 16,
    },
    notFoundMessage: {
        fontSize: 16,
        color: '#64748b', // gray
        textAlign: 'center',
        marginBottom: 24,
    },
    backButton: {
        backgroundColor: '#0d9488', // teal
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 6,
    },
    backButtonText: {
        color: '#ffffff',
        fontWeight: '600',
        fontSize: 16,
    },
    backLink: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    backLinkText: {
        marginLeft: 8,
        fontSize: 16,
        color: '#0d9488', // teal
        fontWeight: '500',
    },
    sectionContainer: {
        marginTop: 32,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#115e59', // dark teal
        marginBottom: 16,
    },
    sectionGrid: {
        flexDirection: 'column',
    },
    sectionCard: {
        backgroundColor: '#ffffff',
        borderRadius: 12,
        overflow: 'hidden',
        marginBottom: 16,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    sectionImage: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
    },
    sectionContent: {
        padding: 16,
    },
    sectionName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#115e59', // dark teal
        marginBottom: 8,
    },
    sectionDescription: {
        fontSize: 14,
        color: '#64748b', // gray
    },
    lastSection: {
        marginBottom: 32,
    }
});