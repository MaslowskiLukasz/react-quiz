import { Button, Flex, TextInput } from "@mantine/core"
import { useState } from "react";

interface Props {
  onSave: (name: string) => void;
}

export function ScoreboardInput(props: Props) {
  const { onSave } = props;
  const [name, setName] = useState('');

  return (
    <li>
      <Flex gap='xs'>
        <TextInput value={name} onChange={(event) => setName(event.currentTarget.value)} />
        <Button onClick={() => onSave(name)}>Save</Button>
      </Flex>
    </li>
  );
}
