import React, { useState, useEffect } from 'react';
import '../styles/WeekPlanner.css';

// Get the current week's dates
const getCurrentWeekDates = () => {
    const now = new Date();
    const firstDayOfWeek = new Date(now.setDate(now.getDate() - now.getDay() + 1)); // Get Monday of the current week
    return Array.from({ length: 7 }, (_, i) => {
        const date = new Date(firstDayOfWeek);
        date.setDate(firstDayOfWeek.getDate() + i);
        return date.toLocaleDateString();
    });
};

const WeekPlanner = () => {
    const [activities, setActivities] = useState({});
    const [weekDates, setWeekDates] = useState([]);
  
    // Initialize empty activity lists for each day
    const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  
    useEffect(() => {
      const dates = getCurrentWeekDates();
      setWeekDates(dates);
  
      // Retrieve activities from local storage, or initialize empty arrays for each day
      const savedActivities = localStorage.getItem('week-planner-activities');
      if (savedActivities) {
        setActivities(JSON.parse(savedActivities));
      } else {
        // Initialize empty arrays for each day
        const initialActivities = {};
        weekDays.forEach((day) => {
          initialActivities[day] = []; // Set each day to an empty array
        });
        setActivities(initialActivities);
      }
    }, []);
  
    // Save activities to local storage whenever they change
    useEffect(() => {
      if (Object.keys(activities).length > 0) {
        localStorage.setItem('week-planner-activities', JSON.stringify(activities));
      }
    }, [activities]);
  
    const addActivity = (day, activity) => {
      setActivities((prevActivities) => ({
        ...prevActivities,
        [day]: [...(prevActivities[day] || []), activity], // Use empty array if day is not defined
      }));
    };

    return (
        <div className='week-planner-page-container'>
            <h1 className='week-planner-header'>Week Planner</h1>
            <div className='week-planner-container'>
                {weekDays.map((day, index) => (
                <DayCard
                    key={day}
                    day={day}
                    date={weekDates[index]}
                    activities={activities[day] || []}
                    addActivity={addActivity}
                />
                ))}
            </div>
        </div>
    );
};

// DayCard Component to display individual day activities and input fields
const DayCard = ({ day, date, activities = [], addActivity }) => {
    const [time, setTime] = useState('');
    const [description, setDescription] = useState('');
  
    // Add a new activity to the list
    const handleAddActivity = () => {
      if (time && description) {
            addActivity(day, { time, description });
            setTime('');
            setDescription('');
      }
    };
  
    return (
        <div className='week-planner-card'>
            <h2 className='week-planner-day-header'>{day} - {date}</h2>
            
            <div className='week-planner-input-container'>
                <input
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className='week-planner-time-input'
                    placeholder="HH:MM"
                />
                <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className='week-planner-text-input'
                    placeholder="Description"
                />
                <button onClick={handleAddActivity} className='week-planner-add-button'>Add</button>
            </div>
            <ul className='week-planner-activity-list'>
                {activities.map((activity, index) => (
                    <li key={index} className='week-planner-activity-item'>
                        <strong>{activity.time}:</strong> {activity.description}
                    </li>
                ))}
            </ul>
        </div>
    );
};


export default WeekPlanner;
