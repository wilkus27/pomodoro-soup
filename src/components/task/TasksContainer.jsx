import NewTask from "./NewTask";

export default function TasksContainer() {
  return (
    <div className="tasks-container">
      <div className="tasks-top-panel">
        <span className="tasks-title">Tasks</span>
      </div>
      <NewTask />
    </div>
  )
}