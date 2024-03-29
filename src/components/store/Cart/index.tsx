"use client";

import { useEffect, useState } from "react";
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
} from "@chakra-ui/react";

import { GlobalState } from "@/types";
import { toggleCart } from "@/api/cart";

function Cart() {
  const dispatch = useDispatch();

  const { open } = useSelector((state: GlobalState) => state.cart);
  const { cart } = useSelector((state: GlobalState) => state.cart);

  const closeCart = () => dispatch(toggleCart(false));

  return (
    <>
      <Drawer isOpen={open} placement="right" size="lg" onClose={closeCart}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Your Cart</DrawerHeader>

          <DrawerBody>{JSON.stringify(cart)}</DrawerBody>

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
