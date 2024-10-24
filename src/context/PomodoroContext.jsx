import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import Notification from '../components/Notification';
import { useNavigate } from 'react-router-dom';

// Create the context
const PomodoroContext = createContext();

// Custom hook to use the Pomodoro context
export const usePomodoro = () => {
    return useContext(PomodoroContext);
};

// Pomodoro Provider component
export const PomodoroProvider = ({ children }) => {
    const [time, setTime] = useState(25 * 60); // 25 minutes in seconds
    const [isRunning, setIsRunning] = useState(false);
    const [timerLabel, setTimerLabel] = useState('Short Focus');
    const [intervalId, setIntervalId] = useState(null);
    const [focusedTime, setFocusedTime] = useState(0); // Total focused time in seconds
    const [startTime, setStartTime] = useState(null);
    const [notification, setNotification] = useState(null);

    const initialLoad = useRef(true);
    const navigate = useNavigate();

    const notificationSoundURL = 'https://wilzzu.xyz/assets/sounds/pomodoro-alarm.mp3'

    useEffect(() => {
        const savedState = JSON.parse(localStorage.getItem('pomodoro-timer-state'));
        if (savedState) {
            setTime(savedState.time || 25 * 60);
            setIsRunning(savedState.isRunning || false);
            setTimerLabel(savedState.timerLabel || 'Short Focus');
            setFocusedTime(savedState.focusedTime || 0);
            setStartTime(savedState.startTime || null);
        }
        initialLoad.current = false; // Set the initial load to false after loading saved state
    }, []);


    const handlePomodoroComplete = () => {
        setNotification('Pomodoro complete! Click to view.');
    };

    const handleNotificationClick = () => {
        setNotification(null); // Clear notification
        navigate('/pomodoro');
    };

    // Start the timer
    const startTimer = () => {
        if (!isRunning) {
            setIsRunning(true);
            setStartTime(Date.now()); // Record the start time only if not previously set
            const id = setInterval(() => {
                setTime((prevTime) => {
                if (prevTime > 0) {
                    return prevTime - 1;
                } else {
                    clearInterval(id);
                    setIsRunning(false);
                    setFocusedTime((prevFocusedTime) => prevFocusedTime + 25 * 60); // Increment focused time by the session duration
                    handlePomodoroComplete();
                    return 0; // Stop timer at 0
                }
                });
            }, 1000);
            setIntervalId(id);
        }
    };

    // Pause the timer
    const pauseTimer = () => {
        if (isRunning) {
            clearInterval(intervalId);
            setIsRunning(false);
            if (startTime) {
                const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
                setFocusedTime((prevFocusedTime) => prevFocusedTime + elapsedTime);
                setStartTime(null);
            }
        }
    };

    // Switch to work state without resetting focused time
    const startShortFocus = () => {
        pauseTimer();
        setTime(25 * 60);
        setTimerLabel('Short Focus');
        setIsRunning(false);
    };

    const startLongFocus = () => {
        pauseTimer();
        setTime(45 * 60);
        setTimerLabel('Long Focus');
        setIsRunning(false);
    };

    // Start short break (5 minutes)
    const startShortBreak = () => {
        pauseTimer();
        setTime(5 * 60);
        setTimerLabel('Short Break');
        setIsRunning(false);
    };

    // Start long break (15 minutes)
    const startLongBreak = () => {
        pauseTimer();
        setTime(15 * 60);
        setTimerLabel('Long Break');
        setIsRunning(false);
    };

    // Reset to work session (25 minutes)
    const resetToWork = () => {
        pauseTimer();
        setTime(25 * 60);
        setTimerLabel('Short Focus');
        setIsRunning(false);
    };

    const testTimer = () => {
        pauseTimer();
        setTime(1 * 60);
        setTimerLabel('Timer Test');
        setIsRunning(false);
    }

    // Cleanup the interval on component unmount
    useEffect(() => {
        return () => clearInterval(intervalId);
    }, [intervalId]);

    return (
        <PomodoroContext.Provider
            value={{
                time,
                initialLoad,
                isRunning,
                timerLabel,
                focusedTime,
                startTimer,
                pauseTimer,
                startShortFocus,
                startLongFocus,
                startShortBreak,
                startLongBreak,
                resetToWork,
                testTimer,
            }}
        >
            {notification && (
                <Notification
                    message={notification}
                    style={{position: 'fixed', top: '100px', right: '20px', padding: '20px 30px', backgroundColor: '#eab119', color: '#fff', borderRadius: '5px', zIndex: 1000, boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)', fontSize: '18px'}}
                    soundURL={notificationSoundURL}
                    onClick={handleNotificationClick}
                />
            )}    
            {children}
        </PomodoroContext.Provider>
    );
};
