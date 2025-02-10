import { QuestionPresentationModel } from "../models/models";
import { useContext, useState } from "react";
import { SelectAnswerContext } from "../App";
import { Navigation } from "./Navigation";
import { Question } from "./Question";

type Props = {
  questions: QuestionPresentationModel[],
  onSubmit: () => void,
}
const MAX_QUESTION_NUMBER = 9;

export function Questions(props: Props) {
  const { questions, onSubmit } = props;
  const { selectedAnswers } = useContext(SelectAnswerContext);
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
    if (questionNumber < MAX_QUESTION_NUMBER) {
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
  }
  const handleSubmit = () => {
    onSubmit();
  }
  const isLastQuestion = questionNumber === 9;


  return (
    <>
      {navigation}
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
