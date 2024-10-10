import React, { useEffect } from 'react';
import { usePomodoro } from '../context/PomodoroContext';
import startIcon from '../assets/play.svg';
import pauseIcon from '../assets/pause.svg';
import resetIcon from '../assets/circle-arrow.svg';
import '../styles/Pomodoro.css'

function Pomodoro() {
    const { time, isRunning, initialLoad, startTime, timerLabel, focusedTime, startTimer, pauseTimer, switchToWork, startShortBreak, startLongBreak, resetToWork } = usePomodoro();
    
    useEffect(() => {
        if (!initialLoad.current) {
          const pomodoroState = {
            time,
            isRunning,
            timerLabel,
            focusedTime,
            startTime,
          };
          localStorage.setItem('pomodoro-timer-state', JSON.stringify(pomodoroState));
        }
    }, [time, isRunning, timerLabel, focusedTime, startTime]);

    // Format the countdown timer as mm:ss
    const formatCountdown = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    // Format the total focused time as Xh Ymins
    const formatFocusedTime = (time) => {
        const hours = Math.floor(time / 3600); // Calculate total hours
        const minutes = Math.floor((time % 3600) / 60); // Calculate total minutes
        const seconds = time % 60; // Calculate total seconds;

        return `${hours}h ${minutes}m ${seconds}s`; // Always include hours
    };

    return (
        <div>
            <h1 className='pomodoro-header'>Pomodoro</h1>
            <div className="pomodoro-container">
                <div id="timer">
                    <h2 className='pomodoro-timer-label'>{timerLabel}</h2>
                    <h1 id='pomodoro-timer'>{formatCountdown(time)}</h1>
                </div>
                <div id="focused-time">
                    <h3>Total Focused Time: {formatFocusedTime(focusedTime)}</h3>
                </div>
                <div id="section-container">
                    <button onClick={startTimer} id="start-button">
                        <img src={startIcon} alt="Start" />
                    </button>
                    <button onClick={pauseTimer} id="pause-button">
                        <img src={pauseIcon} alt="Pause" />
                    </button>
                    <button onClick={resetToWork} id="reset-button">
                        <img src={resetIcon} alt="Reset" />
                    </button>
                    <button onClick={switchToWork} id="work-button">Focus</button>
                    <button onClick={startShortBreak} id="short-break-button">Short break</button>
                    <button onClick={startLongBreak} id="long-break-button">Long Break</button>
                </div>
            </div>
        </div>
    );
}

export default Pomodoro;