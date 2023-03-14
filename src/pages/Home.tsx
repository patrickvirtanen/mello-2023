import { ArrowUturnLeftIcon } from "@heroicons/react/24/outline"
import { getAuth, signInWithPopup } from "firebase/auth"
import React, { useEffect, useState } from "react"
import tw from "tailwind-styled-components"
import { GlobalContext } from "../App"
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
    setChosenArtist(value)
  }
  const resetDetails = (value: string | null) => {
    if (value) {
      setChosenArtist(value)
    } else {
      setChosenArtist("")
    }
  }

  const { prev } = React.useContext(GlobalContext)

  return (
    <Wrapper>
      {/* {prev ? prev : ""} */}

      {showHome ? (
        <div className="font-bold text-[#e879f9] text-[62px] uppercase">
          HOME
        </div>
      ) : (
        <div className="font-bold text-[#e879f9] text-[62px] uppercase">
          Result
        </div>
      )}
      <div className="flex w-full h-12 items-center justify-between mb-4">
        <Button
          onClick={() => {
            setShowHome(true)
            setChosenArtist("")
          }}
          className="button-19 mx-4 w-full"
        >
          Home
        </Button>
        <Button
          onClick={() => {
            setShowHome(false)
            setChosenArtist("")
          }}
          className="button-19 mx-4 w-full"
        >
          Result
        </Button>
      </div>

      {showHome ? (
        <div className="w-full mb-24">
          {chosenArtist === "" ? (
            <div>
              <AllEntries openDetails={openDetails} />
              <div className="flex justify-end w-full my-8">
                <Button onClick={logOut} className="button-19 w-full">
                  Log out
                </Button>
              </div>
            </div>
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
      {chosenArtist !== "" ? (
        <Button
          onClick={() => setChosenArtist("")}
          className="button-19 mb-4 fixed bottom-5 w-5/6"
        >
          <ArrowUturnLeftIcon className="h-6 w-full text-white" />
        </Button>
      ) : (
        ""
      )}
    </Wrapper>
  )
}

const Wrapper = tw.div`
    flex
    items-center
    justify-center
    flex-col
    w-full
    font-reg
    mt-4
    h-full
    
`
const Button = tw.button`
text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5  mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800
`
export default Home
