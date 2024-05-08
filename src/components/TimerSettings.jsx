function TimerSettings({ children, state }) {
    const [time, setTime] = state;
    const leftArrow = () => {
        if (time > 1) setTime(time - 1);
    }
    const rightArrow = () => {
        if (time < 99) setTime(time + 1);
    }

    return (
        <div className="setting col-sm-4">
            <h2 className="setting-title">{children}</h2>
            <i className="bi bi-arrow-left-circle" onClick={leftArrow}></i>
            <span>{time}</span>
            <i className="bi bi-arrow-right-circle" onClick={rightArrow}></i>
        </div>
    );
}

export default TimerSettings;