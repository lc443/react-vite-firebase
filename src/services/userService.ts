import { db } from "../firebase/config";
import { doc, setDoc, getDoc } from "firebase/firestore";

// Create or update a user profile
export async function createUserProfile(uid: string, data: any) {
  const ref = doc(db, "users", uid);
  return await setDoc(ref, data, { merge: true });
}

// Load profile
export async function getUserProfile(uid: string) {
  const ref = doc(db, "users", uid);
  const snap = await getDoc(ref);
  return snap.exists() ? snap.data() : null;
}
