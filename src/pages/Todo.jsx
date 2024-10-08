import React from 'react';
import { useTodo } from '../context/TodoContext';
import '../styles/Todo.css';

function Todo() {
    const { tasks, task, sizeNotification, clearedNotification, addTask, removeTask, clearTasks, handleInputChange } = useTodo();

    return (
        <div>
            {sizeNotification}
            {clearedNotification}
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