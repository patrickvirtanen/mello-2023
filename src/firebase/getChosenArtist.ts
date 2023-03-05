import { doc, getDoc, getFirestore } from "firebase/firestore"
import { app } from "./clientApp"

const db = getFirestore(app)

export const getChosenArtist = async (chosenArtist: number) => {
  const docRef = doc(db, "users", "patrick.virtanen@gmail.com")
  const docSnap = await getDoc(docRef)
  console.log(docSnap.data()![chosenArtist!])
  return docSnap.data()![chosenArtist!]
}
