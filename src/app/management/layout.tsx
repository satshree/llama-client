"use client";

import { Grid, GridItem } from "@chakra-ui/react";

import Header from "@/components/management/Header/page";
import SideNav from "@/components/management/SideNav/page";

import style from "./management.module.css";
import isAdmin from "../../middlewares/isAdmin";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  fetchBills,
  fetchProduct,
  fetchMyDetails,
  fetchCategories,
  fetchUsers,
} from "@/api";

function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMyDetails());
    dispatch(fetchBills());
    dispatch(fetchProduct());
    dispatch(fetchCategories());
    dispatch(fetchUsers());
  }, []);

  return (
    <Grid
      templateAreas={`"nav header"
              "nav main"`}
      gridTemplateRows={"80px 1fr"}
      gridTemplateColumns={"200px 1fr"}
      h="100%"
    >
      <GridItem area={"header"}>
        <Header />
      </GridItem>
      <GridItem area={"nav"}>
        <SideNav />
      </GridItem>
      <GridItem area={"main"}>
        <div className={style.page}>{children}</div>
      </GridItem>
    </Grid>
  );
}

export default isAdmin(RootLayout);
