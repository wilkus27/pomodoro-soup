import "./styles.css"
import TasksContainer from "./components/task/TasksContainer"
import TimerContainer from "./components/timer/TimerContainer"
import { useEffect, useState } from "react";

export default function App() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      return JSON.parse(savedTasks);
    } else {
      return [];
    }
  });

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
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
      localStorage.setItem("currentTaskName", JSON.stringify(taskName));
  }, [taskName]);

  useEffect(() => {
    const filteredByCurrentName = tasks.filter(task => task.name === taskName);

    if (filteredByCurrentName.length === 0) return setTaskName("Time to focus!")
  }, [setTaskName, taskName, tasks])

  return (
    <div className="container">
      <TimerContainer taskName={taskName} setTasks={setTasks} />
      <TasksContainer tasks={tasks} setTasks={setTasks} handleTaskName={handleTaskName} />
    </div>
  )
}