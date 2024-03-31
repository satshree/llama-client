import { useEffect, useState } from "react";
import Image from "next/image";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Box,
  Flex,
  Text,
  Stat,
  StatNumber,
  useToast,
} from "@chakra-ui/react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import { GlobalState, ProductType } from "@/types";

import style from "./product.module.css";
import { useSelector } from "react-redux";

interface ProductModalProps {
  open: true | false;
  data: ProductType;
  onClose: () => void;
  addToCart: (id: string) => void;
  reset?: () => void;
}

const dummyData: ProductType = {
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
};

function ProductModal(props: ProductModalProps) {
  const toast = useToast();

  const { user } = useSelector((state: GlobalState) => state.user);

  const [open, setOpen] = useState(false);
  const [product, setProduct] = useState<ProductType>(dummyData);

  useEffect(() => setOpen(props.open), [props.open]);
  useEffect(() => setProduct(props.data), [props.data]);

  const reset = () => setProduct(dummyData);

  return (
    <Modal
      size="xl"
      isOpen={open}
      onClose={props.onClose}
      isCentered={true}
      onCloseComplete={reset}
    >
      <ModalOverlay />
      <ModalContent minW="900px">
        <ModalHeader>{product.name}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex>
            <div className={style["image-box"]}>
              <Swiper
                navigation={true}
                modules={[Navigation]}
                className="mySwiper"
              >
                {product.images.map((image) => (
                  <SwiperSlide key={image.id}>
                    <Image
                      className={style.image}
                      src={image.image}
                      width={400}
                      height={400}
                      alt={image.name}
                      // fill={true}
                      // unoptimized
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            <Box w="500px" pl="1rem">
              <Flex direction="column" justifyContent="space-between" h="100%">
                <Text>{product.description}</Text>
                <div>
                  <span style={{ float: "right" }}>
                    <Stat>
                      <StatNumber>${product.price}</StatNumber>
                    </Stat>
                  </span>
                </div>
              </Flex>
            </Box>
          </Flex>
        </ModalBody>

        <ModalFooter>
          <Flex w="100%" alignItems="center" justifyContent="space-between">
            <div>
              <Text>{product.category.name}</Text>
            </div>
            <div>
              <Button mr={3} onClick={props.onClose}>
                Close
              </Button>
              <Button
                variant="outline"
                colorScheme="pink"
                mr={3}
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
              >
                Add to Wishlist
              </Button>
              <Button
                variant="outline"
                colorScheme="blue"
                onClick={() => props.addToCart(product.id)}
              >
                Add to Cart
              </Button>
            </div>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default ProductModal;
