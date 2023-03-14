import { collection, getFirestore, onSnapshot, query } from "firebase/firestore"
import { useEffect, useState } from "react"

import { entries } from "../entries"

import { app } from "../firebase/clientApp"

import { animated, Transition, useTransition } from "@react-spring/web"

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
          // console.log("teeeesat", testObj)
        })
      }
      setResult(testObj)
      return () => {
        unsubscribe()
      }
    })
  }, [])

  useEffect(() => {
    result?.forEach((res, i) => {
      if (entries[i]) {
        entries[i].points = res.points
      }
    })
    const copiedEntries = JSON.parse(JSON.stringify(entries))
    setFilteredResult(
      copiedEntries.sort((a: any, b: any) => b.points - a.points)
    )
  }, [result])

  const transition = useTransition(filteredResult, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    config: { duration: 0 },
  })

  return (
    <div className="mt-8 grid grid-rows-1 md:grid-cols-4 w-full flex justify-center items-center md:bg-black">
      {filteredResult
        ? transition((style, item, t, i) => (
            <animated.div key={t.key} style={style}>
              <div className="flex p-2 justify-center">
                <div className="relative w-full md:w-[800px] rounded-lg">
                  <img src={item.src} alt="" className="rounded-lg" />
                  <span className="font-rampart absolute bottom-0 left-0 text-white text-[40px] md:text-[100px]">
                    {i + 1}
                  </span>
                  <span className="bg-pink-500/80 absolute bottom-1 right-1 p-2 rounded-lg">
                    <span className=" text-[18px] md:text-[24px] text-white uppercase font-bold tracking-wider">
                      {item.points} Points
                    </span>
                  </span>
                </div>
              </div>
            </animated.div>
          ))
        : ""}
    </div>
  )
}

export default ResultsPage
