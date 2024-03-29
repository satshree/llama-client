"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Grid, GridItem } from "@chakra-ui/react";

import Header from "@/components/management/Header/page";
import SideNav from "@/components/management/SideNav/page";

import isAdmin from "../../middlewares/isAdmin";
import { fetchBills, fetchUsers } from "@/api";

import style from "./management.module.css";

function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBills());
    dispatch(fetchUsers());
  }, []);

  return (
    <Grid
      className={style.page}
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
        <div className={style.main}>{children}</div>
      </GridItem>
    </Grid>
  );
}

export default isAdmin(RootLayout);
