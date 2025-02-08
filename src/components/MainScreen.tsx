import { Button, Select } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Category } from "../models/models";
import { fetchCategories } from "../helpers/api";
import { Loader } from "./Loader";

type Props = {
  onStart: (queryParam: string) => void;
}
export function MainScreen(props: Props) {
  const [selectedCategoryName, setSelectedCategoryName] = useState<string | null>('');

  const { status: categoriesStatus, data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories
  });

  const handleStart = () => {
    props.onStart(questionsParams);
  };

  if (categoriesStatus !== 'success') {
    return <Loader />
  }

  const categoryNames = categories.map((item: Category) => item.name);
  const selectedCategory = categories.find((item: Category) => item.name === selectedCategoryName);
  const categoryParam = selectedCategory ? `&category=${selectedCategory.id}` : '';
  const questionsParams = `api.php?amount=10${categoryParam}&type=multiple`;

  return (
    <>
      <h2>Pick a category and start the quiz</h2>
      <Select
        label='Categories'
        placeholder='Pick categories'
        data={categoryNames}
        value={selectedCategoryName}
        onChange={setSelectedCategoryName}
      />
      <Button onClick={handleStart}>Start quiz</Button>
    </>
  )
}
