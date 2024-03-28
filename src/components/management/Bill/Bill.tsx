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
          <Flex alignItems="center" justifyContent="space-between" w="100%">
            <div>
              <Heading size="sm">Customer Details</Heading>
              <Text>
                {billData.info.customer.first_name}{" "}
                {billData.info.customer.last_name}
              </Text>
              <Text>
                {billData.info.customer.email}, {billData.info.customer.phone}
              </Text>
            </div>
            <div>
              <Heading size="sm">Shipping Details</Heading>
              <Text>{billData.info.address.street}</Text>
              <Text>
                {billData.info.address.city}, {billData.info.address.state}
              </Text>
              <Text>
                {billData.info.address.zip}, {billData.info.address.country}
              </Text>
            </div>
          </Flex>
          <br />
          <Table>
            <Thead>
              <Tr>
                <Th w="65%">Title</Th>
                <Th isNumeric={true}>Unit</Th>
                <Th isNumeric={true}>Quantity</Th>
                <Th isNumeric={true}>Total</Th>
              </Tr>
            </Thead>
            <Tbody>
              {billData.orders.map((order) => (
                <Tr key={order.id}>
                  <Td>{order.title}</Td>
                  <Td>${roundDecimal(order.unit_price)}</Td>
                  <Td>{order.quantity}</Td>
                  <Td>${roundDecimal(order.total)}</Td>
                </Tr>
              ))}
              <Tr borderTopWidth={2}>
                <Td colSpan={3} textAlign="end">
                  <Text fontWeight={500}>Subtotal</Text>
                </Td>
                <Td>${roundDecimal(billData.subtotal)}</Td>
              </Tr>
              <Tr>
                <Td colSpan={3} textAlign="end">
                  <Text fontWeight={500}>Discount</Text>
                </Td>
                <Td>${roundDecimal(billData.discount)}</Td>
              </Tr>
              <Tr>
                <Td colSpan={3} textAlign="end">
                  <Text fontWeight={500}>Tax</Text>
                </Td>
                <Td>${roundDecimal(billData.tax)}</Td>
              </Tr>
              <Tr>
                <Td colSpan={3} textAlign="end">
                  <Text fontWeight={500}>Grand Total</Text>
                </Td>
                <Td>${roundDecimal(billData.grand_total)}</Td>
              </Tr>
            </Tbody>
          </Table>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}

export default Bill;
