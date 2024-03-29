import { useEffect, useState } from "react";
import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Button,
  Flex,
  Heading,
  Text,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
} from "@chakra-ui/react";

import { BillType } from "@/types";
import { roundDecimal } from "@/utils";
import Receipt from "@/components/common/Bill/Receipt";

interface BillProp {
  open: true | false;
  onClose: () => void;
  bill: BillType;
}

const dummyBillData: BillType = {
  id: "",
  info: {
    id: "",
    customer: {
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
    },
    address: {
      street: "",
      city: "",
      state: "",
      country: "",
      zip: "",
    },
  },
  date: "",
  subtotal: 0,
  discount: 0,
  tax: 0,
  grand_total: 0,
  paid: [],
  orders: [],
};

function Bill(props: BillProp) {
  const [open, setOpen] = useState(false);
  const [billData, setBillData] = useState<BillType>(dummyBillData);

  useEffect(() => setOpen(props.open), [props.open]);
  useEffect(() => setBillData(props.bill), [props.bill]);

  return (
    <Drawer isOpen={open} placement="right" size="xl" onClose={props.onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Bill Details</DrawerHeader>

        <DrawerBody>
          <br />
          {billData.date ? (
            <Text fontWeight={500}>Billed at {billData.date}</Text>
          ) : (
            <Text>Billed date unavailable</Text>
          )}
          <br />
          <Receipt bill={billData} />
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}

export default Bill;
