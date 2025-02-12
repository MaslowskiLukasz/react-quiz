import { AnswerSummary } from "./AnswerSummary";
import { useContext } from "react";
import { SelectAnswerContext } from "../App";
import { PieChart } from "@mantine/charts";
import { Accordion, Button, Divider, Flex } from "@mantine/core";
import { Title } from "@mantine/core";

interface Props {
  onRestart: () => void;
};

export function Results(props: Props) {
  const { onRestart } = props;
  const { questions, selectedAnswers, maxQuestions } = useContext(SelectAnswerContext);

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
      <Title>Results</Title>
      <Flex align='center' direction='column' gap='lg' my='xl'>
        <div>
          Your score is: {numberOfGoodAnswers}/{maxQuestions}
        </div>
        <PieChart
          data={chartData}
          withLabels
          labelsPosition="inside"
          labelsType="percent"
          withTooltip
          tooltipDataSource="segment"
        />
        <Button color='grape' onClick={onRestart}>Try another quiz</Button>
      </Flex>
      <Divider my='xl' />
      <Accordion variant="separated">
        {summary}
      </Accordion>
    </>
  );
}
