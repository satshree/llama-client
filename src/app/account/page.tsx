"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import Image from "next/image";
import {
  Box,
  Button,
  Center,
  Collapse,
  Divider,
  FormControl,
  FormErrorMessage,
  HStack,
  Input,
  Text,
  useToast,
} from "@chakra-ui/react";

import { BillType, GlobalState } from "@/types";
import { API_ROOT } from "@/utils";
import { fetchBillsByPhone } from "@/api/billing";

import Header from "@/components/store/Header";
import BillList from "@/components/store/Account/BillList";
import UserForm from "@/components/store/Account/UserForm";
import BillModal, { dummyBillData } from "@/components/store/Account/BillModal";

import empty from "@/assets/img/empty.svg";
import style from "./account.module.css";

function Account() {
  const toast = useToast();
  const dispatch = useDispatch();

  const { user } = useSelector((state: GlobalState) => state.user);
  const { bills } = useSelector((state: GlobalState) => state.userBills);

  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");

  const [showDetails, toggleDetails] = useState(false);

  const [billList, setBillList] = useState<BillType[]>([]);

  const [billModal, setBillModal] = useState<BillType>(dummyBillData);

  useEffect(() => {
    const fetchBill = async () => await dispatch(fetchBillsByPhone(user.phone));

    fetchBill();
  }, []);

  const fetchAndShowBills = async () => {
    const resp = await fetch(
      API_ROOT + `/api/website/billing/get-by-phone/?phone=${phone}`
    );
    const response = await resp.json();

    if (resp.status !== 200) {
      console.log(resp);
      console.log(response);

      toast({
        title: "Something went wrong",
        description: "Unable to retrieve your bills. Please try again.",
        status: "warning",
        isClosable: true,
        position: "bottom-left",
      });
    } else {
      setBillList(response);
    }
  };

  return (
    <>
      <Header />
      <div className={style.main}>
        {user.id ? (
          <>
            <Center>
              <Box w="75%" p="1rem" pb="0" borderWidth={0.8} borderRadius={8}>
                <Center>
                  <Button onClick={() => toggleDetails(!showDetails)} size="sm">
                    Your Details
                  </Button>
                </Center>
                <br />
                <Collapse in={showDetails} animateOpacity={true}>
                  <UserForm />
                </Collapse>
              </Box>
            </Center>
            <br />
            <Divider />
            <br />
            <Center>
              <Box w="75%" p="1rem" borderWidth={0.8} borderRadius={8}>
                <Text fontSize="large" fontWeight={600}>
                  Order history
                </Text>
                <br />
                {bills.length > 0 ? (
                  <BillList
                    billList={bills}
                    openModal={(bill) => setBillModal(bill)}
                  />
                ) : (
                  <>
                    <Center p="5rem">
                      <Image
                        src={empty.src}
                        alt="No bills"
                        width={350}
                        height={350}
                        style={{ pointerEvents: "none" }}
                      />
                    </Center>
                    <Center>
                      <Text>Your order history will appear here</Text>
                    </Center>
                    <br />
                  </>
                )}
              </Box>
            </Center>
          </>
        ) : (
          <>
            <Center>
              <Box w="75%" p="1rem" borderWidth={0.8} borderRadius={8}>
                <Center>
                  <Text fontSize="larger" fontWeight={600}>
                    <Link className={style.link} href="/login">
                      Login
                    </Link>{" "}
                    or{" "}
                    <Link href="/signup" className={style.link}>
                      create an account
                    </Link>{" "}
                    to save items to wishlist and keep your bills on track
                  </Text>
                </Center>
              </Box>
            </Center>
            <br />
            <Divider />
            <br />
            <Center>
              <Box w="75%" p="1rem" borderWidth={0.8} borderRadius={8}>
                <Center>
                  <Text fontSize="large" fontWeight={500}>
                    Enter your phone number to retrieve your bills
                  </Text>
                </Center>
                <br />
                <Center>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();

                      let proceed = true;

                      if (phone === "") {
                        setPhoneError("Enter phone number");
                        proceed = false;
                      }

                      if (proceed) fetchAndShowBills();
                    }}
                  >
                    <HStack spacing="0.5rem">
                      <FormControl isInvalid={phoneError !== ""}>
                        <Input
                          placeholder="Phone Number"
                          value={phone}
                          onChange={(e) => {
                            setPhone(e.target.value);
                            setPhoneError("");
                          }}
                        />
                        {phoneError ? (
                          <FormErrorMessage>{phoneError}</FormErrorMessage>
                        ) : null}
                      </FormControl>
                      <Button colorScheme="blue" type="submit">
                        Retrieve
                      </Button>
                    </HStack>
                  </form>
                </Center>
                <br />
                <BillList
                  billList={billList}
                  openModal={(bill) => setBillModal(bill)}
                />
              </Box>
            </Center>
          </>
        )}
      </div>

      <BillModal
        open={billModal.id !== ""}
        bill={billModal}
        onClose={() => setBillModal(dummyBillData)}
      />
    </>
  );
}

export default Account;
