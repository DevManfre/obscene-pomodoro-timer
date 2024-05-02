import '../static/css/style.css'
import 'bootstrap/dist/css/bootstrap.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import TimerSettings from './TimerSettings';

function PomodoroTimer() {
    return (
        <div className="pomodoro-timer">
            <h1 className='title'>Pomodoro Timer</h1>
            <div className="row">
                <TimerSettings>Break</TimerSettings>
                <TimerSettings>Work</TimerSettings>
            </div>
        </div>
    );
}

export default PomodoroTimer;