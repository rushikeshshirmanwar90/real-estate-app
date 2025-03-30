import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, Modal, Image, ActivityIndicator } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { toast } from 'sonner-native';
import * as ImagePicker from 'expo-image-picker';
import { updateStyles } from './updateStyles';
import { uploadToCloudinary, handleSubmit } from '@/func/update-and-review/update/updateFunctions';

interface UpdateProps {
  onUpdateSubmitted: () => void;
  info: { updateSectionType: string; sectionId: string; name: string };
}

const Update: React.FC<UpdateProps> = ({ onUpdateSubmitted, info }) => {
  const [images, setImages] = useState<string[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<{ [key: string]: number }>({});

  const openCamera = async () => {
    const { granted } = await ImagePicker.requestCameraPermissionsAsync();
    if (!granted) {
      toast.error('Camera permission is required');
      return;
    }
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8,
      allowsEditing: true,
      aspect: [4, 3],
    });
    if (!result.canceled && result.assets[0]) {
      setImages([...images, result.assets[0].uri]);
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
      setImages([...images, ...result.assets.map((asset) => asset.uri)]);
      setIsModalVisible(true);
    }
  };

  const submitUpdate = async () => {
    await handleSubmit(
      title,
      images,
      description,
      info,
      setIsLoading,
      setUploadProgress,
      setTitle,
      setDescription,
      setImages,
      setIsModalVisible,
      uploadToCloudinary,
      onUpdateSubmitted
    );
  };

  return (
    <View style={updateStyles.container}>
      <View style={updateStyles.buttonsContainer}>
        <TouchableOpacity style={updateStyles.floatingButton} onPress={openCamera}>
          <MaterialIcons name="add-a-photo" size={28} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={[updateStyles.floatingButton, updateStyles.galleryButton]} onPress={openGallery}>
          <MaterialIcons name="photo-library" size={28} color="white" />
        </TouchableOpacity>
      </View>

      <Modal
        visible={isModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => !isLoading && setIsModalVisible(false)}
      >
        <View style={updateStyles.modalContainer}>
          <View style={updateStyles.modalContent}>
            <Text style={updateStyles.modalTitle}>Add Update</Text>
            <ScrollView horizontal style={updateStyles.imagePreviewContainer}>
              {images.map((image, index) => (
                <View key={index} style={updateStyles.previewImageContainer}>
                  <Image source={{ uri: image }} style={updateStyles.previewImage} />
                  {isLoading ? (
                    <View style={updateStyles.progressOverlay}>
                      <Text style={updateStyles.progressText}>{uploadProgress[image] || 0}%</Text>
                      <View style={[updateStyles.progressBar, { width: `${uploadProgress[image] || 0}%` }]} />
                    </View>
                  ) : (
                    <TouchableOpacity
                      style={updateStyles.removeImageButton}
                      onPress={() => setImages(images.filter((_, i) => i !== index))}
                    >
                      <MaterialIcons name="close" size={20} color="white" />
                    </TouchableOpacity>
                  )}
                </View>
              ))}
              {!isLoading && (
                <TouchableOpacity style={updateStyles.addMoreButton} onPress={openGallery}>
                  <MaterialIcons name="photo-library" size={32} color="#007AFF" />
                  <Text style={updateStyles.addMoreText}>Add More</Text>
                </TouchableOpacity>
              )}
            </ScrollView>
            <View style={updateStyles.formContainer}>
              <Text style={updateStyles.formLabel}>Title *</Text>
              <TextInput
                style={updateStyles.input}
                value={title}
                onChangeText={setTitle}
                placeholder="Enter title for this update"
                editable={!isLoading}
              />
              <Text style={updateStyles.formLabel}>Description</Text>
              <TextInput
                style={[updateStyles.input, updateStyles.textArea]}
                value={description}
                onChangeText={setDescription}
                placeholder="Add details about this update (optional)"
                multiline
                numberOfLines={4}
                editable={!isLoading}
              />
            </View>
            <View style={updateStyles.modalButtons}>
              <TouchableOpacity
                style={[updateStyles.modalButton, updateStyles.cancelButton, isLoading && updateStyles.disabledButton]}
                onPress={() => !isLoading && setIsModalVisible(false) && setImages([])}
                disabled={isLoading}
              >
                <Text style={updateStyles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[updateStyles.modalButton, updateStyles.submitButton, isLoading && updateStyles.disabledButton]}
                onPress={submitUpdate}
                disabled={isLoading}
              >
                {isLoading ? (
                  <View style={updateStyles.buttonLoadingContainer}>
                    <ActivityIndicator size="small" color="white" />
                    <Text style={updateStyles.submitButtonText}>Uploading...</Text>
                  </View>
                ) : (
                  <Text style={updateStyles.submitButtonText}>Submit</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Update;