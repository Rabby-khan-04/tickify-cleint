import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { create } from "zustand";
import auth from "../firebase/firebase.config";
import axiosPublic from "../utils/axiosPublic";
import axiosSecure from "../utils/axiosSecure";
import toast from "react-hot-toast";

const useAuthStore = create((set) => ({
  authUser: null,
  isAuthLoading: true,
  userInfo: null,
  isUserInfoLoading: true,
  isAdmin: false,

  initializeAuthUser: () => {
    set({ isAuthLoading: true });

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        set({ authUser: user });

        axiosPublic.post("/auth/jwt", { email: user.email }).then(() => {
          axiosSecure
            .get("/users/me")
            .then((res) => {
              if (res?.data?.data) {
                set({ userInfo: res?.data?.data });
                set({ isAdmin: res?.data?.data?.role === "admin" });
                set({ isUserInfoLoading: false });
                set({ isAuthLoading: false });
              }
            })
            .catch((err) => {
              console.log(err);
            });
        });
      } else {
        set({ authUser: null, isAuthLoading: false, isUserInfoLoading: false });
      }
    });

    return unsubscribe;
  },

  registerUser: (email, password) => {
    set({ isAuthLoading: true });

    return createUserWithEmailAndPassword(auth, email, password);
  },

  updateUserInfo(info) {
    return updateProfile(auth.currentUser, info);
  },

  loginUser: (email, password) => {
    set({ isAuthLoading: true });

    return signInWithEmailAndPassword(auth, email, password);
  },

  logOutUser: () => {
    set({ authUser: null, userInfo: null });
    signOut(auth).then(() => {
      axiosPublic
        .post("/auth/logout")
        .then(() => {
          toast("User logged out!!", { icon: "⚠️" });
        })
        .catch((err) => {
          toast.error("Something went wrong!!");
          console.log(`ERROR while logout: ${err}`);
        });
    });
  },
}));

export default useAuthStore;
