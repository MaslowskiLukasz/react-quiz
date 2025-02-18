import { useLocalStorage } from "@mantine/hooks";
import { NotOnScoreboard } from "./NotOnScoreboard";
import { Scoreboard } from "./Scoreboard";
import { MAX_QUESTION, Score } from "../../models/models";
import { useTranslation } from "react-i18next";

interface Props {
  result: number;
  readonly: boolean;
  onSaveScore: () => void;
}

export function ScoreboardModal(props: Props) {
  const { result, readonly, onSaveScore } = props;
  const [topScores] = useLocalStorage<Score[]>({
    key: 'top-scores',
    defaultValue: []
  });
  const { t } = useTranslation();

  const place = topScores.findIndex((item) => item.value < result);
  let isFirst = false;
  if (place === -1) {
    if (topScores.length) {
      isFirst = topScores[0].value < result;
    }
  }

  let isLast = false;
  if (place === -1
    && topScores.length > 0
    && topScores.length < 5
    && !isFirst
  ) {
    isLast = topScores[topScores.length - 1].value >= result;
  }

  let position = -1;
  if (isFirst || topScores.length === 0) {
    position = 0;
  } else if (isLast) {
    position = topScores.length;
  } else if (place !== -1) {
    position = place;
  }

  const handleSaveScore = () => {
    onSaveScore();
  };

  if (position === -1) {
    return <NotOnScoreboard />;
  }

  return (
    <>
      <p>{t('labels.score', {
        numerator: result,
        denominator: MAX_QUESTION
      })}
      </p>
      <Scoreboard
        readonly={readonly}
        position={position}
        score={result}
        onSave={handleSaveScore}
      />
    </>
  );
}
