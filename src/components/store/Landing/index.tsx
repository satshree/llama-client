"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button, Center, Flex, HStack, Text } from "@chakra-ui/react";

import style from "./landing.module.css";

import logo from "@/assets/logo_transparent2.png";

function Landing() {
  const router = useRouter();

  return (
    <>
      <div className="overlay" />
      <div className="background" />
      <Flex
        className={`app ${style.page}`}
        w="100%"
        h="100%"
        alignItems="center"
        justifyContent="center"
      >
        <div>
          <Center>
            <Image src={logo.src} height={440} width={310} alt="logo" />
          </Center>
          <br />
          <Center>
            <Text fontSize="larger">Add a touch of Zen to your Lifestyle</Text>
          </Center>
          <br />
          <br />
          <HStack spacing="1rem">
            <Button
              variant="ghost"
              colorScheme="gray"
              onClick={() => router.push("/browse")}
            >
              Browse our Store
            </Button>
            <Button
              variant="ghost"
              colorScheme="gray"
              onClick={() => router.push("/login")}
            >
              Login Your Account
            </Button>
          </HStack>
        </div>
      </Flex>
    </>
  );
}

export default Landing;
