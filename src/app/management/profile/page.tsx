"use client";

import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Center,
  Divider,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  GridItem,
  Heading,
  Input,
  useToast,
} from "@chakra-ui/react";

import { fetchMyDetails } from "@/api/myDetails";
import { GlobalState, UserType } from "@/types";
import { API_ROOT, parseAddress } from "@/utils";

function Profile() {
  const toast = useToast();
  const dispatch = useDispatch();
  const { access } = useSelector((state: GlobalState) => state.auth.token);
  const { user } = useSelector((state: GlobalState) => state.user);

  const [loading, setLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [firstNameError, setFirstNameError] = useState("");

  const [lastName, setLastName] = useState("");
  const [lastNameError, setLastNameError] = useState("");

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState("");

  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const [address, setAddress] = useState("");
  const [addressError, setAddressError] = useState("");

  const [city, setCity] = useState("");
  const [cityError, setCityError] = useState("");

  const [addressState, setAddressState] = useState("");
  const [addressStateError, setAddressStateError] = useState("");

  const [zip, setZip] = useState("");
  const [zipError, setZipError] = useState("");

  const [country, setCountry] = useState("");
  const [countryError, setCountryError] = useState("");

  const fetchDetails = async () => await dispatch(fetchMyDetails());

  useEffect(() => {
    try {
      fetchDetails();
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    setFirstName(user.first_name || "");
    setFirstNameError("");

    setLastName(user.last_name || "");
    setLastNameError("");

    setEmail(user.email || "");
    setEmailError("");

    setPhone(user.phone || "");
    setPhoneError("");

    setUsername(user.username);
    setUsernameError("");

    setPassword("");
    setPasswordError("");

    const addressParsed = parseAddress(user.address || "");

    setAddress(addressParsed.street || "");
    setAddressError("");

    setAddressState(addressParsed.state || "");
    setAddressStateError("");

    setCity(addressParsed.city || "");
    setCityError("");

    setZip(addressParsed.zip || "");
    setZipError("");

    setCountry(addressParsed.country || "");
    setCountryError("");
  }, [user]);

  const onFirstNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFirstName(e.target.value);
    setFirstNameError("");
  };

  const onLastNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLastName(e.target.value);
    setLastNameError("");
  };

  const onUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
    setUsernameError("");
  };

  const onEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setEmailError("");
  };

  const onPhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value);
    setPhoneError("");
  };

  const onPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setPasswordError("");
  };

  const onConfirmPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
    setConfirmPasswordError("");
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

    if (username === "") {
      setUsernameError("Username is required");
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

    let data: UserType = {
      id: "",
      first_name: firstName,
      last_name: lastName,
      username,
      email,
      phone,
      address: `${address}, ${city}, ${addressState}, ${zip}, ${country}`,
    };

    if (proceed) {
      setLoading(true);

      fetch(API_ROOT + "/api/user/", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${access}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
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
              position: "top-right",
            });
          } else {
            toast({
              title: "Details updated successfully",
              status: "success",
              isClosable: true,
              position: "top-right",
            });
          }
        })
        .catch((err) => {
          console.log(err);
          toast({
            title: "Something went wrong",
            status: "error",
            isClosable: true,
            position: "top-right",
          });
        })
        .finally(() => setLoading(false));
    }
  };

  const passwordSubmit = (e: FormEvent) => {
    e.preventDefault();
    let proceed = true;

    if (password === "") {
      setPasswordError("Password is required");
      proceed = false;
    }

    if (confirmPassword === "") {
      setConfirmPasswordError("Confirm your password");
      proceed = false;
    }

    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match");
      setConfirmPasswordError("Passwords do not match");
      proceed = false;
    }

    if (proceed) {
      setPasswordLoading(true);

      fetch(API_ROOT + "/api/user/password/", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${access}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
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
              position: "top-right",
            });
          } else {
            toast({
              title: "Password updated successfully",
              status: "success",
              isClosable: true,
              position: "top-right",
            });
          }
        })
        .catch((err) => {
          console.log(err);
          toast({
            title: "Something went wrong",
            status: "error",
            isClosable: true,
            position: "top-right",
          });
        })
        .finally(() => setPasswordLoading(false));
    }
  };

  return (
    <div>
      <Center>
        <Heading size="md">Your Details</Heading>
      </Center>
      <br />
      <form onSubmit={onSubmit}>
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
          <GridItem colSpan={6}>
            <FormControl isInvalid={usernameError !== ""}>
              <FormLabel>Username</FormLabel>
              <Input
                placeholder="Username"
                value={username}
                onChange={onUsernameChange}
              />
              {usernameError ? (
                <FormErrorMessage>{usernameError}</FormErrorMessage>
              ) : null}
            </FormControl>
          </GridItem>
          <GridItem colSpan={6}>
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
        <FormControl isInvalid={emailError !== ""}>
          <FormLabel>Email</FormLabel>
          <Input placeholder="Email" value={email} onChange={onEmailChange} />
          {emailError ? (
            <FormErrorMessage>{emailError}</FormErrorMessage>
          ) : null}
        </FormControl>
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
          <Button type="submit" colorScheme="blue" isLoading={loading}>
            Save changes
          </Button>
        </Center>
      </form>
      <br />
      <Divider />
      <br />
      <form onSubmit={passwordSubmit}>
        <Grid templateColumns="repeat(12, 1fr)" gap="0.5rem">
          <GridItem colSpan={6}>
            <FormControl isInvalid={passwordError !== ""}>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={onPasswordChange}
              />
              {passwordError ? (
                <FormErrorMessage>{passwordError}</FormErrorMessage>
              ) : null}
            </FormControl>
          </GridItem>
          <GridItem colSpan={6}>
            <FormControl isInvalid={confirmPasswordError !== ""}>
              <FormLabel>Confirm Password</FormLabel>
              <Input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={onConfirmPasswordChange}
              />
              {confirmPasswordError ? (
                <FormErrorMessage>{confirmPasswordError}</FormErrorMessage>
              ) : null}
            </FormControl>
          </GridItem>
        </Grid>
        <br />
        <Center>
          <Button
            colorScheme="blue"
            variant="outline"
            isLoading={passwordLoading}
            type="submit"
          >
            Update password
          </Button>
        </Center>
      </form>
    </div>
  );
}

export default Profile;
