import { create } from "zustand";

export type AuthStatus = {
  auth: any;
};

interface AuthState {
  auth: any | undefined;
  setAuth: (data: any) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  auth: undefined,
  setAuth: (status) => set(status),
}));
