import { createContext, useState, useContext, ReactNode } from "react";

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

interface AuthState {
  token: string | null;
}

interface AuthContextData {
  token: string | null;
  registerUser(input: CreateUserInput): void;
  getUser(): void;
  addTokenToHeader(token: string): void;
  getAccessToken(input: GetAccessTokenInput): void;
}

interface AuthProviderProps {
  children?: ReactNode;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const STORAGE_KEY_TOKEN = "@studyconnect:token";

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [token, setToken] = useLocalStorage<string | null>(
    STORAGE_KEY_TOKEN,
    null
  );

  const [data, setData] = useState<AuthState>(() => {
    if (token) {
      addTokenToHeader(token);
    }

    return { token } as AuthState;
  });
  const router = useRouter();

  async function registerUser(input: CreateUserInput) {
    const { token } = await createUser(input);
    setToken(token);
    addTokenToHeader(token);
    router.push("/");
  }

  async function getUser() {
    const data = await apiGetUser();
    console.log(data);
  }

  async function getAccessToken(input: GetAccessTokenInput) {
    const { token } = await apiGetAccessToken(input);
    setToken(token);
    addTokenToHeader(token);
    router.push("/");
  }

  function addTokenToHeader(token: string) {
    apiClient.defaults.headers.common.Authorization = `Bearer ${token}`;
  }

  return (
    <AuthContext.Provider
      value={{
        token: data.token,
        registerUser,
        getUser,
        addTokenToHeader,
        getAccessToken,
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
