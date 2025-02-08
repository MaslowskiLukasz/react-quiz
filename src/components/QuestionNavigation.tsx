import { Button } from "@mantine/core";

type Props = {
  questionNumber: number;
  onClick: () => void;
}
export function QuestionNavigation(props: Props) {
  const { questionNumber, onClick } = props;
  return <Button onClick={onClick}>{questionNumber + 1}</Button>;
}
