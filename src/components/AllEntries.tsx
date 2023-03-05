import React from "react"
import { entries } from "../entries"
import Card from "./Card"

interface Props {
  openDetails: (value: number) => void
}

const AllEntries = ({ openDetails }: Props) => {
  return (
    <div>
      {" "}
      {entries.map((entry, index) => (
        <div onClick={() => openDetails(entry.id)} key={index}>
          <Card {...entry} />
        </div>
      ))}
    </div>
  )
}

export default AllEntries
