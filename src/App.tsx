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

type State = 'start' | 'quiz' | 'result';

function App() {
  const [state, setState] = useState<State>('start');
  const [questionParams, setQuestionParams] = useState<string>('');

  const { status, data: questions, refetch: refetchQuestions } = useQuery({
    queryKey: ['questions'],
    queryFn: () => fetchQuestions(questionParams),
    enabled: false
  });

  const handleStartQuiz = (queryParams: string): void => {
    setQuestionParams(queryParams);
    refetchQuestions();
    setState('quiz');
  };

  let stateComponent = null;
  switch (state) {
    case 'quiz':
      stateComponent = status === 'success'
        ? <Questions questions={questions || []} />
        : <div>Loading ...</div>;
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
