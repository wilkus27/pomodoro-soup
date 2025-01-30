export default function TimerOption( {option, selectOption, className} ) {
    return (
        <button className={className} onClick={selectOption}>{option.title}</button>
    )
}