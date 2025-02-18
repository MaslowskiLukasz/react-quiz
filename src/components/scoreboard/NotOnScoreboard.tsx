import { Flex } from "@mantine/core";
import { HandWaving } from "@phosphor-icons/react";
import { useTranslation } from "react-i18next";

export function NotOnScoreboard() {
  const { t } = useTranslation();

  return (
    <Flex direction='column' my='xl'>
      {t('labels.notOnScoreboard.sorry')}
      <p>{t('labels.notOnScoreboard.lowScore')}</p>
      <Flex gap='xs' align='center'>
        {t('labels.notOnScoreboard.nextTime')}
        <HandWaving size={24} />
      </Flex>
    </Flex>
  );
}
