import { Answer } from "./Answer";
import { Button, SimpleGrid } from "@mantine/core";

type Props = {
  questionNumber: number
  question: string;
  answers: string[];
  onNext: () => void;
  onPrevious: () => void;
}
export function QuestionCard(props: Props) {
  const { question, answers, questionNumber, onNext, onPrevious } = props;
  const answerButtons = answers.map((item, index) => <Answer key={index} value={item} />);

  return (
    <>
      <h2>Question #{questionNumber + 1}</h2>
      <p>{question}</p>
      <SimpleGrid cols={2}>
        {answerButtons}
      </SimpleGrid>
      <div>
        <Button onClick={onPrevious}>Previous</Button>
        <Button onClick={onNext}>Next</Button>
      </div>
    </>
  )
}
