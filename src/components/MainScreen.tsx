import { Button, Select } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Category } from "../models/models";
import { fetchQuestions, fetchCategories } from "../helpers/api";

export function MainScreen() {
  const [selectedCategoryName, setSelectedCategoryName] = useState<string | null>('');

  const { status: categoriesStatus, data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories
  });

  const { data: questions, refetch: refetchQuestions } = useQuery({
    queryKey: ['questions'],
    queryFn: () => fetchQuestions(questionsParams),
    enabled: false
  });

  const handleStart = () => {
    refetchQuestions();
  };

  if (categoriesStatus !== 'success') {
    return <div>Nope</div>
  }

  const categoryNames = categories.map((item: Category) => item.name);
  const selectedCategory = categories.find((item: Category) => item.name === selectedCategoryName);
  const categoryParam = selectedCategory ? `&category=${selectedCategory.id}` : '';
  const questionsParams = `api.php?amount=10${categoryParam}&type=multiple`;

  return (
    <>
      <h2>Pick categories and have fun</h2>
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
