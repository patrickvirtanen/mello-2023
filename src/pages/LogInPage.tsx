import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth"
import React, { useEffect, useState } from "react"
import tw from "tailwind-styled-components"
import Button from "../components/Button"
import Input from "../components/Input"
import Welcome from "../components/Welcome"
import { app } from "../firebase/clientApp"
import { createUserDocument } from "../firebase/createUserTemplete"
import { useKeyPress } from "../hooks/useKeyPress"

import { FacebookAuthProvider } from "firebase/auth"

const provider = new FacebookAuthProvider()
const auth = getAuth(app)

const LogInPage = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [showLogIn, setShowLogIn] = useState(false)
  const [errorMsg, setErrorMsg] = useState("")

  const handleUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value)
  }
  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }

  function signUp() {
    const auth = getAuth(app)
    createUserWithEmailAndPassword(auth, username, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user
        createUserDocument(user.email!, user.email!)
        setErrorMsg("")

        // ...
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
        setErrorMsg(errorMessage)

        // ..
      })
  }

  function logIn() {
    const auth = getAuth(app)
    signInWithEmailAndPassword(auth, username, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user
        window.scrollTo(0, 0)
        setErrorMsg("")
        // ...
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
        setErrorMsg(errorMessage)
      })
  }

  useEffect(() => {
    setTimeout(() => {
      setShowLogIn(true)
    }, 8000)
  })

  return (
    <Wrapper>
      <Welcome />
      {showLogIn ? (
        <div className="mt-[-80px]">
          <div>
            <label className="text-[#de4df5] font-bold text-lg">Email</label>
            <Input type="email" handleChange={handleUsername} />
            <label className="text-[#de4df5] font-bold text-lg">Password</label>
            <Input type="password" handleChange={handlePassword} />
            <div className="text-rose-500 text-xl my-4">{errorMsg}</div>
            <Button handleClick={() => logIn()}>Log In</Button>
            <Button handleClick={() => signUp()}>SIGN UP</Button>
          </div>
        </div>
      ) : (
        ""
      )}
    </Wrapper>
  )
}

const Wrapper = tw.div`
flex
flex-col
w-full
h-full
mt-8

`

export default LogInPage
