import './App.css';
import '@mantine/core/styles.css';
import '@mantine/charts/styles.css';
import { MantineProvider } from '@mantine/core';
import { createContext, useEffect, useState } from 'react';
import { Questions } from './components/Questions';
import { Results } from './components/Results';
import { useQuery } from '@tanstack/react-query';
import { fetchQuestions } from './helpers/api';
import { Loader } from './components/Loader';
import { Start } from './components/Start';
import { QuestionPresentationModel } from './models/models';

interface SelectAnswerContextType {
  questions: QuestionPresentationModel[];
  setSelected: (question: number, answer: number) => void;
  selectedAnswers: number[];
}

type State = 'start' | 'loading' | 'quiz' | 'results';

export const SelectAnswerContext = createContext<SelectAnswerContextType>({
  questions: [],
  setSelected: () => { },
  selectedAnswers: []
});

function App() {
  const [state, setState] = useState<State>('start');
  const [questionParams, setQuestionParams] = useState<string>('');
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>(Array(10).fill(null));

  const { data, isLoading } = useQuery({
    queryKey: ['questions', questionParams],
    queryFn: () => fetchQuestions(questionParams),
    enabled: !!questionParams,
    refetchOnWindowFocus: false,
  });

  const handleStartQuiz = async (queryParams: string): Promise<void> => {
    setQuestionParams(queryParams);
    setState('loading');
  };
  const setSelected = (question: number, answer: number): void => {
    const newSelectedAnswers = [...selectedAnswers];
    newSelectedAnswers[question] = answer;
    setSelectedAnswers(newSelectedAnswers);
  };
  const handleSubmit = () => {
    setState('results');
  };
  const handleRestart = () => {
    setSelectedAnswers(Array(10).fill(null));
    setState('start');
  };

  useEffect(() => {
    if (!isLoading && !!questionParams) {
      setState('quiz')
    }
  }, [data]);

  let view = null;
  switch (state) {
    case 'loading':
      view = <Loader />;
      break;
    case 'quiz':
      view = <Questions onSubmit={handleSubmit} />;
      break;
    case 'results':
      view = <Results onRestart={handleRestart} />;
      break;
    default:
      view = <Start onStart={handleStartQuiz} />;
      break;
  }

  return (
    <MantineProvider>
      <SelectAnswerContext.Provider value={{ questions: data || [], setSelected, selectedAnswers }}>
        {view}
      </SelectAnswerContext.Provider>
    </MantineProvider>
  )
}

export default App
