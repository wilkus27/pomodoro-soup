import "./styles.css"
import TasksContainer from "./components/task/TasksContainer"
import TimerContainer from "./components/timer/TimerContainer"

export default function App() {
  return (
    <div className="container">
      <TimerContainer />
      <TasksContainer />
    </div>
  )
}