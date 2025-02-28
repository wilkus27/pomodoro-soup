import { useEffect, useMemo } from "react"
import TimerOption from "./TimerOption";
import TimerCounter from "./TimerCounter";
import TimerPomodoroCount from "./TimerPomodoroCount";
import { useDispatch, useSelector } from "react-redux";
import { countBreaksRound, countPomosRound, handleBreaksInInterval, resetBreaksRound, resetPomosRound, selectOption, updateTime } from "../../slices/timerSlice";
import { finishPomodoro } from "../../slices/taskSlice";

export default function TimerContainer() {
    const dispatch = useDispatch();

    const taskName = useSelector((state) => state.tasks.currentTaskName)
    const activeOption = useSelector((state) => state.timer.activeOption)

    const pomodoroTime = useSelector((state) => state.timer.options.pomodoro.time)
    const shortBreakTime = useSelector((state) => state.timer.options.shortBreak.time)
    const longBreakTime = useSelector((state) => state.timer.options.longBreak.time)

    const isPomodoroCountingDown = useSelector((state) => state.timer.options.pomodoro.isCountingDown)
    const isShortBreakCountingDown = useSelector((state) => state.timer.options.shortBreak.isCountingDown)
    const isLongBreakCountingDown = useSelector((state) => state.timer.options.longBreak.isCountingDown)

    const skipPomodoro = useSelector((state) => state.timer.options.pomodoro.skip)
    const skipShortBreak = useSelector((state) => state.timer.options.shortBreak.skip)
    const skipLongBreak = useSelector((state) => state.timer.options.longBreak.skip)

    const breaksInInterval = useSelector((state) => state.timer.breaksInInterval)

    const pomosRound = useSelector((state) => state.timer.pomosRound)
    const breaksRound = useSelector((state) => state.timer.breaksRound)

    const options = useMemo(() => [
        {
            key: "pomodoro",
            title: "Pomodoro",
            time: pomodoroTime,
            isCountingDown: isPomodoroCountingDown
        },
        {
            key: "shortBreak",
            title: "Short Break",
            time: shortBreakTime,
            isCountingDown: isShortBreakCountingDown
        },
        {
            key: "longBreak",
            title: "Long Break",
            time: longBreakTime,
            isCountingDown: isLongBreakCountingDown
        }
    ], [pomodoroTime, shortBreakTime, longBreakTime, isPomodoroCountingDown, isShortBreakCountingDown, isLongBreakCountingDown])

    useEffect(() => {
        if (isPomodoroCountingDown) {
            const interval = setInterval(() => {
                dispatch(updateTime( { key: "pomodoro"} ))
                if (pomodoroTime === 0) {
                    clearInterval(interval)
                    if (breaksInInterval < 4) {
                        dispatch(selectOption({option: "shortBreak"}))
                    } else {
                        dispatch(selectOption({option: "longBreak"}))
                    }
                }
            }, 1000);

            return () => clearInterval(interval)
        }

        if (isShortBreakCountingDown) {
            const interval = setInterval(() => {
                dispatch(updateTime( { key: "shortBreak"} ))
                if (shortBreakTime === 0) {
                    clearInterval(interval)
                    dispatch(selectOption({option: "pomodoro"}))
                }
            }, 1000);

            return () => clearInterval(interval)
        }

        if (isLongBreakCountingDown) {
            const interval = setInterval(() => {
                dispatch(updateTime( { key: "longBreak"} ))
                if (longBreakTime === 0) {
                    clearInterval(interval)
                    dispatch(selectOption({option: "pomodoro"}))
                }
            }, 1000);

            return () => clearInterval(interval)
        }
    }, [
        isPomodoroCountingDown,
        isShortBreakCountingDown,
        isLongBreakCountingDown,
        options,
        breaksInInterval,
        dispatch,
        pomodoroTime,
        shortBreakTime,
        longBreakTime
    ]);

    useEffect(() => {
        if (pomodoroTime === 0 || skipPomodoro === true) {
            dispatch(handleBreaksInInterval())

            dispatch(countPomosRound())

            dispatch(finishPomodoro({name: taskName}))
        }

        if (shortBreakTime === 0 || longBreakTime === 0 || skipShortBreak === true || skipLongBreak === true) {
           dispatch(countBreaksRound())
        }
    }, [pomodoroTime, shortBreakTime, longBreakTime, skipPomodoro, skipShortBreak, skipLongBreak, taskName, dispatch])

    useEffect (() => {
        if (skipPomodoro === true) {
            if (breaksInInterval < 4) {
                dispatch(selectOption({option: "shortBreak"}))
            } else {
                dispatch(selectOption({option: "longBreak"}))
            }
        }

        if (skipShortBreak === true || skipLongBreak === true) {
            dispatch(selectOption({option: "pomodoro"}))
        }
    }, [options, skipPomodoro, skipShortBreak, skipLongBreak, breaksInInterval, dispatch])

    return (
        <div className="timer-container mb-5 w-full">
            <div className="timer bg-color5faded rounded-t-lg flex-center flex-col gap-y-5 p-5">
                <div className="timer-options flex gap-2">
                    {options.map((option) => {
                        return (
                            <TimerOption 
                                key={option.key}
                                option={option}
                                selectOption={() => dispatch(selectOption({option: option.key}))}
                                className={`timer-option-btn ${activeOption === option.key ? 'active' : ''}`}
                            />
                        )
                    })}
                </div>
                {options.map((option) => {
                    if (activeOption === option.key) {
                        return (
                            <TimerCounter key={option.key} option={option} />
                        )
                    }
                })}
            </div>
            <div className="timer-info bg-color4 rounded-b-lg p-3">
                {(activeOption === "pomodoro") && <TimerPomodoroCount total={pomosRound} refresh={() => dispatch(resetPomosRound())} name="Pomos" />}
                {(activeOption != "pomodoro") && <TimerPomodoroCount total={breaksRound} refresh={() => dispatch(resetBreaksRound())} name="Breaks" />}
            </div>
            <div className="timer-current-task text-xl italic p-5 text-center">
                <span>{taskName}</span>
            </div>
        </div>
    )
}