import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  useToast,
  Text,
  Center,
  VStack,
  Box,
  Flex,
  IconButton,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import { FiTrash } from "react-icons/fi";
import { TbShoppingCartPlus } from "react-icons/tb";

import { GlobalState, WishlistType } from "@/types";
import { removeFromWishlist, toggleWishlist } from "@/api/wishlist";
import DeleteConfirmation from "@/components/common/DeleteConfirmation";

const dummyWishlistData: WishlistType = {
  id: "",
  user: {
    id: "",
    username: "",
  },
  product: {
    id: "",
    name: "",
    description: "",
    sku: "",
    price: 0,
    category: {
      id: "",
      name: "",
    },
    images: [],
  },
};

interface WishlistProps {
  addToCart: (id: string) => void;
}

function Wishlist(props: WishlistProps) {
  const toast = useToast();
  const dispatch = useDispatch();

  const { wishlist, open } = useSelector(
    (state: GlobalState) => state.wishlist
  );

  const [deleteItem, setDeleteItem] = useState<WishlistType>(dummyWishlistData);
  const [allWishlistItems, updateWishlistItems] = useState<WishlistType[]>([]);

  useEffect(() => updateWishlistItems(wishlist), [wishlist]);

  const callDeleteItem = () => {
    dispatch(removeFromWishlist(deleteItem.id));
    setDeleteItem(dummyWishlistData);
    toast({
      title: "Removed from wishlist",
      status: "info",
      variant: "left-accent",
      isClosable: true,
      position: "bottom-left",
    });
  };

  return (
    <>
      <Drawer
        isOpen={open}
        placement="right"
        size="lg"
        onClose={() => dispatch(toggleWishlist(false))}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Your Wishlist</DrawerHeader>

          <DrawerBody>
            {allWishlistItems.length === 0 ? (
              <>
                <Center p="1rem">
                  <Text fontSize="large" fontWeight={600}>
                    Add products to wishtlist
                  </Text>
                </Center>
              </>
            ) : (
              <>
                <VStack spacing="0.5rem">
                  {allWishlistItems.map((item) => (
                    <>
                      <Box borderWidth={0.8} borderRadius={8} p="1rem" w="100%">
                        <Flex
                          alignItems="center"
                          justifyContent="space-between"
                        >
                          <Flex alignItems="center">
                            <Image
                              src={item.product.images[0].image}
                              alt="product"
                              width={100}
                              height={100}
                              style={{
                                borderRadius: "8px",
                                marginRight: "1rem",
                              }}
                            />
                            <Text>{item.product.name}</Text>
                          </Flex>
                          <Flex alignItems="center">
                            <IconButton
                              aria-label={""}
                              icon={<TbShoppingCartPlus />}
                              variant="ghost"
                              colorScheme="gray"
                              onClick={() => props.addToCart(item.product.id)}
                            />
                            <IconButton
                              aria-label={""}
                              icon={<FiTrash />}
                              variant="ghost"
                              colorScheme="red"
                              onClick={() => setDeleteItem(item)}
                            />
                          </Flex>
                        </Flex>
                      </Box>
                    </>
                  ))}
                </VStack>
              </>
            )}
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      <DeleteConfirmation
        open={deleteItem.id !== ""}
        action={callDeleteItem}
        title="Remove from wishlist"
        text="Are you sure to remove this from your wishlist?"
        onClose={() => setDeleteItem(dummyWishlistData)}
      />
    </>
  );
}

export default Wishlist;
