import "./styles.css"
import TasksContainer from "./components/task/TasksContainer"
import TimerContainer from "./components/timer/TimerContainer"
import { useEffect, useState } from "react";

export default function App() {
  const [taskName, setTaskName] = useState(() => {
    const savedTaskName = localStorage.getItem("currentTaskName")
    if (savedTaskName) {
      return JSON.parse(savedTaskName)
    } else return "";
  })

  function handleTaskName(currentTaskName) {
    setTaskName(currentTaskName)
  }

  useEffect(() => {
      localStorage.setItem("currentTaskName", JSON.stringify(taskName));
  }, [taskName]);

  return (
    <div className="container">
      <TimerContainer taskName={taskName} />
      <TasksContainer handleTaskName={handleTaskName} />
    </div>
  )
}