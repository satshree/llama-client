import { useEffect, useState } from "react";

import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  Button,
  Flex,
  FormControl,
  Input,
  HStack,
  Center,
  Heading,
  Box,
  VStack,
  Text,
  IconButton,
  useToast,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { CategoryType, GlobalState } from "@/types";
import { FiEdit, FiTrash } from "react-icons/fi";
import DeleteConfirmation from "@/components/common/DeleteConfirmation";
import ProductCategoryModal from "./ProductCategoryModal";
import { API_ROOT } from "@/utils";

interface ProductCategoryProps {
  open: true | false;
  onClose: () => void;
  fetch: () => void;
}

function ProductCategory(props: ProductCategoryProps) {
  const { access } = useSelector((state: GlobalState) => state.auth.token);
  const { categories } = useSelector((state: GlobalState) => state.categories);

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [allCategories, setCategories] = useState<CategoryType[]>([]);
  const [newCategory, setNewCategory] = useState("");

  const [editCategory, setEditCategory] = useState<CategoryType>({
    id: "",
    name: "",
  });

  const [deleteCategoryID, setDeleteCategoryID] = useState("");

  const toast = useToast();

  useEffect(() => setCategories(categories), [categories]);
  useEffect(() => setOpen(props.open), [props.open]);

  const addCategory = () => {
    setLoading(true);

    fetch(API_ROOT + "/api/management/product-category/", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${access}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: newCategory }),
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
            title: "New category added successfully",
            status: "success",
            isClosable: true,
            position: "bottom-left",
          });
          props.fetch();
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
      .finally(() => setLoading(false));
  };
  const deleteCategory = () => {
    fetch(API_ROOT + `/api/management/product-category/${deleteCategoryID}/`, {
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
            title: "Category deleted successfully",
            status: "success",
            isClosable: true,
            position: "bottom-left",
          });
          props.fetch();
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
      .finally(() => setDeleteCategoryID(""));
  };

  return (
    <>
      <Drawer
        isOpen={open}
        placement="right"
        size="lg"
        onClose={loading ? () => {} : props.onClose}
        onCloseComplete={() => {
          setNewCategory("");
          props.fetch();
        }}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton disabled={loading} />
          <DrawerHeader>Product Categories</DrawerHeader>

          <DrawerBody>
            <HStack spacing="0.5rem">
              <FormControl>
                <Input
                  placeholder="Add New Category"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                />
              </FormControl>
              <Button
                colorScheme="blue"
                isDisabled={newCategory === ""}
                isLoading={loading}
                onClick={addCategory}
              >
                Add
              </Button>
            </HStack>
            <br />
            {allCategories.length > 0 ? (
              <>
                <VStack spacing="0.5rem">
                  {allCategories.map((category) => (
                    <Box
                      key={category.id}
                      borderWidth={0.8}
                      p="1rem"
                      w="100%"
                      borderRadius={8}
                    >
                      <Flex
                        w="100%"
                        alignItems="center"
                        justifyContent="space-between"
                      >
                        <Text>{category.name}</Text>
                        <HStack>
                          <IconButton
                            icon={<FiEdit />}
                            variant="ghost"
                            colorScheme="blue"
                            aria-label={""}
                            onClick={() => setEditCategory(category)}
                          />
                          <IconButton
                            icon={<FiTrash />}
                            variant="ghost"
                            colorScheme="red"
                            aria-label={""}
                            onClick={() => setDeleteCategoryID(category.id)}
                          />
                        </HStack>
                      </Flex>
                    </Box>
                  ))}
                </VStack>
              </>
            ) : (
              <>
                <Center w="100%" p="1rem">
                  <Heading size="md">No Categories ...</Heading>
                </Center>
              </>
            )}
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      <DeleteConfirmation
        open={deleteCategoryID !== ""}
        title="Delete category"
        text="Delete this category? This will have breaking effects on products as well. This action cannot be undone!"
        onClose={() => setDeleteCategoryID("")}
        action={deleteCategory}
      />
      <ProductCategoryModal
        open={editCategory.id !== ""}
        onClose={() => setEditCategory({ id: "", name: "" })}
        fetch={props.fetch}
        category={editCategory}
      />
    </>
  );
}

export default ProductCategory;
