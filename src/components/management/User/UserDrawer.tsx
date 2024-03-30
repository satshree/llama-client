import { ChangeEvent, useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { API_ROOT, parseAddress } from "@/utils";
import { GlobalState, UserType } from "@/types";
import DeleteConfirmation from "@/components/common/DeleteConfirmation";
import {
  Button,
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  GridItem,
  Input,
  Switch,
  useToast,
} from "@chakra-ui/react";

interface UserDrawerProps {
  open: boolean;
  data: UserType;
  mode: "add" | "edit";
  onClose: () => void;
  reset: () => void;
}

// const dummyData: UserType = {
//   id: "",
//   first_name: "",
//   last_name: "",
//   email: "",
//   username: "",
//   phone: "",
//   is_super: false,
// };

function UserDrawer(props: UserDrawerProps) {
  const toast = useToast();
  const { access } = useSelector((state: GlobalState) => state.auth.token);
  const { user } = useSelector((state: GlobalState) => state.auth);

  const [open, setOpen] = useState(false);

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

  const [isSuper, setIsSuper] = useState(false);

  const [loading, setLoading] = useState(false);

  const [confirmDelete, setDelete] = useState(false);

  useEffect(() => {
    setFirstName(props.data.first_name || "");
    setFirstNameError("");

    setLastName(props.data.last_name || "");
    setLastNameError("");

    setEmail(props.data.email || "");
    setEmailError("");

    setPhone(props.data.phone || "");
    setPhoneError("");

    setUsername(props.data.username);
    setUsernameError("");

    setPassword("");
    setPasswordError("");

    setConfirmPassword("");
    setConfirmPasswordError("");

    const addressParsed = parseAddress(props.data.address || "");

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

    setIsSuper(props.data.is_super || false);
  }, [props.data]);

  useEffect(() => setOpen(props.open), [props.open]);

  const resetForm = () => {
    setFirstName("");
    setFirstNameError("");

    setLastName("");
    setLastNameError("");

    setEmail("");
    setEmailError("");

    setPhone("");
    setPhoneError("");

    setUsername("");
    setUsernameError("");

    setPassword("");
    setPasswordError("");

    setConfirmPassword("");
    setConfirmPasswordError("");

    setAddress("");
    setAddressError("");

    setAddressState("");
    setAddressStateError("");

    setCity("");
    setCityError("");

    setZip("");
    setZipError("");

    setCountry("");
    setCountryError("");

    setIsSuper(false);
  };

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
    setConfirmPasswordError("");
  };

  const onConfirmPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
    setPasswordError("");
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

  const onSubmit = () => {
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

    let apiRoot = "";
    let message = "Done";

    let data: UserType = {
      id: "",
      first_name: firstName,
      last_name: lastName,
      username,
      email,
      phone,
      address: `${address}, ${city}, ${addressState}, ${zip}, ${country}`,
    };

    if (props.mode === "add") {
      if (password === "") {
        setPasswordError("Set password for new user");
        proceed = false;
      } else if (password !== confirmPassword) {
        setPasswordError("Passwords do not match");
        setConfirmPasswordError("Passwords do not match");
        proceed = false;
      } else {
        apiRoot = API_ROOT + "/api/management/user/";
        data = {
          ...data,
          password,
          is_super: isSuper || false,
        };
        message = "User added successfully";
      }
    } else {
      if (password !== "") {
        if (password !== confirmPassword) {
          setPasswordError("Passwords do not match");
          setConfirmPasswordError("Passwords do not match");
          proceed = false;
        } else {
          data = {
            ...data,
            password,
          };
        }
      }
      apiRoot = API_ROOT + `/api/management/user/${props.data.id}/`;
      message = "User updated successfully";
    }

    if (proceed) {
      setLoading(true);

      fetch(apiRoot, {
        method: props.mode === "add" ? "POST" : "PUT",
        headers: {
          Authorization: `Bearer ${access}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then(async (resp) => {
          // const response = await resp.json();
          if (resp.status !== 200) {
            console.log(resp);
            // console.log(response);
            toast({
              title: "Something went wrong",
              status: "warning",
              isClosable: true,
              position: "bottom-left",
            });
          } else {
            toast({
              title: message,
              status: "success",
              isClosable: true,
              position: "bottom-left",
            });
            props.onClose();
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
  };

  const deleteUser = () => {
    setLoading(true);
    setDelete(false);

    fetch(API_ROOT + `/api/management/user/${props.data.id}/`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${access}`,
      },
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
            title: "User deleted successfully",
            status: "success",
            isClosable: true,
            position: "bottom-left",
          });

          props.onClose();
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
  };

  return (
    <>
      <Drawer
        isOpen={open}
        size="xl"
        placement="right"
        onClose={loading ? () => {} : props.onClose}
        onCloseComplete={() => resetForm()}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton disabled={loading} />
          <DrawerHeader>
            {props.mode === "add" ? "Add New User" : "Update User"}
          </DrawerHeader>

          <DrawerBody>
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
              <Input
                placeholder="Email"
                value={email}
                onChange={onEmailChange}
              />
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
                  <Input
                    placeholder="city"
                    value={city}
                    onChange={onCityChange}
                  />
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
            <Divider />
            <br />
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
            {props.mode === "add" ? (
              <>
                <br />
                <FormControl display="flex" alignItems="center">
                  <FormLabel htmlFor="superuser" mb="0">
                    Make this user admin?
                  </FormLabel>
                  <Switch
                    id="superuser"
                    isChecked={isSuper}
                    onChange={() => setIsSuper(!isSuper)}
                  />
                </FormControl>
              </>
            ) : null}
          </DrawerBody>

          <DrawerFooter>
            <Button
              variant="outline"
              mr={3}
              onClick={props.onClose}
              isDisabled={loading}
            >
              Cancel
            </Button>
            {props.mode === "edit" ? (
              <Button
                mr={3}
                colorScheme="red"
                onClick={() => setDelete(true)}
                isDisabled={user.id === props.data.id}
              >
                Delete
              </Button>
            ) : null}
            <Button colorScheme="green" onClick={onSubmit} isLoading={loading}>
              {props.mode === "edit" ? "Save changes" : "Add"}
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      <DeleteConfirmation
        title="Delete user"
        text="Delete this user? This action cannot be undone!"
        open={confirmDelete}
        onClose={() => setDelete(false)}
        action={deleteUser}
      />
    </>
  );
}

export default UserDrawer;
