import { createContext, useState, useEffect } from "react";

import app from "../firebase.config";

import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";

const auth = getAuth(app);

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  // Provide authentication context
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const googleProvider = new GoogleAuthProvider();

  // Register user or create a user
  const createUser = (email, password) => {
    setLoading(true);
    try {
      return createUserWithEmailAndPassword(auth, email, password);
    } finally {
      setLoading(false);
    }
  };
  // login a user with credential
  const loginUser = (email, password) => {
    setLoading(true);
    try {
      return signInWithEmailAndPassword(auth, email, password);
    } finally {
      setLoading(false);
    }
  };
  // google Login
  const googleSignIn = async () => {
    setLoading(true);
    try {
      return await signInWithPopup(auth, googleProvider);
    } finally {
      setLoading(false);
    }
  };
  // Observe user state
  useEffect(() => {
    // Subscribe to auth changes
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    // Cleanup subscription
    return () => unsubscribe();
  }, []);

  // update profile
  const updateUserProfile = async (name, photo) => {
    if (!auth.currentUser) return;
    await updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
    setUser({ ...auth.currentUser }); //! Refresh the local state
  };
  //!  logOutUser
  const logOutUser = async () => {
    return signOut(auth).finally(() => setLoading(false));
  };
  const authInfo = {
    user, // user state
    loading, // loading state
    createUser, //user Registration
    loginUser, // user login function
    googleSignIn, // google popup login
    updateUserProfile, //user profile update
    logOutUser, // logout user
  };
  return (
    <AuthContext.Provider value={authInfo}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
export { AuthContext };
