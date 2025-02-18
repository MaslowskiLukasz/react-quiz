import { useContext, useState } from "react";
import { SelectAnswerContext } from "../../App";
import { PieChart } from "@mantine/charts";
import { Accordion, Button, Divider, Flex, Modal } from "@mantine/core";
import { Title } from "@mantine/core";
import { ArrowCounterClockwise, Confetti } from "@phosphor-icons/react";
import { useDisclosure } from "@mantine/hooks";
import { ScoreboardModal } from "../scoreboard/ScoreboardModal";
import { ScoreboardTitle } from "../scoreboard/ScoreboardTitle";
import { AnswerSummary } from "./AnswerSummary";
import { MAX_QUESTION } from "../../models/models";

interface Props {
  onRestart: () => void;
};

export function Results(props: Props) {
  const { onRestart } = props;
  const { questions, selectedAnswers } = useContext(SelectAnswerContext);
  const [opened, { open, close }] = useDisclosure(false);
  const [resultsReadonly, setResultsReadonly] = useState<boolean>(false);

  const isAnswerCorrect = selectedAnswers.map(
    (answer: number, index: number) => {
      const correctAnswer = questions[index].answers.findIndex((item) => item.isCorrect);
      return answer === correctAnswer;
    });

  const numberOfGoodAnswers = isAnswerCorrect.filter((item) => item === true).length;

  const chartData = [
    { name: 'Correct', value: numberOfGoodAnswers, color: 'green.6' },
    { name: 'Incorrect', value: MAX_QUESTION - numberOfGoodAnswers, color: 'red.6' },
  ];

  const handleRestart = () => {
    setResultsReadonly(false);
    onRestart();
  };

  const handleSave = () => {
    setResultsReadonly(true);
  };

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
      <Modal opened={opened} onClose={close} title={<ScoreboardTitle />} centered>
        <ScoreboardModal
          readonly={resultsReadonly}
          result={numberOfGoodAnswers}
          onSaveScore={handleSave}
        />
      </Modal>
      <Title>Results</Title>
      <Flex align='center' direction='column' gap='lg' my='xl'>
        <div>
          Your score is: {numberOfGoodAnswers}/{MAX_QUESTION}
        </div>
        <PieChart
          data={chartData}
          withLabels
          labelsPosition="inside"
          labelsType="percent"
          withTooltip
          tooltipDataSource="segment"
        />
        <Flex gap='md'>
          <Button
            rightSection={<ArrowCounterClockwise size={14} />}
            color='grape'
            onClick={handleRestart}
          >
            Try another quiz
          </Button>
          <Button
            variant="outline"
            rightSection={<Confetti size={14} />}
            onClick={open}
          >
            Save to scorebaord
          </Button>
        </Flex>
      </Flex>
      <Divider my='xl' />
      <Accordion variant="separated">
        {summary}
      </Accordion>
    </>
  );
}
