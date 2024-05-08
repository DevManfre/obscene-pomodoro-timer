import '../static/css/style.css'
import 'bootstrap/dist/css/bootstrap.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import 'react-circular-progressbar/dist/styles.css';
import Colors from '../static/css/style.css'
import TimerSettings from './TimerSettings';
import { useState } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { animated, useSpring, useSpringRef } from '@react-spring/web'

function PomodoroTimer() {
    const breakState = useState(5);
    const workState = useState(25);
    const [timerValue, setTimerValue] = useState(1);
    const [timerMaxValue, setTimerMaxValue] = useState(1);
    const [settingsVisibility, setSettingsVisibility] = useState(true);
    const [timerText, setTimerText] = useState('');
    const [title, setTitle] = useState("Pomodoro Timer");
    const [textColor, setTextColor] = useState(Colors.pomodoroMainColor);
    const [backgroundColor, setBackgroundColor] = useState(Colors.pomodoroStartBg);
    const [settings, settingsApi] = useSpring(() => ({
        opacity: 1
    }));

    function timer(totalSeconds, isWorkTime) {
        setTimerValue(totalSeconds);
        setTimerMaxValue(totalSeconds);
        let intervalId = setInterval(() => {
            const stringCorrection = (n) => {
                if (n < 10) return '0' + n;
                return n;
            }

            setTimerValue(totalSeconds);
            let minutes = stringCorrection(parseInt(totalSeconds / 60));
            let seconds = stringCorrection(totalSeconds % 60);
            setTimerText(`${minutes}:${seconds}`);
            totalSeconds -= 1;

            if (totalSeconds < 0) {
                clearInterval(intervalId);

                if (isWorkTime)
                    breakTimer();
                else 
                    workTimer();
            }
        }, 1000);
    }

    function workTimer() {
        setTitle("Time to focus!");
        setTextColor(Colors.pomodoroStartBg);
        setBackgroundColor(Colors.pomodoroMainColor);
        timer(workState[0] * 60, true);
    }

    function breakTimer() {
        setTitle('Take a break!');
        setTextColor(Colors.pomodoroBreakColor);
        setBackgroundColor(Colors.pomodoroStartBg);
        timer(breakState[0] * 60, false);
    }

    function handlePlayClick() {
        // Graphic changes
        settingsApi.start({
            from: {
                opacity: 1,
            },
            to: {
                opacity: 0,
            }
        });
        setTimeout(() => {
            setSettingsVisibility(false);
            
        }, 500);

        workTimer();
    }

    return (
        <div id='pomodoro-timer' style={{color: textColor, backgroundColor: backgroundColor}}>
            <h1 className='title'>{title}</h1>
            <animated.div className="row" style={{
                display: settingsVisibility ? 'inerhit' : 'none',
                ...settings
            }}>
                <TimerSettings state={breakState}>Break</TimerSettings>
                <div className="play-btn col-sm-4">
                    <i className="bi bi-play-circle" onClick={handlePlayClick}></i>
                </div>
                <TimerSettings state={workState}>Work</TimerSettings>
            </animated.div>
            <div className="timer">
                <CircularProgressbar maxValue={timerMaxValue} value={timerValue} text={timerText} styles={buildStyles({
                    pathTransitionDuration: 1,
                    pathColor: textColor,
                    textColor: textColor,
                    trailColor: 'none'
                })} />
            </div>
        </div>
    );
}

export default PomodoroTimer;