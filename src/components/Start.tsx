import { Button, Card, Divider, Flex, List, Select, Space, Text } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Category } from "../models/models";
import { fetchCategories } from "../helpers/api";
import { Loader } from "./shared/Loader";
import { Note, RocketLaunch } from "@phosphor-icons/react";
import { ErrorScreen } from "./shared/ErrorScreen";
import { Scoreboard } from "./scoreboard/Scoreboard";
import { ScoreboardTitle } from "./scoreboard/ScoreboardTitle";

type Props = {
  onStart: (queryParam: string) => void;
};

export function Start(props: Props) {
  const { onStart } = props;
  const [selectedCategoryName, setSelectedCategoryName] = useState<string | null>('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>('');

  const { status: categoriesStatus, data: categories, isError, error } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
  });

  const handleStart = () => {
    onStart(questionsParams);
  };

  if (isError) {
    return <ErrorScreen error={error} />;
  }

  if (categoriesStatus !== 'success') {
    return <Loader />;
  }

  const categoryNames = categories.map((item: Category) => item.name);
  const selectedCategory = categories.find((item: Category) => item.name === selectedCategoryName);
  const categoryParam = selectedCategory ? `&category=${selectedCategory.id}` : '';
  const difficultyParam = selectedDifficulty ? `&difficulty=${selectedDifficulty.toLowerCase()}` : '';
  const questionsParams = `api.php?amount=10${categoryParam}${difficultyParam}&type=multiple`;
  const questionDifficulty = ['Easy', 'Medium', 'Hard'];

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
      <List my='xl'>
        <List.Item icon={<Note />}>There is always only one correct answer</List.Item>
        <List.Item icon={<Note />}>You can skip quesitons and come back to them later</List.Item>
        <List.Item icon={<Note />}>You can change your answer until you submit</List.Item>
      </List>
      <Select
        label='Choose your category'
        placeholder='Questions from random categories'
        data={categoryNames}
        value={selectedCategoryName}
        onChange={setSelectedCategoryName}
      />
      <Select
        my='md'
        label='Choose question difficulty'
        placeholder='Random difficulty'
        data={questionDifficulty}
        onChange={setSelectedDifficulty}
      />
      <Flex my='xl' justify='center'>
        <Button
          rightSection={<RocketLaunch size={14} />}
          color="grape"
          onClick={handleStart}
        >
          Play now!
        </Button>
      </Flex>
      <Divider />
      <Space h='xl' />
      <Card shadow='sm' radius='md' withBorder>
        <ScoreboardTitle />
        <Space h='xl' />
        <Scoreboard readonly={true} />
      </Card>
    </>
  )
}
