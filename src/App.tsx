import './App.css';
import '@mantine/core/styles.css';
import '@mantine/charts/styles.css';
import { MantineProvider } from '@mantine/core';
import { MainScreen } from './components/MainScreen';
import { useState } from 'react';
import { Questions } from './components/Questions';
import { Results } from './components/Results';
import { useQuery } from '@tanstack/react-query';
import { fetchQuestions } from './helpers/api';
import { Loader } from './components/Loader';

type State = 'start' | 'loading' | 'quiz' | 'result';

function App() {
  const [state, setState] = useState<State>('start');
  const [questionParams, setQuestionParams] = useState<string>('');

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

  let stateComponent = null;
  switch (state) {
    case 'loading':
      stateComponent = <Loader />
      break;
    case 'quiz':
      stateComponent = <Questions questions={data || []} />
      break;
    case 'result':
      stateComponent = <Results />;
      break;
    default:
      stateComponent = <MainScreen onStart={handleStartQuiz} />;
      break;
  }

  return (
    <MantineProvider>
      {stateComponent}
    </MantineProvider>
  )
}

export default App
