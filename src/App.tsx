import './App.css';
import '@mantine/core/styles.css';
import '@mantine/charts/styles.css';
import { Select } from '@mantine/core';

import { MantineProvider } from '@mantine/core';

function App() {

  return (
    <MantineProvider>
      Test
      <Select label="test" placeholder="here we go" data={['test1', 'test2']} />
    </MantineProvider>
  )
}

export default App
