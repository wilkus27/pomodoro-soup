export default function NewTaskCard({showAddTaskButton, change, submit, pomodoros, setPomodoros }) {

    function save() {
        showAddTaskButton();
        submit();
    }

    function cancel() {
        showAddTaskButton();
        setPomodoros(1);
    }

    function increasePomodoros() {
        setPomodoros(currentPomodoros => {
            return currentPomodoros += 1;
        })
    }

    function decreasePomodoros() {
        setPomodoros(currentPomodoros => {
            if(currentPomodoros > 0) {
                return currentPomodoros -= 1;
            } else {
                return 0;
            }
        })
    }

    return (
        <div className="new-task-card">
            <div className="new-task-card-container">
                <input className="new-task-input" placeholder="What are you working on?" type="text" onChange={change} />
                <div className="new-task-card-pomodoros">
                    <div className="pomodoros-title-container">
                        <span className="pomodoros-title">Est Pomodoros</span>
                    </div>
                    <div className="pomodoros-counting">
                        <input type="number" className="pomodoros-input" min={0} value={pomodoros} step={1} readOnly/>
                        <div className="pomodoros-buttons">
                            <button className="pomodoros-button" onClick={increasePomodoros}>
                                <span className="material-icons">keyboard_arrow_up</span>
                            </button>
                            <button className="pomodoros-button" onClick={decreasePomodoros}>
                                <span className="material-icons">keyboard_arrow_down</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="new-task-card-bar">
                <button className="btn-cancel" onClick={cancel}>Cancel</button>
                <button className="btn-save" onClick={save}>Save</button>
            </div>
        </div>
    )
}