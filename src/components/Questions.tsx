import { QuestionNavigation } from "./QuestionNavigation";
import { QuestionPresentationModel } from "../models/models";
import { QuestionCard } from "./QuestionCard";
import { useState } from "react";

type Props = {
  questions: QuestionPresentationModel[]
}
const MAX_QUESTION_NUMBER = 9;

export function Questions(props: Props) {
  const { questions } = props;
  const [questionNumber, setQuestionNumber] = useState(0);
  const currentQuestion = { ...questions[questionNumber] };

  const navigation = questions.map((_, index) => {
    return <QuestionNavigation key={index} questionNumber={index + 1} />
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


  return (
    <>
      {navigation}
      <QuestionCard
        question={currentQuestion.question}
        questionNumber={questionNumber}
        answers={currentQuestion.answers}
        onNext={handleNextQuestion}
        onPrevious={handlePreviousQuestion}
      />
    </>
  );
}
