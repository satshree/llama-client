"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Flex,
  FormControl,
  HStack,
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

import { GlobalState, ProductType } from "@/types";
import { fetchProduct } from "@/api/products";

import style from "./products.module.css";

function Products() {
  const dispatch = useDispatch();
  const { products } = useSelector((state: GlobalState) => state.products);

  const [search, setSearch] = useState("");
  const [allProducts, setProducts] = useState<ProductType[]>([]);

  useEffect(() => {
    const updateProducts = async () => {
      await dispatch(fetchProduct());
    };

    updateProducts();
  }, []);

  useEffect(() => {
    setProducts(products);
  }, [products]);

  return (
    <div>
      <HStack spacing="50%">
        <FormControl>
          <Input
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </FormControl>
        <HStack spacing={2}>
          <Button colorScheme="blue">Add Product</Button>
          <Button colorScheme="blue">Product Categories</Button>
        </HStack>
      </HStack>
      <br />
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
            {allProducts.map((product, index) => (
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
    </div>
  );
}

export default Products;
