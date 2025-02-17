import { useLocalStorage } from "@mantine/hooks";
import { ScoreboardInput } from "./ScoreboardInput";
import { Score } from "../models/models";
import { ScoreboardItem } from "./ScoreboardItem";
import { NotOnScoreboard } from "./NotOnScoreboard";

interface Props {
  readonly: boolean;
  score?: number;
  position?: number;
  onSave?: () => void;
}

export function Scoreboard(props: Props) {
  const { readonly, position, score, onSave } = props;
  const [topScores, setTopScores] = useLocalStorage<Score[]>({
    key: 'top-scores',
    defaultValue: []
  });

  const scores = topScores.map((item, index) => {
    return <ScoreboardItem key={index} item={item} />;
  });

  if (position === undefined || score === undefined || readonly) {
    return (
      <ol>
        {scores}
      </ol>
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
    setTopScores(newScore);
    onSave && onSave();
  };


  const list = [
    ...scores.slice(0, position),
    <ScoreboardInput onSave={saveScore} key={`name-input-${position}`} />,
    ...scores.slice(position)
  ];

  return (
    <>
      <ol>
        {list}
      </ol>
    </>
  );
}
