import { useEffect, useState } from "react"
import tw from "tailwind-styled-components"
import { getChosenArtist } from "../firebase/getChosenArtist"

interface Entry {
  name: string
  src: string
  id: string
  song: string
}

const Card = (entry: Entry) => {
  const [vote, setVote] = useState<string>("")

  useEffect(() => {
    const getData = async () => {
      const getVote = await getChosenArtist(entry.id)
      setVote(getVote ? getVote : 0)
    }
    getData()
  }, [])
  return (
    <CardWrapper>
      <div className="relative rounded-lg">
        <img src={entry.src} className="rounded-lg" alt="entry image" />
        <div className="absolute bottom-0 bg-white w-full rounded-t-lg text-black opacity-70 p-2">
          <div>{entry.name}</div>
          <div>{entry.song}</div>
        </div>
      </div>
      <Number>{vote}</Number>
    </CardWrapper>
  )
}

const CardWrapper = tw.div`
    flex
    items-center
    justify-center
    flex-col
    w-full
    font-reg
    relative
    py-4
    `

const Number = tw.button`
  text-white
  bg-gradient-to-r
  absolute
  top-2
  right-0
  opacity-90
  from-fuchsia-400 via-fuchsia-500 to-fuchsia-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-fuchsia-300 dark:focus:ring-fuchsia-800 shadow-lg shadow-fuchsia-500/50 dark:shadow-lg dark:shadow-fuchsia-800/80 font-medium rounded-lg text-2xl p-5 text-center w-1/5 m-4
  `

export default Card
