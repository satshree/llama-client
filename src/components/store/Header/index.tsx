"use client";

import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { FiUser, FiShoppingCart, FiHeart } from "react-icons/fi";
import { Box, Button, HStack, IconButton } from "@chakra-ui/react";

import { toggleCart } from "@/api/cart";
import { GlobalState } from "@/types";

import style from "./header.module.css";

import logo from "../../../assets/logo_only.png";
import title from "../../../assets/title_only.png";

function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();

  const { cart, open } = useSelector((state: GlobalState) => state.cart);

  const getTotalCartItems = () => {
    let total = 0;

    for (let c of cart.items) {
      total += c.quantity;
    }

    return total;
  };

  return (
    <div className={style.header}>
      <Box cursor="pointer" onClick={() => router.push("/")}>
        <Image src={logo.src} alt="LLAMA" height={50} width={50} />
      </Box>

      <Box>
        <Image src={title.src} alt="LLAMA" height={50} width={200} />
      </Box>

      {pathname === "/browse" ? (
        <>
          <HStack spacing="1rem">
            <IconButton
              icon={<FiUser />}
              aria-label={""}
              variant="ghost"
              colorScheme="gray"
              onClick={() => router.push("/account")}
            />
            <IconButton
              icon={<FiHeart />}
              aria-label={""}
              variant="ghost"
              colorScheme="gray"
            />
            <div>
              <IconButton
                icon={<FiShoppingCart />}
                aria-label={""}
                variant="ghost"
                colorScheme="gray"
                onClick={() => dispatch(toggleCart(!open))}
              />
              {cart.items.length > 0 ? (
                <div className={style.badge}>{getTotalCartItems()}</div>
              ) : null}
            </div>
          </HStack>
        </>
      ) : (
        <>
          <Button onClick={() => router.push("/browse")} size="sm">
            Store
          </Button>
        </>
      )}
    </div>
  );
}

export default Header;
