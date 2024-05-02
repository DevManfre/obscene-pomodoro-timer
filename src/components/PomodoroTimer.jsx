import '../static/css/style.css'
import 'bootstrap/dist/css/bootstrap.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import 'react-circular-progressbar/dist/styles.css';
import TimerSettings from './TimerSettings';
import { useState } from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';

function PomodoroTimer() {
    const breakState = useState(5);
    const workState = useState(25);
    const [timerMaxValue, setTimerMaxValue] = useState(100);
    const [timerValue, setTimerValue] = useState(100);

    return (
        <div className="pomodoro-timer">
            <h1 className='title'>Pomodoro Timer</h1>
            <div className="row">
                <TimerSettings state={breakState}>Break</TimerSettings>
                <div className="play-btn col-sm-4"><i class="bi bi-play-circle"></i></div>
                <TimerSettings state={workState}>Work</TimerSettings>
            </div>
            <div className="timer">
                <CircularProgressbar maxValue={timerMaxValue} value={timerValue} />
            </div>
        </div>
    );
}

export default PomodoroTimer;