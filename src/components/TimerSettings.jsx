import { useState } from "react";

function TimerSettings({ children, value = 25 }) {
    const [time, setTime] = useState(value);
    const leftArrow = () => {
        if (time > 1) setTime(time - 1);
    }
    const rightArrow = () => {
        if (time < 99) setTime(time + 1);
    }

    return (
        <div className="setting col-sm-6">
            <h2 className="setting-title">{children}</h2>
            <i class="bi bi-arrow-left-circle" onClick={leftArrow}></i>
            <span>{time}</span>
            <i class="bi bi-arrow-right-circle" onClick={rightArrow}></i>
        </div>
    );
}

export default TimerSettings;