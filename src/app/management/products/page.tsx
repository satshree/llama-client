"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  HStack,
  Heading,
  IconButton,
  Input,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { FiTrash, FiEdit } from "react-icons/fi";
import Image from "next/image";

import { CategoryType, GlobalState, ProductType } from "@/types";
import { fetchProduct } from "@/api/products";

import style from "./products.module.css";
import { fetchCategories } from "@/api/category";
import AddProduct from "./_AddProduct";

function Products() {
  const dispatch = useDispatch();
  const { products } = useSelector((state: GlobalState) => state.products);
  const { categories } = useSelector((state: GlobalState) => state.categories);

  const [search, setSearch] = useState("");
  const [addModalOpen, toggleAddModal] = useState(false);
  const [allProducts, setProducts] = useState<ProductType[]>([]);
  const [allCategories, setCategories] = useState<CategoryType[]>([]);

  useEffect(() => {
    const updateProducts = async () => {
      await dispatch(fetchProduct());
    };

    updateProducts();

    const updateCategories = async () => {
      await dispatch(fetchCategories());
    };
    updateCategories();
  }, []);

  useEffect(() => {
    setProducts(products);
  }, [products]);

  useEffect(() => {
    setCategories(categories);
  }, [categories]);

  const getProducts = () => {
    if (search) {
      return allProducts.filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    return allProducts;
  };

  return (
    <div>
      <Flex alignItems="center" justifyContent="space-between">
        <FormControl w="300px">
          <Input
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </FormControl>
        <HStack spacing={2}>
          <Button colorScheme="blue" onClick={() => toggleAddModal(true)}>
            Add Product
          </Button>
          <Button colorScheme="blue">Product Categories</Button>
        </HStack>
      </Flex>
      <br />
      {getProducts().length > 0 ? (
        <div className={style.table}>
          <Table size="md">
            <Thead>
              <Tr>
                <Th w="1%"></Th>
                <Th>Name</Th>
                <Th>Category</Th>
                <Th>SKU</Th>
                <Th>Price</Th>
                <Th w="10%"></Th>
              </Tr>
            </Thead>
            <Tbody>
              {getProducts().map((product, index) => (
                <Tr key={product.id}>
                  <Td>{index + 1}</Td>
                  <Td>
                    <Flex alignItems="center">
                      {product.images.length > 0 ? (
                        <Image
                          src={product.images[0].image}
                          className={style.image}
                          alt="image"
                          width={100}
                          height={100}
                        />
                      ) : null}
                      {product.name}
                    </Flex>
                  </Td>
                  <Td>{product.category.name}</Td>
                  <Td>{product.sku}</Td>
                  <Td>{product.price}</Td>
                  <Td>
                    <Flex>
                      <IconButton
                        icon={<FiEdit />}
                        colorScheme="blue"
                        variant="ghost"
                        aria-label={""}
                      />
                      <IconButton
                        icon={<FiTrash />}
                        colorScheme="red"
                        variant="ghost"
                        aria-label={""}
                      />
                    </Flex>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </div>
      ) : (
        <Box w="100%" p="1rem">
          <Center>
            <Heading size="md">No Products ... </Heading>
          </Center>
        </Box>
      )}

      <AddProduct open={addModalOpen} onClose={() => toggleAddModal(false)} />
    </div>
  );
}

export default Products;
