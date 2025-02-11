import { AnswerSummary } from "./AnswerSummary";
import { useContext } from "react";
import { SelectAnswerContext } from "../App";
import { PieChart } from "@mantine/charts";
import { Accordion, Button } from "@mantine/core";

interface Props {
  onRestart: () => void;
}
export function Results(props: Props) {
  const { onRestart } = props;
  const { questions, selectedAnswers } = useContext(SelectAnswerContext);

  const isAnswerCorrect = selectedAnswers.map(
    (answer: number, index: number) => {
      const correctAnswer = questions[index].answers.findIndex((item) => item.isCorrect);
      return answer === correctAnswer;
    });
  const numberOfGoodAnswers = isAnswerCorrect.filter((item) => item === true).length;
  const chartData = [
    { name: 'Correct', value: numberOfGoodAnswers, color: 'green.6' },
    { name: 'Incorrect', value: 10 - numberOfGoodAnswers, color: 'red.6' },
  ];

  const summary = questions.map((question, index) => {
    return (
      <AnswerSummary
        key={index}
        question={question}
        selectedAnswer={selectedAnswers[index]}
      />
    );
  });

  return (
    <>
      <h2>Results</h2>
      <PieChart
        data={chartData}
        withLabels
        labelsPosition="inside"
        labelsType="percent"
        withTooltip
        tooltipDataSource="segment"
      />
      <Button onClick={onRestart}>Restart</Button>
      <Accordion variant="separated">
        {summary}
      </Accordion>
    </>
  );
}
