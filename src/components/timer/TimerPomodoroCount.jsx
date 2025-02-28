export default function TimerPomodoroCount( {total, refresh, name} ) {
    return (
        <div className="timer-pomodoro-count text-xl font-bold text-color1 flex items-center gap-2">
            <span>{`${name} round:`}</span>
            <span className="timer-info-text text-2xl">{`#${total}`}</span>
            <button className="refresh bg-none border-none text-color1 p-0" onClick={refresh}>
                <span className="material-icons">refresh</span>
            </button>
        </div>
    )
}