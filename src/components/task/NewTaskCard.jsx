export default function NewTaskCard({showAddTaskButton}) {
    return (
        <div className="new-task-card">
            <div className="new-task-card-container">
                <input className="new-task-input" placeholder="What are you working on?" type="text" />
                <div className="new-task-card-pomodoros">
                    <div className="pomodoros-title-container">
                        <span className="pomodoros-title">Est Pomodoros</span>
                    </div>
                    <div className="pomodoros-counting">
                        <input type="number" className="pomodoros-input" min={0} value={1} step={1}/>
                        <div className="pomodoros-buttons">
                            <button className="pomodoros-button">
                                <span className="material-icons">keyboard_arrow_up</span>
                            </button>
                            <button className="pomodoros-button">
                                <span className="material-icons">keyboard_arrow_down</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="new-task-card-bar">
                <button className="btn-cancel" onClick={showAddTaskButton}>Cancel</button>
                <button className="btn-save" onClick={showAddTaskButton}>Save</button>
            </div>
        </div>
    )
}