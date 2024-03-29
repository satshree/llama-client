"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button, Center, Flex, HStack, Text } from "@chakra-ui/react";

import logo from "@/assets/logo_transparent2.png";

function Landing() {
  const router = useRouter();

  return (
    <>
      <Flex w="100%" h="100%" alignItems="center" justifyContent="center">
        <div>
          <Center>
            <Image src={logo.src} height={440} width={310} alt="logo" />
          </Center>
          <Center>
            <Text fontSize="larger">Style your Lifestyle</Text>
          </Center>
          <br />
          <HStack spacing="1rem">
            <Button
              variant="ghost"
              colorScheme="blue"
              onClick={() => router.push("/browse")}
            >
              Browse our Store
            </Button>
            <Button
              variant="ghost"
              colorScheme="blue"
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
