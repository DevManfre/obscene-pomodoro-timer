import '../static/css/style.css'
import 'bootstrap/dist/css/bootstrap.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import TimerSettings from './TimerSettings';
import { useState } from 'react';

function PomodoroTimer() {
    const breakState = useState(5);
    const workState = useState(25);

    return (
        <div className="pomodoro-timer">
            <h1 className='title'>Pomodoro Timer</h1>
            <div className="row">
                <TimerSettings state={breakState}>Break</TimerSettings>
                <TimerSettings state={workState}>Work</TimerSettings>
            </div>
        </div>
    );
}

export default PomodoroTimer;