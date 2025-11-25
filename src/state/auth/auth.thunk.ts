import type { AppDispatch } from "../store";
import { loginUser, registerUser } from "../../services/AuthService";
import { createUserProfile, getUserProfile } from "../../services/userService";
import { setLoading, loginSuccess, loginError } from "./auth.slice";

export const login =
  (email: string, password: string) => async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));

    try {
      // 1) Sign in with Firebase Auth
      const cred = await loginUser(email, password);
      const uid = cred.user.uid;

      const profile = await getUserProfile(uid);

      let safeProfile = profile;

      // Convert Firestore Timestamp to ISO string
      if (profile?.createdAt?.toDate) {
        safeProfile = {
          ...profile,
          createdAt: profile.createdAt.toDate().toISOString(),
        };
      }

      const fullUser = {
        uid,
        email: cred.user.email,
        ...safeProfile,
      };

      // 4) Save to Redux
      dispatch(loginSuccess(fullUser));

      // 5) Persist login
      localStorage.setItem("authUser", JSON.stringify(fullUser));
    } catch (err: any) {
      dispatch(loginError(err.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

  export const register =
    (email: string, password: string, profile: any) =>
    async (dispatch: AppDispatch) => {
      dispatch(setLoading(true));

      try {
        // 1. Firebase Auth - create user
        const cred = await registerUser(email, password);

        // 2. Firestore profile creation
        await createUserProfile(cred.user.uid, {
          ...profile,
          email,
          createdAt: new Date(),
        });

        // 3. Prepare full user object for Redux
        const fullUser = {
          uid: cred.user.uid,
          email,
          ...profile,
        };

        // 4. Save user in Redux
        dispatch(loginSuccess(fullUser));

        // 5. Persist login
        localStorage.setItem("authUser", JSON.stringify(fullUser));
      } catch (err: any) {
        dispatch(loginError(err.message));
      } finally {
        dispatch(setLoading(false));
      }
    };
