import { Text, Center, Flex, Heading, VStack } from "@chakra-ui/react";

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
          <Center>
            <Text fontSize="xs">Latest update on 26. Mar, 2024 12:31 PM</Text>
          </Center>
        </div>
      </VStack>
    </Flex>
  );
}
