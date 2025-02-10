import { Button } from "@mantine/core";

type Props = {
  questionNumber: number;
  isAnswerSelected: boolean;
  onClick: () => void;
}
export function QuestionNavigation(props: Props) {
  const { questionNumber, isAnswerSelected, onClick } = props;
  return <Button variant={isAnswerSelected ? 'filled' : 'outline'} onClick={onClick}>{questionNumber + 1}</Button>;
}
