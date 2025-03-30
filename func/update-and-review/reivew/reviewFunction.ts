import axios from 'axios';
import { toast } from 'sonner-native';
import { domain } from '@/lib/domain';
import { User, Review } from '@/types/update-and-review';

export const submitReview = async (
  documentId: string,
  updateId: string,
  userData: User,
  reviewText: string,
  setIsSubmittingReview: (value: boolean) => void
): Promise<Review | null> => {
  setIsSubmittingReview(true);
  try {
    const reviewData = {
      userId: userData._id,
      firstName: userData.firstName,
      lastName: userData.lastName,
      review: reviewText,
    };
    const response = await axios.post(
      `${domain}/api/review-and-update/review?documentId=${documentId}&updateId=${updateId}`,
      reviewData
    );
    if (response.status === 201) {
      toast.success('Feedback added successfully!');
      return response.data.data;
    } else {
      toast.error('Failed to add feedback');
      return null;
    }
  } catch (error) {
    console.error('Error adding feedback:', error);
    toast.error('Failed to add feedback');
    return null;
  } finally {
    setIsSubmittingReview(false);
  }
};

export const deleteReview = async (
  documentId: string,
  updateId: string,
  reviewId: string
): Promise<boolean> => {
  try {
    const response = await axios.delete(
      `${domain}/api/review-and-update/review?documentId=${documentId}&updateId=${updateId}&reviewId=${reviewId}`
    );
    if (response.status === 200) {
      toast.success('Feedback deleted successfully!');
      return true;
    } else {
      toast.error('Failed to delete feedback');
      return false;
    }
  } catch (error) {
    console.error('Error deleting feedback:', error);
    toast.error('Failed to delete feedback');
    return false;
  }
};