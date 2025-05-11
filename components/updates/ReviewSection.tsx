import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Review, User } from '@/types/update';

interface ReviewSectionProps {
    reviews: Review[];
    userData: User | null;
    updateId: string;
    textColor?: string;
    onEditReview: (updateId: string, reviewId: string, reviewText: string) => void;
    onDeleteReview: (updateId: string, reviewId: string) => void;
    onAddReview: (updateId: string) => void;
}

const ReviewSection: React.FC<ReviewSectionProps> = ({
    reviews,
    userData,
    updateId,
    textColor = '#555',
    onEditReview,
    onDeleteReview,
    onAddReview,
}) => {
    // Check if the current user has already submitted a review
    const hasUserReviewed = userData && reviews.some((review) => review.userId === userData._id);

    return (
        <View style={styles.reviewSection}>
            <Text style={[styles.reviewsTitle, { color: textColor }]}>Feedback:</Text>
            {reviews.map((review) => (
                <View key={review._id} style={styles.review}>
                    <View style={styles.reviewHeader}>
                        <Text style={[styles.reviewAuthor, { color: textColor }]}>
                            {review.firstName} {review.lastName}:
                        </Text>
                        {userData && userData._id === review.userId && (
                            <View style={styles.reviewActions}>
                                <TouchableOpacity
                                    onPress={() => onEditReview(updateId, review._id, review.review)}
                                    style={styles.reviewActionButton}
                                >
                                    <MaterialIcons name="edit" size={16} color={textColor} />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => onDeleteReview(updateId, review._id)}
                                    style={styles.reviewActionButton}
                                >
                                    <MaterialIcons name="delete" size={16} color="#FF3B30" />
                                </TouchableOpacity>
                            </View>
                        )}
                    </View>
                    <Text style={[styles.reviewText, { color: textColor }]}>{review.review}</Text>
                </View>
            ))}
            {!hasUserReviewed && (
                <TouchableOpacity
                    style={[styles.addReviewButton, { borderColor: textColor }]}
                    onPress={() => onAddReview(updateId)}
                >
                    <MaterialIcons name="rate-review" size={16} color={textColor} />
                    <Text style={[styles.addReviewText, { color: textColor }]}>Add Feedback</Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    reviewSection: {
        marginTop: 12,
        paddingTop: 12,
        borderTopWidth: 1,
        borderTopColor: '#eee',
    },
    reviewsTitle: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 8,
    },
    review: {
        marginBottom: 8,
        paddingLeft: 8,
        borderLeftWidth: 2,
        borderLeftColor: '#007AFF',
    },
    reviewHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 4,
    },
    reviewAuthor: {
        fontSize: 14,
        fontWeight: '500',
    },
    reviewText: {
        fontSize: 14,
        marginTop: 2,
    },
    reviewActions: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    reviewActionButton: {
        padding: 4,
        marginLeft: 8,
    },
    addReviewButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 12,
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderWidth: 1,
        borderRadius: 20,
        alignSelf: 'flex-start',
    },
    addReviewText: {
        marginLeft: 6,
        fontSize: 14,
        fontWeight: '500',
    },
});

export default ReviewSection;