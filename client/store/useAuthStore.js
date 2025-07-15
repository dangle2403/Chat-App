import { create } from "zustand";
import { axiosInstance } from "../src/lib/axios";

export const useAuthStore = create((set) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,

  checkAuth: async () =>{
    try{
      const res = await axiosInstance.get("/auth/check");

      set({ authUser: res.data});
    } catch (error) {
      set({ authUser: null });
      console.error("Error checking authentication:", error);
    } finally {
      set({ isCheckingAuth: false });
    }
  }
}));
