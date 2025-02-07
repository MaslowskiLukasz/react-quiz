import { Button } from "@mantine/core";

type Props = {
  questionNumber: number;
}
export function QuestionNavigation(props: Props) {
  const { questionNumber } = props;
  return <Button>{questionNumber}</Button>;
}
