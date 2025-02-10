import './App.css';
import '@mantine/core/styles.css';
import '@mantine/charts/styles.css';
import { MantineProvider } from '@mantine/core';
import { createContext, useState } from 'react';
import { Questions } from './components/Questions';
import { Results } from './components/Results';
import { useQuery } from '@tanstack/react-query';
import { fetchQuestions } from './helpers/api';
import { Loader } from './components/Loader';
import { Start } from './components/Start';

interface SelectAnswerContextType {
  setSelected: (question: number, answer: number) => void;
  selectedAnswers: number[];
}

type State = 'start' | 'loading' | 'quiz' | 'result';

export const SelectAnswerContext = createContext<SelectAnswerContextType>({
  setSelected: () => { },
  selectedAnswers: []
});

function App() {
  const [state, setState] = useState<State>('start');
  const [questionParams, setQuestionParams] = useState<string>('');
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>(Array(10).fill(null));

  const { data, refetch } = useQuery({
    queryKey: ['questions'],
    queryFn: () => fetchQuestions(questionParams),
    enabled: false
  });

  const handleStartQuiz = async (queryParams: string): Promise<void> => {
    setQuestionParams(queryParams);
    setState('loading');
    await refetch();
    setState('quiz');
  };
  const setSelected = (question: number, answer: number): void => {
    const newSelectedAnswers = [...selectedAnswers];
    newSelectedAnswers[question] = answer;
    setSelectedAnswers(newSelectedAnswers);
  }

  let view = null;
  switch (state) {
    case 'loading':
      view = <Loader />
      break;
    case 'quiz':
      view = (
        <SelectAnswerContext.Provider value={{ setSelected, selectedAnswers }}>
          <Questions questions={data || []} />
        </SelectAnswerContext.Provider>
      )
      break;
    case 'result':
      view = <Results />;
      break;
    default:
      view = <Start onStart={handleStartQuiz} />
      break;
  }

  return (
    <MantineProvider>
      {view}
    </MantineProvider>
  )
}

export default App
