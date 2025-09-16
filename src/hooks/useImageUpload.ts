import { useState } from 'react';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { storage } from '../lib/firebase';
import { useAuth } from './useAuth';

interface UploadProgress {
  file: File;
  progress: number;
  url?: string;
  error?: string;
}

export function useImageUpload() {
  const [uploads, setUploads] = useState<Record<string, UploadProgress>>({});
  const [isUploading, setIsUploading] = useState(false);
  const { userData } = useAuth();

  const uploadImage = async (
    file: File, 
    folder: 'hero' | 'gallery' | 'temp' = 'gallery',
    customName?: string
  ): Promise<string> => {
    if (!userData) {
      throw new Error('User not authenticated');
    }

    const fileId = `${Date.now()}_${file.name}`;
    const fileName = customName || `${Date.now()}_${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
    const storageRef = ref(storage, `${folder}/${fileName}`);

    setIsUploading(true);
    setUploads(prev => ({
      ...prev,
      [fileId]: { file, progress: 0 }
    }));

    try {
      if (!file.type.startsWith('image/')) {
        throw new Error('El archivo debe ser una imagen');
      }

      if (file.size > 5 * 1024 * 1024) {
        throw new Error('El archivo debe ser menor a 5MB');
      }

      setUploads(prev => ({
        ...prev,
        [fileId]: { ...prev[fileId], progress: 50 }
      }));

      const snapshot = await uploadBytes(storageRef, file, {
        customMetadata: {
          uploadedBy: userData.uid,
          uploadedAt: new Date().toISOString(),
          originalName: file.name
        }
      });

      setUploads(prev => ({
        ...prev,
        [fileId]: { ...prev[fileId], progress: 80 }
      }));

      const downloadURL = await getDownloadURL(snapshot.ref);

      setUploads(prev => ({
        ...prev,
        [fileId]: { ...prev[fileId], progress: 100, url: downloadURL }
      }));

      return downloadURL;
    } catch (error: any) {
      setUploads(prev => ({
        ...prev,
        [fileId]: { ...prev[fileId], error: error.message }
      }));
      throw error;
    } finally {
      setIsUploading(false);
      setTimeout(() => {
        setUploads(prev => {
          const newUploads = { ...prev };
          delete newUploads[fileId];
          return newUploads;
        });
      }, 3000);
    }
  };

  const deleteImage = async (url: string): Promise<void> => {
    if (!userData) {
      throw new Error('User not authenticated');
    }

    try {
      const urlParts = url.split('/');
      const encodedPath = urlParts[urlParts.length - 1].split('?')[0];
      const decodedPath = decodeURIComponent(encodedPath);
      
      const storageRef = ref(storage, decodedPath);
      await deleteObject(storageRef);
    } catch (error: any) {
      console.error('Error deleting image:', error);
      throw new Error('No se pudo eliminar la imagen');
    }
  };

  const validateImageFile = (file: File): { valid: boolean; error?: string } => {
    if (!file.type.startsWith('image/')) {
      return { valid: false, error: 'El archivo debe ser una imagen' };
    }

    if (file.size > 5 * 1024 * 1024) {
      return { valid: false, error: 'El archivo debe ser menor a 5MB' };
    }

    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      return { valid: false, error: 'Solo se permiten archivos JPG, PNG o WEBP' };
    }

    return { valid: true };
  };

  return {
    uploadImage,
    deleteImage,
    validateImageFile,
    uploads,
    isUploading
  };
}