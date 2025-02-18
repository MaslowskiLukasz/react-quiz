import { useContext, useState } from "react";
import { SelectAnswerContext } from "../../App";
import { Navigation } from "./Navigation";
import { Question } from "./Question";
import { Flex, Space } from "@mantine/core";

type Props = {
  onSubmit: () => void,
}

export function Questions(props: Props) {
  const { onSubmit } = props;
  const { questions, selectedAnswers, maxQuestions } = useContext(SelectAnswerContext);
  const [questionNumber, setQuestionNumber] = useState(0);
  const currentQuestion = { ...questions[questionNumber] };

  const navigation = questions.map((_, index) => {
    return (
      <Navigation
        key={index}
        questionNumber={index}
        onClick={() => handleGoToQuestion(index)}
        isAnswerSelected={selectedAnswers[index] !== null}
      />
    );
  });

  const handleNextQuestion = (): void => {
    if (questionNumber < maxQuestions - 1) {
      setQuestionNumber(questionNumber + 1);
    };
  };
  const handlePreviousQuestion = (): void => {
    if (questionNumber > 0) {
      setQuestionNumber(questionNumber - 1);
    };
  };
  const handleGoToQuestion = (value: number): void => {
    setQuestionNumber(value);
  };
  const handleSubmit = () => {
    onSubmit();
  };
  const isLastQuestion = questionNumber === maxQuestions - 1;


  return (
    <>
      <Flex
        my='xl'
        gap='sm'
        justify='center'
        wrap='wrap'
      >
        {navigation}
      </Flex>
      <Space h='xl' />
      <Question
        question={currentQuestion.question}
        questionNumber={questionNumber}
        answers={currentQuestion.answers}
        onNext={isLastQuestion ? handleSubmit : handleNextQuestion}
        onPrevious={handlePreviousQuestion}
      />
    </>
  );
}
