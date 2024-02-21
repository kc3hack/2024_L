import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

import { User, onAuthStateChanged, getAuth } from "firebase/auth";

const FirebaseAuthContext = createContext<User | null | undefined>(undefined);

const useFirebaseAuthContext = () => {
  const context = useContext(FirebaseAuthContext);
  if (context === undefined) {
    throw new Error(
      "useFirebaseAuthContextはFirebaseAuthProviderの子要素内でのみ使用できます"
    );
  }
  return context;
};

const FirebaseAuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null | undefined>(undefined);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  if (user === undefined) {
    return <div>loading...</div>;
  }

  return (
    <FirebaseAuthContext.Provider value={user}>
      {children}
    </FirebaseAuthContext.Provider>
  );
};

export { FirebaseAuthProvider, useFirebaseAuthContext };
