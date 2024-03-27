"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  Center,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Text,
  useToast,
} from "@chakra-ui/react";

import { useDispatch } from "react-redux";

import { fetchTokens } from "@/api/auth";

import style from "./login.module.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [loading, setLoading] = useState(false);

  const toast = useToast();
  const dispatch = useDispatch();

  const updateUsername = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);

    setUsernameError("");
    setPasswordError("");
  };

  const updatePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);

    setUsernameError("");
    setPasswordError("");
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    let proceed = true;

    if (username === "") {
      setUsernameError("Username is required!");
      proceed = false;
    }

    if (password === "") {
      setPasswordError("Password is required!");
      proceed = false;
    }

    if (proceed) {
      setLoading(true);

      try {
        await dispatch(fetchTokens({ username, password }));
      } catch (err) {
        console.log(err);

        toast({
          title: "Unable to login",
          status: "error",
          isClosable: true,
          position: "top-right",
        });
      }

      setLoading(false);
    }
  };

  return (
    <Center height="100%">
      <Card>
        <CardBody>
          <Center>
            <Heading as="h4" size="md">
              Welcome Back to LLAMA
            </Heading>
          </Center>
          <br />
          <form className={style.form} onSubmit={onSubmit}>
            <FormControl isInvalid={usernameError !== ""}>
              <FormLabel>Username</FormLabel>
              <Input
                type="text"
                placeholder="Username"
                value={username}
                onChange={updateUsername}
              />
              {usernameError ? (
                <FormErrorMessage>{usernameError}</FormErrorMessage>
              ) : null}
            </FormControl>
            <br />
            <FormControl isInvalid={passwordError !== ""}>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={updatePassword}
              />
              {passwordError ? (
                <FormErrorMessage>{passwordError}</FormErrorMessage>
              ) : null}
            </FormControl>
            <br />
            <Button
              colorScheme="blue"
              width="100%"
              type="submit"
              isLoading={loading}
            >
              Login
            </Button>
          </form>
          <br />
          <Center>
            <Text fontSize="sm">Not a user? Sign Up</Text>
          </Center>
        </CardBody>
      </Card>
    </Center>
  );
}

export default Login;
