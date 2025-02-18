import { Flex, Space } from "@mantine/core";
import { Knife } from "@phosphor-icons/react";

export function EmptyScoreboard() {
  return (
    <Flex direction='column'>
      <Flex gap='xs' align='center'>
        There are no saved scores right now...
      </Flex>
      <Space h='md' />
      <Flex gap='xs' align='center'>
        Why not try to take a stab at it
        <Knife size={24} />
      </Flex>
      You could see your name here!
    </Flex>
  );
}
