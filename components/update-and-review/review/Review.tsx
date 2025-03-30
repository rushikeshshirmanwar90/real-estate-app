import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, ActivityIndicator } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { toast } from 'sonner-native';
import axios from 'axios';
import { domain } from '@/lib/domain';
import { reviewStyles } from './reviewStyles';
import { User, Review as ReviewType } from '@/types/update-and-review';
import { submitReview, deleteReview } from '@/func/update-and-review/reivew/reviewFunction';

interface ReviewProps {
  updateId: string;
  documentId: string;
  userData: User | null;
  reviews: ReviewType[];
  onUpdateReviews: (updatedReviews: ReviewType[]) => void;
}

const Review: React.FC<ReviewProps> = ({ updateId, documentId, userData, reviews, onUpdateReviews }) => {
  const [reviewText, setReviewText] = useState('');
  const [reviewModalVisible, setReviewModalVisible] = useState(false);
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);

  const handleSubmitReview = async () => {
    if (!reviewText.trim()) {
      toast.error('Please enter your review');
      return;
    }
    if (!userData) {
      toast.error('Please log in to add a review');
      return;
    }

    const newReview = await submitReview(
      documentId,
      updateId,
      userData,
      reviewText,
      setIsSubmittingReview
    );
    if (newReview) {
      onUpdateReviews([...reviews, newReview]);
      setReviewModalVisible(false);
      setReviewText('');
    }
  };

  const handleDeleteReview = async (reviewId: string) => {
    if (!userData) {
      toast.error('Please log in to manage reviews');
      return;
    }
    const success = await deleteReview(documentId, updateId, reviewId);
    if (success) {
      onUpdateReviews(reviews.filter((review) => review._id !== reviewId));
    }
  };

  return (
    <View style={reviewStyles.reviewSection}>
      <Text style={reviewStyles.reviewsTitle}>Feedback:</Text>
      {reviews.map((review) => (
        <View key={review._id} style={reviewStyles.review}>
          <View style={reviewStyles.reviewHeader}>
            <Text style={reviewStyles.reviewAuthor}>
              {review.firstName} {review.lastName}:
            </Text>
            {userData && userData._id === review.userId && (
              <View style={reviewStyles.reviewActions}>
                <TouchableOpacity style={reviewStyles.reviewActionButton}>
                  <MaterialIcons name="edit" size={16} color="#007AFF" />
                </TouchableOpacity>
                <TouchableOpacity
                  style={reviewStyles.reviewActionButton}
                  onPress={() => handleDeleteReview(review._id)}
                >
                  <MaterialIcons name="delete" size={16} color="#FF3B30" />
                </TouchableOpacity>
              </View>
            )}
          </View>
          <Text style={reviewStyles.reviewText}>{review.review}</Text>
        </View>
      ))}
      <TouchableOpacity
        style={reviewStyles.addReviewButton}
        onPress={() => userData ? setReviewModalVisible(true) : toast.error('Please log in to add a review')}
      >
        <MaterialIcons name="rate-review" size={16} color="#007AFF" />
        <Text style={reviewStyles.addReviewText}>Add Feedback</Text>
      </TouchableOpacity>

      <Modal
        visible={reviewModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => !isSubmittingReview && setReviewModalVisible(false)}
      >
        <View style={reviewStyles.modalContainer}>
          <View style={reviewStyles.modalContent}>
            <Text style={reviewStyles.modalTitle}>Add Feedback</Text>
            <View style={reviewStyles.formContainer}>
              <Text style={reviewStyles.formLabel}>Your Feedback</Text>
              <TextInput
                style={[reviewStyles.input, reviewStyles.textArea]}
                value={reviewText}
                onChangeText={setReviewText}
                placeholder="Share your thoughts about this update..."
                multiline
                numberOfLines={4}
                editable={!isSubmittingReview}
              />
            </View>
            <View style={reviewStyles.modalButtons}>
              <TouchableOpacity
                style={[reviewStyles.modalButton, reviewStyles.cancelButton, isSubmittingReview && reviewStyles.disabledButton]}
                onPress={() => !isSubmittingReview && setReviewModalVisible(false)}
                disabled={isSubmittingReview}
              >
                <Text style={reviewStyles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[reviewStyles.modalButton, reviewStyles.submitButton, isSubmittingReview && reviewStyles.disabledButton]}
                onPress={handleSubmitReview}
                disabled={isSubmittingReview}
              >
                {isSubmittingReview ? (
                  <View style={reviewStyles.buttonLoadingContainer}>
                    <ActivityIndicator size="small" color="white" />
                    <Text style={reviewStyles.submitButtonText}>Submitting...</Text>
                  </View>
                ) : (
                  <Text style={reviewStyles.submitButtonText}>Submit Feedback</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Review;