import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { Update, User } from '@/types/update';
import ReviewSection from './ReviewSection';
import { domain } from '@/lib/domain';

const { width } = Dimensions.get('window');

interface UpdateCardProps {
    update: Update;
    userData: User | null;
    textColor?: string;
    onEditReview: (updateId: string, reviewId: string, reviewText: string) => void;
    onDeleteReview: (updateId: string, reviewId: string) => void;
    onAddReview: (updateId: string) => void;
}

const UpdateCard: React.FC<UpdateCardProps> = ({
    update,
    userData,
    textColor = '#333',
    onEditReview,
    onDeleteReview,
    onAddReview,
}) => {
    const formatImageUrl = (url: string) => {
        if (url.startsWith('/')) {
            return `${domain}${url}`;
        }
        return url;
    };

    // Check if the current user has already submitted a review
    const hasUserReviewed = userData && update.reviews?.some((review: any) => review.userId === userData._id);

    return (
        <View style={styles.card}>
            {update.images.length > 0 && (
                <ScrollView
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    style={styles.cardImageContainer}
                >
                    {update.images.map((image: string, imgIndex: number) => (
                        <Image
                            key={imgIndex}
                            source={{ uri: formatImageUrl(image) }}
                            style={styles.cardImage}
                        />
                    ))}
                </ScrollView>
            )}
            <View style={styles.cardContent}>
                <Text style={[styles.cardTitle, { color: textColor }]}>{update.title}</Text>
                {update.description ? (
                    <Text style={[styles.cardDescription, { color: textColor }]}>{update.description}</Text>
                ) : null}
                {update.reviews && update.reviews.length > 0 && (
                    <ReviewSection
                        reviews={update.reviews}
                        userData={userData}
                        updateId={update._id}
                        textColor={textColor}
                        onEditReview={onEditReview}
                        onDeleteReview={onDeleteReview}
                        onAddReview={onAddReview}
                    />
                )}
                {!update.reviews?.length && !hasUserReviewed && (
                    <View style={styles.noReviews}>
                        <Text
                            style={[styles.addReviewButton, { color: textColor }]}
                            onPress={() => onAddReview(update._id)}
                        >
                            Add Feedback
                        </Text>
                    </View>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: 'white',
        borderRadius: 12,
        marginBottom: 16,
        overflow: 'hidden',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    cardImageContainer: {
        height: 240,
    },
    cardImage: {
        width: width - 32,
        height: 240,
        resizeMode: 'cover',
    },
    cardContent: {
        padding: 16,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    cardDescription: {
        fontSize: 14,
        marginBottom: 8,
        lineHeight: 20,
    },
    noReviews: {
        marginTop: 12,
    },
    addReviewButton: {
        fontSize: 14,
        fontWeight: '500',
    },
});

export default UpdateCard;