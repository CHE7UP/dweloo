// hooks/useFirestore.ts
import { useState, useEffect } from 'react';
import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc,
  serverTimestamp,
  Timestamp,
  DocumentReference
} from 'firebase/firestore';
import { db } from '@/lib/firebase.config';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

type Status = 'idle' | 'loading' | 'success' | 'error';

interface UseFirestoreState {
  isLoading: boolean;
  error: string | null;
  success: boolean;
  documentId: string | null;
}

export const useFirestore = (collectionName: string) => {
  const [status, setStatus] = useState<Status>('idle');
  const [state, setState] = useState<UseFirestoreState>({
    isLoading: false,
    error: null,
    success: false,
    documentId: null,
  });

  const reset = () => {
    setState({
      isLoading: false,
      error: null,
      success: false,
      documentId: null,
    });
    setStatus('idle');
  };

  // Add a document to the collection
  const addDocument = async (document: any, files?: { [field: string]: File }) => {
    setState({ isLoading: true, error: null, success: false, documentId: null });
    setStatus('loading');
    
    try {
      // Create a document with all text fields
      const docToAdd = {
        ...document,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };

      // Add the document first to get an ID
      const docRef = await addDoc(collection(db, collectionName), docToAdd);
      
      // If there are files, upload them and update the document with URLs
      if (files && Object.keys(files).length > 0) {
        const storage = getStorage();
        const fileUrls: { [field: string]: string } = {};
        
        // Upload each file and get its URL
        for (const [fieldName, file] of Object.entries(files)) {
          const path = `${collectionName}/${docRef.id}/${fieldName}`;
          const storageRef = ref(storage, path);
          await uploadBytes(storageRef, file);
          const downloadUrl = await getDownloadURL(storageRef);
          fileUrls[fieldName] = downloadUrl;
        }
        
        // Update the document with file URLs
        if (Object.keys(fileUrls).length > 0) {
          await updateDoc(docRef, { 
            ...fileUrls,
            updatedAt: serverTimestamp()
          });
        }
      }
      
      setState({ isLoading: false, error: null, success: true, documentId: docRef.id });
      setStatus('success');
      return docRef.id;
    } catch (error: any) {
      console.error('Error adding document:', error);
      setState({ isLoading: false, error: error.message, success: false, documentId: null });
      setStatus('error');
      return null;
    }
  };

  // Update an existing document
  const updateDocument = async (id: string, updates: any, files?: { [field: string]: File }) => {
    setState({ isLoading: true, error: null, success: false, documentId: id });
    setStatus('loading');
    
    try {
      const docRef = doc(db, collectionName, id);
      
      // Update text fields
      await updateDoc(docRef, {
        ...updates,
        updatedAt: serverTimestamp()
      });
      
      // If there are files, upload them and update the document with URLs
      if (files && Object.keys(files).length > 0) {
        const storage = getStorage();
        const fileUrls: { [field: string]: string } = {};
        
        // Upload each file and get its URL
        for (const [fieldName, file] of Object.entries(files)) {
          const path = `${collectionName}/${id}/${fieldName}`;
          const storageRef = ref(storage, path);
          await uploadBytes(storageRef, file);
          const downloadUrl = await getDownloadURL(storageRef);
          fileUrls[fieldName] = downloadUrl;
        }
        
        // Update the document with file URLs
        if (Object.keys(fileUrls).length > 0) {
          await updateDoc(docRef, { 
            ...fileUrls,
            updatedAt: serverTimestamp()
          });
        }
      }
      
      setState({ isLoading: false, error: null, success: true, documentId: id });
      setStatus('success');
      return true;
    } catch (error: any) {
      console.error('Error updating document:', error);
      setState({ isLoading: false, error: error.message, success: false, documentId: id });
      setStatus('error');
      return false;
    }
  };

  // Delete a document
  const deleteDocument = async (id: string) => {
    setState({ isLoading: true, error: null, success: false, documentId: id });
    setStatus('loading');
    
    try {
      const docRef = doc(db, collectionName, id);
      await deleteDoc(docRef);
      
      setState({ isLoading: false, error: null, success: true, documentId: null });
      setStatus('success');
      return true;
    } catch (error: any) {
      console.error('Error deleting document:', error);
      setState({ isLoading: false, error: error.message, success: false, documentId: id });
      setStatus('error');
      return false;
    }
  };

  return {
    ...state,
    status,
    addDocument,
    updateDocument,
    deleteDocument,
    reset
  };
};