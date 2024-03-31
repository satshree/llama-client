import { useEffect, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  // ModalHeader,
  ModalCloseButton,
  ModalBody,
  Box,
  // ModalFooter,
  // Button,
} from "@chakra-ui/react";

import { BillType } from "@/types";
import Receipt from "@/components/common/Bill/Receipt";

export const dummyBillData: BillType = {
  id: "",
  date: "",
  info: {
    id: "",
    customer: {
      email: "",
      phone: "",
      first_name: "",
      last_name: "",
    },
    address: {
      street: "",
      city: "",
      state: "",
      zip: "",
      country: "",
    },
  },
  subtotal: 0,
  discount: 0,
  tax: 0,
  grand_total: 0,
  paid: [],
  orders: [],
};

interface BillModalProps {
  open: true | false;
  bill: BillType;
  onClose: () => void;
}

function BillModal(props: BillModalProps) {
  const [open, setOpen] = useState(false);
  const [bill, setBill] = useState<BillType>(dummyBillData);

  useEffect(() => setOpen(props.open), [props.open]);
  useEffect(() => setBill(props.bill), [props.bill]);

  return (
    <>
      <Modal isOpen={open} onClose={props.onClose} isCentered={true} size="3xl">
        <ModalOverlay />
        <ModalContent>
          {/* <ModalHeader></ModalHeader> */}
          <ModalCloseButton />
          <ModalBody>
            <Box p="5rem 1rem">
              <Receipt bill={bill} />
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default BillModal;
