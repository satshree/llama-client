import { Text, Center, Flex, Heading, VStack } from "@chakra-ui/react";
import Link from "next/link";

export default function Home() {
  return (
    <Flex height="100%" alignItems="center" justifyContent="center">
      <VStack spacing={50}>
        <Center>
          <Heading as="h1">Welcome to LLAMA</Heading>
        </Center>
        <div>
          <Center>
            <Text>Currently in development</Text>
          </Center>
          <br />
          <Center>
            <Link href="/login">Login</Link> |{" "}
            <Link href="/browse">Browse</Link>
          </Center>
        </div>
      </VStack>
    </Flex>
  );
}
