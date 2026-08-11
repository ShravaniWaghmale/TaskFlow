import { useEffect, useState } from "react";
import TaskList from "./TaskList";
import AddTask from "./AddTask";

function App() {
    const [tasks, setTasks] = useState([]);

    const fetchTasks = async () => {
        try {
            const response = await fetch("https://taskflow-qli3.onrender.com/tasks");
            const data = await response.json();
            setTasks(data);
        } catch (error) {
            console.error("Error fetching tasks:", error);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const handleTaskAdded = (newTask) => {
        setTasks((previousTasks) => [...previousTasks, newTask]);
    };

    return (
        <div className="app">
            <div className="container">

                <header className="header">
                    <h1>TaskFlow</h1>
                    <p>Manage your tasks easily.</p>
                </header>

                <AddTask onTaskAdded={handleTaskAdded} />

                <TaskList
                    tasks={tasks}
                    setTasks={setTasks}
                />

            </div>
        </div>
    );
}

export default App;