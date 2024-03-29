"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import {
  ButtonGroup,
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
import Cart from "@/components/store/Cart";
import { fetchCart } from "@/api/cart";
import { API_ROOT } from "@/utils";

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
  const dispatch = useDispatch();

  const { products } = useSelector((state: GlobalState) => state.products);
  const { categories } = useSelector((state: GlobalState) => state.categories);

  const [filterSearch, setFilterSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [allProducts, setProducts] = useState<ProductType[]>([]);

  const [productModal, setProductModal] = useState<ProductType>(dummyData);

  useEffect(() => {
    dispatch(fetchCart());
  }, []);

  useEffect(() => setProducts(products), [products]);

  const filterProductsByCategory = () =>
    filterCategory === ""
      ? allProducts
      : allProducts.filter((product) => product.category.id === filterCategory);
  const filterProductsBySearch = () =>
    filterSearch === ""
      ? filterProductsByCategory()
      : filterProductsByCategory().filter((product) =>
          product.name.toLowerCase().includes(filterSearch.toLowerCase())
        );

  const getCategoryNameTitle = () => {
    for (let category of categories) {
      if (category.id === filterCategory) return category.name;
    }

    return "All";
  };

  const getProducts = () => filterProductsBySearch();

  const addToCart = () => {
    fetch(API_ROOT + "/api/website/cart/");
  };
  const addToCartFromModal = () => {};

  return (
    <>
      <div className={style.page}>
        <Header />
        <QueryBox
          currentFilter={filterCategory}
          setFilterCategory={setFilterCategory}
        />
        <div className={style.main}>
          <Flex alignItems="center" justifyContent="space-between">
            <Text fontWeight={600} fontSize="larger" mr="1rem">
              {getCategoryNameTitle()}
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
                  <CardBody pr="0.5rem">
                    <Text
                      className={style["product-title"]}
                      fontSize="large"
                      onClick={() => setProductModal(product)}
                    >
                      {product.name.length > 15
                        ? `${product.name.substring(0, 15)}...`
                        : product.name}
                    </Text>
                    <Flex
                      alignItems="center"
                      justifyContent="space-between"
                      mt="0.5rem"
                    >
                      <Text>${product.price}</Text>
                      <ButtonGroup variant="ghost" spacing={0}>
                        <IconButton
                          icon={<FiHeart />}
                          aria-label={""}
                          colorScheme="pink"
                        />
                        <IconButton
                          icon={<TbShoppingCartPlus />}
                          aria-label={""}
                          colorScheme="gray"
                        />
                      </ButtonGroup>
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
      <Cart />
    </>
  );
}

export default Browse;
