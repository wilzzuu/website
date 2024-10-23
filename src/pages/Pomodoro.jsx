import React, { useEffect } from 'react';
import { usePomodoro } from '../context/PomodoroContext';
import Footer from '../components/Footer';
import Maintenance from '../components/UnderMaintenance';
import startIcon from '../assets/play.svg';
import pauseIcon from '../assets/pause.svg';
import resetIcon from '../assets/circle-arrow.svg';
import '../styles/Pomodoro.css'

function Pomodoro() {
    const { time, isRunning, initialLoad, startTime, timerLabel, focusedTime, startTimer, pauseTimer, startShortFocus, startLongFocus, startShortBreak, startLongBreak, resetToWork, testTimer } = usePomodoro();

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

    // Format the total focused time as X-hours Y-minutes Z-seconds
    const formatFocusedTime = (time) => {
        const hours = Math.floor(time / 3600); // Calculate total hours
        const minutes = Math.floor((time % 3600) / 60); // Calculate total minutes
        const seconds = time % 60; // Calculate total seconds;

        return `${hours}h ${minutes}m ${seconds}s`;
    };

    return (
        <div className='pomodoro-container'>
            <h1 className='pomodoro-header'>Pomodoro</h1>
            <div className="pomodoro-timer-container">
                <div id="timer">
                    <h2 className='pomodoro-timer-label'>{timerLabel}</h2>
                    <h1 id='pomodoro-timer'>{formatCountdown(time)}</h1>
                </div>
                <div id="focused-time">
                    <h3>Total Focused Time: {formatFocusedTime(focusedTime)}</h3>
                </div>
                <div id="buttons-container">
                    <div id="player-buttons">
                        <button onClick={startTimer} id="start-button">
                            <img src={startIcon} alt="Start" />
                        </button>
                        <button onClick={pauseTimer} id="pause-button">
                            <img src={pauseIcon} alt="Pause" />
                        </button>
                        <button onClick={resetToWork} id="reset-button">
                            <img src={resetIcon} alt="Reset" />
                        </button>
                    </div>
                    <button onClick={startShortFocus} id="short-work-button">25:00 Focus</button>
                    <button onClick={startLongFocus} id="long-work-button">45:00 Focus</button>
                    <button onClick={startShortBreak} id="short-break-button">05:00 Break</button>
                    <button onClick={startLongBreak} id="long-break-button">15:00 Break</button>
                </div>
            </div>
            <Footer/>
        </div>
    );
}

export default Pomodoro;