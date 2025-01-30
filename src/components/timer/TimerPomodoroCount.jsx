export default function TimerPomodoroCount( {total, refresh, name} ) {
    return (
        <div className="timer-pomodoro-count">
            <span>{`${name} round:`}</span>
            <span className="timer-info-text">{`#${total}`}</span>
            <span className="material-icons refresh" onClick={refresh}>refresh</span>
        </div>
    )
}