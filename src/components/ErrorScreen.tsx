import { MantineProvider, Space, Spoiler, Title } from "@mantine/core";
import { NetworkSlash } from "@phosphor-icons/react";
import { theme } from "../theme";

interface Props {
  error: Error;
}

export function ErrorScreen(props: Props) {
  const { error } = props;

  return (
    <MantineProvider theme={theme} forceColorScheme='dark'>
      <NetworkSlash size={128} />
      <Title order={1}>Whops! Something went wrong!</Title>
      <Space h='xl' />
      <Title order={3}>Here is some more info</Title>
      <Space h='md' />
      <Spoiler max-height={120} showLabel='Show more' hideLabel='Hide'>
        <div>Error: {error.name} </div>
        <p>{error.message}</p>
      </Spoiler>
    </MantineProvider>
  );
}
