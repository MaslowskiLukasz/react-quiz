import { Button, Card, Flex, TextInput } from "@mantine/core"
import { useState } from "react";
import { useTranslation } from "react-i18next";

interface Props {
  onSave: (name: string) => void;
}

export function ScoreboardInput(props: Props) {
  const { onSave } = props;
  const [name, setName] = useState('');
  const { t } = useTranslation();

  return (
    <Card
      shadow='sm'
      withBorder
    >
      <Flex gap='xs' justify='space-between'>
        <TextInput
          placeholder={t('placeholders.enterName')}
          variant="filled"
          value={name}
          onChange={(event) => setName(event.currentTarget.value)}
        />
        <Button
          color='grape'
          disabled={!name.length}
          onClick={() => onSave(name)}
        >
          {t('buttons.save')}
        </Button>
      </Flex>
    </Card>
  );
}
