// services/CloudinaryService.ts
import { UploadProgress } from '@/types/updates/RowHouseSection';

export class CloudinaryService {
    private static setUploadProgress: React.Dispatch<React.SetStateAction<UploadProgress>> | null = null;

    static setProgressCallback(callback: React.Dispatch<React.SetStateAction<UploadProgress>>) {
        CloudinaryService.setUploadProgress = callback;
    }

    static async uploadToCloudinary(imageUri: string): Promise<string | null> {
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
                    if (event.lengthComputable && CloudinaryService.setUploadProgress) {
                        const percentComplete = Math.round((event.loaded / event.total) * 100);
                        CloudinaryService.setUploadProgress((prev) => ({
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
    }
}