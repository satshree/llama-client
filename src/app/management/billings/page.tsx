"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Center,
  Flex,
  Grid,
  GridItem,
  Heading,
  Input,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { DayPicker } from "react-day-picker";
import { format } from "date-fns";

import { fetchBills } from "@/api/billingManagement";
import { BillType, GlobalState, PaidType } from "@/types";
import Bill from "@/components/management/Bill/Bill";
import { roundDecimal } from "@/utils";
import moment from "moment";

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

function Billings() {
  const toast = useToast();
  const dispatch = useDispatch();
  const { bills } = useSelector((state: GlobalState) => state.bills);

  const [filter, setFilter] = useState("");
  const [filterDate, setFilterDate] = useState<Date>();
  const [billDrawer, setBillDrawer] = useState<BillType>(dummyBillData);
  const [allBills, setAllBills] = useState<BillType[]>([]);

  useEffect(() => {
    fetchAllBills();
  }, []);

  useEffect(() => setAllBills(bills), [bills]);

  useEffect(() => {
    if (filterDate) {
      filterBillByDate();
    } else {
      fetchAllBills();
    }
  }, [filterDate]);

  const fetchAllBills = async () => {
    try {
      await dispatch(fetchBills());
    } catch (err) {
      console.log(err);
      toast({
        title: "Something went wrong",
        description: "Unable to fetch bills",
        status: "warning",
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  const filterBillByDate = async () =>
    await dispatch(fetchBills(format(filterDate, "yyyy-MM-dd")));

  const getBills = () =>
    allBills.filter((bill) =>
      bill.info.customer.phone.toLowerCase().startsWith(filter.toLowerCase())
    );

  const getTotalPaid = (paid: PaidType[]) => {
    let total = 0;
    for (let p of paid) {
      total += p.amount;
    }
    return total;
  };

  return (
    <div>
      <Grid templateColumns="repeat(12, 1fr)" gap="1rem">
        <GridItem colSpan={3}>
          <Box w="100%" p="1rem" borderWidth={0.8} borderRadius={8}>
            <Input
              placeholder="Filter by Phone Number"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              w="100%"
            />
            <br />
            <Center>
              <DayPicker
                mode="single"
                selected={filterDate}
                onSelect={setFilterDate}
                footer={
                  <>
                    {filterDate ? (
                      <Center>
                        <Text>
                          Showing bills billed at {format(filterDate, "PP")}
                        </Text>
                      </Center>
                    ) : null}
                  </>
                }
              />
            </Center>
          </Box>
        </GridItem>
        <GridItem colSpan={9}>
          <Box w="100%">
            {getBills().length > 0 ? (
              <>
                <VStack spacing="0.5rem">
                  {getBills().map((bill) => (
                    <Box
                      key={bill.id}
                      borderWidth={0.8}
                      borderRadius={8}
                      w="100%"
                      p="1rem"
                      cursor="pointer"
                      onClick={() => setBillDrawer(bill)}
                    >
                      <Flex alignItems="center" justifyContent="space-between">
                        <div>
                          <Heading size="sm">
                            Billed for {bill.info.customer.email} (
                            {bill.info.customer.phone})
                          </Heading>
                          <Text fontSize="sm">
                            {bill.date ? (
                              <>Billed at {bill.date}</>
                            ) : (
                              <>Billed date unavailable</>
                            )}
                          </Text>
                        </div>
                        <div>
                          <Stat>
                            <StatLabel>Total</StatLabel>
                            <StatNumber>
                              ${roundDecimal(bill.grand_total)}
                            </StatNumber>
                            <StatHelpText>
                              {bill.paid.length > 0 ? (
                                <>Paid ${getTotalPaid(bill.paid)}</>
                              ) : (
                                <>Not Paid</>
                              )}
                            </StatHelpText>
                          </Stat>
                        </div>
                      </Flex>
                    </Box>
                  ))}
                </VStack>
              </>
            ) : (
              <>
                <Center p="1rem">
                  <Heading size="sm">No Bills ...</Heading>
                </Center>
              </>
            )}
          </Box>
        </GridItem>
      </Grid>

      <Bill
        bill={billDrawer}
        open={billDrawer.id !== ""}
        onClose={() => setBillDrawer(dummyBillData)}
      />
    </div>
  );
}

export default Billings;
