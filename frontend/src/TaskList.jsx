function TaskList({ tasks, setTasks }) {

    const completeTask = async (id) => {
        try {
            const task = tasks.find((task) => task.id === id);

            const response = await fetch(
                `https://taskflow-qli3.onrender.com/tasks/${id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        ...task,
                        completed: true,
                    }),
                }
            );

            if (!response.ok) {
                throw new Error("Failed to complete task");
            }

            const updatedTask = await response.json();

            setTasks((previousTasks) =>
                previousTasks.map((task) =>
                    task.id === id ? updatedTask : task
                )
            );

        } catch (error) {
            console.error("Error completing task:", error);
        }
    };


    const deleteTask = async (id) => {
        try {
            const response = await fetch(
                `https://taskflow-qli3.onrender.com/tasks/${id}`,
                {
                    method: "DELETE",
                }
            );

            if (!response.ok) {
                throw new Error("Failed to delete task");
            }

            setTasks((previousTasks) =>
                previousTasks.filter((task) => task.id !== id)
            );

        } catch (error) {
            console.error("Error deleting task:", error);
        }
    };


    return (
        <div>
            <h2>My Tasks</h2>

            {tasks.length === 0 ? (
                <p>No tasks yet.</p>
            ) : (
                tasks.map((task) => (
                    <div className="task" key={task.id}>

                        <h3>{task.title}</h3>

                        <p>{task.description}</p>

                        <p>
                            Status:{" "}
                            <strong>
                                {task.completed ? "Completed" : "Pending"}
                            </strong>
                        </p>

                        <div className="task-actions">

                            {!task.completed && (
                                <button
                                    className="complete-btn"
                                    onClick={() => completeTask(task.id)}
                                >
                                    Complete
                                </button>
                            )}

                            <button
                                className="delete-btn"
                                onClick={() => deleteTask(task.id)}
                            >
                                Delete
                            </button>

                        </div>

                    </div>
                ))
            )}
        </div>
    );
}

export default TaskList;