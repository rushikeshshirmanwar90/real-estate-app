import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity, Modal, Image, ActivityIndicator, Dimensions, RefreshControlBase } from 'react-native';
import { toast } from 'sonner-native';
import { MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useCameraPermissions } from 'expo-camera';
import { useLocalSearchParams } from 'expo-router';
import axios from 'axios';
import { domain } from '@/lib/domain';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from "@react-native-async-storage/async-storage";

interface User {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    userType: string;
}

interface Review {
    userId: string;
    firstName: string;
    lastName: string;
    review: string;
    _id: string;
}

interface Update {
    images: string[];
    title: string;
    description: string;
    reviews?: Review[];
    _id: string;
}

interface UploadedData {
    _id: string;
    updateSectionType: string;
    sectionId: string;
    name: string;
    updates: Update[];
}

interface UploadProgress {
    [key: string]: number;
}

const { width } = Dimensions.get('window');

const getUserDetails = async (setUserData: any) => {
    const userDetails = (await AsyncStorage.getItem("user")) || "";
    const data = JSON.parse(userDetails);
    console.log(data);
    setUserData(data);
};

export default function HomeScreen() {
    const { data } = useLocalSearchParams();
    const info = JSON.parse(String(data));
    const [images, setImages] = useState<string[]>([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showCamera, setShowCamera] = useState(false);
    const [permission, requestPermission] = useCameraPermissions();
    const [uploadedData, setUploadedData] = useState<Update[]>([]);
    const [uploadProgress, setUploadProgress] = useState<UploadProgress>({});
    const [isDataLoaded, setIsDataLoaded] = useState(false);
    const [projectName, setProjectName] = useState(info.name || 'Project');
    const [userData, setUserData] = useState<User | null>(null);
    const [documentId, setDocumentId] = useState<string>('');

    // State for review functionality
    const [reviewText, setReviewText] = useState('');
    const [reviewModalVisible, setReviewModalVisible] = useState(false);
    const [selectedUpdateId, setSelectedUpdateId] = useState<string | null>(null);
    const [isSubmittingReview, setIsSubmittingReview] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [isEditingReview, setIsEditingReview] = useState(false);
    const [currentReviewId, setCurrentReviewId] = useState<string | null>(null);

    useEffect(() => {
        getUserDetails(setUserData);
    }, []);

    // Fetch existing data
    useEffect(() => {
        fetchData();
    }, [info.sectionId]);

    // Fetching the Update Data
    const fetchData = async () => {
        try {
            setIsDataLoaded(false);
            const res = await axios.get(`${domain}/api/review-and-update/update`);
            const projectData = res.data.find((project: UploadedData) =>
                project.sectionId === info.sectionId
            );

            if (projectData) {
                setDocumentId(projectData._id);
                
                // For each update, fetch its reviews
                const updatesWithReviews = await Promise.all(projectData.updates.map(async (update: Update) => {
                    try {
                        const reviewsRes = await axios.get(
                            `${domain}/api/review-and-update/review?documentId=${projectData._id}&updateId=${update._id}`
                        );
                        return {
                            ...update,
                            reviews: reviewsRes.data
                        };
                    } catch (error) {
                        console.error(`Failed to fetch reviews for update ${update._id}`, error);
                        return update;
                    }
                }));

                setUploadedData(updatesWithReviews || []);
                setProjectName(projectData.name);
            }
            setIsDataLoaded(true);
        } catch (error) {
            console.error('Failed to fetch data', error);
            setIsDataLoaded(true);
        }
    };

    // upload images to Cloudinary
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

            // Create XMLHttpRequest to track progress
            return new Promise<string | null>((resolve, reject) => {
                const xhr = new XMLHttpRequest();

                // Track upload progress
                xhr.upload.onprogress = (event) => {
                    if (event.lengthComputable) {
                        const percentComplete = Math.round((event.loaded / event.total) * 100);
                        setUploadProgress(prev => ({
                            ...prev,
                            [imageUri]: percentComplete
                        }));
                    }
                };

                xhr.onload = () => {
                    if (xhr.status === 200) {
                        const response = JSON.parse(xhr.responseText);
                        resolve(response.secure_url);
                    } else {
                        reject(new Error("Upload failed"));
                    }
                };

                xhr.onerror = () => {
                    reject(new Error("Network error"));
                };

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

        // Initialize progress for all images to 0%
        const initialProgress = images.reduce((acc, uri) => {
            acc[uri] = 0;
            return acc;
        }, {} as UploadProgress);

        setUploadProgress(initialProgress);

        try {
            const uploadPromises = images.map(image => uploadToCloudinary(image));
            const uploadedUrls = await Promise.all(uploadPromises);
            const successfulUploads = uploadedUrls.filter(Boolean) as string[];

            const data = {
                updateSectionType: info.updateSectionType,
                sectionId: info.sectionId,
                name: info.name,
                updates: [{
                    images: successfulUploads,
                    title: title,
                    description: description
                }]
            };

            const res = await axios.post(`${domain}/api/review-and-update/update`, data);

            if (res.status === 200) {
                toast.success('Successfully uploaded!');
                
                // Refresh data from server
                fetchData();
            } else {
                toast.error('Response was not successful');
            }

            setTitle('');
            setDescription('');
            setImages([]);
            setIsModalVisible(false);
            setShowCamera(false);
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
            const selectedImageUris = result.assets.map(asset => asset.uri);
            setImages([...images, ...selectedImageUris]);
            setIsModalVisible(true);
        }
    };

    // Function to open review modal for creating a new review
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

    // Function to open review modal for editing an existing review
    const editReview = async (updateId: string, reviewId: string, currentReview: string) => {
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

    // Function to submit a new review or update an existing one
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
                review: reviewText
            };

            let response;
            
            if (isEditingReview && currentReviewId) {
                // Update existing review
                response = await axios.put(
                    `${domain}/api/review-and-update/review?documentId=${documentId}&updateId=${selectedUpdateId}&reviewId=${currentReviewId}`,
                    reviewData
                );
                
                if (response.status === 200) {
                    // Update the review in the UI
                    const updatedData = [...uploadedData];
                    const updateToModify = updatedData.find(update => update._id === selectedUpdateId);
                    
                    if (updateToModify && updateToModify.reviews) {
                        const reviewIndex = updateToModify.reviews.findIndex(
                            review => review._id === currentReviewId
                        );
                        
                        if (reviewIndex !== -1) {
                            updateToModify.reviews[reviewIndex] = {
                                ...updateToModify.reviews[reviewIndex],
                                review: reviewText
                            };
                            
                            setUploadedData(updatedData);
                            toast.success('Feedback updated successfully!');
                        }
                    }
                } else {
                    toast.error('Failed to update feedback. Please try again.');
                }
            } else {
                // Create new review
                response = await axios.post(
                    `${domain}/api/review-and-update/review?documentId=${documentId}&updateId=${selectedUpdateId}`,
                    reviewData
                );

                if (response.status === 201) {
                    // Add the new review to the existing reviews in the UI
                    const updatedData = [...uploadedData];
                    const updateToModify = updatedData.find(update => update._id === selectedUpdateId);
                    
                    if (updateToModify) {
                        if (!updateToModify.reviews) {
                            updateToModify.reviews = [];
                        }

                        updateToModify.reviews.push(response.data.data);
                        setUploadedData(updatedData);
                        
                        toast.success('Feedback added successfully!');
                    }
                } else {
                    toast.error('Failed to add feedback. Please try again.');
                }
            }

            // Reset states and close modal
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

    // Function to delete a review
    const deleteReview = async (updateId: string, reviewId: string) => {
        if (!userData) {
            toast.error('Please log in to manage reviews');
            return;
        }

        try {
            setRefreshing(true);
            // Call the review API to delete the review
            const response = await axios.delete(
                `${domain}/api/review-and-update/review?documentId=${documentId}&updateId=${updateId}&reviewId=${reviewId}`
            );

            if (response.status === 200) {
                // Remove the deleted review from the UI
                const updatedData = [...uploadedData];
                const updateToModify = updatedData.find(update => update._id === updateId);
                
                if (updateToModify && updateToModify.reviews) {
                    updateToModify.reviews = updateToModify.reviews.filter(
                        review => review._id !== reviewId
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
        } finally {
            setRefreshing(false);
        }
    };

    const EmptyState = () => (
        <View style={styles.emptyStateContainer}>
            <MaterialIcons name="photo-library" size={80} color="#ccc" />
            <Text style={styles.emptyStateTitle}>No Updates Yet</Text>
            <Text style={styles.emptyStateDescription}>
                Add updates to keep track of project progress.
                Click the button below to add your first update.
            </Text>
        </View>
    );

    const formatImageUrl = (url: string) => {
        if (url.startsWith('/')) {
            return `${domain}${url}`;
        }
        return url;
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <Text style={styles.projectTitle}>{projectName}</Text>
                {isDataLoaded ? (
                    <>
                        {uploadedData.length > 0 ? (
                            <ScrollView style={styles.uploadedContainer}>
                                {uploadedData.map((update) => (
                                    <View key={update._id} style={styles.card}>
                                        {update.images.length > 0 && (
                                            <ScrollView
                                                horizontal
                                                pagingEnabled
                                                showsHorizontalScrollIndicator={false}
                                                style={styles.cardImageContainer}
                                            >
                                                {update.images.map((image, imgIndex) => (
                                                    <Image
                                                        key={imgIndex}
                                                        source={{ uri: formatImageUrl(image) }}
                                                        style={styles.cardImage}
                                                    />
                                                ))}
                                            </ScrollView>
                                        )}
                                        <View style={styles.cardContent}>
                                            <Text style={styles.cardTitle}>{update.title}</Text>
                                            {update.description ? (
                                                <Text style={styles.cardDescription}>{update.description}</Text>
                                            ) : null}

                                            {update.reviews && update.reviews.length > 0 && (
                                                <View style={styles.reviewSection}>
                                                    <Text style={styles.reviewsTitle}>Feedback:</Text>
                                                    {update.reviews.map((review) => (
                                                        <View key={review._id} style={styles.review}>
                                                            <View style={styles.reviewHeader}>
                                                                <Text style={styles.reviewAuthor}>
                                                                    {review.firstName} {review.lastName}:
                                                                </Text>
                                                                
                                                                {/* Show edit/delete options if the review belongs to current user */}
                                                                {userData && userData._id === review.userId && (
                                                                    <View style={styles.reviewActions}>
                                                                        <TouchableOpacity 
                                                                            onPress={() => editReview(update._id, review._id, review.review)}
                                                                            style={styles.reviewActionButton}
                                                                        >
                                                                            <MaterialIcons name="edit" size={16} color="#007AFF" />
                                                                        </TouchableOpacity>
                                                                        <TouchableOpacity 
                                                                            onPress={() => deleteReview(update._id, review._id)}
                                                                            style={styles.reviewActionButton}
                                                                        >
                                                                            <MaterialIcons name="delete" size={16} color="#FF3B30" />
                                                                        </TouchableOpacity>
                                                                    </View>
                                                                )}
                                                            </View>
                                                            <Text style={styles.reviewText}>{review.review}</Text>
                                                        </View>
                                                    ))}
                                                </View>
                                            )}

                                            {/* Add Review Button */}
                                            <TouchableOpacity
                                                style={styles.addReviewButton}
                                                onPress={() => openReviewModal(update._id)}
                                            >
                                                <MaterialIcons name="rate-review" size={16} color="#007AFF" />
                                                <Text style={styles.addReviewText}>Add Feedback</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                ))}
                            </ScrollView>
                        ) : (
                            <EmptyState />
                        )}
                    </>
                ) : (
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size="large" color="#007AFF" />
                        <Text style={styles.loadingText}>Loading updates...</Text>
                    </View>
                )}

                {
                    userData?.userType == 'staff' ? (<View style={styles.buttonsContainer}>

                        <TouchableOpacity
                            style={styles.floatingButton}
                            onPress={openCamera}
                        >
                            <MaterialIcons name="add-a-photo" size={28} color="white" />
                        </TouchableOpacity>
    
                        <TouchableOpacity
                            style={[styles.floatingButton, styles.galleryButton]}
                            onPress={openGallery}
                        >
                            <MaterialIcons name="photo-library" size={28} color="white" />
                        </TouchableOpacity>
                    </View>) : <></>
                }

                {/* Update Modal */}
                <Modal
                    visible={isModalVisible}
                    transparent
                    animationType="slide"
                    onRequestClose={() => {
                        if (!isLoading) {
                            setIsModalVisible(false);
                        }
                    }}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalTitle}>Add Update</Text>
                            <ScrollView horizontal style={styles.imagePreviewContainer}>
                                {images.map((image, index) => (
                                    <View key={index} style={styles.previewImageContainer}>
                                        <Image
                                            source={{ uri: image }}
                                            style={styles.previewImage}
                                        />
                                        {isLoading ? (
                                            <View style={styles.progressOverlay}>
                                                <Text style={styles.progressText}>
                                                    {uploadProgress[image] || 0}%
                                                </Text>
                                                <View style={[
                                                    styles.progressBar,
                                                    { width: `${uploadProgress[image] || 0}%` }
                                                ]} />
                                            </View>
                                        ) : (
                                            <TouchableOpacity
                                                style={styles.removeImageButton}
                                                onPress={() => setImages(images.filter((_, i) => i !== index))}
                                            >
                                                <MaterialIcons name="close" size={20} color="white" />
                                            </TouchableOpacity>
                                        )}
                                    </View>
                                ))}
                                {!isLoading && (
                                    <TouchableOpacity
                                        style={styles.addMoreButton}
                                        onPress={openGallery}
                                    >
                                        <MaterialIcons name="photo-library" size={32} color="#007AFF" />
                                        <Text style={styles.addMoreText}>Add More</Text>
                                    </TouchableOpacity>
                                )}
                            </ScrollView>

                            <View style={styles.formContainer}>
                                <Text style={styles.formLabel}>Title *</Text>
                                <TextInput
                                    style={styles.input}
                                    value={title}
                                    onChangeText={setTitle}
                                    placeholder="Enter title for this update"
                                    editable={!isLoading}
                                />

                                <Text style={styles.formLabel}>Description</Text>
                                <TextInput
                                    style={[styles.input, styles.textArea]}
                                    value={description}
                                    onChangeText={setDescription}
                                    placeholder="Add details about this update (optional)"
                                    multiline
                                    numberOfLines={4}
                                    editable={!isLoading}
                                />
                            </View>

                            <View style={styles.modalButtons}>
                                <TouchableOpacity
                                    style={[
                                        styles.modalButton,
                                        styles.cancelButton,
                                        isLoading && styles.disabledButton
                                    ]}
                                    onPress={() => {
                                        if (!isLoading) {
                                            setIsModalVisible(false);
                                            setImages([]);
                                        }
                                    }}
                                    disabled={isLoading}
                                >
                                    <Text style={styles.cancelButtonText}>Cancel</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={[
                                        styles.modalButton,
                                        styles.submitButton,
                                        isLoading && styles.disabledButton
                                    ]}
                                    onPress={handleSubmit}
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
                                        <View style={styles.buttonLoadingContainer}>
                                            <ActivityIndicator size="small" color="white" />
                                            <Text style={styles.submitButtonText}>Uploading...</Text>
                                        </View>
                                    ) : (
                                        <Text style={styles.submitButtonText}>Submit</Text>
                                    )}
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>

                {/* Review Modal */}
                <Modal
                    visible={reviewModalVisible}
                    transparent
                    animationType="slide"
                    onRequestClose={() => {
                        if (!isSubmittingReview) {
                            setReviewModalVisible(false);
                            setIsEditingReview(false);
                            setCurrentReviewId(null);
                        }
                    }}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalTitle}>
                                {isEditingReview ? 'Edit Feedback' : 'Add Feedback'}
                            </Text>

                            <View style={styles.formContainer}>
                                <Text style={styles.formLabel}>Your Feedback</Text>
                                <TextInput
                                    style={[styles.input, styles.textArea]}
                                    value={reviewText}
                                    onChangeText={setReviewText}
                                    placeholder="Share your thoughts about this update..."
                                    multiline
                                    numberOfLines={4}
                                    editable={!isSubmittingReview}
                                />
                            </View>

                            <View style={styles.modalButtons}>
                                <TouchableOpacity
                                    style={[
                                        styles.modalButton,
                                        styles.cancelButton,
                                        isSubmittingReview && styles.disabledButton
                                    ]}
                                    onPress={() => {
                                        if (!isSubmittingReview) {
                                            setReviewModalVisible(false);
                                            setSelectedUpdateId(null);
                                            setReviewText('');
                                            setIsEditingReview(false);
                                            setCurrentReviewId(null);
                                        }
                                    }}
                                    disabled={isSubmittingReview}
                                >
                                    <Text style={styles.cancelButtonText}>Cancel</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={[
                                        styles.modalButton,
                                        styles.submitButton,
                                        isSubmittingReview && styles.disabledButton
                                    ]}
                                    onPress={submitReview}
                                    disabled={isSubmittingReview}
                                >
                                    {isSubmittingReview ? (
                                        <View style={styles.buttonLoadingContainer}>
                                            <ActivityIndicator size="small" color="white" />
                                            <Text style={styles.submitButtonText}>Submitting...</Text>
                                        </View>
                                    ) : (
                                        <Text style={styles.submitButtonText}>
                                            {isEditingReview ? 'Update Feedback' : 'Submit Feedback'}
                                        </Text>
                                    )}
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#f5f5f5',
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
        color: '#333',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
        color: '#666',
    },
    emptyStateContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 30,
    },
    emptyStateTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 16,
        marginBottom: 8,
        color: '#555',
    },
    emptyStateDescription: {
        fontSize: 16,
        textAlign: 'center',
        color: '#777',
        lineHeight: 24,
    },
    buttonsContainer: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        flexDirection: 'column',
        gap: 12,
        zIndex: 999,
    },
    floatingButton: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#007AFF',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    galleryButton: {
        backgroundColor: '#34C759',
    },
    uploadedContainer: {
        flex: 1,
        marginBottom: 16,
    },
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
        width: width - 32, // Full width minus container padding
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
        color: '#333',
    },
    cardDescription: {
        fontSize: 14,
        color: '#666',
        marginBottom: 8,
        lineHeight: 20,
    },
    cardDate: {
        fontSize: 12,
        color: '#888',
        marginTop: 8,
    },
    reviewSection: {
        marginTop: 12,
        paddingTop: 12,
        borderTopWidth: 1,
        borderTopColor: '#eee',
    },
    reviewsTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
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
        color: '#555',
    },
    reviewText: {
        fontSize: 14,
        color: '#666',
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
        borderColor: '#007AFF',
        borderRadius: 20,
        alignSelf: 'flex-start',
    },
    addReviewText: {
        color: '#007AFF',
        marginLeft: 6,
        fontSize: 14,
        fontWeight: '500',
    },
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        padding: 16,
    },
    modalContent: {
        backgroundColor: 'white',
        borderRadius: 16,
        padding: 20,
        maxHeight: '90%',
    },
    modalTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
        textAlign: 'center',
    },
    imagePreviewContainer: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    previewImageContainer: {
        marginRight: 12,
        position: 'relative',
    },
    previewImage: {
        width: 120,
        height: 120,
        borderRadius: 8,
    },
    removeImageButton: {
        position: 'absolute',
        top: -8,
        right: -8,
        backgroundColor: 'red',
        borderRadius: 12,
        padding: 4,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    progressOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    progressText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 5,
    },
    progressBar: {
        height: 8,
        backgroundColor: '#4CD964',
        position: 'absolute',
        bottom: 0,
        left: 0,
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
    },
    addMoreButton: {
        width: 120,
        height: 120,
        borderRadius: 8,
        borderWidth: 2,
        borderColor: '#007AFF',
        borderStyle: 'dashed',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f8ff',
    },
    addMoreText: {
        marginTop: 8,
        color: '#007AFF',
        fontSize: 14,
        fontWeight: '500',
    },
    formContainer: {
        marginBottom: 20,
    },
    formLabel: {
        fontSize: 16,
        fontWeight: '500',
        marginBottom: 8,
        color: '#333',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        marginBottom: 16,
        backgroundColor: '#fafafa',
    },
    textArea: {
        minHeight: 100,
        textAlignVertical: 'top',
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 12,
    },
    modalButton: {
        flex: 1,
        padding: 14,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    submitButton: {
        backgroundColor: '#007AFF',
    },
    cancelButton: {
        backgroundColor: '#f0f0f0',
    },
    disabledButton: {
        opacity: 0.5,
    },
    submitButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
    cancelButtonText: {
        color: '#000',
        fontSize: 16,
        fontWeight: '600',
    },
    buttonLoadingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
    },
});