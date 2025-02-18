import { useLocalStorage } from "@mantine/hooks";
import { ScoreboardInput } from "./ScoreboardInput";
import { Score } from "../../models/models";
import { ScoreboardItem } from "./ScoreboardItem";
import { Flex } from "@mantine/core";
import { NotOnScoreboard } from "./NotOnScoreboard";
import { EmptyScoreboard } from "./EmptyScoreboard";

interface Props {
  readonly: boolean;
  score?: number;
  position?: number;
  onSave?: () => void;
}

export function Scoreboard(props: Props) {
  const { readonly = false, position, score, onSave } = props;
  const [topScores, setTopScores] = useLocalStorage<Score[]>({
    key: 'top-scores',
    defaultValue: []
  });

  const scores = topScores.map((item, index) => {
    return <ScoreboardItem key={index} item={item} />;
  });

  if (position === undefined || score === undefined || readonly) {
    if (topScores.length === 0) {
      return <EmptyScoreboard />
    }

    return (
      <Flex direction='column' gap='md'>
        {scores}
      </Flex>
    );
  }

  if (position === -1 && !readonly) {
    return <NotOnScoreboard />;
  }

  const saveScore = (name: string) => {
    const newScore = [
      ...topScores.slice(0, position),
      { name: name || '', value: score },
      ...topScores.slice(position),
    ];
    setTopScores(newScore.slice(0, 5));
    onSave && onSave();
  };


  const list = [
    ...scores.slice(0, position),
    <ScoreboardInput onSave={saveScore} key={`name-input-${position}`} />,
    ...scores.slice(position)
  ].slice(0, 5);

  return (
    <>
      <Flex direction='column' gap='md'>
        {list}
      </Flex>
    </>
  );
}
