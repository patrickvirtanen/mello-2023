import { doc, getDoc, getFirestore } from "firebase/firestore"
import { app } from "./clientApp"
import { getUserEmail } from "./user"

const db = getFirestore(app)

export const getChosenArtist = async (chosenArtist: string) => {
  const docRef = doc(db, "users", getUserEmail())
  const docSnap = await getDoc(docRef)
  console.log(docSnap.data()![chosenArtist!])
  return docSnap.data()![chosenArtist!]
}
