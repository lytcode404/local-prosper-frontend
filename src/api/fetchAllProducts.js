import { db } from "@/db/firebase";
import { getDocs, collection } from "firebase/firestore";

export const fetchAllProducts = async () => {
  try {
    const userCollection = await getDocs(collection(db, "users"));

    const allProdsDocuments = await Promise.all(
      userCollection.docs.map(async (userDoc) => {
        const userProdCollection = await getDocs(
          collection(db, `${userDoc.data().userName}${userDoc.id}`)
        );

        const products = userProdCollection.docs.map((prodDoc) => ({
          id: prodDoc.id,
          ...prodDoc.data(),
        }));

        return {
          userId: userDoc.id,
          companyName: userDoc.data().companyName,
          genre: userDoc.data().genre,
          ownerName: userDoc.data().userName,
          products,
        };
      })
    );

    return allProdsDocuments;
  } catch (error) {
    console.error("Error getting documents:", error);
    throw error;
  }
};
