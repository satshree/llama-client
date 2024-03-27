"use client";

import {
  Button,
  Heading,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { FiUser } from "react-icons/fi";

import { GlobalState } from "@/types";
import { endSession } from "@/api/auth";

import style from "./header.module.css";

function Header() {
  const dispatch = useDispatch();
  const router = useRouter();

  const { username } = useSelector((state: GlobalState) => state.auth.user);

  const logout = async () => {
    await dispatch(endSession());
    router.push("/");
  };

  return (
    <div className={style.header}>
      <div>
        <Heading as="h4" size="md">
          LLAMA Management
        </Heading>
      </div>
      <Menu>
        <MenuButton as={Button} rightIcon={<FiUser />}>
          {username || "..."}
        </MenuButton>
        <MenuList>
          <MenuItem>Profile</MenuItem>
          <MenuItem onClick={logout}>Logout</MenuItem>
        </MenuList>
      </Menu>
    </div>
  );
}

export default Header;
