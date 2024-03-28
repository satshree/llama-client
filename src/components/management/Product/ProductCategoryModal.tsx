import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  FormControl,
  Input,
  FormErrorMessage,
  useToast,
} from "@chakra-ui/react";
import { ChangeEvent, useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { CategoryType, GlobalState } from "@/types";
import { API_ROOT } from "@/utils";

interface ModalProps {
  open: true | false;
  onClose: () => void;
  category: CategoryType;
  fetch: () => void;
}

function ProductCategoryModal(props: ModalProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");

  const { access } = useSelector((state: GlobalState) => state.auth.token);

  const toast = useToast();

  useEffect(() => {
    setName(props.category.name);
    setNameError("");
  }, [props.category]);
  useEffect(() => setOpen(props.open), [props.open]);

  const onNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    setNameError("");
  };

  const onSubmit = () => {
    let proceed = true;
    if (name === "") {
      setNameError("Category is required");
      proceed = false;
    }

    if (proceed) {
      setLoading(true);

      fetch(
        API_ROOT + `/api/management/product-category/${props.category.id}/`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${access}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name }),
        }
      )
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
            toast({
              title: "Category updated successfully",
              status: "success",
              isClosable: true,
              position: "top-right",
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
            position: "top-right",
          });
        })
        .finally(() => {
          setLoading(false);
          props.onClose();
        });
    }
  };

  return (
    <Modal isOpen={open} onClose={props.onClose} isCentered={true}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Product Category</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl isInvalid={nameError !== ""}>
            <Input
              placeholder="Category Name"
              value={name}
              onChange={onNameChange}
            />
            {nameError ? (
              <FormErrorMessage>{nameError}</FormErrorMessage>
            ) : null}
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button mr={3} onClick={props.onClose} disabled={loading}>
            Close
          </Button>
          <Button colorScheme="green" onClick={onSubmit} isLoading={loading}>
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default ProductCategoryModal;
