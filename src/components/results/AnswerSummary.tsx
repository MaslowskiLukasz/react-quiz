import { Accordion } from "@mantine/core";
import { QuestionPresentationModel } from "../../models/models";
import { CheckCircle, XCircle } from "@phosphor-icons/react";
import { useTranslation } from "react-i18next";

interface Props {
  question: QuestionPresentationModel;
  selectedAnswer: number;
}

export function AnswerSummary(props: Props) {
  const { question, selectedAnswer } = props;
  const { t } = useTranslation();

  const correctIndex = question.answers.findIndex((item) => item.isCorrect);
  const isCorrect = selectedAnswer === correctIndex;
  const correctAnswer = question.answers[correctIndex];
  const icon = isCorrect
    ? <CheckCircle size={20} color='var(--mantine-color-green-6)' />
    : <XCircle size={20} color='var(--mantine-color-red-6)' />;

  return (
    <Accordion.Item value={question.question} >
      <Accordion.Control icon={icon}>
        {question.question}
      </Accordion.Control>
      <Accordion.Panel>
        <div>
          {t('labels.selectedAnswer',
            { answer: question.answers[selectedAnswer].text }
          )}
        </div>
        <div>
          {t('labels.correctAnswer',
            { answer: correctAnswer?.text }
          )}
        </div>
      </Accordion.Panel>
    </ Accordion.Item>
  );
}
