import { Flex, Heading } from "@chakra-ui/react";
import Image from "next/image";

import easter from "@/assets/img/easter.svg";

function EasterEgg() {
  return (
    <>
      <Flex
        h="100%"
        alignItems="center"
        justifyContent="center"
        direction="column"
      >
        <Image
          src={easter.src}
          alt="Easter Egg"
          width={500}
          height={500}
          style={{ pointerEvents: "none" }}
        />
        <Heading size="md" mt="2rem">
          Well Hello There! You just found an easter egg.
        </Heading>
      </Flex>
    </>
  );
}

export default EasterEgg;
