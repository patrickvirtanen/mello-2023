import React, { useState, useCallback, useRef, useEffect } from "react"
import { useTransition, animated } from "@react-spring/web"

import styles from "./styles.module.css"

export default function App() {
  const ref = useRef<ReturnType<typeof setTimeout>[]>([])
  const [items, set] = useState<string[]>([])
  const transitions = useTransition(items, {
    from: {
      opacity: 0,
      height: 0,
      innerHeight: 0,
      transform: "perspective(600px) rotateX(0deg)",
      color: "#e879f9",
    },
    enter: [
      { opacity: 1, height: 80, innerHeight: 80 },
      { transform: "perspective(600px) rotateX(180deg)", color: "#2bf00c" },
      { transform: "perspective(600px) rotateX(0deg)" },
    ],
    leave: [
      { color: "#840597" },
      { innerHeight: 0 },
      { opacity: 0, height: 0 },
    ],
    update: { color: "#60a5fa" },
  })

  const reset = useCallback(() => {
    ref.current.forEach(clearTimeout)
    ref.current = []
    set([])
    ref.current.push(setTimeout(() => set(["Mello", "2023"]), 500))
    ref.current.push(setTimeout(() => set(["Mello", "Nu kör", "vi!"]), 4000))
    ref.current.push(setTimeout(() => set(["Mello", "2023"]), 6000))
  }, [])

  useEffect(() => {
    reset()
    return () => ref.current.forEach(clearTimeout)
  }, [])

  return (
    <div className={styles.container}>
      <div className={styles.main}>
        {transitions(({ innerHeight, ...rest }, item) => (
          <animated.div
            className={styles.transitionsItem}
            style={rest}
            onClick={reset}
          >
            <animated.div style={{ overflow: "hidden", height: innerHeight }}>
              {item}
            </animated.div>
          </animated.div>
        ))}
      </div>
    </div>
  )
}
