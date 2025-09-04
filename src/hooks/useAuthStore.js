import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
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

  initializeAuthUser: () => {
    set({ isAuthLoading: true });

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        set({ authUser: user });

        axiosPublic.post("/auth/jwt", { email: user.email }).finally(() => {
          set({ isAuthLoading: false });
        });

        axiosSecure
          .get("/users/me")
          .then((res) => {
            if (res?.data?.data) {
              set({ userInfo: res?.data?.dat });
            }
          })
          .catch((err) => {
            console.log(err);
          });

        toast.success("Successfully logged in!!");
      } else {
        set({ authUser: null, isAuthLoading: false });
      }
    });

    return unsubscribe;
  },

  registerUser: (email, password) => {
    set({ isAuthLoading: false });

    return createUserWithEmailAndPassword(auth, email, password);
  },

  loginUser: (email, password) => {
    set({ isAuthLoading: false });

    return signInWithEmailAndPassword(auth, email, password);
  },

  logOutUser: () => {
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
