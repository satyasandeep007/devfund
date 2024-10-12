import { create } from "zustand";

interface GlobalState {
  isLoading: boolean;
  user: string | null;
  theme: "light" | "dark";
  setLoading: (loading: boolean) => void;
  setUser: (user: string | null) => void;
  setTheme: (theme: "light" | "dark") => void;
}

export const useGlobalStore = create<GlobalState>((set) => ({
  isLoading: false,
  user: null,
  theme: "light",
  setLoading: (loading: boolean) => set({ isLoading: loading }),
  setUser: (user: string | null) => set({ user }),
  setTheme: (theme: "light" | "dark") => set({ theme }),
}));
