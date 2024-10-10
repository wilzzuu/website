import React, { useState, useEffect } from 'react';
import Notification from '../components/Notification';
import editIcon from '../assets/edit.svg';
import removeIcon from '../assets/remove.svg';
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
    const [errNotification, setErrNotification] = useState(null);
    const [notification, setNotification] = useState(null);
  
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

    const editActivity = (day, index, updatedActivity) => {
        const updatedActivities = { ...activities };
        updatedActivities[day][index] = updatedActivity;
        setActivities(updatedActivities);
    };

    const removeActivity = (day, index) => {
        const updatedActivities = { ...activities };
        updatedActivities[day].splice(index, 1);
        setActivities(updatedActivities);
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
                    editActivity={editActivity}
                    removeActivity={removeActivity}
                    errNotification={errNotification}
                    setErrNotification={setErrNotification}
                    notification={notification}
                    setNotification={setNotification}
                />
                ))}
            </div>
        </div>
    );
};

// DayCard Component to display individual day activities and input fields
const DayCard = ({ day, date, activities = [], addActivity, editActivity, removeActivity, notification, setNotification, errNotification, setErrNotification }) => {
    const [time, setTime] = useState('');
    const [description, setDescription] = useState('');
    const [editingIndex, setEditingIndex] = useState(-1);
    const [activeIndex, setActiveIndex] = useState(null);
  
    // Add a new activity to the list
    const handleAddActivity = () => {
        if (time && description) {
            addActivity(day, { time, description });
            setTime('');
            setDescription('');
            setActiveIndex(null);
            setNotification(`Added activity "${description}" @${time} for ${day}`)
            setTimeout(() => setNotification(null), 5000);
        } else if (time && !description) {
            setErrNotification('Cannot add activity with null description')
            setTimeout(() => setErrNotification(null), 5000);
        } else if (!time && !description) {
            setErrNotification('Cannot add activity with null time and description')
            setTimeout(() => setErrNotification(null), 5000);
        } else if (!time && description) {
            setErrNotification('Cannot add activity with null time')
            setTimeout(() => setErrNotification(null), 5000);
        }
    };

    const handleEditActivity = (index) => {
        const activity = activities[index];
        setEditingIndex(index);
        setTime(activity.time);
        setDescription(activity.description);
    };

    const handleSaveActivity = () => {
        if (editingIndex >= 0) {
            editActivity(day, editingIndex, { time, description });
            setEditingIndex(-1);
            setTime('');
            setDescription('');
            setActiveIndex(null);
            setNotification(`Edited activity nr. ${editingIndex+1} -> "${description}" @${time} for ${day}`)
            setTimeout(() => setNotification(null), 5000);
        }
    };

    const handleCancelEdit = () => {
        if (editingIndex >= 0) {
            setEditingIndex(-1);
            setTime('');
            setDescription('');
        }
    };
  
    return (
        <div>
            {notification && (
                <Notification
                    message={notification}
                    style={{position: 'fixed', bottom: '10px', right: '10px', padding: '10px 20px', backgroundColor: '#333', color: '#fff', borderRadius: '5px', zIndex: 1000, boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)'}}
                />
            )}
            {errNotification && (
            <Notification
                message={errNotification}
                style={{position: 'fixed', top: '85px', right: '10px', padding: '20px 30px', backgroundColor: '#f13737', color: '#fff', borderRadius: '5px', zIndex: 10000, boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)', fontSize: '18px'}}
            />
            )}
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
                            <div className='week-planner-activity-content' onClick={() => setActiveIndex(index === activeIndex ? null : index)}>
                                <strong id='week-planner-strong'>{activity.time}: </strong>{activity.description}
                            </div>
                            {activeIndex === index && (
                                <div className='week-planner-buttons'>
                                    {editingIndex === index ? (
                                        <>
                                            <button id='week-planner-save-button' onClick={handleSaveActivity}>Save</button>
                                            <button id='week-planner-cancel-button' onClick={handleCancelEdit}>Cancel</button>
                                        </>
                                    ) : (
                                        <>
                                            <button id='week-planner-edit-button' onClick={(e) => {e.stopPropagation(); handleEditActivity(index)}}>
                                                <img src={editIcon} alt="Edit"  className='week-planner-edit-icon' />
                                            </button>
                                            <button id='week-planner-remove-button' onClick={(e) => {e.stopPropagation(); removeActivity(day, index), setActiveIndex(null)}}>
                                                <img src={removeIcon} alt="Remove" className='week-planner-remove-icon' />
                                            </button>
                                        </>
                                    )}
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};


export default WeekPlanner;
