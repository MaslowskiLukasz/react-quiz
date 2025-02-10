import { Button } from "@mantine/core";
import { AnswerPresentationModel } from "../models/models";

type Props = {
  value: AnswerPresentationModel;
  handleClick: () => void;
  isSelected: boolean;
}
export function Answer(props: Props) {
  const { value, handleClick, isSelected } = props;
  const variant = isSelected ? 'filled' : 'outline';

  return <Button onClick={handleClick} variant={variant}>{value.text}</Button>;
}
