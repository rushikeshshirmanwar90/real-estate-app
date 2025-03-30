import axios from 'axios';
import { toast } from 'sonner-native';
import { domain } from '@/lib/domain';

// Define interface for progress tracking
interface UploadProgress {
  [key: string]: number; // Index signature to allow dynamic keys
}

// Define interface for the info object
interface UpdateInfo {
  updateSectionType: string;
  sectionId: string;
  name: string;
}

export const uploadToCloudinary = async (
  imageUri: string,
  setUploadProgress: React.Dispatch<React.SetStateAction<UploadProgress>>
): Promise<string | null> => {
  try {
    const response = await fetch(imageUri);
    const blob = await response.blob();

    const formData = new FormData();
    formData.append('file', {
      uri: imageUri,
      type: 'image/jpeg',
      name: 'upload.jpg',
    } as any); // Add `as any` to avoid TypeScript complaints about FormData.

    formData.append('upload_preset', 'realEstate');

    return new Promise((resolve, reject) => {
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

export const handleSubmit = async (
  title: string,
  images: string[],
  description: string,
  info: UpdateInfo,
  setIsLoading: (value: boolean) => void,
  setUploadProgress: React.Dispatch<React.SetStateAction<UploadProgress>>,
  setTitle: (value: string) => void,
  setDescription: (value: string) => void,
  setImages: (value: string[]) => void,
  setIsModalVisible: (value: boolean) => void,
  uploadToCloudinary: (
    imageUri: string,
    setUploadProgress: React.Dispatch<React.SetStateAction<UploadProgress>>
  ) => Promise<string | null>,
  onUpdateSubmitted: () => void
) => {
  if (!title) {
    toast.error('Please enter a title');
    return;
  }

  if (images.length === 0) {
    toast.error('Please add at least one image');
    return;
  }

  setIsLoading(true);

  const initialProgress: UploadProgress = images.reduce(
    (acc, uri) => ({
      ...acc,
      [uri]: 0,
    }),
    {}
  );

  setUploadProgress(initialProgress);

  try {
    const uploadPromises = images.map((image) =>
      uploadToCloudinary(image, setUploadProgress)
    );

    const uploadedUrls = await Promise.all(uploadPromises);
    const successfulUploads = uploadedUrls.filter(Boolean) as string[];

    const data = {
      updateSectionType: info.updateSectionType,
      sectionId: info.sectionId,
      name: info.name,
      updates: [{ images: successfulUploads, title, description }],
    };

    const res = await axios.post(`${domain}/api/review-and-update/update`, data);

    if (res.status === 200) {
      toast.success('Successfully uploaded!');
      onUpdateSubmitted();
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