import { useEffect, useState } from "react";
import NewTask from "./NewTask";
import TasksItem from "./TasksItem";
import { useSelector } from "react-redux";

export default function TasksContainer() {
  const [currentTask, setCurrentTask] = useState(() => {
    const savedTaskID = localStorage.getItem("currentTask");

    if (savedTaskID) {
      return JSON.parse(savedTaskID);
    } else return null;
  })

  const [pomodoros, setPomodoros] = useState(1);

  const tasks = useSelector((state) => state.tasks.allTasks)

  useEffect(() => {
      localStorage.setItem("currentTask", JSON.stringify(currentTask));
  }, [currentTask]);

  useEffect(() => {
    const filteredByCurrentID = tasks.filter(task => task.id === currentTask);

    if (filteredByCurrentID.length === 0) return setCurrentTask(null)
  }, [setCurrentTask, currentTask, tasks])

  return (
    <div className="tasks-container">
      <div className="tasks-top-panel pb-5 mb-5 border-b-color6 border-b-2 border-b-solid">
        <span className="tasks-title text-2xl">Tasks</span>
      </div>
      <div className="tasks-list">
        {tasks.map(task => {
          return (
            <TasksItem 
              task={task}
              key={task.id}
              className={`tasks-item ${task.selected === true ? 'selected border-l-color4 border-l-10 border-l-solid' : ''}`}
            />
          )
        })}
      </div>
      <NewTask  
        pomodoros={pomodoros}
        setPomodoros={setPomodoros}
      />
    </div>
  )
}