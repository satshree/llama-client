"use client";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Image from "next/image";
import {
  Card,
  CardBody,
  Flex,
  IconButton,
  Input,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { TbShoppingCartPlus } from "react-icons/tb";

import { GlobalState, ProductType } from "@/types";

import Header from "@/components/store/Header";
import QueryBox from "@/components/store/QueryBox";
import ProductModal from "@/components/store/ProductModal";

import style from "./browse.module.css";

import logo from "@/assets/logo_transparent2.png";
import { FiHeart } from "react-icons/fi";

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

function Browse() {
  const { products } = useSelector((state: GlobalState) => state.products);

  const [filterSearch, setFilterSearch] = useState("");
  const [allProducts, setProducts] = useState<ProductType[]>([]);

  const [productModal, setProductModal] = useState<ProductType>(dummyData);

  useEffect(() => setProducts(products), [products]);

  const getProducts = () => allProducts;

  const addToCart = () => {};
  const addToCartFromModal = () => {};

  return (
    <>
      <div className={style.page}>
        <Header />
        <QueryBox />
        <div className={style.main}>
          <Flex alignItems="center" justifyContent="space-between">
            <Text fontWeight={600} fontSize="larger" mr="1rem">
              All
            </Text>
            <Input
              placeholder="Filter"
              value={filterSearch}
              onChange={(e) => setFilterSearch(e.target.value)}
              w="350px"
            />
          </Flex>
          <br />
          <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing="2rem">
            {getProducts().length > 0 ? (
              getProducts().map((product) => (
                <Card key={product.id} className={style.card} borderRadius={8}>
                  <Image
                    className={style["product-image"]}
                    src={
                      product.images.length > 0
                        ? product.images[0].image
                        : logo.src
                    }
                    alt={product.name}
                    height={300}
                    width={300}
                    // fill={true}
                  />
                  <CardBody>
                    <Flex alignItems="center" justifyContent="space-between">
                      <Text
                        className={style["product-title"]}
                        fontSize="large"
                        onClick={() => setProductModal(product)}
                      >
                        {product.name}
                      </Text>
                      <Text mr="0.5rem">${product.price}</Text>
                    </Flex>
                    <Flex
                      alignItems="center"
                      justifyContent="space-between"
                      mt="0.5rem"
                    >
                      <Text fontSize="xs">{product.category.name}</Text>
                      <div>
                        <IconButton
                          icon={<FiHeart />}
                          aria-label={""}
                          variant="ghost"
                          colorScheme="pink"
                        />
                        <IconButton
                          icon={<TbShoppingCartPlus />}
                          aria-label={""}
                          variant="ghost"
                          colorScheme="gray"
                        />
                      </div>
                    </Flex>
                  </CardBody>
                </Card>
              ))
            ) : (
              <></>
            )}
          </SimpleGrid>
        </div>
      </div>

      <ProductModal
        open={productModal.id !== ""}
        data={productModal}
        addToCart={addToCartFromModal}
        onClose={() => setProductModal(dummyData)}
      />
    </>
  );
}

export default Browse;
