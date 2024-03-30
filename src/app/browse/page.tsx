"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import {
  ButtonGroup,
  Card,
  CardBody,
  Center,
  Flex,
  IconButton,
  Input,
  SimpleGrid,
  Text,
  useToast,
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

import search from "@/assets/img/search.svg";

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
  const toast = useToast();
  const dispatch = useDispatch();

  const { products } = useSelector((state: GlobalState) => state.products);
  const { categories } = useSelector((state: GlobalState) => state.categories);
  const { cart } = useSelector((state: GlobalState) => state.cart);

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

  const getProducts = () => filterProductsBySearch();

  const getCategoryNameTitle = () => {
    for (let category of categories) {
      if (category.id === filterCategory) return category.name;
    }

    return "All";
  };

  const getProductName = (id: string) => {
    for (let p of allProducts) {
      if (p.id === id) return p.name;
    }

    return "";
  };

  const addToCart = (id: string, notify: boolean = true) => {
    fetch(API_ROOT + `/api/website/cart/${cart.id}/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ product_id: id, quantity: 1 }),
    })
      .then(async (resp) => {
        const response = await resp.json();
        if (resp.status !== 200) {
          console.log(resp);
          console.log(response);
          toast({
            title: "Something went wrong",
            status: "warning",
            isClosable: true,
            position: "bottom-left",
          });
        } else {
          if (notify)
            toast({
              title: `${getProductName(id)} Added to Cart`,
              status: "info",
              variant: "left-accent",
              isClosable: true,
              position: "bottom-left",
            });
          dispatch(fetchCart());
        }
      })
      .catch((err) => {
        console.log(err);
        toast({
          title: "Something went wrong",
          status: "error",
          isClosable: true,
          position: "bottom-left",
        });
      });
  };

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
          {getProducts().length > 0 ? (
            <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing="2rem">
              {getProducts().map((product) => (
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
                          onClick={() => addToCart(product.id)}
                        />
                      </ButtonGroup>
                    </Flex>
                  </CardBody>
                </Card>
              ))}
            </SimpleGrid>
          ) : (
            <>
              <br />
              <Center>
                <Image
                  src={search.src}
                  alt="Keep looking"
                  width={400}
                  height={400}
                />
              </Center>
              <br />
              <Center>
                <Text fontWeight={600} fontSize="larger">
                  Keep looking ...
                </Text>
              </Center>
            </>
          )}
        </div>
      </div>

      <ProductModal
        open={productModal.id !== ""}
        data={productModal}
        addToCart={addToCart}
        onClose={() => setProductModal(dummyData)}
      />
      <Cart addToCart={addToCart} />
    </>
  );
}

export default Browse;
