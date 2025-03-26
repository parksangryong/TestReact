import { create } from "zustand";

interface UserStore {
  userId: number;
  setUserId: (userId: number) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  userId: 0,
  setUserId: (userId) => set({ userId }),
}));
