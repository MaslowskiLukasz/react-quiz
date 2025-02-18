import { Flex, Title } from "@mantine/core";
import { Confetti } from "@phosphor-icons/react";

export function ScoreboardTitle() {
  return (
    <Flex gap='xs' align='center'>
      <Title order={3}>Scoreboard</Title>
      <Confetti size={24} color="var(--mantine-color-grape-6)" />
    </Flex>
  );
}
