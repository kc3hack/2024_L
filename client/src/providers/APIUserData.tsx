import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

import axios from "axios";

import { useFirebaseAuthContext } from "./FirebaseAuth";
import { API_URL } from "@/config";

const api = axios.create({
  baseURL: API_URL,
});

type APIUserDataType = {
  id: number;
  uid: string;
  name: string;
  point: number;
};

const APIUserData = createContext<APIUserDataType | null | undefined>(
  undefined
);

export const useAPIUserData = () => {
  const context = useContext(APIUserData);
  if (context === undefined) {
    throw new Error(
      "useAPIUserDataはAPIUserDataProviderの子要素内でのみ使用できます"
    );
  }
  return context;
};

export const APIUserDataProvider = ({ children }: { children: ReactNode }) => {
  const user = useFirebaseAuthContext();
  const [userData, setUserData] = useState<APIUserDataType | null | undefined>(
    null
  );

  useEffect(() => {
    if (user) {
      const fetchUserData = async () => {
        const idToken = await user?.getIdToken();

        const header = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${idToken}`,
          },
        };

        const { data } = await api
          .get(`/api/v1/users/${user.uid}`, header)
          .catch(() => {
            alert("ユーザーデータの取得に失敗しました");
            return { data: null };
          });

        setUserData(data?.data.user);
      };
      fetchUserData();
    }
  }, [user]);

  if (userData === undefined) {
    return <div>loading...</div>;
  }

  return (
    <APIUserData.Provider value={userData}>{children}</APIUserData.Provider>
  );
};
