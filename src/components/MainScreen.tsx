import { Button, Select } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

interface Category {
  id: number;
  name: string;
}

export function MainScreen() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>('');

  const fetchCategories = async (): Promise<Category[]> => {
    const response = await fetch('https://opentdb.com/api_category.php');
    const data = await response.json();
    return data.trivia_categories;
  };

  const { status, data } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories
  });

  if (status !== 'success') {
    return <div>Nope</div>
  }

  const categories = data.map((item: Category) => item.name);
  const selectedObj = data.find((item: Category) => item.name === selectedCategory);

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
      <Button>Start quiz</Button>
      <p>{JSON.stringify(selectedObj)}</p>
    </>
  )
}
