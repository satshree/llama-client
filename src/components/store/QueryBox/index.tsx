"use client";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Button, Divider, Text, VStack } from "@chakra-ui/react";

import { CategoryType, GlobalState } from "@/types";

import style from "./box.module.css";

interface QueryBoxProps {
  currentFilter: string;
  setFilterCategory: (id: string) => void;
}

function QueryBox(props: QueryBoxProps) {
  const { categories } = useSelector((state: GlobalState) => state.categories);

  const [allCategories, setAllCategories] = useState<CategoryType[]>([]);
  const [currentFilter, setCurrentFilter] = useState("");

  useEffect(() => setAllCategories(categories), [categories]);
  useEffect(() => setCurrentFilter(props.currentFilter), [props.currentFilter]);

  return (
    <div className={style.box}>
      <Text fontWeight={600}>Categories</Text>
      <Divider mt="1rem" mb="1rem" />
      <VStack spacing="1rem">
        {allCategories.map((category) => (
          <Button
            w="100%"
            variant="ghost"
            colorScheme="gray"
            key={category.id}
            size="sm"
            isActive={currentFilter === category.id}
            onClick={() => props.setFilterCategory(category.id)}
          >
            {category.name}
          </Button>
        ))}
        <Button
          w="100%"
          variant="ghost"
          colorScheme="red"
          size="sm"
          onClick={() => props.setFilterCategory("")}
          isDisabled={currentFilter === ""}
        >
          Remove filter
        </Button>
      </VStack>
    </div>
  );
}

export default QueryBox;
