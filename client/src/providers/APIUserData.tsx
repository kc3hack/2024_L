import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useFirebaseAuthContext } from "./FirebaseAuth";
import { API_URL } from "@/config";
import { protectedRoutes } from "@/Routing";

const api = axios.create({
  baseURL: API_URL,
});

type APIUserDataType = {
  id: number;
  uid: string;
  name: string;
  point: number;
};

const APIUserData = createContext<
  | {
      userData: APIUserDataType | null | undefined;
      fetchUserData: () => Promise<void>;
    }
  | undefined
>(undefined);

export const useAPIUserDataContext = () => {
  const context = useContext(APIUserData);
  if (context === undefined) {
    throw new Error(
      "useAPIUserDataはAPIUserDataProviderの子要素内でのみ使用できます"
    );
  }
  return context;
};

export const APIUserDataProvider = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  const user = useFirebaseAuthContext();
  const [userData, setUserData] = useState<APIUserDataType | null | undefined>(
    null
  );

  const fetchUserData = useCallback(async () => {
    if (!protectedRoutes.includes(location.pathname)) return;
    if (!user) return;
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
        console.log("ユーザーデータの取得に失敗しました");
        return { data: { data: { user: null } } };
      });

    setUserData(data?.data.user);
  }, [user, location.pathname]);

  useEffect(() => {
    fetchUserData();
  }, [user, location.pathname]);

  if (userData === undefined) {
    return <div>loading...</div>;
  }

  return (
    <APIUserData.Provider value={{ userData, fetchUserData }}>
      {children}
    </APIUserData.Provider>
  );
};
