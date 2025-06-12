import React, { useState, useEffect, useContext, createContext } from "react";
import { onAuthStateChanged } from "firebase/auth/web-extension";
import { auth } from "../../utils/Firebase";

const AuthContext = createContext(null);

// Custom hook to use Auth context
export const UserAuth = () => useContext(AuthContext);

// AuthProvider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    // Cleanup on unmount
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  );
};
