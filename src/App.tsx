import './App.css';
import '@mantine/core/styles.css';
import '@mantine/charts/styles.css';
import '@mantine/core/styles.layer.css'
import { MantineProvider } from '@mantine/core';
import { createContext, useEffect, useState } from 'react';
import { Questions } from './components/questions/Questions';
import { Results } from './components/results/Results';
import { useQuery } from '@tanstack/react-query';
import { fetchQuestions } from './helpers/api';
import { Loader } from './components/shared/Loader';
import { Start } from './components/start/Start';
import { theme } from './theme';
import { ErrorScreen } from './components/shared/ErrorScreen';
import { SelectAnswerContextType, State, MAX_QUESTION } from './models/models';

export const SelectAnswerContext = createContext<SelectAnswerContextType>({
  questions: [],
  setSelected: () => { },
  selectedAnswers: [],
});

function App() {
  const [state, setState] = useState<State>('start');
  const [questionParams, setQuestionParams] = useState<string>('');
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>(Array(MAX_QUESTION).fill(null));

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['questions', questionParams],
    queryFn: () => fetchQuestions(questionParams),
    enabled: !!questionParams,
    refetchOnWindowFocus: false,
  });

  const handleStartQuiz = (queryParams: string): void => {
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
    setQuestionParams('');
    setSelectedAnswers(Array(MAX_QUESTION).fill(null));
    setState('start');
  };

  useEffect(() => {
    if (!isLoading && !!questionParams) {
      setState('quiz')
    }
  }, [data, isLoading]);

  if (isError) {
    return <ErrorScreen error={error} />;
  }

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
    <div className='app'>
      <MantineProvider theme={theme} forceColorScheme='dark'>
        <SelectAnswerContext.Provider
          value={
            {
              questions: data || [],
              setSelected,
              selectedAnswers,
            }
          }>
          {view}
        </SelectAnswerContext.Provider>
      </MantineProvider>
    </div>
  )
}

export default App
