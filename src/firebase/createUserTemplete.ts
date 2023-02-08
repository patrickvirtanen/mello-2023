import { getFirestore } from "firebase/firestore";
import { app } from "./clientApp";
import { doc, setDoc } from "firebase/firestore";

const db = getFirestore(app);

export const createUserDocument = async (
  userEmail: string,
  username: string
) => {
  const account = {
    userEmail: userEmail,
    username: username,
    entryOne: 0,
    entryTwo: 0,
    entryThree: 0,
    entryFour: 0,
  };

  // Add a new document in collection "cities"
  await setDoc(doc(db, "users", username), account);
};
