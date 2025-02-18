import { Button, Card, Flex, TextInput } from "@mantine/core"
import { useState } from "react";

interface Props {
  onSave: (name: string) => void;
}

export function ScoreboardInput(props: Props) {
  const { onSave } = props;
  const [name, setName] = useState('');

  return (
    <Card
      shadow='sm'
      withBorder
    >
      <Flex gap='xs' justify='space-between'>
        <TextInput
          placeholder='Enter your name'
          variant="filled"
          value={name}
          onChange={(event) => setName(event.currentTarget.value)}
        />
        <Button
          color='grape'
          disabled={!name.length}
          onClick={() => onSave(name)}
        >
          Save
        </Button>
      </Flex>
    </Card>
  );
}
