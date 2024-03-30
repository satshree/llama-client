import { ChangeEvent, FormEvent, useState } from "react";
import {
  Grid,
  GridItem,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Divider,
  Center,
  Button,
} from "@chakra-ui/react";

export interface ShippingDetails {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

interface ShippingFormProps {
  details: ShippingDetails;
  onSubmit: (details: ShippingDetails) => void;
}

function ShippingForm(props: ShippingFormProps) {
  const [firstName, setFirstName] = useState(props.details.firstName);
  const [firstNameError, setFirstNameError] = useState("");

  const [lastName, setLastName] = useState(props.details.lastName);
  const [lastNameError, setLastNameError] = useState("");

  const [email, setEmail] = useState(props.details.email);
  const [emailError, setEmailError] = useState("");

  const [phone, setPhone] = useState(props.details.phone);
  const [phoneError, setPhoneError] = useState("");

  const [address, setAddress] = useState(props.details.address);
  const [addressError, setAddressError] = useState("");

  const [city, setCity] = useState(props.details.city);
  const [cityError, setCityError] = useState("");

  const [addressState, setAddressState] = useState(props.details.state);
  const [addressStateError, setAddressStateError] = useState("");

  const [zip, setZip] = useState(props.details.zip);
  const [zipError, setZipError] = useState("");

  const [country, setCountry] = useState(props.details.country);
  const [countryError, setCountryError] = useState("");

  const onFirstNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFirstName(e.target.value);
    setFirstNameError("");
  };

  const onLastNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLastName(e.target.value);
    setLastNameError("");
  };

  const onEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setEmailError("");
  };

  const onPhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value);
    setPhoneError("");
  };

  const onAddressChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value);
    setAddressError("");
  };

  const onCityChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value);
    setCityError("");
  };

  const onAddressStateChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAddressState(e.target.value);
    setAddressStateError("");
  };

  const onZipChange = (e: ChangeEvent<HTMLInputElement>) => {
    setZip(e.target.value);
    setZipError("");
  };

  const onCountryChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCountry(e.target.value);
    setCountryError("");
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();

    let proceed = true;

    if (firstName === "") {
      setFirstNameError("First name is required");
      proceed = false;
    }

    if (lastName === "") {
      setLastNameError("Last name is required");
      proceed = false;
    }

    if (email === "") {
      setEmailError("Email is required");
      proceed = false;
    }

    if (phone === "") {
      setPhoneError("Phone is required");
      proceed = false;
    }

    if (address === "") {
      setAddressError("Address Street is required");
      proceed = false;
    }

    if (addressState === "") {
      setAddressStateError("State is required");
      proceed = false;
    }

    if (city === "") {
      setCityError("City is required");
      proceed = false;
    }

    if (zip === "") {
      setZipError("ZIP is required");
      proceed = false;
    }

    if (country === "") {
      setCountryError("Country is required");
      proceed = false;
    }

    if (proceed)
      props.onSubmit({
        firstName,
        lastName,
        email,
        phone,
        address,
        state: addressState,
        city,
        zip,
        country,
      });
  };

  return (
    <>
      <form style={{ padding: "1rem" }} onSubmit={onSubmit}>
        <Grid templateColumns="repeat(12, 1fr)" gap="0.5rem">
          <GridItem colSpan={6}>
            <FormControl isInvalid={firstNameError !== ""}>
              <FormLabel>First Name</FormLabel>
              <Input
                placeholder="First Name"
                value={firstName}
                onChange={onFirstNameChange}
              />
              {firstNameError ? (
                <FormErrorMessage>{firstNameError}</FormErrorMessage>
              ) : null}
            </FormControl>
          </GridItem>
          <GridItem colSpan={6}>
            <FormControl isInvalid={lastNameError !== ""}>
              <FormLabel>Last Name</FormLabel>
              <Input
                placeholder="Last Name"
                value={lastName}
                onChange={onLastNameChange}
              />
              {lastNameError ? (
                <FormErrorMessage>{lastNameError}</FormErrorMessage>
              ) : null}
            </FormControl>
          </GridItem>
        </Grid>
        <br />
        <Grid templateColumns="repeat(12, 1fr)" gap="0.5rem">
          <GridItem colSpan={8}>
            <FormControl isInvalid={emailError !== ""}>
              <FormLabel>Email</FormLabel>
              <Input
                placeholder="Email"
                value={email}
                onChange={onEmailChange}
              />
              {emailError ? (
                <FormErrorMessage>{emailError}</FormErrorMessage>
              ) : null}
            </FormControl>
          </GridItem>
          <GridItem colSpan={4}>
            <FormControl isInvalid={phoneError !== ""}>
              <FormLabel>Phone</FormLabel>
              <Input
                placeholder="Phone"
                value={phone}
                onChange={onPhoneChange}
              />
              {phoneError ? (
                <FormErrorMessage>{phoneError}</FormErrorMessage>
              ) : null}
            </FormControl>
          </GridItem>
        </Grid>
        <br />
        <Divider />
        <br />
        <FormControl isInvalid={addressError !== ""}>
          <FormLabel>Address Street</FormLabel>
          <Input
            placeholder="Street"
            value={address}
            onChange={onAddressChange}
          />
          {addressError ? (
            <FormErrorMessage>{addressError}</FormErrorMessage>
          ) : null}
        </FormControl>
        <br />
        <Grid templateColumns="repeat(12, 1fr)" gap="0.5rem">
          <GridItem colSpan={3}>
            <FormControl isInvalid={cityError !== ""}>
              <FormLabel>City</FormLabel>
              <Input placeholder="city" value={city} onChange={onCityChange} />
              {cityError ? (
                <FormErrorMessage>{cityError}</FormErrorMessage>
              ) : null}
            </FormControl>
          </GridItem>
          <GridItem colSpan={3}>
            <FormControl isInvalid={addressStateError !== ""}>
              <FormLabel>State</FormLabel>
              <Input
                placeholder="State"
                value={addressState}
                onChange={onAddressStateChange}
              />
              {addressStateError ? (
                <FormErrorMessage>{addressStateError}</FormErrorMessage>
              ) : null}
            </FormControl>
          </GridItem>
          <GridItem colSpan={3}>
            <FormControl isInvalid={zipError !== ""}>
              <FormLabel>ZIP</FormLabel>
              <Input placeholder="ZIP" value={zip} onChange={onZipChange} />
              {zipError ? (
                <FormErrorMessage>{zipError}</FormErrorMessage>
              ) : null}
            </FormControl>
          </GridItem>
          <GridItem colSpan={3}>
            <FormControl isInvalid={countryError !== ""}>
              <FormLabel>Country</FormLabel>
              <Input
                placeholder="Country"
                value={country}
                onChange={onCountryChange}
              />
              {countryError ? (
                <FormErrorMessage>{countryError}</FormErrorMessage>
              ) : null}
            </FormControl>
          </GridItem>
        </Grid>
        <br />
        <Center>
          <Button colorScheme="blue" type="submit">
            Next
          </Button>
        </Center>
      </form>
    </>
  );
}

export default ShippingForm;
