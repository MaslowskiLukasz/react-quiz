import { Button, Select } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

interface Category {
  id: number;
  name: string;
}

export function MainScreen() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>('');
  const baseUrl = `https://opentdb.com/`;

  const fetchCategories = async (): Promise<Category[]> => {
    const response = await fetch(`${baseUrl}/api_category.php`);
    const data = await response.json();
    return data.trivia_categories;
  };

  const fetchQuestions = async (): Promise<string> => {
    const response = await fetch(`${baseUrl}/${questionsParams}`);
    const data = await response.json();
    return data;
  }

  const { status, data } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories
  });

  const { data: questionsData, refetch } = useQuery({
    queryKey: ['questions'],
    queryFn: fetchQuestions,
    enabled: false
  });

  const handleStart = () => {
    refetch();
  }

  if (status !== 'success') {
    return <div>Nope</div>
  }

  const categories = data.map((item: Category) => item.name);
  const selectedObj = data.find((item: Category) => item.name === selectedCategory);
  const questionsParams = `api.php?amount=10&type=multiple`;

  return (
    <>
      <h2>Pick categories and have fun</h2>
      <Select
        label='Categories'
        placeholder='Pick categories'
        data={categories}
        value={selectedCategory}
        onChange={setSelectedCategory}
      />
      <Button onClick={handleStart}>Start quiz</Button>
      <p>{JSON.stringify(selectedObj)}</p>
      <p>{questionsParams}</p>
      <p>{JSON.stringify(questionsData)}</p>
    </>
  )
}
