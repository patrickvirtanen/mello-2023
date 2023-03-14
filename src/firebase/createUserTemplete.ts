import { getFirestore } from "firebase/firestore"
import { app } from "./clientApp"
import { doc, setDoc } from "firebase/firestore"

const db = getFirestore(app)

export const createUserDocument = async (
  userEmail: string,
  username: string
) => {
  const account = {
    userEmail: userEmail,
    username: username,
  }

  // Add a new document in collection "cities"
  await setDoc(doc(db, "users", username), account)
}
