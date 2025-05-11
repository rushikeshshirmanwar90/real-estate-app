import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, ActivityIndicator, StyleSheet, Dimensions, Alert } from 'react-native';
import { toast } from 'sonner-native';
import * as ImagePicker from 'expo-image-picker';
import { useCameraPermissions } from 'expo-camera';
import { useLocalSearchParams } from 'expo-router';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import { domain } from '@/lib/domain';
import { User, Update, UploadProgress, ProjectInfo } from '@/types/update';
import EmptyState from '@/components/updates/EmptyState';
import UpdateCard from '@/components/updates/UpdateCard';
import FloatingButtons from '@/components/updates/FloatingButtons';
import UpdateModal from '@/components/updates/UpdateModel';
import ReviewModal from '@/components/updates/ReviewModel';

const { width } = Dimensions.get('window');

const getUserDetails = async (setUserData: React.Dispatch<React.SetStateAction<User | null>>) => {
    try {
        const userDetails = (await AsyncStorage.getItem('user')) || '';
        const data = JSON.parse(userDetails);
        setUserData(data);
    } catch (error) {
        console.error('Failed to get user details:', error);
    }
};

const HomeScreen: React.FC = () => {

    const { data } = useLocalSearchParams();
    const info: ProjectInfo = JSON.parse(String(data));
    const [images, setImages] = useState<string[]>([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [permission, requestPermission] = useCameraPermissions();
    const [uploadedData, setUploadedData] = useState<Update[]>([]);
    const [uploadProgress, setUploadProgress] = useState<UploadProgress>({});
    const [isDataLoaded, setIsDataLoaded] = useState(false);
    const [projectName, setProjectName] = useState(info.name || 'Project');
    const [userData, setUserData] = useState<User | null>(null);
    const [documentId, setDocumentId] = useState<string>('');
    const [reviewText, setReviewText] = useState('');
    const [reviewModalVisible, setReviewModalVisible] = useState(false);
    const [selectedUpdateId, setSelectedUpdateId] = useState<string | null>(null);
    const [isSubmittingReview, setIsSubmittingReview] = useState(false);
    const [isEditingReview, setIsEditingReview] = useState(false);
    const [currentReviewId, setCurrentReviewId] = useState<string | null>(null);

    useEffect(() => {
        getUserDetails(setUserData);
    }, []);

    useEffect(() => {
        fetchData();
    }, [info.sectionId]);

    const fetchData = async () => {
        try {
            setIsDataLoaded(false);
            const res = await axios.get(`${domain}/api/review-and-update/update`);
            const projectData = res.data.find(
                (project: any) => project.sectionId === info.sectionId
            );

            if (projectData) {
                setDocumentId(projectData._id);
                const updatesWithReviews = await Promise.all(
                    projectData.updates.map(async (update: Update) => {
                        try {
                            const reviewsRes = await axios.get(
                                `${domain}/api/review-and-update/review?documentId=${projectData._id}&updateId=${update._id}`
                            );
                            return {
                                ...update,
                                reviews: reviewsRes.data,
                            };
                        } catch (error) {
                            console.error(`Failed to fetch reviews for update ${update._id}`, error);
                            return update;
                        }
                    })
                );
                setUploadedData(updatesWithReviews || []);
                setProjectName(projectData.name);
            }
            setIsDataLoaded(true);
        } catch (error) {
            console.error('Failed to fetch data', error);
            setIsDataLoaded(true);
        }
    };

    const uploadToCloudinary = async (imageUri: string) => {
        try {
            const response = await fetch(imageUri);
            const blob = await response.blob();
            const formData = new FormData();
            formData.append('file', {
                uri: imageUri,
                type: 'image/jpeg',
                name: 'upload.jpg',
            } as any);
            formData.append('upload_preset', 'realEstate');

            return new Promise<string | null>((resolve, reject) => {
                const xhr = new XMLHttpRequest();
                xhr.upload.onprogress = (event) => {
                    if (event.lengthComputable) {
                        const percentComplete = Math.round((event.loaded / event.total) * 100);
                        setUploadProgress((prev) => ({
                            ...prev,
                            [imageUri]: percentComplete,
                        }));
                    }
                };
                xhr.onload = () => {
                    if (xhr.status === 200) {
                        const response = JSON.parse(xhr.responseText);
                        resolve(response.secure_url);
                    } else {
                        reject(new Error('Upload failed'));
                    }
                };
                xhr.onerror = () => reject(new Error('Network error'));
                xhr.open('POST', 'https://api.cloudinary.com/v1_1/dlcq8i2sc/image/upload');
                xhr.send(formData);
            });
        } catch (error) {
            console.error('Upload failed:', error);
            return null;
        }
    };

    const handleSubmit = async () => {
        if (!title) {
            toast.error('Please enter a title');
            return;
        }
        if (images.length === 0) {
            toast.error('Please add at least one image');
            return;
        }
        setIsLoading(true);
        const initialProgress = images.reduce((acc, uri) => {
            acc[uri] = 0;
            return acc;
        }, {} as UploadProgress);
        setUploadProgress(initialProgress);

        try {
            const uploadPromises = images.map(uploadToCloudinary);
            const uploadedUrls = await Promise.all(uploadPromises);
            const successfulUploads = uploadedUrls.filter(Boolean) as string[];
            const data = {
                updateSectionType: info.updateSectionType,
                sectionId: info.sectionId,
                name: info.name,
                updates: [{
                    images: successfulUploads,
                    title,
                    description,
                }],
            };
            const res = await axios.post(`${domain}/api/review-and-update/update`, data);
            if (res.status === 200) {
                toast.success('Successfully uploaded!');
                fetchData();
            } else {
                toast.error('Response was not successful');
            }
            setTitle('');
            setDescription('');
            setImages([]);
            setIsModalVisible(false);
            setUploadProgress({});
        } catch (error) {
            toast.error('Failed to upload images');
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const openCamera = async () => {
        if (!permission?.granted) {
            const { granted } = await ImagePicker.requestCameraPermissionsAsync();
            if (!granted) {
                toast.error('Camera permission is required');
                return;
            }
        }
        const result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 0.8,
            allowsEditing: true,
            aspect: [4, 3],
        });
        if (!result.canceled && result.assets[0]) {
            const newImages = [...images, result.assets[0].uri];
            setImages(newImages);
            setIsModalVisible(true);
        }
    };

    const openGallery = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 0.8,
            allowsMultipleSelection: true,
            selectionLimit: 5,
        });
        if (!result.canceled && result.assets.length > 0) {
            const selectedImageUris = result.assets.map((asset) => asset.uri);
            setImages([...images, ...selectedImageUris]);
            setIsModalVisible(true);
        }
    };

    const openReviewModal = (updateId: string) => {
        if (!userData) {
            toast.error('Please log in to add a review');
            return;
        }
        setSelectedUpdateId(updateId);
        setReviewText('');
        setIsEditingReview(false);
        setCurrentReviewId(null);
        setReviewModalVisible(true);
    };

    const editReview = (updateId: string, reviewId: string, currentReview: string) => {
        if (!userData) {
            toast.error('Please log in to edit reviews');
            return;
        }
        setSelectedUpdateId(updateId);
        setReviewText(currentReview);
        setIsEditingReview(true);
        setCurrentReviewId(reviewId);
        setReviewModalVisible(true);
    };

    const submitReview = async () => {
        if (!reviewText.trim()) {
            toast.error('Please enter your feedback');
            return;
        }
        if (!userData || !selectedUpdateId || !documentId) {
            toast.error('Unable to submit feedback. Please try again.');
            return;
        }
        setIsSubmittingReview(true);
        try {
            const reviewData = {
                userId: userData._id,
                firstName: userData.firstName,
                lastName: userData.lastName,
                review: reviewText,
            };
            let response;
            if (isEditingReview && currentReviewId) {
                response = await axios.put(
                    `${domain}/api/review-and-update/review?documentId=${documentId}&updateId=${selectedUpdateId}&reviewId=${currentReviewId}`,
                    reviewData
                );
                if (response.status === 200) {
                    const updatedData = [...uploadedData];
                    const updateToModify = updatedData.find((update) => update._id === selectedUpdateId);
                    if (updateToModify && updateToModify.reviews) {
                        const reviewIndex = updateToModify.reviews.findIndex(
                            (review) => review._id === currentReviewId
                        );
                        if (reviewIndex !== -1) {
                            updateToModify.reviews[reviewIndex] = {
                                ...updateToModify.reviews[reviewIndex],
                                review: reviewText,
                            };
                            setUploadedData(updatedData);
                            toast.success('Feedback updated successfully!');
                        }
                    }
                } else {
                    toast.error('Failed to update feedback. Please try again.');
                }
            } else {
                response = await axios.post(
                    `${domain}/api/review-and-update/review?documentId=${documentId}&updateId=${selectedUpdateId}`,
                    reviewData
                );
                if (response.status === 201) {
                    const updatedData = [...uploadedData];
                    const updateToModify = updatedData.find((update) => update._id === selectedUpdateId);
                    if (updateToModify) {
                        if (!updateToModify.reviews) {
                            updateToModify.reviews = [];
                        }
                        updateToModify.reviews.push(response.data.data);
                        setUploadedData(updatedData);
                        toast.success('Feedback added successfully!');
                    }
                } else {
                    toast.error('Feedback submission failed. Please try again.');
                }
            }
            setReviewModalVisible(false);
            setReviewText('');
            setSelectedUpdateId(null);
            setIsEditingReview(false);
            setCurrentReviewId(null);
        } catch (error) {
            console.error('Error handling feedback:', error);
            toast.error('Failed to process feedback');
        } finally {
            setIsSubmittingReview(false);
        }
    };

    const deleteReview = (updateId: string, reviewId: string) => {
        if (!userData) {
            toast.error('Please log in to manage reviews');
            return;
        }

        // Show confirmation dialog
        Alert.alert(
            'Confirm Deletion',
            'Are you sure you want to delete this feedback?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            const response = await axios.delete(
                                `${domain}/api/review-and-update/review?documentId=${documentId}&updateId=${updateId}&reviewId=${reviewId}`
                            );
                            if (response.status === 200) {
                                const updatedData = [...uploadedData];
                                const updateToModify = updatedData.find((update) => update._id === updateId);
                                if (updateToModify && updateToModify.reviews) {
                                    updateToModify.reviews = updateToModify.reviews.filter(
                                        (review) => review._id !== reviewId
                                    );
                                    setUploadedData(updatedData);
                                    toast.success('Feedback deleted successfully!');
                                }
                            } else {
                                toast.error('Failed to delete feedback');
                            }
                        } catch (error) {
                            console.error('Error deleting feedback:', error);
                            toast.error('Failed to delete feedback');
                        }
                    },
                },
            ],
            { cancelable: true }
        );
    };

    return (
        <SafeAreaView style={[styles.safeArea, { backgroundColor: info.backgroundColor || '#f5f5f5' }]}>
            <View style={[styles.container, { backgroundColor: info.backgroundColor || '#f5f5f5' }]}>
                <Text style={[styles.projectTitle, { color: info.textColor || '#333' }]}>{projectName}</Text>
                {isDataLoaded ? (
                    <>
                        {uploadedData.length > 0 ? (
                            <ScrollView style={styles.uploadedContainer}>
                                {uploadedData.map((update) => (
                                    <UpdateCard
                                        key={update._id}
                                        update={update}
                                        userData={userData}
                                        textColor={info.textColor}
                                        onEditReview={editReview}
                                        onDeleteReview={deleteReview}
                                        onAddReview={openReviewModal}
                                    />
                                ))}
                            </ScrollView>
                        ) : (
                            <EmptyState textColor={info.textColor} />
                        )}
                    </>
                ) : (
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size="large" color={info.textColor || '#007AFF'} />
                        <Text style={[styles.loadingText, { color: info.textColor || '#666' }]}>Loading updates...</Text>
                    </View>
                )}
                {userData?.userType === 'staff' && (
                    <FloatingButtons
                        onOpenCamera={openCamera}
                        onOpenGallery={openGallery}
                        textColor={info.textColor}
                    />
                )}
                <UpdateModal
                    isVisible={isModalVisible}
                    images={images}
                    title={title}
                    description={description}
                    isLoading={isLoading}
                    uploadProgress={uploadProgress}
                    textColor={info.textColor}
                    onClose={() => {
                        if (!isLoading) {
                            setIsModalVisible(false);
                            setImages([]);
                        }
                    }}
                    onAddMore={openGallery}
                    onRemoveImage={(index) => setImages(images.filter((_, i) => i !== index))}
                    onTitleChange={setTitle}
                    onDescriptionChange={setDescription}
                    onSubmit={handleSubmit}
                />
                <ReviewModal
                    isVisible={reviewModalVisible}
                    reviewText={reviewText}
                    isSubmitting={isSubmittingReview}
                    isEditing={isEditingReview}
                    textColor={info.textColor}
                    onClose={() => {
                        if (!isSubmittingReview) {
                            setReviewModalVisible(false);
                            setSelectedUpdateId(null);
                            setReviewText('');
                            setIsEditingReview(false);
                            setCurrentReviewId(null);
                        }
                    }}
                    onReviewChange={setReviewText}
                    onSubmit={submitReview}
                />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    container: {
        flex: 1,
        padding: 16,
        position: 'relative',
    },
    projectTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    uploadedContainer: {
        flex: 1,
        marginBottom: 16,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
    },
});

export default HomeScreen;