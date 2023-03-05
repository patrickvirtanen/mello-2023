import { useEffect, useState } from "react"
import tw from "tailwind-styled-components"
import { entries } from "../entries"
import { getChosenArtist } from "../firebase/getChosenArtist"
import video from "../videos/1.mp4"

interface Entry {
  name: string
  src: string
  id: number
}

const Card = (entry: Entry) => {
  const [vote, setVote] = useState<number>(0)

  useEffect(() => {
    const getData = async () => {
      const getVote = await getChosenArtist(entry.id)
      console.log("get vote", getVote, entry.id)
      setVote(getVote ? getVote : 0)
    }
    getData()
  }, [])
  return (
    <CardWrapper>
      <div>{entry.name}</div>
      <video autoPlay loop muted src={video}></video>
      {/* <img
        src={entry.src}
        alt="entry image"
        onClick={() => console.log("open card details")}
      /> */}
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
    relative
    font-reg`

const Number = tw.button`
  text-white
  absolute
  bottom-0
  left-0 
  bg-gradient-to-r
  from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 shadow-lg shadow-teal-500/50 dark:shadow-lg dark:shadow-teal-800/80 font-medium rounded-lg text-2xl p-5 text-center w-1/6 my-10 mx-4 
  `

export default Card
