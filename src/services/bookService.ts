import { db } from "../firebase/config";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

const booksRef = collection(db, "books");

export async function getBooks() {
  const snapshot = await getDocs(booksRef);
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function addBook(book: any) {
  return await addDoc(booksRef, book);
}

export async function updateBook(id: string, book: any) {
  const ref = doc(db, "books", id);
  return await updateDoc(ref, book);
}

export async function deleteBook(id: string) {
  const ref = doc(db, "books", id);
  return await deleteDoc(ref);
}
