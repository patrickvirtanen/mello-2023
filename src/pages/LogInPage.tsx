import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";
import React, { useState } from "react";
import tw from "tailwind-styled-components";
import Button from "../components/Button";
import Input from "../components/Input";
import { app } from "../firebase/clientApp";
import { createUserDocument } from "../firebase/createUserTemplete";

const LogInPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    setUsername(e.target.value);
  };
  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    setPassword(e.target.value);
  };

  const signUp = () => {
    const auth = getAuth(app);
    createUserWithEmailAndPassword(auth, username, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        createUserDocument(user.email!, user.email!);
        console.log("user", user);
        // ...
      })
      .catch((error) => {
        console.log(error);
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  };

  const logIn = () => {
    const auth = getAuth(app);
    signInWithEmailAndPassword(auth, username, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  return (
    <Wrapper>
      <div className="flex justify-center">MEllO</div>
      <Input type="text" handleChange={handleUsername} />
      <Input type="password" handleChange={handlePassword} />
      <Button handleClick={signUp}>SIGN UP</Button>
      <Button handleClick={logIn}>Log In</Button>
    </Wrapper>
  );
};

const Wrapper = tw.div`
flex
flex-col
w-full
h-full
mt-8
`;

export default LogInPage;
