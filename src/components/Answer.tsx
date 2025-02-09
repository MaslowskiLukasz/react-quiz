import { Button } from "@mantine/core";

type Props = {
  value: string;
}
export function Answer(props: Props) {
  const { value } = props;

  return <Button>{value}</Button>;
}
