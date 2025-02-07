import { QuestionNavigation } from "./QuestionNavigation";
import { Question } from "../models/models";
import { QuestionCard } from "./QuestionCard";
import { useState } from "react";

type Props = {
  questions: Question[]
}
const MAX_QUESTION_NUMBER = 9;

export function Questions(props: Props) {
  const { questions } = props;
  const [questionNumber, setQuestionNumber] = useState(0);
  const currentQuestion = { ...questions[questionNumber] };
  const answers = [
    currentQuestion.correct_answer,
    ...currentQuestion.incorrect_answers
  ];

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
        answers={answers}
        onNext={handleNextQuestion}
        onPrevious={handlePreviousQuestion}
      />
    </>
  );
}
