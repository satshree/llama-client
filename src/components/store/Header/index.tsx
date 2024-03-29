"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { FiUser, FiShoppingCart } from "react-icons/fi";
import { Box, HStack, IconButton } from "@chakra-ui/react";

import style from "./header.module.css";

import logo from "../../../assets/logo_only.png";
import title from "../../../assets/title_only.png";

function Header() {
  const router = useRouter();

  return (
    <div className={style.header}>
      <Box cursor="pointer" onClick={() => router.push("/")}>
        <Image src={logo.src} alt="LLAMA" height={50} width={50} />
      </Box>

      <Box>
        <Image src={title.src} alt="LLAMA" height={50} width={200} />
      </Box>

      <HStack spacing="1rem">
        <IconButton
          icon={<FiUser />}
          aria-label={""}
          variant="ghost"
          colorScheme="gray"
        />
        <IconButton
          icon={<FiShoppingCart />}
          aria-label={""}
          variant="ghost"
          colorScheme="gray"
        />
      </HStack>
    </div>
  );
}

export default Header;
