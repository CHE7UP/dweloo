// hooks/useFirestore.ts
import { useReducer, useEffect, useState } from 'react';
import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc,
  serverTimestamp,
  FirestoreError
} from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db } from '../lib/firebase.config';

// Define action types
type FirestoreAction = 
  | { type: 'IS_PENDING' }
  | { type: 'ADD_DOC_SUCCESS'; payload: string }
  | { type: 'UPDATE_DOC_SUCCESS'; payload: string }
  | { type: 'DELETE_DOC_SUCCESS' }
  | { type: 'ERROR'; payload: string };

// Define state interface
interface FirestoreState {
  document: null | string;
  isPending: boolean;
  error: null | string;
  success: boolean;
}

// Initial state
const initialState: FirestoreState = {
  document: null,
  isPending: false,
  error: null,
  success: false
};

// Reducer function
const firestoreReducer = (state: FirestoreState, action: FirestoreAction): FirestoreState => {
  switch (action.type) {
    case 'IS_PENDING':
      return { document: null, isPending: true, error: null, success: false };
    case 'ADD_DOC_SUCCESS':
      return { document: action.payload, isPending: false, error: null, success: true };
    case 'UPDATE_DOC_SUCCESS':
      return { document: action.payload, isPending: false, error: null, success: true };
    case 'DELETE_DOC_SUCCESS':
      return { document: null, isPending: false, error: null, success: true };
    case 'ERROR':
      return { document: null, isPending: false, error: action.payload, success: false };
    default:
      return state;
  }
};

/**
 * Custom hook for Firestore operations
 * @param collectionName - Name of the Firestore collection
 * @returns Object with state and methods for Firestore operations
 */
export const useFirestore = (collectionName: string) => {
  const [state, dispatch] = useReducer(firestoreReducer, initialState);
  const [isCancelled, setIsCancelled] = useState(false);
  
  // Only dispatch if the component is still mounted
  const dispatchIfNotCancelled = (action: FirestoreAction) => {
    if (!isCancelled) {
      dispatch(action);
    }
  };
  
  // Handle errors consistently
  const handleError = (error: unknown) => {
    console.error(`Firestore error:`, error);
    const errorMessage = error instanceof FirestoreError 
      ? error.message 
      : error instanceof Error 
        ? error.message 
        : 'An unknown error occurred';
    
    dispatchIfNotCancelled({ type: 'ERROR', payload: errorMessage });
  };
  
  // Add a document
  const addDocument = async (document: unknown, files?: { [field: string]: File }) => {
    dispatchIfNotCancelled({ type: 'IS_PENDING' });
    
    try {
      // Create a document with timestamp
      const docToAdd = {
        ...(document as object),
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };
      // Add the document to get an ID
      const docRef = await addDoc(collection(db, collectionName), docToAdd);
      
      // If there are files, upload them
      if (files && Object.keys(files).length > 0) {
        const storage = getStorage();
        const fileUrls: { [field: string]: string } = {};
        
        // Upload each file
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
      
      dispatchIfNotCancelled({ type: 'ADD_DOC_SUCCESS', payload: docRef.id });
      return docRef.id;
    } catch (error) {
      handleError(error);
      return null;
    }
  };
  
  // Update a document
  const updateDocument = async (id: string, updates: unknown, files?: { [field: string]: File }) => {
    dispatchIfNotCancelled({ type: 'IS_PENDING' });
    
    try {
      const docRef = doc(db, collectionName, id);
      
      // Update text fields
      await updateDoc(docRef, {
        ...(updates as object),
        updatedAt: serverTimestamp()
      });
      
      // If there are files, upload them
      if (files && Object.keys(files).length > 0) {
        const storage = getStorage();
        const fileUrls: { [field: string]: string } = {};
        
        // Upload each file
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
      
      dispatchIfNotCancelled({ type: 'UPDATE_DOC_SUCCESS', payload: id });
      return true;
    } catch (error) {
      handleError(error);
      return false;
    }
  };
  
  // Delete a document
  const deleteDocument = async (id: string) => {
    dispatchIfNotCancelled({ type: 'IS_PENDING' });
    
    try {
      const docRef = doc(db, collectionName, id);
      await deleteDoc(docRef);
      
      dispatchIfNotCancelled({ type: 'DELETE_DOC_SUCCESS' });
      return true;
    } catch (error) {
      handleError(error);
      return false;
    }
  };
  
  // Cleanup function to prevent state updates after unmounting
  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);
  
  return {
    ...state,
    addDocument,
    updateDocument,
    deleteDocument
  };
};