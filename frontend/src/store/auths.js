import { mountStoreDevtool } from "simple-zustand-devtools";
import create from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create(
    persist(
        (set, get) => ({
            allUserData: null,
            loading: false,
            user: () => ({
                user_id: get().allUserData?.user_id || null,
                username: get().allUserData?.username || null,
            }),
            setUser: (user) => set({ allUserData: user }),
            setLoading: (loading) => set({ loading }),
            isLoggedIn: () => get().allUserData !== null,
        }),
        {
            name: "auth-storage", // unique name for local storage key
            getStorage: () => localStorage, // or sessionStorage
        }
    )
);

if (import.meta.env.DEV) {
    mountStoreDevtool("Store", useAuthStore);
}

export { useAuthStore };
