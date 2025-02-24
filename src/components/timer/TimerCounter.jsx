import { useDispatch } from "react-redux";
import { skipRound, toggleCountingDown } from "../../slices/timerSlice";

export default function TimerCounter( {option} ) {
    const dispatch = useDispatch();

    function minutes(time) {
        return Math.floor((time % 3600) / 60);
    }

    function seconds(time) {
        return time % 60
    }

    function setCountingDown(value) {
        dispatch(toggleCountingDown({
            key: option.key,
            value: value
        }))
    }

    return (
        <>
            <span className="timer-string">{`${minutes(option.time)}`.padStart(2, 0)}:{`${seconds(option.time)}`.padStart(2, 0)}</span>
            <div className="timer-buttons">
                {!option.isCountingDown && <button className="timer-btn" onClick={() => setCountingDown(true)}>START</button>}
                {option.isCountingDown && 
                    <>
                        <button className="timer-btn" onClick={() => setCountingDown(false)}>PAUSE</button>
                        <button className="timer-skip" onClick={() => dispatch(skipRound({key: option.key}))}>
                            <span className="material-icons">skip_next</span>
                        </button>
                    </>
                }
            </div>
        </>
    )
}