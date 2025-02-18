import { Flex, Space } from "@mantine/core";
import { Knife } from "@phosphor-icons/react";
import { useTranslation } from "react-i18next";

export function EmptyScoreboard() {
  const { t } = useTranslation();

  return (
    <Flex direction='column'>
      <Flex gap='xs' align='center'>
        {t('labels.emptyScoreboard.noScores')}
      </Flex>
      <Space h='md' />
      <Flex gap='xs' align='center'>
        {t('labels.emptyScoreboard.try')}
        <Knife size={24} />
      </Flex>
      {t('labels.emptyScoreboard.yourName')}
    </Flex>
  );
}
