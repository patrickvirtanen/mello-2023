import { doc, getDoc, getFirestore } from "firebase/firestore"
import { app } from "./clientApp"

const db = getFirestore(app)

export const getUserData = async () => {
  const docRef = doc(db, "users", "patrick.virtanen@gmail.com")
  const docSnap = await getDoc(docRef)
  return docSnap.data()
}
