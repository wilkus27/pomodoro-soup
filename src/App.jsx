import "./styles.css"
import TasksContainer from "./components/task/TasksContainer"
import TimerContainer from "./components/timer/TimerContainer"
import { useState } from "react";

export default function App() {
  const [setTasks] = useState([])

  return (
    <div className="container">
      <TimerContainer setTasks={setTasks} />
      <TasksContainer />
    </div>
  )
}