export default function TaskCard( {value, onChange, hasMarginBottom, pomodorosTitle, pomodorosCountingChildren,
    increasePomodoros, decreasePomodoros, save, cancel
} ) {
    return (
        <div className={`task-card w-full mt-5 bg-color4 rounded-lg ${hasMarginBottom ? "mb-2.5" : ""}`}>
            <div className="task-card-container mb-3 p-5">
                <input 
                    className="task-input text-4xl text-color1 bg-none border-none shadow-none mb-3 placeholder:italic placeholder-color6 placeholder:opacity-80 focus:outline-none" 
                    placeholder="What are you working on?" 
                    type="text" 
                    value={value} 
                    onChange={onChange} 
                />
                <div className="task-card-pomodoros">
                    <div className="pomodoros-title-container mb-3">
                        <span className="pomodoros-title text-xl font-bold text-color1">{pomodorosTitle}</span>
                    </div>
                    <div className="pomodoros-counting flex items-center gap-5">
                        {pomodorosCountingChildren}
                        <div className="pomodoros-buttons">
                            <PomodorosButton onClick={increasePomodoros} icon={"keyboard_arrow_up"}/>
                            <PomodorosButton onClick={decreasePomodoros} icon={"keyboard_arrow_down"}/>
                        </div>
                    </div>
                </div>
            </div>
            <div className="task-card-buttons p-5 bg-color5 rounded-b-lg flex justify-end gap-5">
                <button className="btn-cancel border-none bg-none text-color2 font-bold" onClick={cancel}>Cancel</button>
                <button className="btn-save bg-color2 text-color6 font-bold border-none py-2 px-3 rounded-sm" onClick={save}>Save</button>
            </div>
        </div>
    )
}

function PomodorosButton({ onClick, icon}) {
    return (
        <button className="pomodoros-button text-color6 bg-color2 border-none rounded-lg mr-2.5" onClick={onClick}>
            <span className="material-icons">{icon}</span>
        </button>
    )
}