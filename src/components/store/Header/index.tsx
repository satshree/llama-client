"use client";

import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { FiUser, FiShoppingCart, FiHeart, FiLogOut } from "react-icons/fi";
import {
  Box,
  Button,
  HStack,
  Heading,
  IconButton,
  Tooltip,
  useToast,
} from "@chakra-ui/react";

import { toggleCart, updateCart } from "@/api/cart";
import { GlobalState } from "@/types";

import style from "./header.module.css";

import logo from "../../../assets/logo_only.png";
import title from "../../../assets/title_only.png";
import { endSession, setUser } from "@/api";
import { setBills } from "@/api/billing";
import { removeCartFromLocalStorage } from "@/utils";

function Header() {
  const toast = useToast();
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();

  const { cart, open } = useSelector((state: GlobalState) => state.cart);
  const { user } = useSelector((state: GlobalState) => state.auth);

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

      <HStack spacing="0.5rem">
        {user.id ? (
          <Tooltip label="Sign Out">
            <IconButton
              size="sm"
              variant="ghost"
              colorScheme="red"
              aria-label={""}
              icon={<FiLogOut />}
              onClick={() => {
                dispatch(endSession());
                dispatch(setBills([]));
                dispatch(
                  updateCart({
                    id: "",
                    updated: "",
                    total: 0,
                    user: {
                      id: "",
                      username: "",
                    },
                    items: [],
                  })
                );
                dispatch(
                  setUser({
                    id: "",
                    username: "",
                    first_name: "",
                    last_name: "",
                    email: "",
                    address: "",
                    phone: "",
                    password: "",
                    is_super: false,
                    last_login: "",
                    date_joined: "",
                    cart_id: "",
                  })
                );
                removeCartFromLocalStorage();
                toast({
                  title: "Session ended",
                  status: "info",
                  isClosable: true,
                  position: "bottom-left",
                });
                router.push("/");
              }}
            />
          </Tooltip>
        ) : (
          <></>
        )}
        {pathname === "/browse" ? (
          <>
            <Tooltip label="Account">
              <IconButton
                icon={<FiUser />}
                aria-label={""}
                variant="ghost"
                colorScheme="gray"
                onClick={() => router.push("/account")}
              />
            </Tooltip>
            <Tooltip label="Wishlists">
              <IconButton
                icon={<FiHeart />}
                aria-label={""}
                variant="ghost"
                colorScheme="gray"
                onClick={() => {
                  if (user.id) {
                  } else {
                    toast({
                      title:
                        "Login or create an account to add items to wishlist",
                      status: "info",
                      variant: "left-accent",
                      isClosable: true,
                      position: "bottom-left",
                    });
                  }
                }}
              />
            </Tooltip>
            <div>
              <Tooltip label="Cart">
                <IconButton
                  icon={<FiShoppingCart />}
                  aria-label={""}
                  variant="ghost"
                  colorScheme="gray"
                  onClick={() => dispatch(toggleCart(!open))}
                />
              </Tooltip>
              {cart.items.length > 0 ? (
                <div className={style.badge}>{getTotalCartItems()}</div>
              ) : null}
            </div>
          </>
        ) : (
          <>
            <Button onClick={() => router.push("/browse")} size="sm">
              Store
            </Button>
          </>
        )}
      </HStack>
    </div>
  );
}

export default Header;
