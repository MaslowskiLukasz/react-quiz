import { PieChart } from "recharts";
import { AnswerSummary } from "./AnswerSummary";
import { useContext } from "react";
import { SelectAnswerContext } from "../App";

export function Results() {
  const { questions, selectedAnswers } = useContext(SelectAnswerContext);

  const isAnswerCorrect = selectedAnswers.map(
    (answer: number, index: number) => {
      const correctAnswer = questions[index].answers.findIndex((item) => item.isCorrect);
      return answer === correctAnswer;
    });
  const numberOfGoodAnswers = isAnswerCorrect.filter((item) => item === true).length;
  const result = <div>{numberOfGoodAnswers}/{questions.length}</div>

  return (
    <>
      <h2>Results</h2>
      {result}
      <PieChart />
      <AnswerSummary />
    </>

  );
}
