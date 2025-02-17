import { Score } from "../models/models";

interface Props {
  item: Score;
}

export function ScoreboardItem(props: Props) {
  const { item } = props;

  return <li>{item.name}: {item.value}/10</li>;
}
