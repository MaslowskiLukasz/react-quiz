import { Flex, Title } from "@mantine/core";
import { Confetti } from "@phosphor-icons/react";
import { useTranslation } from "react-i18next";

export function ScoreboardTitle() {
  const { t } = useTranslation();

  return (
    <Flex gap='xs' align='center'>
      <Title order={3}>{t('headers.scoreboard')}</Title>
      <Confetti size={24} color="var(--mantine-color-grape-6)" />
    </Flex>
  );
}
