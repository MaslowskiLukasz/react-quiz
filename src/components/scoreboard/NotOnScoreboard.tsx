import { Flex } from "@mantine/core";
import { HandWaving } from "@phosphor-icons/react";

export function NotOnScoreboard() {
  return (
    <Flex direction='column' my='xl'>
      Sorry!
      <p>Your score is to low for scoreboard...</p>
      <Flex gap='xs' align='center'>
        Maybe next time!
        <HandWaving size={24} />
      </Flex>
    </Flex>
  );
}
