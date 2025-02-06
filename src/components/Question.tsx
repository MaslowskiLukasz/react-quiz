import { Button } from "@mantine/core";
import { Answer } from "./Answer";
import { QuestionNavigation } from "./QuestionNavigation";

export function Question() {
  return (
    <>
      <QuestionNavigation />
      <h2>Question #1</h2>
      <p>Question?</p>
      <Answer />
      <Button>Previous</Button>
      <Button>Next</Button>
    </>
  );
}
