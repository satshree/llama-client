import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Grid,
  GridItem,
  Center,
  Button,
  HStack,
  Flex,
} from "@chakra-ui/react";
import {
  FaCcVisa,
  FaCcMastercard,
  FaCcDiscover,
  FaCcAmex,
  FaCcDinersClub,
} from "react-icons/fa6";

import {
  formatCreditCard,
  validCreditCard,
  formatCVV,
  formatExpiryDate,
  validCreditCardCVV,
  validCreditCardExpiry,
  validZIP,
  getCardType,
} from "@/utils/payment";
import { roundDecimal } from "@/utils";

export interface PaymentDetails {
  card: string;
  amount: number;
}

interface PaymentFormProps {
  total: number;
  loading: boolean;
  onSubmit: (details: { card: string }) => void;
  back: () => void;
}

function PaymentForm(props: PaymentFormProps) {
  const [cardNumber, setCardNumber] = useState("");
  const [cardNumberError, setCardNumberError] = useState(false);

  const [cardCVV, setCardCVV] = useState("");
  const [cardCVVError, setCardCVVError] = useState(false);

  const [cardExpiry, setCardExpiry] = useState("");
  const [cardExpiryError, setCardExpiryError] = useState(false);

  const [cardZIP, setCardZIP] = useState("");
  const [cardZIPError, setCardZIPError] = useState(false);

  const [loading, setLoading] = useState(false);

  useEffect(() => setLoading(props.loading), [props.loading]);

  const handleCardChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCardNumber(e.target.value);
    formatCreditCard(e.target);
    setCardNumberError(!validCreditCard(e.target.value));
  };

  const handleCVVChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCardCVV(e.target.value);
    formatCVV(e.target);
    setCardCVVError(!validCreditCardCVV(e.target.value));
  };

  const handleCardChangeExpiry = (e: ChangeEvent<HTMLInputElement>) => {
    setCardExpiry(e.target.value);
    formatExpiryDate(e.target);
    setCardExpiryError(!validCreditCardExpiry(e.target.value));
  };

  const handleZIPChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCardZIP(e.target.value.length < 6 ? e.target.value : cardZIP);
    setCardZIPError(!validZIP(e.target.value));
  };

  const getCardTypeIcon = (cardNumber: string) => {
    let cardType = getCardType(cardNumber);

    if (cardType === "visa") {
      return <FaCcVisa />;
    } else if (cardType === "mastercard") {
      return <FaCcMastercard />;
    } else if (cardType === "discover") {
      return <FaCcDiscover />;
    } else if (cardType === "amex") {
      return <FaCcAmex />;
    } else if (cardType === "dinersclub") {
      return <FaCcDinersClub />;
    } else {
      return null;
    }
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    let proceed = true;

    if (cardNumber === "") {
      setCardNumberError(true);
      proceed = false;
    }

    if (cardCVV === "") {
      setCardCVVError(true);
      proceed = false;
    }

    if (cardExpiry === "") {
      setCardExpiryError(true);
      proceed = false;
    }

    if (cardZIP === "") {
      setCardZIPError(true);
      proceed = false;
    }

    if (proceed) props.onSubmit({ card: cardNumber });
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <Box p="1rem">
          <FormControl isInvalid={cardNumberError}>
            <FormLabel>
              <Flex alignItems="center">
                Card Number
                {cardNumber !== "" ? (
                  <span style={{ marginLeft: "0.5rem", fontSize: "24px" }}>
                    {getCardTypeIcon(cardNumber)}
                  </span>
                ) : null}
              </Flex>
            </FormLabel>
            <Input
              placeholder="XXXX XXXX XXXX XXXX"
              onChange={handleCardChange}
              value={cardNumber}
            />
            {cardNumberError ? (
              <FormErrorMessage>Invalid card number</FormErrorMessage>
            ) : null}
          </FormControl>
          <br />
          <Grid templateColumns="repeat(12, 1fr)" gap="1rem">
            <GridItem colSpan={4}>
              <FormControl isInvalid={cardCVVError}>
                <FormLabel>CVV</FormLabel>
                <Input
                  placeholder="XXX"
                  value={cardCVV}
                  onChange={handleCVVChange}
                />
                {cardCVVError ? (
                  <FormErrorMessage>Invalid card CVV</FormErrorMessage>
                ) : null}
              </FormControl>
            </GridItem>
            <GridItem colSpan={4}>
              <FormControl isInvalid={cardExpiryError}>
                <FormLabel>Expiry</FormLabel>
                <Input
                  placeholder="XX/XX"
                  value={cardExpiry}
                  onChange={handleCardChangeExpiry}
                />
                {cardExpiryError ? (
                  <FormErrorMessage>Invalid card expiry</FormErrorMessage>
                ) : null}
              </FormControl>
            </GridItem>
            <GridItem colSpan={4}>
              <FormControl isInvalid={cardZIPError}>
                <FormLabel>Billing ZIP</FormLabel>
                <Input
                  type="number"
                  placeholder="XXXXX"
                  value={cardZIP}
                  onChange={handleZIPChange}
                />
                {cardZIPError ? (
                  <FormErrorMessage>Invalid ZIP code</FormErrorMessage>
                ) : null}
              </FormControl>
            </GridItem>
          </Grid>
        </Box>
        <br />
        <Center>
          <HStack spacing="1rem">
            <Button colorScheme="blue" onClick={props.back}>
              Back
            </Button>
            <Button
              type="submit"
              colorScheme="green"
              isLoading={loading}
              isDisabled={
                cardNumber === "" ||
                cardCVV === "" ||
                cardExpiry === "" ||
                cardZIP === "" ||
                cardNumberError ||
                cardCVVError ||
                cardExpiryError ||
                cardZIPError
              }
            >
              Pay ${roundDecimal(props.total + (props.total / 100) * 6.25)}
            </Button>
          </HStack>
        </Center>
      </form>
      <br />
    </>
  );
}

export default PaymentForm;
