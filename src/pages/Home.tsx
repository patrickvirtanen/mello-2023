import { getAuth } from "firebase/auth";
import React, { useEffect, useState } from "react"
import tw from "tailwind-styled-components"
import AllEntries from "../components/AllEntries"
import Card from "../components/Card"
import EntryDetails from "../components/EntryDetails"
import { entries } from "../entries"

import { app } from "../firebase/clientApp"
import ResultsPage from "./ResultsPage"

const Home = () => {
  const auth = getAuth(app)
  const [chosenArtist, setChosenArtist] = useState<string>("")
  const [showHome, setShowHome] = useState<boolean>(true)

  // useEffect(() => {
  //   set
  // }, [])

  const logOut = () => {
    auth
      .signOut()
      .then(function () {
        // Sign-out successful.
        console.log("Sign-out successful.", auth)
      })
      .catch(function (error) {
        // An error happened.
      })
  }

  const openDetails = (value: string) => {
    console.log("value", value)
    setChosenArtist(value)
  }
  const resetDetails = (value: string | null) => {
    console.log("value", value)
    if (value) {
      setChosenArtist(value)
    } else {
      setChosenArtist("")
    }
  }

  return (
    <Wrapper>
      <div className="flex w-full h-12 items-center justify-between">
        <div
          onClick={() => {
            setShowHome(!showHome)
            setChosenArtist("")
          }}
          className="button-19 mx-4"
        >
          {showHome ? "Result" : "Home"}
        </div>
        <div onClick={logOut} className="button-19">
          Log out
        </div>
      </div>
      {showHome ? (
        <div className="w-full">
          {chosenArtist === "" ? (
            <AllEntries openDetails={openDetails} />
          ) : (
            <EntryDetails
              chosenArtist={chosenArtist}
              resetArtist={resetDetails}
            />
          )}
        </div>
      ) : (
        <ResultsPage />
      )}
    </Wrapper>
  )
}
{
  /* <div>
You are logged in <Button onClick={logOut}>LOG OUT</Button>
</div> */
}
const Wrapper = tw.div`
    flex
    items-center
    justify-center
    flex-col
    w-full
    font-reg
    mb-8
    mt-4
`
const Button = tw.button`
text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5  mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800
`
export default Home;
