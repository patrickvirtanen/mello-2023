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
    await setDoc(doc(db, "users", getUserEmail()), {
      ...data,
      [chosenArtist!]: value,
    })
    setVote(value)
    getDocument()
  }

  return (
    <div className="w-full">
      <Button
        onClick={() => resetArtist(null)}
        className="w-full px-4 button-19"
      >
        <ArrowUturnLeftIcon className="h-6 w-full text-white" />
      </Button>

      <ArtistDetails>
        <ReactPlayer
          url={artist?.video}
          playing={true}
          muted={true}
          width="100%"
          height="40vh"
          loop={true}
          // config={{
          //   youtube: {
          //     playerVars: { showinfo: 1 },
          //     embedOptions: { showinfo: 1 },
          //   },
          // }}
        />
        <div className="bg-white w-full">
          <div className="text-left text-2xl mt-2 pl-5">
            <span>Artist </span>
            <span>{artist?.name}</span>
          </div>
          <div className="text-left text-lg pl-5">
            <span>Song </span>
            <span>{artist?.song}</span>
          </div>
        </div>
      </ArtistDetails>
      <VotingNumbers vote={vote} selectedNumber={setVotingNumber} />
    </div>
  )
}

const ArtistDetails = tw.div`
  w-full
  text-center
  pointer-events-none
  mb-1
  
`
const Button = tw.button`
text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5  mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800
`

export default EntryDetails
