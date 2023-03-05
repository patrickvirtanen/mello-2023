import { getAuth } from "firebase/auth";
import React, { useEffect, useState } from "react"
import tw from "tailwind-styled-components"
import AllEntries from "../components/AllEntries"
import Card from "../components/Card"
import EntryDetails from "../components/EntryDetails"
import { entries } from "../entries"

import { app } from "../firebase/clientApp"

const Home = () => {
  const auth = getAuth(app)
  const [chosenArtist, setChosenArtist] = useState<number>(0)

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

  const openDetails = (value: number) => {
    console.log("value", value)
    setChosenArtist(value)
  }
  const resetDetails = (value: number | null) => {
    console.log("value", value)
    if (value) {
      setChosenArtist(value)
    } else {
      setChosenArtist(0)
    }
  }

  return (
    <Wrapper>
      Home page
      <button onClick={logOut}>Log out</button>
      {chosenArtist === 0 ? (
        <AllEntries openDetails={openDetails} />
      ) : (
        <EntryDetails chosenArtist={chosenArtist} resetArtist={resetDetails} />
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
`;
export default Home;
