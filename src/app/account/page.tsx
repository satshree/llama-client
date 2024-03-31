"use client";

import { useState } from "react";
import { useSelector } from "react-redux";
import {
  Box,
  Button,
  Card,
  CardBody,
  Center,
  Divider,
  FormControl,
  FormErrorMessage,
  HStack,
  Input,
  Text,
  useToast,
} from "@chakra-ui/react";

import { BillType, GlobalState } from "@/types";

import Header from "@/components/store/Header";

import style from "./account.module.css";
import { API_ROOT } from "@/utils";
import BillList from "@/components/store/Account/BillList";
import BillModal, { dummyBillData } from "@/components/store/Account/BillModal";

function Account() {
  const toast = useToast();
  const { user } = useSelector((state: GlobalState) => state.auth);
  const { bills } = useSelector((state: GlobalState) => state.userBills);

  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");

  const [billList, setBillList] = useState<BillType[]>([]);

  const [billModal, setBillModal] = useState<BillType>(dummyBillData);

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
          <></>
        ) : (
          <>
            <Center>
              <Card w="75%">
                <CardBody>
                  <Center>
                    <Text fontSize="larger" fontWeight={600}>
                      Login or create an account to save items to wishlist and
                      keep your bills on track
                    </Text>
                  </Center>
                </CardBody>
              </Card>
            </Center>
            <br />
            <Divider />
            <br />
            <Center>
              <Card w="75%">
                <CardBody>
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
                </CardBody>
              </Card>
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
