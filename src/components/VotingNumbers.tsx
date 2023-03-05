import React from "react"
import tw from "tailwind-styled-components"

interface Props {
  selectedNumber: (value: number) => void
  vote: number
}
const VotingNumbers = ({ selectedNumber, vote }: Props) => {
  const buttons = 12
  let rows = []

  for (let i = 1; i <= buttons; i++) {
    rows.push(
      <Numbers
        onClick={() => selectedNumber(i)}
        key={i}
        className={vote === i ? "ring-4 outline-none ring-teal-300 " : ""}
      >
        {i}
      </Numbers>
    )
  }

  return (
    <Wrapper>
      {rows} {vote}
    </Wrapper>
  )
}

const Wrapper = tw.div`
   flex
   grid 
   grid-cols-3
   w-full
   text-center
`
const Numbers = tw.button`
text-white 
bg-gradient-to-r
from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 shadow-lg shadow-teal-500/50 dark:shadow-lg dark:shadow-teal-800/80 font-medium rounded-lg text-lg p-5 text-center m-4
`
// const InnerNumber = tw.span`
// relative w-full px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0
// `
// const Numbers = tw.button`
//   p-8
//   m-2
//   bg-blue-200
//   rounded-lg
//   shadow-md
//   transition

//   focus:bg-red-500
//   duration-500
// `

export default VotingNumbers
