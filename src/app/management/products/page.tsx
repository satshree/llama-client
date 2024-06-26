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
  useToast,
} from "@chakra-ui/react";
import { FiTrash, FiEdit } from "react-icons/fi";
import Image from "next/image";

import { GlobalState, ProductType } from "@/types";

import AddProduct from "../../../components/management/Product/AddProduct";
import DeleteConfirmation from "@/components/common/DeleteConfirmation";

import { API_ROOT } from "@/utils";
import { fetchProduct } from "@/api/products";
import { fetchCategories } from "@/api/category";

import style from "./products.module.css";
import EditProduct from "@/components/management/Product/EditProduct";
import ProductCategory from "@/components/management/Product/ProductCategory";

const dummyProduct: ProductType = {
  id: "",
  name: "",
  description: "",
  price: 0,
  sku: "",
  category: {
    id: "",
    name: "",
  },
  images: [],
};

function Products() {
  const dispatch = useDispatch();
  const { products } = useSelector((state: GlobalState) => state.products);
  const { access } = useSelector((state: GlobalState) => state.auth.token);

  const toast = useToast();

  const [search, setSearch] = useState("");
  const [addModalOpen, toggleAddModal] = useState(false);
  const [allProducts, setProducts] = useState<ProductType[]>([]);

  const [categoryDrawer, toggleCategoryDrawer] = useState(false);

  const [deleteID, setDeleteID] = useState("");

  const [editMode, setEditMode] = useState(false);
  const [editProduct, setEditProduct] = useState<ProductType>(dummyProduct);

  useEffect(() => {
    const updateProducts = async () => {
      try {
        await dispatch(fetchProduct());
      } catch (err) {
        console.log(err);
        toast({
          title: "Something went wrong",
          description: "Unable to fetch products",
          status: "warning",
          isClosable: true,
          position: "bottom-left",
        });
      }
    };

    updateProducts();

    const updateCategories = async () => {
      try {
        await dispatch(fetchCategories());
      } catch (err) {
        console.log(err);
        toast({
          title: "Something went wrong",
          description: "Unable to fetch product categories",
          status: "warning",
          isClosable: true,
          position: "bottom-left",
        });
      }
    };
    updateCategories();
  }, []);

  useEffect(() => {
    setProducts(products);
  }, [products]);

  const getProducts = () => {
    if (search) {
      return allProducts.filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    return allProducts;
  };

  const editProductDrawer = (product: ProductType) => {
    setEditMode(true);
    setEditProduct(product);
  };

  const deleteProduct = () => {
    fetch(API_ROOT + `/api/management/product/${deleteID}/`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${access}`,
      },
    })
      .then(async (resp) => {
        const response = await resp.json();
        if (resp.status !== 200) {
          console.log(response);
          toast({
            title: "Something went wrong",
            status: "warning",
            isClosable: true,
            position: "bottom-left",
          });
        } else {
          toast({
            title: "Product deleted",
            status: "success",
            isClosable: true,
            position: "bottom-left",
          });

          dispatch(fetchProduct());
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
      })
      .finally(() => setDeleteID(""));
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
          <Button colorScheme="blue" onClick={() => toggleCategoryDrawer(true)}>
            Product Categories
          </Button>
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
                        onClick={() => editProductDrawer(product)}
                      />
                      <IconButton
                        icon={<FiTrash />}
                        colorScheme="red"
                        variant="ghost"
                        aria-label={""}
                        onClick={() => setDeleteID(product.id)}
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

      <DeleteConfirmation
        open={deleteID !== ""}
        title="Delete Product"
        text="Delete this product? This action cannot be undone!"
        onClose={() => setDeleteID("")}
        action={deleteProduct}
      />

      <ProductCategory
        open={categoryDrawer}
        onClose={() => toggleCategoryDrawer(false)}
        fetch={() => dispatch(fetchCategories())}
      />
      <AddProduct open={addModalOpen} onClose={() => toggleAddModal(false)} />
      <EditProduct
        open={editMode}
        onClose={() => setEditMode(false)}
        product={editProduct}
        reset={() => {
          setEditProduct(dummyProduct);
          dispatch(fetchProduct());
        }}
      />
    </div>
  );
}

export default Products;
