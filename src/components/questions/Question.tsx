import { useContext } from "react";
import { AnswerPresentationModel, MAX_QUESTION } from "../../models/models";
import { Answer } from "./Answer";
import { Button, Flex, SimpleGrid, Title } from "@mantine/core";
import { SelectAnswerContext } from "../../App";
import { ArrowLeft, ArrowRight, Check } from "@phosphor-icons/react";
import { useTranslation } from "react-i18next";

type Props = {
  questionNumber: number
  question: string;
  answers: AnswerPresentationModel[];
  onNext: () => void;
  onPrevious: () => void;
}

export function Question(props: Props) {
  const { question, answers, questionNumber, onNext, onPrevious } = props;
  const { setSelected, selectedAnswers } = useContext(SelectAnswerContext);
  const { t } = useTranslation();

  const isSelected = (index: number) => {
    return selectedAnswers[questionNumber] === index;
  };

  const answerButtons = answers.map((item, index) => {
    return (
      <Answer
        key={index}
        value={item}
        handleClick={() => setSelected(questionNumber, index)}
        isSelected={isSelected(index)}
      />
    );
  });

  const areAllAnswersSelected = !selectedAnswers.some((item) => item === null);
  const isLastQuestion = questionNumber >= MAX_QUESTION - 1;
  const previousButtonEnabled = questionNumber > 0;
  const nextButtonEnabled = !isLastQuestion || areAllAnswersSelected;
  const isSubmitButton = isLastQuestion && areAllAnswersSelected;
  const iconNextButton = isLastQuestion
    ? <Check size={14} />
    : <ArrowRight size={14} />;

  return (
    <>
      <Title order={2}>
        {t('headers.questionNumber',
          { number: questionNumber + 1 }
        )}
      </Title>
      <p>{question}</p>
      <SimpleGrid
        my='xl'
        cols={{ base: 1, md: 2 }}
      >
        {answerButtons}
      </SimpleGrid>
      <Flex justify='space-between'>
        <Button
          leftSection={<ArrowLeft size={14} />}
          onClick={onPrevious}
          disabled={!previousButtonEnabled}
        >
          {t('buttons.previous')}
        </Button>
        <Button
          rightSection={iconNextButton}
          color={isSubmitButton ? 'grape' : 'blue'}
          onClick={onNext}
          disabled={!nextButtonEnabled}
        >
          {isLastQuestion ? t('buttons.submit') : t('buttons.next')}
        </Button>
      </Flex>
    </>
  )
}
