import { useContext } from "react";
import { AnswerPresentationModel } from "../models/models";
import { Answer } from "./Answer";
import { Button, SimpleGrid } from "@mantine/core";
import { SelectAnswerContext } from "../App";

type Props = {
  questionNumber: number
  question: string;
  answers: AnswerPresentationModel[];
  onNext: () => void;
  onPrevious: () => void;
}
export function QuestionCard(props: Props) {
  const { question, answers, questionNumber, onNext, onPrevious } = props;
  const { setSelected, selectedAnswers } = useContext(SelectAnswerContext);
  const isSelected = (index: number) => {
    return selectedAnswers[questionNumber] === index;
  }
  const answerButtons = answers.map((item, index) => {
    return (
      <Answer
        key={index}
        value={item}
        handleClick={() => setSelected(questionNumber, index)}
        isSelected={isSelected(index)}
      />
    );
  })

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
