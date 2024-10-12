import { create } from "zustand";
import { persist } from "zustand/middleware";

interface GlobalState {
  isLoading: boolean;
  user: string | null;
  isDarkMode: boolean;
  toggleTheme: () => void;
  setLoading: (loading: boolean) => void;
  setUser: (user: string | null) => void;
}

export const useGlobalStore = create<GlobalState>()(
  persist(
    (set, get) => ({
      isLoading: false,
      user: null,
      isDarkMode: false,
      toggleTheme: () => {
        const newDarkMode = !get().isDarkMode;
        set({ isDarkMode: newDarkMode });
        document.documentElement.classList.toggle("dark", newDarkMode);
      },
      setLoading: (loading: boolean) => set({ isLoading: loading }),
      setUser: (user: string | null) => set({ user }),
    }),
    {
      name: "global-store",
      partialize: (state) => ({ isDarkMode: state.isDarkMode }),
      onRehydrateStorage: (state) => {
        if (state) {
          document.documentElement.classList.toggle("dark", state.isDarkMode);
        }
      },
    }
  )
);

// Initialize theme on app load
if (typeof window !== "undefined") {
  const initialState = useGlobalStore.getState();
  if (initialState.isDarkMode) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
}
