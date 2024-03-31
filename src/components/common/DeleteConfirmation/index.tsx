import React, { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";

interface DeleteConfirmationProps {
  open: true | false;
  title?: string;
  text: string;
  onClose: () => void;
  action: () => void;
}

function DeleteConfirmation(props: DeleteConfirmationProps) {
  const cancelRef = React.useRef();

  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  useEffect(() => setOpen(props.open), [props.open]);
  useEffect(() => setTitle(props.title || ""), [props.title]);
  useEffect(() => setText(props.text), [props.text]);

  return (
    <AlertDialog
      isOpen={open}
      onClose={props.onClose}
      leastDestructiveRef={cancelRef}
      isCentered={true}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          {title ? (
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              {title}
            </AlertDialogHeader>
          ) : null}

          <AlertDialogBody>{text ? <>{text}</> : <>Alert!</>}</AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={props.onClose}>
              Cancel
            </Button>
            <Button colorScheme="red" onClick={props.action} ml={3}>
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}

export default DeleteConfirmation;
