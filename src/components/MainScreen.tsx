import { Button, Select } from "@mantine/core";
import { Scoreboard } from "./Scoreboard";
import { Question } from "./Question";
import { Results } from "./Results";

export function MainScreen() {

  return (
    <>
      <h2>Pick categories and have fun</h2>
      <Select label='Categories' placeholder='Pick categories' data={['test1', 'test2']} />
      <Button>Start quiz</Button>
      <Scoreboard />
      <Question />
      <Results />
    </>
  )
}
