import { useCallback, useEffect, useMemo, useState } from "react"
import TimerOption from "./TimerOption";
import TimerCounter from "./TimerCounter";

export default function TimerContainer() {
    const POMODORO_DEFAULT = 1500;
    const SHORT_BREAK_DEFAULT = 300;
    const LONG_BREAK_DEFAULT = 900;

    const [activeOption, setActiveOption] = useState(0)

    const [pomodoroTime, setPomodoroTime] = useState(POMODORO_DEFAULT)
    const [shortBreakTime, setShortBreakTime] = useState(SHORT_BREAK_DEFAULT)
    const [longBreakTime, setLongBreakTime] = useState(LONG_BREAK_DEFAULT)

    const [isPomodoroCountingDown, setIsPomodoroCountingDown] = useState(false)
    const [isShortBreakCountingDown, setIsShortBreakCountingDown] = useState(false)
    const [isLongBreakCountingDown, setIsLongBreakCountingDown] = useState(false)

    const [breaks, setBrakes] = useState(0)

    function minutes(time) {
        return Math.floor((time % 3600) / 60);
    }

    function seconds(time) {
        return time % 60
    }

    const options = useMemo(() => [
        {
            id: 0,
            title: "Pomodoro",
            theme: "redish",
            default: POMODORO_DEFAULT,
            minutes: minutes(pomodoroTime),
            seconds: seconds(pomodoroTime),
            setTime: setPomodoroTime,
            isCountingDown: isPomodoroCountingDown,
            setIsCountingDown: setIsPomodoroCountingDown,
        },
        {
            id: 1,
            title: "Short Break",
            theme: "greenish",
            default: SHORT_BREAK_DEFAULT,
            minutes: minutes(shortBreakTime),
            seconds: seconds(shortBreakTime),
            setTime: setShortBreakTime,
            isCountingDown: isShortBreakCountingDown,
            setIsCountingDown: setIsShortBreakCountingDown
        },
        {
            id: 2,
            title: "Long Break",
            theme: "blueish",
            default: LONG_BREAK_DEFAULT,
            minutes: minutes(longBreakTime),
            seconds: seconds(longBreakTime),
            setTime: setLongBreakTime,
            isCountingDown: isLongBreakCountingDown,
            setIsCountingDown: setIsLongBreakCountingDown
        }
    ], [pomodoroTime, shortBreakTime, longBreakTime, isPomodoroCountingDown, isShortBreakCountingDown, isLongBreakCountingDown])

    const selectOption = useCallback((option) => {
        // Set theme
        document.querySelector('body').setAttribute('data-theme', option.theme)
        // Make option active
        setActiveOption(option.id)
        // Reset timers of inactive options
        options.map((option) => {
            if(activeOption !== option.id) {
                option.setIsCountingDown(false)
                option.setTime(option.default)
            }
        })
    }, [activeOption, options]);

    useEffect(() => {
        if (isPomodoroCountingDown) {
            const interval = setInterval(() => {
                setPomodoroTime((currentTime) => {
                    if (currentTime === 0) {
                        clearInterval(interval)
                        if (breaks < 4) {
                            selectOption(options[1])
                        } else {
                            selectOption(options[2])
                        }
                        return 0;
                    } else {
                        return currentTime -1;
                    }
                })
            }, 1000);

            return () => clearInterval(interval)
        }

        if (isShortBreakCountingDown) {
            const interval = setInterval(() => {
                setShortBreakTime((currentTime) => {
                    if (currentTime === 0) {
                        clearInterval(interval)
                        selectOption(options[0])
                        return 0;
                    } else {
                        return currentTime -1;
                    }
                })
            }, 1000);

            return () => clearInterval(interval)
        }

        if (isLongBreakCountingDown) {
            const interval = setInterval(() => {
                setLongBreakTime((currentTime) => {
                    if (currentTime === 0) {
                        clearInterval(interval)
                        selectOption(options[0])
                        return 0;
                    } else {
                        return currentTime -1;
                    }
                })
            }, 1000);

            return () => clearInterval(interval)
        }
    }, [isPomodoroCountingDown, isShortBreakCountingDown, isLongBreakCountingDown, options, selectOption, breaks]);

    useEffect(() => {
        if (pomodoroTime === 0) {
            setBrakes((currentBreaks) => {
                if (currentBreaks === 4) {
                    return 0
                } else {
                    return currentBreaks +1;
                }
            })
        }
    }, [pomodoroTime])

    return (
        <div className="timer-container">
            <div className="timer">
                <div className="timer-options">
                    {options.map((option) => {
                        return (
                            <TimerOption 
                                key={option.id}
                                option={option}
                                selectOption={() => selectOption(option)}
                                className={`timer-option-btn ${activeOption === option.id ? 'active' : ''}`}
                            />
                        )
                    })}
                </div>
                {options.map((option) => {
                    if (activeOption === option.id) {
                        return (
                            <TimerCounter key={option.id} option={option} />
                        )
                    }
                })}
            </div>
        </div>
    )
}