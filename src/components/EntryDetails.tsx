import { useEffect, useState } from "react"

import VotingNumbers from "./VotingNumbers"
import tw from "tailwind-styled-components"
import { entries } from "../entries"
import { doc, getFirestore, setDoc } from "firebase/firestore"
import { app } from "../firebase/clientApp"
import { getUserData } from "../firebase/getUserData"
import { getChosenArtist } from "../firebase/getChosenArtist"

interface Details {
  chosenArtist: number | undefined | null
  resetArtist: (value: number | null) => void
}

interface Artist {
  name: string
  id: number
  src: string
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
      await setDoc(doc(db, "users", "patrick.virtanen@gmail.com"), {
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

  const setVotingNumber = async (value: number) => {
    await setDoc(doc(db, "users", "patrick.virtanen@gmail.com"), {
      ...data,
      [chosenArtist!]: value,
    })
    setVote(value)
    getDocument()
  }

  return (
    <div className="w-full">
      <Button onClick={() => resetArtist(null)}>Go Back</Button>

      <ArtistDetails>
        <img className="rounded-lg" src={artist?.src}></img>
      </ArtistDetails>
      <VotingNumbers vote={vote} selectedNumber={setVotingNumber} />
    </div>
  )
}

const ArtistDetails = tw.div`
  w-full
  text-center
`
const Button = tw.button`
text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800
`

export default EntryDetails
