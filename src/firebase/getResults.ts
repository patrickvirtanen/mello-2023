import {
  collection,
  getFirestore,
  onSnapshot,
  query,
} from "firebase/firestore";
import { app } from "./clientApp";
const db = getFirestore(app);

export let entryOne = 0;
export let entryTwo = 0;

export const getResults = () => {
  const q = query(collection(db, "users"));
  let entryOne = 0;
  let entryTwo = 0;
  onSnapshot(q, (querySnapshot) => {
    querySnapshot.forEach((doc) => {
      // console.log(doc.data());
      entryOne += doc.data().entryOne;
      entryTwo += doc.data().entryTwo;
    });
    console.log("Current entry One: ", entryOne);
    console.log("Current entry Two: ", entryTwo);
    return {
      entryOne: entryOne,
      entryTwo: entryTwo,
    };
  });
};
