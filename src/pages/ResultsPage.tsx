import {
  collection,
  getFirestore,
  onSnapshot,
  query,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { entries } from "../entries"

import { app } from "../firebase/clientApp"

const db = getFirestore(app)

interface Results {
  id: string
  points: number
}

const ResultsPage = () => {
  const [result, setResult] = useState<Results[]>()
  const [filteredResult, setFilteredResult] = useState<any>()

  useEffect(() => {
    const q = query(collection(db, "users"))
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let entryOne = 0
      let entryTwo = 0
      let testObj = [
        { id: "one", points: 0 },
        { id: "two", points: 0 },
        { id: "three", points: 0 },
        { id: "four", points: 0 },
        { id: "five", points: 0 },
        { id: "six", points: 0 },
        { id: "seven", points: 0 },
        { id: "eight", points: 0 },
        { id: "nine", points: 0 },
        { id: "ten", points: 0 },
        { id: "eleven", points: 0 },
        { id: "twelve", points: 0 },
      ]
      for (let i = 0; i <= 11; i++) {
        querySnapshot.forEach((doc) => {
          // console.log(doc.data()[testObj[i].id])
          if (doc.data()[testObj[i].id]) {
            testObj[i].points += doc.data()[testObj[i].id]
          }
          console.log("teeeesat", testObj)
        })
      }
      console.log("Current entry One: ", entryOne)
      console.log("Current entry Two: ", entryTwo)
      setResult(testObj)
      return () => {
        unsubscribe()
      }
    })
  }, [])

  useEffect(() => {
    console.log("result", result)
    result?.forEach((res, i) => {
      if (entries[i]) {
        console.log(i)
        console.log(entries[i])
        entries[i].points = res.points
      }
    })
    const copiedEntries = JSON.parse(JSON.stringify(entries))
    setFilteredResult(
      copiedEntries.sort((a: any, b: any) => b.points - a.points)
    )
    console.log("entries", entries)
  }, [result])

  return (
    <div className="mt-8 grid grid-rows-1 md:grid-cols-3 ">
      {filteredResult?.map((res: any, i: number) => {
        return (
          <div key={i} className="flex p-2">
            <div className="relative w-full md:w-80">
              <img src={res.src} alt="" />
              <span className="font-rampart absolute bottom-0 left-0 text-white text-[40px] md:text-[100px]">
                {i + 1}
              </span>
              <span className="bg-white opacity-70 absolute bottom-1 right-1 ">
                <span className=" text-[16px] md:text-[30px]">
                  {res.points} Points
                </span>
              </span>
            </div>
            {/* <span>{res.points} Poäng</span>
            <span>{res.name}</span> */}
          </div>
        )
      })}
    </div>
  )
}

export default ResultsPage;
