import { useState, useEffect } from 'react';
import { 
  collection, 
  doc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  onSnapshot,
  DocumentData,
  QuerySnapshot
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuth } from './useAuth';

export function useCollection(collectionName: string, publishedOnly = true) {
  const [data, setData] = useState<DocumentData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let unsubscribe: () => void;

    const fetchData = () => {
      const q = publishedOnly 
        ? query(collection(db, collectionName), where('published', '==', true))
        : query(collection(db, collectionName));

      unsubscribe = onSnapshot(q, 
        (snapshot: QuerySnapshot) => {
          let documents = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          
          // Ordenar en memoria
          documents.sort((a, b) => {
            if (a.order !== undefined && b.order !== undefined) {
              return a.order - b.order;
            }
            return 0;
          });
          
          setData(documents);
          setLoading(false);
        },
        (err) => {
          console.error(`Error fetching ${collectionName}:`, err);
          setError(err.message);
          setLoading(false);
        }
      );
    };

    fetchData();

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [collectionName, publishedOnly]);

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
      (docSnapshot) => {
        if (docSnapshot.exists()) {
          setData({ id: docSnapshot.id, ...docSnapshot.data() });
        } else {
          setData(null);
        }
        setLoading(false);
      },
      (err) => {
        console.error(`Error fetching document ${docId}:`, err);
        setError(err.message);
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
      
      // Log audit (sin usar variable 'collection' para evitar conflictos)
      try {
        await addDoc(collection(db, 'audit_logs'), {
          action: 'CREATE',
          collectionName: collectionName,
          documentId: docRef.id,
          userId: userData?.uid,
          userEmail: userData?.email,
          timestamp: new Date(),
          changes: data
        });
      } catch (auditError) {
        console.warn('Could not log audit:', auditError);
      }
      
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
      
      // Log audit
      try {
        await addDoc(collection(db, 'audit_logs'), {
          action: 'UPDATE',
          collectionName: collectionName,
          documentId: docId,
          userId: userData?.uid,
          userEmail: userData?.email,
          timestamp: new Date(),
          changes: originalData ? getChanges(originalData, data) : data
        });
      } catch (auditError) {
        console.warn('Could not log audit:', auditError);
      }
    } catch (error: any) {
      console.error('Error updating document:', error);
      throw error;
    }
  };

  const deleteDocument = async (docId: string) => {
    try {
      await deleteDoc(doc(db, collectionName, docId));
      
      // Log audit
      try {
        await addDoc(collection(db, 'audit_logs'), {
          action: 'DELETE',
          collectionName: collectionName,
          documentId: docId,
          userId: userData?.uid,
          userEmail: userData?.email,
          timestamp: new Date()
        });
      } catch (auditError) {
        console.warn('Could not log audit:', auditError);
      }
    } catch (error: any) {
      console.error('Error deleting document:', error);
      throw error;
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