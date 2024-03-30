"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Button,
  VStack,
  Box,
  Center,
  Text,
  Flex,
  IconButton,
  useToast,
  Divider,
  Stat,
  StatNumber,
  StatLabel,
} from "@chakra-ui/react";
import { FiPlusCircle, FiMinusCircle } from "react-icons/fi";

import { CartItemsType, GlobalState } from "@/types";
import { fetchCart, toggleCart } from "@/api/cart";
import { API_ROOT, roundDecimal } from "@/utils";

import style from "./cart.module.css";

interface CartProps {
  addToCart: (id: string, notify: boolean) => void;
}

function Cart(props: CartProps) {
  const toast = useToast();
  const dispatch = useDispatch();

  const { open } = useSelector((state: GlobalState) => state.cart);
  const { cart } = useSelector((state: GlobalState) => state.cart);

  const [cartItems, setCartItems] = useState<CartItemsType[]>([]);

  useEffect(() => setCartItems(cart.items), [cart]);

  const removeFromCart = (id: string) =>
    fetch(API_ROOT + `/api/website/cart/${id}/`, {
      method: "DELETE",
    }).then((resp) => {
      if (resp.status !== 200) {
        console.log(resp);
        toast({
          title: "Something went wrong",
          status: "warning",
          isClosable: true,
          position: "top-right",
        });
      } else {
        dispatch(fetchCart());
      }
    });

  const closeCart = () => {
    dispatch(toggleCart(false));
    dispatch(fetchCart());
  };

  return (
    <>
      <Drawer isOpen={open} placement="right" size="lg" onClose={closeCart}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Your Cart</DrawerHeader>

          <DrawerBody>
            <div className={style["cart-item-box"]}>
              {cartItems.length > 0 ? (
                <VStack spacing="0.5rem">
                  {cartItems.map((item) => (
                    <Box
                      key={item.id}
                      borderWidth={0.8}
                      borderRadius={8}
                      p="1rem"
                      w="100%"
                    >
                      <Flex
                        w="100%"
                        alignItems="center"
                        justifyContent="space-between"
                      >
                        <Flex alignItems="center">
                          {item.product.images.length > 0 ? (
                            <Image
                              src={item.product.images[0].image}
                              alt="img"
                              width={100}
                              height={100}
                              style={{
                                borderRadius: "8px",
                                marginRight: "1rem",
                              }}
                            />
                          ) : null}
                          <Text>{item.product.name}</Text>
                        </Flex>
                        <Flex alignItems="center">
                          <Text>${roundDecimal(item.total)}</Text>
                          <IconButton
                            variant="ghost"
                            icon={<FiMinusCircle />}
                            colorScheme="red"
                            size="sm"
                            aria-label={""}
                            onClick={() => removeFromCart(item.id)}
                          />
                          <Text mr="0.5rem" ml="0.5rem" fontSize="large">
                            {item.quantity}
                          </Text>
                          <IconButton
                            variant="ghost"
                            icon={<FiPlusCircle />}
                            colorScheme="blue"
                            size="sm"
                            onClick={() =>
                              props.addToCart(item.product.id, false)
                            }
                            aria-label={""}
                          />
                        </Flex>
                      </Flex>
                    </Box>
                  ))}
                </VStack>
              ) : (
                <>
                  <Center>
                    <Text fontSize="larger">Add Products to Cart</Text>
                  </Center>
                </>
              )}
            </div>
            <br />
            <Divider />
            <br />
            <div>
              <Stat style={{ float: "right" }}>
                <StatLabel>Total</StatLabel>
                <StatNumber>${roundDecimal(cart.total)}</StatNumber>
              </Stat>
            </div>
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={closeCart}>
              Cancel
            </Button>
            <Button colorScheme="green">Checkout</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default Cart;
