import React, { useState } from 'react';
import '../styles/Todo.css';
import Notification from '../components/Notification';

function Todo() {
    const [tasks, setTasks] = useState([]); // State to hold the tasks
    const [task, setTask] = useState(''); // State for the current input
    const [sizeNotification, setSizeNotification] = useState(null);
    const [clearedNotification, setClearedNotification] = useState(null);

    const handleInputChange = (e) => {
        setTask(e.target.value); // Update task as user types
    };

    const addTask = (e) => {
        e.preventDefault(); // Prevent form submission
        if (tasks.length >= 20) {
            setSizeNotification('Cannot add more than 20 items in the list.');
            setTimeout(() => setSizeNotification(null), 3000);
            return;
        }
        if (task) {
            setTasks([...tasks, task]); // Add new task to the list
            setTask(''); // Clear the input
            setSizeNotification(null);
        }
    };
       
    const removeTask = (index) => {
        const newTasks = tasks.filter((_, i) => i !== index); // Remove task by index
        setTasks(newTasks); // Update the tasks state
        setSizeNotification(null);
    };

    const clearTasks = () => {
        if (tasks.length >= 1) {
            setTasks([]);
            setClearedNotification('Todo list cleared.');
            setTimeout(() => setClearedNotification(null), 3000);
        }
    };

    return (
        <div>
            {sizeNotification && (
                <Notification
                    message={sizeNotification}
                    style={{position: 'fixed', top: '100px', right: '20px', padding: '20px 30px', backgroundColor: '#f13737', color: '#fff', borderRadius: '5px', zIndex: 10000, boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)', fontSize: '18px'}}
                />
            )}
            {clearedNotification && (
                <Notification
                    message={clearedNotification}
                    style={{position: 'fixed', bottom: '10px', right: '10px', padding: '10px 20px', backgroundColor: '#333', color: '#fff', borderRadius: '5px', zIndex: 1000, boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)'}}
                />
            )}
            <h1 className='todo-header'>Todo List</h1>
            <div className="todo-container">
                <form onSubmit={addTask} className='todo-form'>
                    <input
                    type="text"
                    value={task}
                    onChange={handleInputChange}
                    placeholder="Add a new task"
                    className='add-todo-input'
                    />
                    <button className="todo-add-button" type="submit">Add</button>
                </form>
                <ul className='todo-list'>
                    {tasks.map((task, index) => (
                    <li key={index} className='todo-list-item'>
                        <span className='todo-text'>● {task}</span>
                        <button className="todo-remove-button" onClick={() => removeTask(index)}>Remove</button>
                    </li>
                    ))}
                </ul>
                <button className='todo-clear-button' onClick={() => clearTasks()}>Clear List</button>
            </div>
        </div>
    );
}

export default Todo;