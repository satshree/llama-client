import { GlobalState, ImageType, ProductType } from "@/types";
import {
  Button,
  Card,
  CardBody,
  Center,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  GridItem,
  Heading,
  IconButton,
  Input,
  Select,
  SimpleGrid,
  Text,
  Textarea,
  VStack,
  useToast,
} from "@chakra-ui/react";
import Image from "next/image";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { FiTrash, FiUploadCloud } from "react-icons/fi";
import { API_ROOT } from "@/utils";
import DeleteConfirmation from "@/components/common/DeleteConfirmation";

interface EditProductProps {
  open: true | false;
  product: ProductType;
  onClose: () => void;
  reset: () => void;
}

function EditProduct(props: EditProductProps) {
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

  const [images, setImages] = useState<ImageType[]>([]);

  const [loading, setLoading] = useState(false);

  const [uploadLoading, setUploadLoading] = useState(false);
  const [deleteImageID, setDeleteImageID] = useState("");

  const { categories } = useSelector((state: GlobalState) => state.categories);
  const { access } = useSelector((state: GlobalState) => state.auth.token);

  const toast = useToast();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setName(props.product.name);
    setDescription(props.product.description);
    setSku(props.product.sku);
    setCategory(props.product.category.id);
    setPrice(props.product.price);
    setImages(props.product.images);
  }, [props.product]);

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

  const uploadImageClick = () => {
    if (inputRef.current) inputRef.current.click();
  };

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setUploadLoading(true);
      const formData = new FormData();
      formData.append("images", file);

      fetch(API_ROOT + `/api/management/product-image/${props.product.id}/`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${access}`,
          // "Content-Type": "multipart/form-data",
        },
        body: formData,
      })
        .then(async (resp) => {
          const response = await resp.json();
          if (resp.status !== 200) {
            console.log(resp);
            console.log(response);
            toast({
              title: "Unable to upload image",
              status: "warning",
              isClosable: true,
              position: "bottom-left",
            });
          } else {
            toast({
              title: "Image uploaded successfully",
              status: "success",
              isClosable: true,
              position: "bottom-left",
            });
            setImages([...images, response.uploadedImages[0]]);
          }
        })
        .finally(() => setUploadLoading(false));
    }
  };

  const deleteImage = () => {
    fetch(API_ROOT + `/api/management/product-image/${deleteImageID}/`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${access}`,
      },
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
          toast({
            title: "Image deleted successfully",
            status: "success",
            isClosable: true,
            position: "bottom-left",
          });

          setImages(images.filter((img) => img.id !== deleteImageID));
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
      .finally(() => setDeleteImageID(""));
  };

  const onSubmit = () => {
    let proceed = true;

    if (name === "") {
      setNameError("Product name is required");
      proceed = false;
    }
    if (price < 0.01) {
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
      fetch(API_ROOT + `/api/management/product/${props.product.id}/`, {
        method: "PUT",
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
              position: "bottom-left",
            });
          } else {
            toast({
              title: "Product updated successfully",
              status: "success",
              isClosable: true,
              position: "bottom-left",
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
            position: "bottom-left",
          });
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  return (
    <>
      <Drawer
        isOpen={open}
        placement="right"
        size="lg"
        onClose={loading || uploadLoading ? () => {} : props.onClose}
        onCloseComplete={props.reset}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton disabled={loading || uploadLoading} />
          <DrawerHeader>Edit Product</DrawerHeader>

          <DrawerBody>
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
            <br />
            <Flex alignItems="center" justifyContent="space-between">
              <Heading size="sm">Images</Heading>
              <div>
                <input
                  type="file"
                  ref={inputRef}
                  onChange={handleImageUpload}
                  style={{ display: "none" }}
                />
              </div>
              <Button
                leftIcon={<FiUploadCloud />}
                colorScheme="blue"
                onClick={uploadImageClick}
                size="sm"
                isLoading={uploadLoading}
              >
                Upload
              </Button>
            </Flex>
            <br />
            {images.length > 0 ? (
              <SimpleGrid columns={3} spacing={10}>
                {images.map((image) => (
                  <div key={image.id}>
                    <Card maxW="sm">
                      <CardBody>
                        <VStack>
                          <Image
                            src={image.image}
                            alt="product image"
                            height={200}
                            width={200}
                            style={{ borderRadius: "8px" }}
                          />
                          <Flex
                            alignItems="center"
                            justifyContent="space-between"
                            w="100%"
                          >
                            <Text fontSize="small">
                              {image.name.length > 10
                                ? `${image.name.substring(0, 10)}...`
                                : image.name}
                            </Text>
                            <IconButton
                              colorScheme="red"
                              variant="ghost"
                              icon={<FiTrash />}
                              aria-label={""}
                              size="sm"
                              onClick={() => setDeleteImageID(image.id)}
                            />
                          </Flex>
                        </VStack>
                      </CardBody>
                    </Card>
                  </div>
                ))}
              </SimpleGrid>
            ) : (
              <Center>
                <Heading size="sm">No Images ... </Heading>
              </Center>
            )}
          </DrawerBody>

          <DrawerFooter>
            <Button
              variant="outline"
              mr={3}
              onClick={props.onClose}
              isDisabled={loading || uploadLoading}
            >
              Cancel
            </Button>
            <Button
              colorScheme="green"
              isLoading={loading}
              isDisabled={uploadLoading}
              onClick={onSubmit}
            >
              Save
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      <DeleteConfirmation
        title="Delete image"
        text="Delete this image? This action cannot be undone!"
        open={deleteImageID !== ""}
        action={deleteImage}
        onClose={() => setDeleteImageID("")}
      />
    </>
  );
}

export default EditProduct;
