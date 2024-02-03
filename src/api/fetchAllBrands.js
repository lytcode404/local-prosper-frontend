import { db } from "@/db/firebase";
import { getDocs, collection } from "firebase/firestore";

export const fetchAllBrands = async () => {
  try {
    const userCollection = await getDocs(collection(db, "users"));
    const documents = userCollection.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return documents;
  } catch (error) {
    console.error("Error getting documents:", error);
    throw error;
  }
};
