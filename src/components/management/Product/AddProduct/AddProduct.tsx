import React, { ChangeEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  GridItem,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Textarea,
  useToast,
} from "@chakra-ui/react";

import { GlobalState } from "@/types";
import { API_ROOT } from "@/utils";
import { fetchProduct } from "@/api/products";

type AddProductType = {
  open: true | false;
  onClose: () => void;
};

function AddProduct(props: AddProductType) {
  const [open, setOpen] = useState(false);

  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");

  const [description, setDescription] = useState("");

  const [sku, setSku] = useState("");
  const [skuError, setSkuError] = useState("");

  const [price, setPrice] = useState(0.0);
  const [priceError, setPriceError] = useState("");

  const [category, setCategory] = useState("");
  const [categoryError, setCategoryError] = useState("");

  const [loading, setLoading] = useState(false);

  const { categories } = useSelector((state: GlobalState) => state.categories);
  const { access } = useSelector((state: GlobalState) => state.auth.token);

  const toast = useToast();
  const dispatch = useDispatch();

  useEffect(() => {
    setOpen(props.open);
  }, [props.open]);

  const onNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    setNameError("");
  };

  const onSkuChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSku(e.target.value);
    setSkuError("");
  };

  const onPriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    const priceValue = e.target.value === "" ? 0.0 : parseFloat(e.target.value);

    if (priceValue === 0) {
      setPrice(0);
    } else if (priceValue < 0) {
      setPrice(0.0);
      setPriceError("Price cannot be negative");
    } else {
      setPrice(priceValue);
      setPriceError("");
    }
  };

  const onCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
    setCategoryError("");
  };

  const clearForm = () => {
    setName("");
    setNameError("");

    setPrice(0);
    setPriceError("");

    setSku("");
    setSkuError("");

    setCategory("");
    setCategoryError("");

    setDescription("");
  };

  const onSubmit = () => {
    let proceed = true;

    if (name === "") {
      setNameError("Product name is required");
      proceed = false;
    }
    if (price < 0.01) {
      // setPriceError("Product price is required");
      setPriceError("Required");
      proceed = false;
    }
    if (sku === "") {
      setSkuError("Product SKU is required");
      proceed = false;
    }
    if (category === "") {
      setCategoryError("Product category is required");
      proceed = false;
    }

    if (proceed) {
      setLoading(true);
      fetch(API_ROOT + "/api/management/product/", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${access}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          price,
          sku,
          category_id: category,
          description,
        }),
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
              position: "top-right",
            });
          } else {
            dispatch(fetchProduct());
            toast({
              title: "Product added successfully",
              status: "success",
              isClosable: true,
              position: "top-right",
            });
            props.onClose();
          }
        })
        .catch((err) => {
          console.log(err);
          toast({
            title: "Something went wrong",
            status: "error",
            isClosable: true,
            position: "top-right",
          });
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  return (
    <Modal
      isOpen={open}
      isCentered={true}
      onClose={loading ? () => {} : () => props.onClose()}
      onCloseComplete={clearForm}
      closeOnEsc={false}
      closeOnOverlayClick={false}
      size="xl"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add New Product</ModalHeader>
        <ModalCloseButton disabled={loading} />
        <ModalBody>
          <Grid templateColumns="repeat(12, 1fr)" gap="0.5rem">
            <GridItem colSpan={10}>
              <FormControl isInvalid={nameError !== ""}>
                <FormLabel>Name</FormLabel>
                <Input
                  placeholder="Product Name"
                  value={name}
                  onChange={onNameChange}
                />
                {nameError ? (
                  <FormErrorMessage>{nameError}</FormErrorMessage>
                ) : null}
              </FormControl>
            </GridItem>
            <GridItem colSpan={2}>
              <FormControl isInvalid={priceError !== ""}>
                <FormLabel>Price</FormLabel>
                <Input
                  type="number"
                  step={2}
                  placeholder="Product Price"
                  value={price}
                  onChange={onPriceChange}
                />
                {priceError ? (
                  <FormErrorMessage>{priceError}</FormErrorMessage>
                ) : null}
              </FormControl>
            </GridItem>
          </Grid>
          <br />
          <Grid templateColumns="repeat(12, 1fr)" gap="0.5rem">
            <GridItem colSpan={6}>
              <FormControl isInvalid={skuError !== ""}>
                <FormLabel>SKU</FormLabel>
                <Input
                  placeholder="Stock Keeping Unit"
                  value={sku}
                  onChange={onSkuChange}
                />
                {skuError ? (
                  <FormErrorMessage>{skuError}</FormErrorMessage>
                ) : null}
              </FormControl>
            </GridItem>
            <GridItem colSpan={6}>
              <FormControl isInvalid={categoryError !== ""}>
                <FormLabel>Category</FormLabel>
                <Select
                  placeholder="Product Category"
                  value={category}
                  onChange={onCategoryChange}
                >
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </Select>
                {categoryError ? (
                  <FormErrorMessage>{categoryError}</FormErrorMessage>
                ) : null}
              </FormControl>
            </GridItem>
          </Grid>
          <br />
          <FormControl>
            <FormLabel>Description</FormLabel>
            <Textarea
              placeholder="Description about the product"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={10}
              resize="none"
            ></Textarea>
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button mr={3} onClick={props.onClose} disabled={loading}>
            Close
          </Button>
          <Button colorScheme="green" onClick={onSubmit} isLoading={loading}>
            Add
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default AddProduct;
