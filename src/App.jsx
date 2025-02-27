import "./styles.css"
import TasksContainer from "./components/task/TasksContainer"
import TimerContainer from "./components/timer/TimerContainer"

export default function App() {
  return (
    <div className="container max-w-[650px] mx-auto">
      <TimerContainer />
      <TasksContainer />
    </div>
  )
}