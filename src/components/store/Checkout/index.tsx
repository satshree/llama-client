"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Stepper,
  Box,
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  useSteps,
  useToast,
  Flex,
  Heading,
  Text,
  Button,
} from "@chakra-ui/react";

import ShippingForm, { ShippingDetails } from "./ShippingForm";
import PaymentForm, { PaymentDetails } from "./PaymentForm";

import { GlobalState } from "@/types";
import { API_ROOT } from "@/utils";

import confirmed from "@/assets/img/confirmed.svg";
import { fetchCart, toggleCart } from "@/api/cart";

// import style from "./checkout.module.css";

interface CheckoutProps {
  open: true | false;
  onClose: () => void;
}

const steps = [
  { title: "First", description: "Shipping Details" },
  { title: "Second", description: "Payment Details" },
  { title: "Third", description: "Complete" },
];

const infoDummyData: ShippingDetails = {
  first_name: "",
  last_name: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  state: "",
  zip: "",
  country: "",
};

const paymentDetailDummy: PaymentDetails = {
  card: "",
  amount: 0,
};

function Checkout(props: CheckoutProps) {
  const toast = useToast();
  const dispatch = useDispatch();

  const { cart } = useSelector((state: GlobalState) => state.cart);

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [billID, setBillID] = useState("");
  const [info, setInfo] = useState<ShippingDetails>(infoDummyData);
  const [paymentDetails, setPaymentDetails] =
    useState<PaymentDetails>(paymentDetailDummy);

  const { activeStep, setActiveStep } = useSteps({
    index: 0,
    count: steps.length,
  });

  useEffect(() => setOpen(props.open), [props.open]);
  useEffect(() => {
    if (paymentDetails.card) {
      fetch(API_ROOT + `/api/website/billing/pay/${billID}/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          card: paymentDetails.card
            .replace(" ", "")
            .replace(" ", "")
            .replace(" ", "")
            .replace(" ", ""),
          amount: paymentDetails.amount,
        }),
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
              title: "Payment successful",
              status: "success",
              isClosable: true,
              position: "bottom-left",
            });
            dispatch(fetchCart());
            dispatch(toggleCart(false));
            setPaymentDetails(paymentDetailDummy);
            setActiveStep(3);
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
    }
  }, [billID]);

  const createBill = async () =>
    await fetch(API_ROOT + "/api/website/billing/create/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cart_id: cart.id, info }),
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
          setBillID(response.id);
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

  const submitPayment = async () => {
    setLoading(true);

    await createBill();
  };

  return (
    <Modal
      isOpen={open}
      onClose={props.onClose}
      isCentered={true}
      size="xl"
      onCloseComplete={() => {
        setPaymentDetails(paymentDetailDummy);
        setInfo(infoDummyData);
        setActiveStep(0);
        setBillID("");
      }}
      closeOnEsc={false}
      closeOnOverlayClick={false}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Checkout</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box h="550px">
            <Stepper index={activeStep}>
              {steps.map((step, index) => (
                <Step key={index}>
                  <StepIndicator>
                    <StepStatus
                      complete={<StepIcon />}
                      incomplete={<StepNumber />}
                      active={<StepNumber />}
                    />
                  </StepIndicator>

                  <Box flexShrink="0">
                    <StepTitle>{step.title}</StepTitle>
                    <StepDescription>{step.description}</StepDescription>
                  </Box>

                  <StepSeparator />
                </Step>
              ))}
            </Stepper>
            <br />
            <>
              {activeStep === 0 ? (
                <ShippingForm
                  details={info}
                  onSubmit={(details: ShippingDetails) => {
                    setInfo(details);
                    setActiveStep(1);
                  }}
                />
              ) : activeStep === 1 ? (
                <PaymentForm
                  loading={loading}
                  total={cart.total}
                  onSubmit={(details: { card: string }) => {
                    setPaymentDetails({
                      card: details.card,
                      amount: cart.total,
                    });
                    submitPayment();
                  }}
                  back={() => setActiveStep(0)}
                />
              ) : (
                <>
                  <Flex
                    alignItems="center"
                    justifyContent="center"
                    direction="column"
                    p="3.5rem"
                  >
                    <Image
                      src={confirmed.src}
                      alt="Order confirmed"
                      width={250}
                      height={250}
                      style={{ pointerEvents: "none" }}
                    />
                    <Heading size="md" mt="1rem">
                      Order confirmed!
                    </Heading>
                    <Text fontSize="larger">Thank you for the purchase.</Text>
                    <Button mt="1rem" onClick={props.onClose}>
                      Close
                    </Button>
                  </Flex>
                </>
              )}
            </>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default Checkout;
