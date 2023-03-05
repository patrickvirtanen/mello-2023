import { useState } from "react";
import "./App.css";
import { getAuth } from "firebase/auth";
import tw from "tailwind-styled-components";

import LogInPage from "./pages/LogInPage";
import { app } from "./firebase/clientApp";
import Home from "./pages/Home";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const auth = getAuth(app)

  auth.onAuthStateChanged(function (user) {
    if (user) {
      // User is signed in.
      setIsLoggedIn(true)
    } else {
      // No user is signed in.
      setIsLoggedIn(false)
    }
  })

  return (
    <>
      <Container>{!isLoggedIn ? <LogInPage /> : <Home />}</Container>
    </>
  )
}

const Container = tw.div`
    bg-red-200
    w-full
    font-reg
    h-screen
    p-4
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
`;

export default App;
