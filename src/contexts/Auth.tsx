import { router, } from 'expo-router';
import React, {
  useState,
  useContext,
  createContext,
  ReactNode,
  useEffect,
  Dispatch,
  SetStateAction,
} from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { auth } from '../services/firebase';
import Toast from 'react-native-toast-message'

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  sendEmailVerification,
  signOut as signOutFirebase,
  User,
} from 'firebase/auth';



type AuthProviderProps = {
  children: ReactNode;
}

type AuthContextData = {
  signIn: (email: string, password: string) => Promise<void>;
  signUpWithEmail: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  isLogginIn: boolean;
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
  setIsLogginIn: Dispatch<SetStateAction<boolean>>;
}

export const AuthContext = createContext({} as AuthContextData);

const USER_COLLECTION = '@farmgen:users';

function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLogginIn, setIsLogginIn] = useState(false);

  async function loadUserStorageData() {
    setIsLogginIn(true);
    const storedUser = await AsyncStorage.getItem(USER_COLLECTION);

    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser(userData);
      Toast.show({
        type: 'success',
        text1: `Welcome back! ${userData.displayName ?? userData.email} 🚀`,
        visibilityTime: 3000,
      })
    }
    setIsLogginIn(false);
  };

  async function signIn(email: string, password: string) {
    // console.log('signIn', email, password)
    setIsLogginIn(true);
    if (!email || !password) {
      setIsLogginIn(false);

      Toast.show({
        type: 'error',
        text1: `Please enter your email and password`,
        visibilityTime: 3000,
      })

      return Alert.alert('Email or password invalid', 'Please, check your email and password');
    }
    try {
      const credentials = await signInWithEmailAndPassword(auth, email, password)
      const userCredentials = credentials.user;
      setUser(userCredentials);

      Toast.show({
        type: 'success',
        text1: `Welcome back! ${userCredentials.displayName ?? userCredentials.email}`,
        visibilityTime: 3000,
      })

      setIsLogginIn(false);
    } catch (error) {
      if(error instanceof Error) {
        setIsLogginIn(false);
        Toast.show({
          type: 'error',
          text1: `${error?.message ? error.message : 'Something went wrong, please try again.'}`,
          visibilityTime: 3000,
        })
        return Alert.alert('Email or password invalid', 'Please, check your email and password');
      }
    }
  };

  async function forgotPassword(email: string) {
    if (!email) {
      return Alert.alert('Invalid email', 'Please, check your email');
    }

    sendPasswordResetEmail(auth, email)
      .then(() => {
        Alert.alert('Password Reset', 'Check your email to reset your password.');
      })
      .catch(() => {
        Alert.alert('Error', 'Something went wrong, please try again.');
      })
  };

  const signUpWithEmail = async (email: string, password: string) => {
    if (!email || !password) {
      return Alert.alert('Email or password invalid', 'Please, check your email and password');
    }
    try {
      const credentials = await createUserWithEmailAndPassword(auth, email, password);
      const userCredentials = credentials.user;
      setUser(userCredentials);
      await sendEmailVerification(userCredentials);
    } catch (error) {
      if(error instanceof Error) {
        Toast.show({
          type: 'error',
          text1: `${error?.message ? error.message : 'Something went wrong, please try again.'}`,
          visibilityTime: 3000,
        })
        return Alert.alert('Email or password invalid', 'Please, check your email and password');
      }
    }
  };

  const checkProtectedRoute = async (user: User | null) => {
    if (!user) {
      setUser(null);
      await AsyncStorage.removeItem(USER_COLLECTION);
      router.replace('/(auth)/sign-in');
    } else {
      setUser(user);
      await AsyncStorage.setItem(USER_COLLECTION, JSON.stringify(user));
      router.replace('/(tabs)/');
    }
  }

  async function signOut() {
    await Promise.allSettled([
      AsyncStorage.removeItem(USER_COLLECTION),
      signOutFirebase(auth),
    ])
    Toast.show({
      type: 'info',
      text1: `See you soon!👋`,
      visibilityTime: 3000,
    })
    setUser(null);
  }


  useEffect(() => {

    return auth.onIdTokenChanged(async (user) => {
      loadUserStorageData();
      await checkProtectedRoute(user)
    });
  }, []);


  return (
    <AuthContext.Provider
      value={{
        signIn,
        signOut,
        forgotPassword,
        isLogginIn,
        user,
        signUpWithEmail,
        setUser,
        setIsLogginIn,
      }}>
      {children}
    </AuthContext.Provider>
  )
}


function useAuth() {
  const context = useContext(AuthContext);
  return context;
}

export { AuthProvider, useAuth };
