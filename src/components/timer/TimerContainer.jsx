import { useEffect, useState } from "react"

export default function TimerContainer() {
    const [pomodoroTime, setPomodoroTime] = useState(1500)
    const [isCountingDown, setIsCountingDown] = useState(false)

    const pomodoroMinutes = Math.floor((pomodoroTime % 3600) / 60);
    const pomodoroSeconds = (pomodoroTime % 60);

    useEffect(() => {
        if (isCountingDown) {
            const interval = setInterval(() => {
                setPomodoroTime((currentTime) => {
                    if (currentTime === 0) {
                        clearInterval(interval)
                        return 0;
                    } else {
                        return currentTime -1;
                    }
                })
            }, 1000);

            return () => clearInterval(interval)
        }
    }, [isCountingDown]);

    return (
        <div className="timer-container">
            <div className="timer">
                <div className="timer-options">
                    <button className="timer-option-btn active">Pomodoro</button>
                    <button className="timer-option-btn">Short Break</button>
                    <button className="timer-option-btn">Long Break</button>
                </div>
                <span className="timer-string">{`${pomodoroMinutes}`.padStart(2, 0)}:{`${pomodoroSeconds}`.padStart(2, 0)}</span>
                <div className="timer-buttons">
                    {!isCountingDown && <button className="timer-btn" onClick={() => setIsCountingDown(true)}>START</button>}
                    {isCountingDown && <button className="timer-btn" onClick={() => setIsCountingDown(false)}>PAUSE</button>}
                </div>
            </div>
        </div>
    )
}