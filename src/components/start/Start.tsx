import { Button, Card, Divider, Flex, List, Select, Space, Text } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Category, MAX_QUESTION } from "../../models/models";
import { fetchCategories } from "../../helpers/api";
import { Loader } from "../shared/Loader";
import { Note, RocketLaunch } from "@phosphor-icons/react";
import { ErrorScreen } from "../shared/ErrorScreen";
import { Scoreboard } from "../scoreboard/Scoreboard";
import { ScoreboardTitle } from "../scoreboard/ScoreboardTitle";
import { useTranslation } from "react-i18next";

type Props = {
  onStart: (queryParam: string) => void;
};

export function Start(props: Props) {
  const { onStart } = props;
  const [selectedCategoryName, setSelectedCategoryName] = useState<string | null>('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>('');
  const { t } = useTranslation();

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
  const questionsParams = `api.php?amount=${MAX_QUESTION}${categoryParam}${difficultyParam}&type=multiple`;
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
        {t('headers.start')}
      </Text>
      <List my='xl'>
        <List.Item icon={<Note />}>{t('rules.oneAnswer')}</List.Item>
        <List.Item icon={<Note />}>{t('rules.skip')}</List.Item>
        <List.Item icon={<Note />}>{t('rules.change')}</List.Item>
      </List>
      <Select
        label={t('labels.category')}
        placeholder={t('placeholders.category')}
        data={categoryNames}
        value={selectedCategoryName}
        onChange={setSelectedCategoryName}
      />
      <Select
        my='md'
        label={t('labels.difficulty')}
        placeholder={t('placeholders.difficulty')}
        data={questionDifficulty}
        onChange={setSelectedDifficulty}
      />
      <Flex my='xl' justify='center'>
        <Button
          rightSection={<RocketLaunch size={14} />}
          color="grape"
          onClick={handleStart}
        >
          {t('buttons.start')}
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
