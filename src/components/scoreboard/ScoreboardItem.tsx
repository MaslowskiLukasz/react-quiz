import { Card, Flex } from "@mantine/core";
import { MAX_QUESTION, Score } from "../../models/models";

interface Props {
  item: Score;
}

export function ScoreboardItem(props: Props) {
  const { item } = props;

  return (
    <Card shadow="sm" withBorder>
      <Flex justify='space-between'>
        <div>{item.name}</div>
        <div>{item.value}/{MAX_QUESTION}</div>
      </Flex>
    </Card>
  );
}
