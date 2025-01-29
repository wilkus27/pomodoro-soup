export default function TimerOption( {theme, title} ) {

    const setTheme = () => {
        document.querySelector('body').setAttribute('data-theme', theme)
    }

    return (
        <button className="timer-option-btn" onClick={setTheme}>{title}</button>
    )
}