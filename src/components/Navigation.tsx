import { Button } from "@mantine/core";

type Props = {
  questionNumber: number;
  isAnswerSelected: boolean;
  onClick: () => void;
}
export function Navigation(props: Props) {
  const { questionNumber, isAnswerSelected, onClick } = props;
  const variant = isAnswerSelected ? 'filled' : 'outline';

  return (
    <Button
      variant={variant}
      onClick={onClick}
    >
      {questionNumber + 1}
    </Button>
  );
}
