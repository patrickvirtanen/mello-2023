import { getAuth } from "firebase/auth";
import React from "react";
import tw from "tailwind-styled-components";
import Card from "../components/Card";

import { app } from "../firebase/clientApp";

const Home = () => {
  const auth = getAuth(app);

  const logOut = () => {
    auth
      .signOut()
      .then(function () {
        // Sign-out successful.
        console.log("Sign-out successful.", auth);
      })
      .catch(function (error) {
        // An error happened.
      });
  };
  return (
    <Wrapper>
      Home
      <button onClick={logOut}>Log out</button>
      <Card />
    </Wrapper>
  );
};
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
