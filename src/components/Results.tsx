import { AnswerSummary } from "./AnswerSummary";
import { useContext } from "react";
import { SelectAnswerContext } from "../App";
import { PieChart } from "@mantine/charts";

export function Results() {
  const { questions, selectedAnswers } = useContext(SelectAnswerContext);

  const isAnswerCorrect = selectedAnswers.map(
    (answer: number, index: number) => {
      const correctAnswer = questions[index].answers.findIndex((item) => item.isCorrect);
      return answer === correctAnswer;
    });
  const numberOfGoodAnswers = isAnswerCorrect.filter((item) => item === true).length;
  const result = <div>{numberOfGoodAnswers}/{questions.length}</div>
  const chartData = [
    { name: 'Correct', value: numberOfGoodAnswers, color: 'green.6' },
    { name: 'Incorrect', value: 10 - numberOfGoodAnswers, color: 'red.6' },
  ]

  return (
    <>
      <h2>Results</h2>
      {result}
      <PieChart
        data={chartData}
        withLabels
        labelsPosition="inside"
        labelsType="percent"
        withTooltip
        tooltipDataSource="segment"
      />
      <AnswerSummary />
    </>

  );
}
