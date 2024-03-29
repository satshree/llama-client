import React, { useEffect, useState } from "react";
import {
  Flex,
  Heading,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Text,
  Box,
  Icon,
  HStack,
  Stat,
  StatNumber,
  Center,
} from "@chakra-ui/react";
import {
  Fa0,
  Fa1,
  Fa2,
  Fa3,
  Fa4,
  Fa5,
  Fa6,
  Fa7,
  Fa8,
  Fa9,
} from "react-icons/fa6";
import { VscCircleFilled } from "react-icons/vsc";

import { roundDecimal } from "@/utils";
import { BillType } from "@/types";

interface ReceiptProps {
  bill: BillType;
}

const dummyData: BillType = {
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

function Receipt(props: ReceiptProps) {
  const [billData, setBillData] = useState<BillType>(dummyData);

  useEffect(() => setBillData(props.bill), [props.bill]);

  const getCardNumberIcon = (num: number) =>
    [
      <Fa0 />,
      <Fa1 />,
      <Fa2 />,
      <Fa3 />,
      <Fa4 />,
      <Fa5 />,
      <Fa6 />,
      <Fa7 />,
      <Fa8 />,
      <Fa9 />,
    ][num];

  return (
    <>
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
      <br />
      <Text fontWeight={600}>Payment Details</Text>
      <br />
      {billData.paid.length > 0 ? (
        billData.paid.map((payment) => (
          <Box
            w="100"
            borderWidth={0.8}
            borderRadius={8}
            p="1rem"
            key={payment.id}
          >
            <Flex>
              <Stat>
                <StatNumber>${payment.amount}</StatNumber>
              </Stat>
              <HStack spacing={4} fontSize="12px">
                <Flex>
                  <VscCircleFilled />
                  <VscCircleFilled />
                  <VscCircleFilled />
                  <VscCircleFilled />
                </Flex>
                <Flex>
                  <VscCircleFilled />
                  <VscCircleFilled />
                  <VscCircleFilled />
                  <VscCircleFilled />
                </Flex>
                <Flex>
                  <VscCircleFilled />
                  <VscCircleFilled />
                  <VscCircleFilled />
                  <VscCircleFilled />
                </Flex>
                <Flex>
                  {payment.card
                    .split("")
                    .map((n) => getCardNumberIcon(parseInt(n)))}
                </Flex>
              </HStack>
            </Flex>
          </Box>
        ))
      ) : (
        <Box w="100" borderWidth={0.8} borderRadius={8} p="1rem">
          <Center>
            <Heading size="md">No payments made yet</Heading>
          </Center>
        </Box>
      )}
    </>
  );
}

export default Receipt;
