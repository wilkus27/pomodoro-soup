export default function TimerPomodoroCount( {total, refresh, name} ) {
    return (
        <div className="timer-pomodoro-count">
            <span>{`${name} round:`}</span>
            <span className="timer-info-text">{`#${total}`}</span>
            <button className="refresh" onClick={refresh}>
                <span className="material-icons">refresh</span>
            </button>
        </div>
    )
}