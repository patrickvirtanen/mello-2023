import { getUserEmail } from "./user"
import { doc, getDoc, getFirestore } from "firebase/firestore"
import { app } from "./clientApp"

const db = getFirestore(app)

export const getUserData = async () => {
  const docRef = doc(db, "users", getUserEmail())
  const docSnap = await getDoc(docRef)
  return docSnap.data()
}
