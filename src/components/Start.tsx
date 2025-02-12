import { Button, Flex, List, Select, Text } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Category } from "../models/models";
import { fetchCategories } from "../helpers/api";
import { Loader } from "./Loader";
import { Note, RocketLaunch } from "@phosphor-icons/react";

type Props = {
  onStart: (queryParam: string) => void;
};

export function Start(props: Props) {
  const { onStart } = props;
  const [selectedCategoryName, setSelectedCategoryName] = useState<string | null>('');

  const { status: categoriesStatus, data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
  });

  const handleStart = () => {
    onStart(questionsParams);
  };

  if (categoriesStatus !== 'success') {
    return <Loader />;
  }

  const categoryNames = categories.map((item: Category) => item.name);
  const selectedCategory = categories.find((item: Category) => item.name === selectedCategoryName);
  const categoryParam = selectedCategory ? `&category=${selectedCategory.id}` : '';
  const questionsParams = `api.php?amount=10${categoryParam}&type=multiple`;

  return (
    <>
      <Text
        my='xl'
        size='xl'
        fw={700}
        variant='gradient'
        gradient={{ from: 'grape', to: 'blue', deg: 90 }}
      >
        Pick a category and start the quiz!
      </Text>
      <List>
        <List.Item icon={<Note />}>There is always only one correct answer</List.Item>
        <List.Item icon={<Note />}>You can skip quesitons and come back to them later</List.Item>
        <List.Item icon={<Note />}>You can change your answer until you submit</List.Item>
      </List>
      <Select
        my='xl'
        label='Choose your category'
        placeholder='Questions from random categories'
        data={categoryNames}
        value={selectedCategoryName}
        onChange={setSelectedCategoryName}
      />
      <Flex justify='center'>
        <Button
          rightSection={<RocketLaunch size={14} />}
          color="grape"
          onClick={handleStart}
        >
          Play now!
        </Button>
      </Flex>
    </>
  )
}
