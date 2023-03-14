import { useEffect, useState } from "react"

import VotingNumbers from "./VotingNumbers"
import tw from "tailwind-styled-components"
import { entries } from "../entries"
import { doc, getFirestore, setDoc } from "firebase/firestore"
import { app } from "../firebase/clientApp"
import { getUserData } from "../firebase/getUserData"
import { getChosenArtist } from "../firebase/getChosenArtist"
import ReactPlayer from "react-player"
import { getUserEmail } from "../firebase/user"
import { ArrowUturnLeftIcon } from "@heroicons/react/24/outline"
import { animated, useTransition } from "@react-spring/web"

interface Details {
  chosenArtist: string | undefined | null
  resetArtist: (value: string | null) => void
}

interface Artist {
  name: string
  id: string
  src: string
  song: string
  video: string
}

const EntryDetails = ({ chosenArtist, resetArtist }: Details) => {
  const [data, setData] = useState<any>()
  const [artist, setArtist] = useState<Artist>()
  const [vote, setVote] = useState<number>(0)
  const [usedNumbers, setUsednumbers] = useState<number[]>([])

  const transition = useTransition(artist, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    config: { duration: 1000 },
  })

  const db = getFirestore(app)

  const getDocument = async () => {
    const fetchedData = await getUserData()

    setData(fetchedData)
    if (!(await getChosenArtist(chosenArtist!))) {
      await setDoc(doc(db, "users", getUserEmail()), {
        ...fetchedData,
        [chosenArtist!]: 0,
      })
      setVote(0)
    }
    setVote(fetchedData![chosenArtist!])
  }

  useEffect(() => {
    getDocument()
    const entry = entries.find((entry) => entry.id === chosenArtist)
    setArtist(entry)
  }, [])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const setVotingNumber = async (value: number) => {
    let newValue = value
    if (value === vote) {
      newValue = 0
    }
    await setDoc(doc(db, "users", getUserEmail()), {
      ...data,
      [chosenArtist!]: newValue,
    })

    setVote(value)
    getDocument()
  }

  useEffect(() => {
    if (data) {
      const usedArray = []
      for (let [key, value] of Object.entries(data!)) {
        if (typeof value === "number") {
          usedArray.push(value)
        }
      }
      setUsednumbers(usedArray)
    }
  }, [data])

  return (
    <div className="w-full">
      {transition((style, item) => (
        <animated.div style={style}>
          <ArtistDetails>
            <ReactPlayer
              url={artist?.video}
              playing={true}
              muted={true}
              width="100%"
              height="40vh"
              loop={true}
            />
            <div className="bg-white w-full mb-8">
              <div className="text-left text-4xl mt-2">
                <span>{artist?.name}</span>
              </div>
              <div className="text-left text-lg">
                <span>{artist?.song}</span>
              </div>
            </div>
          </ArtistDetails>
          <VotingNumbers
            vote={vote}
            selectedNumber={setVotingNumber}
            usedNumbers={usedNumbers}
          />
        </animated.div>
      ))}
    </div>
  )
}

const ArtistDetails = tw.div`
  w-full
  text-center
  pointer-events-none
  mb-1
  mt-4
  
`
const Button = tw.button`
text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5  mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800
`

export default EntryDetails
