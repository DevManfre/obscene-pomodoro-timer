import '../static/css/style.css'
import 'bootstrap/dist/css/bootstrap.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import 'react-circular-progressbar/dist/styles.css';
import Colors from '../static/css/style.css'
import TimerSettings from './TimerSettings';
import { useState } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { animated, useSpring } from '@react-spring/web'

function PomodoroTimer() {
    const breakState = useState(0.1);
    const workState = useState(0.15);
    const [timerValue, setTimerValue] = useState(1);
    const [timerMaxValue, setTimerMaxValue] = useState(1);
    const [settingsVisibility, setSettingsVisibility] = useState(true);
    const [timerText, setTimerText] = useState('');
    const [title, setTitle] = useState("Pomodoro Timer");
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

                if (isWorkTime) {
                    /* Starting break */
                    timer(breakState[0] * 60, false);
                    setTitle('Take a break!');
                }
                else {
                    /* Starting work */
                    timer(workState[0] * 60, true);
                    setTitle('Time to focus!');
                }
            }
        }, 1000);
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
            setTitle("Time to focus!");
        }, 500);

        timer(workState[0] * 60, true);
    }

    return (
        <div className="pomodoro-timer">
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
                    pathColor: Colors.pomodoroMainColor,
                    textColor: Colors.pomodoroMainColor
                })} />
            </div>
        </div>
    );
}

export default PomodoroTimer;