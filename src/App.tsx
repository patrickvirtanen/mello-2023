import { createContext, Dispatch, SetStateAction, useState } from "react"
import "./App.css"
import { getAuth } from "firebase/auth"
import tw from "tailwind-styled-components"

import LogInPage from "./pages/LogInPage"
import { app } from "./firebase/clientApp"
import Home from "./pages/Home"
import { setUserEmail } from "./firebase/user"

interface IMenuContext {
  prev: any
  setPrev: Dispatch<SetStateAction<any>>
}

export const GlobalContext = createContext<IMenuContext>({
  prev: [],
  setPrev: () => {},
})
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const auth = getAuth(app)

  auth.onAuthStateChanged(function (user) {
    if (user) {
      // User is signed in.
      if (user.email) {
        setUserEmail(user.email)
        setIsLoggedIn(true)
      }
    } else {
      // No user is signed in.
      setIsLoggedIn(false)
    }
  })
  const [prev, setPrev] = useState<any>()

  return (
    <>
      <GlobalContext.Provider value={{ prev, setPrev }}>
        <Container>{!isLoggedIn ? <LogInPage /> : <Home />}</Container>
      </GlobalContext.Provider>
    </>
  )
}

const Container = tw.div`
    bg-white
    text-black
    w-full
    font-reg
    px-4
    flex
    justify-center
    md:bg-black
    md:text-white
    
`

const Button = tw.div`
    p-4
    flex
    inline-flex
    items-center
    border
    border-transparent
    text-xs
    font-medium
    rounded
    shadow-sm
    text-white
    bg-indigo-300
    hover:bg-indigo-700
    focus:outline-none
`

export default App
