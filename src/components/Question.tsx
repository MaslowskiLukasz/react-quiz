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
export function Question(props: Props) {
  const { question, answers, questionNumber, onNext, onPrevious } = props;
  const { setSelected, selectedAnswers, maxQuestions } = useContext(SelectAnswerContext);
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
  });

  const areAllAnswersSelected = !selectedAnswers.some((item) => item === null);
  const isLastQuestion = questionNumber >= maxQuestions - 1;
  const previousButtonEnabled = questionNumber > 0;
  const nextButtonEnabled = !isLastQuestion || areAllAnswersSelected;
  const isSubmitButton = isLastQuestion && areAllAnswersSelected;

  return (
    <>
      <h2>Question #{questionNumber + 1}</h2>
      <p>{question}</p>
      <SimpleGrid cols={2}>
        {answerButtons}
      </SimpleGrid>
      <div>
        <Button onClick={onPrevious} disabled={!previousButtonEnabled}>Previous</Button>
        <Button onClick={onNext} disabled={!nextButtonEnabled}>
          {isSubmitButton ? 'Submit' : 'Next'}
        </Button>
      </div>
    </>
  )
}
