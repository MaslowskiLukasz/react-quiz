import { MantineProvider, Space, Spoiler, Title } from "@mantine/core";
import { NetworkSlash } from "@phosphor-icons/react";
import { theme } from "../../theme";
import { useTranslation } from "react-i18next";

interface Props {
  error: Error;
}

export function ErrorScreen(props: Props) {
  const { error } = props;
  const { t } = useTranslation();

  return (
    <MantineProvider theme={theme} forceColorScheme='dark'>
      <div className="app">
        <NetworkSlash size={128} />
        <Title order={1}>{t('headers.somethingWentWrong')}</Title>
        <Space h='xl' />
        <Title order={3}>{t('headers.moreInfo')}</Title>
        <Space h='md' />
        <Spoiler max-height={120} showLabel='Show more' hideLabel='Hide'>
          <div>{t('labels.errorName', { name: error.name })}</div>
          <p>{error.message}</p>
        </Spoiler>
      </div>
    </MantineProvider>
  );
}
