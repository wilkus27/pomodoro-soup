import { useState } from 'react';
import NewTaskCard from './NewTaskCard';
import AddTaskButton from './AddTaskButton';

export default function NewTask( {pomodoros, setPomodoros} ) {
    const [addTaskButton, setAddTaskButton] = useState(true);

    const showAddTaskButton = () => {
        setAddTaskButton(true);
    }

    const hideAddTaskButton = () => {
        setAddTaskButton(false);
    }

    return (
        <div className="new-task">
            {addTaskButton ? (
                <AddTaskButton hideButton={hideAddTaskButton} />
            ) : (
                <NewTaskCard 
                    showAddTaskButton={showAddTaskButton}
                    pomodoros={pomodoros}
                    setPomodoros={setPomodoros}
                />
            )}
        </div>
    )
}