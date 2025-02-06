import './App.css';
import '@mantine/core/styles.css';
import '@mantine/charts/styles.css';

import { MantineProvider } from '@mantine/core';
import { MainScreen } from './components/MainScreen';

function App() {

  return (
    <MantineProvider>
      <MainScreen />
    </MantineProvider>
  )
}

export default App
