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
import { useTranslation } from "react-i18next";

interface Props {
  onRestart: () => void;
};

export function Results(props: Props) {
  const { onRestart } = props;
  const { questions, selectedAnswers } = useContext(SelectAnswerContext);
  const [opened, { open, close }] = useDisclosure(false);
  const [resultsReadonly, setResultsReadonly] = useState<boolean>(false);
  const { t } = useTranslation();

  const isAnswerCorrect = selectedAnswers.map(
    (answer: number, index: number) => {
      const correctAnswer = questions[index].answers.findIndex((item) => item.isCorrect);
      return answer === correctAnswer;
    });

  const numberOfGoodAnswers = isAnswerCorrect.filter((item) => item === true).length;

  const chartData = [
    { name: t('labels.correct'), value: numberOfGoodAnswers, color: 'green.6' },
    { name: t('labels.incorrect'), value: MAX_QUESTION - numberOfGoodAnswers, color: 'red.6' },
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
      <Title>{t('headers.results')}</Title>
      <Flex align='center' direction='column' gap='lg' my='xl'>
        <div>
          {
            t('labels.score',
              {
                numerator: numberOfGoodAnswers,
                denominator: MAX_QUESTION
              }
            )
          }
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
            {t('buttons.restart')}
          </Button>
          <Button
            variant="outline"
            rightSection={<Confetti size={14} />}
            onClick={open}
          >
            {t('buttons.saveScoreboard')}
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
