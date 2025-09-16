import React, { useState, useEffect, createContext, useContext } from 'react';
import { 
  type User, 
  signInWithPopup, 
  signOut as firebaseSignOut, 
  onAuthStateChanged 
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, googleProvider, db } from '../lib/Firebase.ts';

interface UserData {
  uid: string;
  email: string;
  displayName: string;
  role: string;
  photoURL?: string;
  createdAt: any;
  lastLoginAt: any;
}

interface AuthContextType {
  user: User | null;
  userData: UserData | null;
  loading: boolean;
  isAdmin: boolean;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const isAdmin = userData?.role === 'admin';

  const signInWithGoogle = async () => {
    try {
      setError(null);
      setLoading(true);
      
      const result = await signInWithPopup(auth, googleProvider);
      const firebaseUser = result.user;
      
      const userDocRef = doc(db, 'users', firebaseUser.uid);
      const userDoc = await getDoc(userDocRef);
      
      if (!userDoc.exists()) {
        const newUserData = {
          uid: firebaseUser.uid,
          email: firebaseUser.email || '',
          displayName: firebaseUser.displayName || '',
          role: 'user',
          photoURL: firebaseUser.photoURL || '',
          createdAt: new Date(),
          lastLoginAt: new Date()
        };
        
        await setDoc(userDocRef, newUserData);
        setUserData(newUserData);
      } else {
        const existingData = userDoc.data() as UserData;
        const updatedData = {
          ...existingData,
          lastLoginAt: new Date()
        };
        
        await setDoc(userDocRef, updatedData, { merge: true });
        setUserData(updatedData);
      }
    } catch (err: any) {
      console.error('Sign in error:', err);
      setError(err.message || 'Error signing in');
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setError(null);
      await firebaseSignOut(auth);
      setUserData(null);
    } catch (err: any) {
      console.error('Sign out error:', err);
      setError(err.message || 'Error signing out');
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      try {
        setLoading(true);
        setUser(firebaseUser);
        
        if (firebaseUser) {
          const userDocRef = doc(db, 'users', firebaseUser.uid);
          const userDoc = await getDoc(userDocRef);
          
          if (userDoc.exists()) {
            const data = userDoc.data() as UserData;
            setUserData(data);
          } else {
            const newUserData = {
              uid: firebaseUser.uid,
              email: firebaseUser.email || '',
              displayName: firebaseUser.displayName || '',
              role: 'user',
              photoURL: firebaseUser.photoURL || '',
              createdAt: new Date(),
              lastLoginAt: new Date()
            };
            
            await setDoc(userDocRef, newUserData);
            setUserData(newUserData);
          }
        } else {
          setUserData(null);
        }
      } catch (err: any) {
        console.error('Auth state change error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const contextValue: AuthContextType = {
    user,
    userData,
    loading,
    isAdmin,
    signInWithGoogle,
    signOut,
    error
  };

  return React.createElement(
    AuthContext.Provider,
    { value: contextValue },
    children
  );
}