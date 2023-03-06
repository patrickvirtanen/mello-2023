import React from "react"
import { entries } from "../entries"
import Card from "./Card"

interface Props {
  openDetails: (value: string) => void
}

const AllEntries = ({ openDetails }: Props) => {
  return (
    <div>
      {" "}
      {entries.map((entry, index) => (
        <div
          onClick={() => openDetails(entry.id)}
          key={index}
          className="cursor-pointer"
        >
          <Card {...entry} />
        </div>
      ))}
    </div>
  )
}

export default AllEntries
