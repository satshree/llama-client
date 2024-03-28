"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  VStack,
  Text,
  Flex,
  Input,
  useToast,
  Button,
  Center,
  Heading,
  HStack,
  FormControl,
  FormLabel,
  Switch,
} from "@chakra-ui/react";

import { fetchUsers } from "@/api/userManagement";
import { GlobalState, UserType } from "@/types";
import UserDrawer from "@/components/management/User/UserDrawer";

const dummyData: UserType = {
  id: "",
  first_name: "",
  last_name: "",
  email: "",
  username: "",
  phone: "",
  address: "",
  password: "",
  is_super: false,
};

function Users() {
  const toast = useToast();
  const dispatch = useDispatch();

  const { users } = useSelector((state: GlobalState) => state.userManagement);

  const [filter, setFilter] = useState("");
  const [allUsers, setAllUsers] = useState<UserType[]>([]);

  const [filterSuper, setFilterSuper] = useState(false);

  const [userDrawer, toggleUserDrawer] = useState(false);
  const [drawerMode, setDrawerMode] = useState<"add" | "edit">("add");
  const [editUser, setEditUser] = useState<UserType>(dummyData);

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        await dispatch(fetchUsers());
      } catch (err) {
        console.log(err);
        toast({
          title: "Something went wrong",
          description: "Unable to fetch users",
          status: "warning",
          isClosable: true,
          position: "top-right",
        });
      }
    };
    fetchAllUsers();
  }, []);

  useEffect(() => {
    if (filterSuper) {
      setAllUsers(users.filter((user) => user.is_super === filterSuper));
    } else {
      setAllUsers(users);
    }
  }, [filterSuper, users]);

  const getUsers = () => {
    return allUsers.filter((user) => {
      if (
        user.username.toLowerCase().includes(filter) || // FILTER BY USERNAME
        user.phone?.toLowerCase().includes(filter) || // FILTER BY PHONE
        user.email?.toLowerCase().includes(filter) // FILTER BY EMAIL
      ) {
        return true;
      }

      return false;
    });
  };

  return (
    <>
      <Flex alignItems="center" justifyContent="space-between">
        <HStack>
          <Input
            placeholder="Filter by username, email, phone ... "
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            w="500px"
          />
          <FormControl display="flex" alignItems="center">
            <FormLabel htmlFor="filter-super" mb="0">
              Show Super Users Only
            </FormLabel>
            <Switch
              id="filter-super"
              isChecked={filterSuper}
              onChange={() => setFilterSuper(!filterSuper)}
            />
          </FormControl>
        </HStack>
        <Button
          colorScheme="blue"
          onClick={() => {
            setDrawerMode("add");
            setEditUser(dummyData);
            toggleUserDrawer(true);
          }}
        >
          Add User
        </Button>
      </Flex>
      <br />
      {getUsers().length > 0 ? (
        <VStack>
          {getUsers().map((user) => (
            <Box
              key={user.id}
              w="100%"
              borderWidth={0.8}
              borderRadius={8}
              p="1rem"
              cursor="pointer"
              onClick={() => {
                setDrawerMode("edit");
                setEditUser(user);
                toggleUserDrawer(true);
              }}
            >
              <Flex alignItems="center" justifyContent="space-between">
                <div>
                  <Text fontSize="large">
                    {user.first_name ?? user.last_name
                      ? `${user.first_name} ${user.last_name}`
                      : user.username}
                  </Text>
                  <Flex>
                    {user.email ?? <Text>{user.email}</Text>}
                    {user.email ? ", " : null}
                    {user.phone ?? <Text>{user.phone}</Text>}
                  </Flex>
                  <Text fontSize="smaller">
                    {user.last_login ? (
                      <>Last logged in at {user.last_login}</>
                    ) : (
                      <>Never logged in</>
                    )}
                  </Text>
                </div>
                <div>
                  <Text>{user.is_super ? "Admin user" : "Customer user"}</Text>
                </div>
              </Flex>
            </Box>
          ))}
        </VStack>
      ) : (
        <Center w="100%" p="1rem">
          <Heading size="md">No Users ...</Heading>
        </Center>
      )}

      <UserDrawer
        open={userDrawer}
        data={editUser}
        mode={drawerMode}
        onClose={() => {
          dispatch(fetchUsers());
          toggleUserDrawer(false);
        }}
        reset={() => {
          setEditUser(dummyData);
        }}
      />
    </>
  );
}

export default Users;
