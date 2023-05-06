import { createContext, useContext, ReactNode, useEffect } from "react";

import {
  CreateUserInput,
  apiClient,
  createUser,
  getUser as apiGetUser,
  GetAccessTokenInput,
  getAccessToken as apiGetAccessToken,
} from "../api/ApiClient";
import { useRouter } from "next/router";
import { useLocalStorage } from "./useLocalStorage";

type User = {
  id: string;
  email: string;
  name: string;
};

interface AuthContextData {
  token: string | null;
  user: User | null;
  registerUser(input: CreateUserInput): void;
  getUser(): void;
  getAccessToken(input: GetAccessTokenInput): void;
  updateToken(token: string): void;
}

interface AuthProviderProps {
  children?: ReactNode;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const STORAGE_KEY_TOKEN = "@studyconnect:token";
const STORAGE_KEY_USER = "@studyconnect:user";

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [storageToken, setStorageToken] = useLocalStorage<string | null>(
    STORAGE_KEY_TOKEN,
    null
  );

  useEffect(() => {
    if (storageToken) {
      addTokenToHeader(storageToken);
    }
  }, [storageToken]);

  const [storageUser, setStorageUser] = useLocalStorage<User | null>(
    STORAGE_KEY_USER,
    null
  );

  const router = useRouter();

  async function registerUser(input: CreateUserInput) {
    const { token } = await createUser(input);
    updateToken(token);
    router.push("/");
  }

  async function getUser() {
    const user = await apiGetUser();
    setUser(user);
  }

  async function getAccessToken(input: GetAccessTokenInput) {
    const { token } = await apiGetAccessToken(input);
    updateToken(token);
    router.push("/");
  }

  function updateToken(token: string) {
    addTokenToHeader(token);
    setStorageToken(token);
  }

  function setUser(user: User) {
    setStorageUser(user);
  }

  function addTokenToHeader(token: string) {
    apiClient.defaults.headers.common.Authorization = `Bearer ${token}`;
  }

  return (
    <AuthContext.Provider
      value={{
        token: storageToken,
        user: storageUser,
        registerUser,
        getUser,
        getAccessToken,
        updateToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = (): AuthContextData => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};

export { AuthProvider, useAuth };
