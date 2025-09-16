import { useState, useEffect } from 'react';
import { 
  collection, 
  doc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy, 
  onSnapshot,
  DocumentData,
  QuerySnapshot
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuth } from './useAuth';

export function useCollection(collectionName: string, published = true) {
  const [data, setData] = useState<DocumentData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let unsubscribe: () => void;

    const fetchData = () => {
      const q = published 
        ? query(
            collection(db, collectionName),
            where('published', '==', true),
            orderBy('order', 'asc')
          )
        : query(collection(db, collectionName), orderBy('updatedAt', 'desc'));

      unsubscribe = onSnapshot(q, 
        (snapshot: QuerySnapshot) => {
          const documents = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          setData(documents);
          setLoading(false);
        },
        (error) => {
          console.error(`Error fetching ${collectionName}:`, error);
          setError(error.message);
          setLoading(false);
        }
      );
    };

    fetchData();

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [collectionName, published]);

  return { data, loading, error };
}

export function useDocument(collectionName: string, docId: string) {
  const [data, setData] = useState<DocumentData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!docId) return;

    const unsubscribe = onSnapshot(
      doc(db, collectionName, docId),
      (doc) => {
        if (doc.exists()) {
          setData({ id: doc.id, ...doc.data() });
        } else {
          setData(null);
        }
        setLoading(false);
      },
      (error) => {
        console.error(`Error fetching document ${docId}:`, error);
        setError(error.message);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [collectionName, docId]);

  return { data, loading, error };
}

export function useFirestoreCRUD(collectionName: string) {
  const { userData } = useAuth();
  
  const createDocument = async (data: any) => {
    try {
      const docData = {
        ...data,
        createdAt: new Date(),
        updatedAt: new Date(),
        updatedBy: userData?.uid,
        published: data.published ?? false
      };
      
      const docRef = await addDoc(collection(db, collectionName), docData);
      
      await logAudit('CREATE', collectionName, docRef.id, data);
      
      return docRef.id;
    } catch (error: any) {
      console.error('Error creating document:', error);
      throw error;
    }
  };

  const updateDocument = async (docId: string, data: any, originalData?: any) => {
    try {
      const docData = {
        ...data,
        updatedAt: new Date(),
        updatedBy: userData?.uid
      };
      
      await updateDoc(doc(db, collectionName, docId), docData);
      
      await logAudit('UPDATE', collectionName, docId, data, originalData);
    } catch (error: any) {
      console.error('Error updating document:', error);
      throw error;
    }
  };

  const deleteDocument = async (docId: string) => {
    try {
      await deleteDoc(doc(db, collectionName, docId));
      
      await logAudit('DELETE', collectionName, docId);
    } catch (error: any) {
      console.error('Error deleting document:', error);
      throw error;
    }
  };

  const logAudit = async (action: string, collection: string, documentId: string, newData?: any, originalData?: any) => {
    try {
      const auditData = {
        action,
        collection,
        documentId,
        userId: userData?.uid,
        userEmail: userData?.email,
        timestamp: new Date(),
        changes: originalData ? getChanges(originalData, newData) : newData
      };

      await addDoc(collection(db, 'audit_logs'), auditData);
    } catch (error) {
      console.error('Error logging audit:', error);
    }
  };

  const getChanges = (original: any, updated: any) => {
    const changes: any = {};
    
    Object.keys(updated).forEach(key => {
      if (original[key] !== updated[key]) {
        changes[key] = {
          before: original[key],
          after: updated[key]
        };
      }
    });

    return changes;
  };

  return {
    createDocument,
    updateDocument,
    deleteDocument
  };
}

export function useSettings(settingType: string) {
  const { data, loading, error } = useDocument('settings', settingType);
  return { settings: data, loading, error };
}