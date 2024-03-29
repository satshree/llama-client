"use client";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Button, Divider, Text, VStack } from "@chakra-ui/react";

import { CategoryType, GlobalState } from "@/types";

import style from "./box.module.css";

function QueryBox() {
  const { categories } = useSelector((state: GlobalState) => state.categories);

  const [allCategories, setAllCategories] = useState<CategoryType[]>([]);

  useEffect(() => setAllCategories(categories), [categories]);

  return (
    <div className={style.box}>
      <Text fontWeight={600}>Categories</Text>
      <Divider mt="0.5rem" mb="0.5rem" />
      <VStack spacing="0.5rem">
        {allCategories.map((category) => (
          <Button
            w="100%"
            variant="ghost"
            colorScheme="gray"
            key={category.id}
            size="sm"
          >
            {category.name}
          </Button>
        ))}
        <Button w="100%" variant="ghost" colorScheme="red" size="sm">
          Remove filter
        </Button>
      </VStack>
    </div>
  );
}

export default QueryBox;
