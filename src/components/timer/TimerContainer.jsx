import { useCallback, useEffect, useMemo, useState } from "react"
import TimerOption from "./TimerOption";
import TimerCounter from "./TimerCounter";
import TimerPomodoroCount from "./TimerPomodoroCount";

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

    const [skipPomodoro, setSkipPomodoro] = useState(false)
    const [skipShortBreak, setSkipShortBreak] = useState(false)
    const [skipLongBreak, setSkipLongBreak] = useState(false)

    const [breaks, setBrakes] = useState(0)
    const [pomosRound, setPomosRound] = useState(() => {
        const savedRound = localStorage.getItem("pomosRound");
        if (savedRound) {
            return JSON.parse(savedRound)
        } else return 0;
    })
    const [breaksRound, setBreaksRound] = useState(() => {
        const savedRound = localStorage.getItem("breaksRound");
        if (savedRound) {
            return JSON.parse(savedRound)
        } else return 0;
    })

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
            setSkip: setSkipPomodoro
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
            setIsCountingDown: setIsShortBreakCountingDown,
            setSkip: setSkipShortBreak
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
            setIsCountingDown: setIsLongBreakCountingDown,
            setSkip: setSkipLongBreak
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
                option.setSkip(false)
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
        if (pomodoroTime === 0 || skipPomodoro === true) {
            setBrakes((currentBreaks) => {
                if (currentBreaks === 4) {
                    return 0
                } else {
                    return currentBreaks +1;
                }
            })
            setPomosRound((currentPomos) => {
                return currentPomos +1;
            })
        }

        if (shortBreakTime === 0 || longBreakTime === 0 || skipShortBreak === true || skipLongBreak === true) {
            setBreaksRound((currentBreaks) => {
                return currentBreaks +1;
            })
        }
    }, [pomodoroTime, shortBreakTime, longBreakTime, skipPomodoro, skipShortBreak, skipLongBreak])

    useEffect (() => {
        if (skipPomodoro === true) {
            if (breaks < 4) {
                selectOption(options[1])
            } else {
                selectOption(options[2])
            }
        }

        if (skipShortBreak === true || skipLongBreak === true) {
            selectOption(options[0])
        }
    }, [options, selectOption, skipPomodoro, skipShortBreak, skipLongBreak, breaks])

    useEffect(() => {
        localStorage.setItem("pomosRound", JSON.stringify(pomosRound));
    }, [pomosRound]);

    useEffect(() => {
        localStorage.setItem("breaksRound", JSON.stringify(breaksRound));
    }, [breaksRound]);

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
            <div className="timer-info">
                {(activeOption === 0) && <TimerPomodoroCount total={pomosRound} refresh={() => setPomosRound(0)} name="Pomos" />}
                {(activeOption != 0) && <TimerPomodoroCount total={breaksRound} refresh={() => setBreaksRound(0)} name="Breaks" />}
            </div>
        </div>
    )
}