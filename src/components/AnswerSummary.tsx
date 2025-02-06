import { Accordion } from "@mantine/core";

export function AnswerSummary() {
  return (
    <Accordion>
      <Accordion.Item value='Test'>
        <Accordion.Control>Test</Accordion.Control>
        <Accordion.Panel>Description</Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );
}
