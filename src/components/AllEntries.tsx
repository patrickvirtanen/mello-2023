import { animated, useTransition } from "@react-spring/web"
import React from "react"
import { entries } from "../entries"
import Card from "./Card"

interface Props {
  openDetails: (value: string) => void
}

const AllEntries = ({ openDetails }: Props) => {
  const transition = useTransition(entries, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: { duration: 1000 },
  })
  return (
    <div>
      {entries
        ? transition((style, item, t) => (
            <animated.div key={t.key} style={style}>
              <div
                onClick={() => openDetails(item.id)}
                key={1}
                className="cursor-pointer"
              >
                <Card {...item} />
              </div>
            </animated.div>
          ))
        : ""}
    </div>
  )
}

export default AllEntries
