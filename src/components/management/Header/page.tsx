import React from "react";

import style from "./header.module.css";
import { Heading } from "@chakra-ui/react";

function Header() {
  return (
    <div className={style.header}>
      <div>
        <Heading as="h4" size="md">
          LLAMA Management
        </Heading>
      </div>
      <div>User button</div>
    </div>
  );
}

export default Header;
