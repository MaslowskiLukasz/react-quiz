import { Accordion } from "@mantine/core";
import { QuestionPresentationModel } from "../models/models";

interface Props {
  question: QuestionPresentationModel;
  selectedAnswer: number;
}

export function AnswerSummary(props: Props) {
  const { question, selectedAnswer } = props;
  const correctAnswer = question.answers.find((item) => item.isCorrect);
  return (
    <Accordion>
      <Accordion.Item value='Test'>
        <Accordion.Control>{question.question}</Accordion.Control>
        <Accordion.Panel>
          <div>Selected answer: {question.answers[selectedAnswer].text}</div>
          <div>Correct answer: {correctAnswer?.text}</div>
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );
}
