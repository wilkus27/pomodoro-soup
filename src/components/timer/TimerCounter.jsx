export default function TimerCounter( {option} ) {
    return (
        <>
            <span className="timer-string">{`${option.minutes}`.padStart(2, 0)}:{`${option.seconds}`.padStart(2, 0)}</span>
            <div className="timer-buttons">
                {!option.isCountingDown && <button className="timer-btn" onClick={() => option.setIsCountingDown(true)}>START</button>}
                {option.isCountingDown && <button className="timer-btn" onClick={() => option.setIsCountingDown(false)}>PAUSE</button>}
            </div>
        </>
    )
}