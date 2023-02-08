import {
  collection,
  getFirestore,
  onSnapshot,
  query,
} from "firebase/firestore";
import { useEffect, useState } from "react";

import { app } from "../firebase/clientApp";

const db = getFirestore(app);

const ResultsPage = () => {
  const [result, setResult] = useState<number[]>();

  useEffect(() => {
    const q = query(collection(db, "users"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let entryOne = 0;
      let entryTwo = 0;
      querySnapshot.forEach((doc) => {
        entryOne += doc.data().entryOne;
        entryTwo += doc.data().entryTwo;
      });
      console.log("Current entry One: ", entryOne);
      console.log("Current entry Two: ", entryTwo);
      setResult([entryOne, entryTwo]);
      return () => {
        unsubscribe();
      };
    });
  }, []);

  return <div>ResultsPage</div>;
};

export default ResultsPage;
